import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Story } from "@/data/mock";
import { useAppStore } from "@/context/AppStore";

type Props = {
  open: boolean;
  startIndex: number;
  stories: Story[];
  onClose: () => void;
};

const DURATION = 5000;

export const StoryViewer = ({ open, startIndex, stories, onClose }: Props) => {
  const { resolveUser } = useAppStore();
  const [idx, setIdx] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) setIdx(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      setProgress(p);
      if (p >= 1) {
        clearInterval(interval);
        if (idx < stories.length - 1) setIdx(idx + 1);
        else onClose();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [idx, open, stories.length, onClose]);

  if (!open) return null;
  const story = stories[idx];
  if (!story) return null;
  const user = resolveUser(story.userId);

  const next = () => (idx < stories.length - 1 ? setIdx(idx + 1) : onClose());
  const prev = () => idx > 0 && setIdx(idx - 1);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/90 p-4"
        onClick={onClose}
      >
        <div
          className="relative h-[85vh] w-full max-w-[420px] overflow-hidden rounded-xl bg-black shadow-pop"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bars */}
          <div className="absolute inset-x-3 top-3 z-20 flex gap-1">
            {stories.map((_, i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full bg-primary-foreground transition-[width] duration-100"
                  style={{
                    width: i < idx ? "100%" : i === idx ? `${progress * 100}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute inset-x-3 top-6 z-20 mt-2 flex items-center gap-2 text-primary-foreground">
            <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white" />
            <span className="text-sm font-semibold">{user.name}</span>
            <button
              onClick={onClose}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <img src={story.preview} alt={user.name} className="h-full w-full object-cover" />

          {/* Tap zones */}
          <button
            onClick={prev}
            className="absolute inset-y-0 left-0 z-10 flex w-1/3 items-center justify-start pl-2 text-primary-foreground opacity-0 transition-opacity hover:opacity-100"
            aria-label="Previous story"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={next}
            className="absolute inset-y-0 right-0 z-10 flex w-1/3 items-center justify-end pr-2 text-primary-foreground opacity-0 transition-opacity hover:opacity-100"
            aria-label="Next story"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
