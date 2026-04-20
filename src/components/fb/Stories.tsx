import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useAppStore } from "@/context/AppStore";
import { useAuth } from "@/context/AuthContext";
import { StoryViewer } from "./StoryViewer";
import { ME } from "@/data/mock";

export const Stories = () => {
  const { stories, addStory, resolveUser } = useAppStore();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const meAvatar = currentUser?.avatar ?? ME.avatar;

  const handleCreate = () => fileRef.current?.click();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => addStory(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={handleCreate}
          className="relative h-52 w-32 shrink-0 overflow-hidden rounded-xl bg-surface shadow-card"
        >
          <img src={meAvatar} alt="Your story" className="h-3/4 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex h-1/4 flex-col items-center justify-end bg-surface pb-2 pt-5">
            <span className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-full border-4 border-surface bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold">Create story</span>
          </div>
        </button>

        {stories.map((s, i) => {
          const user = resolveUser(s.userId);
          return (
            <button
              key={s.id}
              onClick={() => {
                setStart(i);
                setOpen(true);
              }}
              className="group relative h-52 w-32 shrink-0 overflow-hidden rounded-xl shadow-card"
            >
              <img
                src={s.preview}
                alt={user.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-story)" }} />
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

      <StoryViewer open={open} startIndex={start} stories={stories} onClose={() => setOpen(false)} />
    </>
  );
};
