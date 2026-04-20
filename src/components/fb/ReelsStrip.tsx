import { Play, Clapperboard } from "lucide-react";
import { REELS, findUser } from "@/data/mock";

export const ReelsStrip = ({ onWatch }: { onWatch: (index: number) => void }) => (
  <section className="rounded-xl bg-surface p-4 shadow-card">
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-[15px] font-semibold">
        <Clapperboard className="h-5 w-5 text-primary" /> Reels
      </h2>
      <button
        onClick={() => onWatch(0)}
        className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Watch
      </button>
    </div>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {REELS.map((r, i) => {
        const user = findUser(r.userId);
        return (
          <button
            key={r.id}
            onClick={() => onWatch(i)}
            className="group relative aspect-[9/16] overflow-hidden rounded-xl"
          >
            <img
              src={r.poster}
              alt={r.caption}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "var(--gradient-reel)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 text-primary">
                <Play className="h-5 w-5 fill-primary" />
              </span>
            </div>
            <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 text-left">
              <img src={user.avatar} alt="" className="h-7 w-7 rounded-full object-cover ring-2 ring-surface" />
              <p className="line-clamp-2 text-xs font-semibold text-primary-foreground">
                {r.caption}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  </section>
);
