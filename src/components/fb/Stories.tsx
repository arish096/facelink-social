import { Plus } from "lucide-react";
import { ME, STORIES, findUser } from "@/data/mock";

export const Stories = () => (
  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
    {/* Create story */}
    <button className="relative h-52 w-32 shrink-0 overflow-hidden rounded-xl bg-surface shadow-card">
      <img src={ME.avatar} alt="Your story" className="h-3/4 w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 flex h-1/4 flex-col items-center justify-end bg-surface pb-2 pt-5">
        <span className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-full border-4 border-surface bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold">Create story</span>
      </div>
    </button>

    {STORIES.map((s) => {
      const user = findUser(s.userId);
      return (
        <button
          key={s.id}
          className="group relative h-52 w-32 shrink-0 overflow-hidden rounded-xl shadow-card"
        >
          <img
            src={s.preview}
            alt={user.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "var(--gradient-story)" }}
          />
          <img
            src={user.avatar}
            alt=""
            className="absolute left-2 top-2 h-9 w-9 rounded-full object-cover ring-4 ring-primary"
          />
          <span className="absolute bottom-2 left-2 right-2 truncate text-left text-xs font-semibold text-primary-foreground">
            {user.name}
          </span>
        </button>
      );
    })}
  </div>
);
