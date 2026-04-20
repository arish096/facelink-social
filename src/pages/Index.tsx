import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TopNav } from "@/components/fb/TopNav";
import { LeftSidebar } from "@/components/fb/LeftSidebar";
import { RightSidebar } from "@/components/fb/RightSidebar";
import { MobileMenu } from "@/components/fb/MobileMenu";
import { Stories } from "@/components/fb/Stories";
import { Composer } from "@/components/fb/Composer";
import { PostCard } from "@/components/fb/PostCard";
import { ReelsStrip } from "@/components/fb/ReelsStrip";
import { ReelsPlayer } from "@/components/fb/ReelsPlayer";
import { useAuth } from "@/context/AuthContext";
import { useAppStore } from "@/context/AppStore";

const Index = () => {
  const { isAuthed } = useAuth();
  const { posts } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [reelsOpen, setReelsOpen] = useState(false);
  const [reelsStart, setReelsStart] = useState(0);

  if (!isAuthed) return <Navigate to="/login" replace />;

  const openReels = (i: number) => {
    setReelsStart(i);
    setReelsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav onOpenMobileMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="mx-auto flex w-full max-w-[1600px]">
        <LeftSidebar />

        <AnimatePresence mode="wait">
          {!reelsOpen && (
            <motion.main
              key="feed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-[680px] flex-1 space-y-4 px-3 py-4 md:px-4"
            >
              <Stories />
              <Composer />
              {posts.slice(0, 2).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
              <ReelsStrip onWatch={openReels} />
              {posts.slice(2).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </motion.main>
          )}
        </AnimatePresence>

        <RightSidebar />
      </div>

      <ReelsPlayer
        open={reelsOpen}
        startIndex={reelsStart}
        onClose={() => setReelsOpen(false)}
      />
    </div>
  );
};

export default Index;
