import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle, Pause, Play, Send, Share2, X, Volume2, VolumeX } from "lucide-react";
import { REELS, findUser } from "@/data/mock";

type Props = {
  open: boolean;
  startIndex: number;
  onClose: () => void;
};

export const ReelsPlayer = ({ open, startIndex, onClose }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) return;
    const node = containerRef.current?.children[startIndex] as HTMLElement | undefined;
    node?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  }, [open, startIndex]);

  // Auto play/pause when in view
  useEffect(() => {
    if (!open || !containerRef.current) return;
    const videos = Array.from(containerRef.current.querySelectorAll("video"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.intersectionRatio > 0.6) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: [0, 0.6, 1] }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-black"
        >
          {/* Header */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3">
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
              aria-label="Close reels"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
              aria-label="Toggle sound"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>

          {/* Vertical scroll feed */}
          <div
            ref={containerRef}
            className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
          >
            {REELS.map((r) => {
              const user = findUser(r.userId);
              const isLiked = liked[r.id];
              const isPlaying = playing[r.id] ?? true;

              return (
                <section
                  key={r.id}
                  className="relative flex h-screen w-full snap-start items-center justify-center"
                >
                  <div className="relative h-full w-full max-w-[440px] overflow-hidden md:rounded-2xl">
                    <video
                      src={r.src}
                      poster={r.poster}
                      loop
                      muted={muted}
                      playsInline
                      onClick={(e) => {
                        const v = e.currentTarget;
                        if (v.paused) {
                          v.play();
                          setPlaying((p) => ({ ...p, [r.id]: true }));
                        } else {
                          v.pause();
                          setPlaying((p) => ({ ...p, [r.id]: false }));
                        }
                      }}
                      className="h-full w-full object-cover"
                    />

                    {!isPlaying && (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-white">
                          <Play className="h-7 w-7 fill-white" />
                        </span>
                      </span>
                    )}

                    {/* Caption */}
                    <div
                      className="absolute inset-x-0 bottom-0 p-4 pr-16 text-white"
                      style={{ backgroundImage: "var(--gradient-reel)" }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white" />
                        <p className="font-semibold">{user.name}</p>
                        <button className="ml-2 rounded-md border border-white/80 px-2.5 py-0.5 text-xs font-semibold">
                          Follow
                        </button>
                      </div>
                      <p className="text-sm">{r.caption}</p>
                    </div>

                    {/* Right action rail */}
                    <div className="absolute bottom-6 right-3 flex flex-col items-center gap-4 text-white">
                      <button
                        onClick={() => setLiked((m) => ({ ...m, [r.id]: !m[r.id] }))}
                        className="flex flex-col items-center"
                      >
                        <motion.span
                          whileTap={{ scale: 0.85 }}
                          animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur"
                        >
                          <Heart className={`h-6 w-6 ${isLiked ? "fill-love text-love" : ""}`} />
                        </motion.span>
                        <span className="mt-1 text-xs font-semibold">
                          {(r.likes + (isLiked ? 1 : 0)).toLocaleString()}
                        </span>
                      </button>
                      <button className="flex flex-col items-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                          <MessageCircle className="h-6 w-6" />
                        </span>
                        <span className="mt-1 text-xs font-semibold">{r.comments}</span>
                      </button>
                      <button className="flex flex-col items-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                          <Share2 className="h-6 w-6" />
                        </span>
                        <span className="mt-1 text-xs font-semibold">Share</span>
                      </button>
                      <button className="flex flex-col items-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                          <Send className="h-6 w-6" />
                        </span>
                      </button>
                    </div>

                    {/* Mute toggle bottom */}
                    <button
                      onClick={() => setMuted((m) => !m)}
                      className="absolute bottom-6 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur md:hidden"
                      aria-label="Toggle sound"
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                </section>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
