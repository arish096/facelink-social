import { useEffect, useRef, useState, VideoHTMLAttributes } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  poster?: string;
  /** Shared mute state (controlled). If omitted, the component manages its own. */
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  className?: string;
  /** Visible-ratio threshold to start playing. Default 0.5 (50%). */
  threshold?: number;
};

/**
 * Scroll-to-play video: autoplay (muted), loop, playsInline.
 * Pauses automatically when <50% visible. Tap to play/pause.
 * Includes overlay mute/unmute toggle.
 */
export const SmartVideo = ({
  src,
  poster,
  muted: mutedProp,
  onMutedChange,
  className = "",
  threshold = 0.5,
  ...rest
}: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [internalMuted, setInternalMuted] = useState(true);
  const muted = mutedProp ?? internalMuted;
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) {
          v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
          v.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, threshold, 1] }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [threshold]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !muted;
    if (onMutedChange) onMutedChange(next);
    else setInternalMuted(next);
  };

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="h-full w-full object-cover"
        {...rest}
      />

      {!isPlaying && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-primary-foreground">
            <Play className="h-7 w-7 fill-current" />
          </span>
        </span>
      )}

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-primary-foreground backdrop-blur transition-colors hover:bg-black/75"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
};
