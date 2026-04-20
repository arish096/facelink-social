import { Image as ImageIcon, Smile, Video } from "lucide-react";
import { ME } from "@/data/mock";

export const Composer = () => (
  <div className="rounded-xl bg-surface p-4 shadow-card">
    <div className="flex items-center gap-3">
      <img src={ME.avatar} alt={ME.name} className="h-10 w-10 rounded-full object-cover" />
      <button className="h-10 flex-1 rounded-full bg-secondary px-4 text-left text-[15px] text-muted-foreground hover:bg-muted">
        What's on your mind, {ME.name.split(" ")[0]}?
      </button>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-1 border-t pt-2 text-sm font-semibold text-muted-foreground">
      <button className="flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-secondary">
        <Video className="h-5 w-5 text-destructive" /> Live video
      </button>
      <button className="flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-secondary">
        <ImageIcon className="h-5 w-5 text-success" /> Photo/video
      </button>
      <button className="flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-secondary">
        <Smile className="h-5 w-5 text-love" /> Feeling
      </button>
    </div>
  </div>
);
