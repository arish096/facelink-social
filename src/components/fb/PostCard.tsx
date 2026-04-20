import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MoreHorizontal, Send, Share2, ThumbsUp } from "lucide-react";
import { Post, findUser, ME } from "@/data/mock";
import { SmartVideo } from "./SmartVideo";

export const PostCard = ({ post }: { post: Post }) => {
  const author = findUser(post.userId);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [draft, setDraft] = useState("");

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((n) => n + (liked ? -1 : 1));
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((c) => [...c, { userId: "me", text: draft.trim() }]);
    setDraft("");
  };

  return (
    <article className="rounded-xl bg-surface shadow-card">
      <header className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="text-[15px] font-semibold leading-tight">{author.name}</p>
            <p className="text-xs text-muted-foreground">{post.time} · 🌍</p>
          </div>
        </div>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary" aria-label="More">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>

      <p className="px-4 pb-3 text-[15px] leading-snug">{post.caption}</p>

      {post.video && (
        <div className="relative aspect-video w-full bg-black">
          <SmartVideo src={post.video.src} poster={post.video.poster} />
        </div>
      )}

      {post.image && !post.video && (
        <img
          src={post.image}
          alt=""
          className="max-h-[560px] w-full object-cover"
          loading="lazy"
        />
      )}

      <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ThumbsUp className="h-3 w-3" />
          </span>
          <span>{likes.toLocaleString()}</span>
        </div>
        <button onClick={() => setShowComments((s) => !s)} className="hover:underline">
          {comments.length} comments
        </button>
      </div>

      <div className="mx-4 grid grid-cols-3 gap-1 border-t py-1 text-sm font-semibold">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleLike}
          className={`flex items-center justify-center gap-2 rounded-lg py-2 transition-colors ${
            liked ? "text-primary" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          <ThumbsUp className={`h-5 w-5 ${liked ? "fill-primary" : ""}`} />
          Like
        </motion.button>
        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center justify-center gap-2 rounded-lg py-2 text-muted-foreground hover:bg-secondary"
        >
          <MessageCircle className="h-5 w-5" /> Comment
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg py-2 text-muted-foreground hover:bg-secondary">
          <Share2 className="h-5 w-5" /> Share
        </button>
      </div>

      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t px-4 py-3"
        >
          <ul className="mb-3 space-y-2">
            {comments.map((c, i) => {
              const u = findUser(c.userId);
              return (
                <li key={i} className="flex items-start gap-2">
                  <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full object-cover" />
                  <div className="rounded-2xl bg-secondary px-3 py-2">
                    <p className="text-xs font-semibold">{u.name}</p>
                    <p className="text-sm">{c.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <form onSubmit={addComment} className="flex items-center gap-2">
            <img src={ME.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
            <div className="relative flex-1">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a comment…"
                className="h-10 w-full rounded-full bg-secondary px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-primary hover:bg-muted"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </article>
  );
};
