import { useRef, useState } from "react";
import { Image as ImageIcon, Smile, Video, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppStore } from "@/context/AppStore";
import { ME } from "@/data/mock";
import { toast } from "sonner";

export const Composer = () => {
  const { currentUser } = useAuth();
  const { addPost } = useAppStore();
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);

  const me = currentUser ?? ME;
  const avatar = currentUser?.avatar ?? ME.avatar;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const submit = () => {
    if (!caption.trim() && !image) {
      toast.error("Add some text or an image.");
      return;
    }
    addPost(caption, image);
    toast.success("Post shared!");
    setCaption("");
    setImage(undefined);
    setOpen(false);
  };

  return (
    <>
      <div className="rounded-xl bg-surface p-4 shadow-card">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={me.name} className="h-10 w-10 rounded-full object-cover" />
          <button
            onClick={() => setOpen(true)}
            className="h-10 flex-1 rounded-full bg-secondary px-4 text-left text-[15px] text-muted-foreground hover:bg-muted"
          >
            What's on your mind, {me.name.split(" ")[0]}?
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1 border-t pt-2 text-sm font-semibold text-muted-foreground">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-secondary"
          >
            <Video className="h-5 w-5 text-destructive" /> Live video
          </button>
          <button
            onClick={() => {
              setOpen(true);
              setTimeout(() => fileRef.current?.click(), 100);
            }}
            className="flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-secondary"
          >
            <ImageIcon className="h-5 w-5 text-success" /> Photo/video
          </button>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-secondary"
          >
            <Smile className="h-5 w-5 text-love" /> Feeling
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl bg-surface shadow-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-lg font-bold">Create post</h3>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3">
                <img src={avatar} alt={me.name} className="h-10 w-10 rounded-full object-cover" />
                <p className="text-sm font-semibold">{me.name}</p>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                placeholder={`What's on your mind, ${me.name.split(" ")[0]}?`}
                className="w-full resize-none bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              {image && (
                <div className="relative">
                  <img src={image} alt="preview" className="max-h-80 w-full rounded-lg object-cover" />
                  <button
                    onClick={() => setImage(undefined)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/60 text-background"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-success hover:bg-secondary"
              >
                <ImageIcon className="h-5 w-5" /> Add photo
              </button>
              <button
                onClick={submit}
                className="h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
