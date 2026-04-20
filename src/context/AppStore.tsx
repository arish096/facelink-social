import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { POSTS as SEED_POSTS, STORIES as SEED_STORIES, Post, Story, USERS, ME, findUser as baseFindUser } from "@/data/mock";
import { useAuth } from "./AuthContext";

type AppStore = {
  posts: Post[];
  stories: Story[];
  friendsOf: (userId: string) => string[];
  addPost: (caption: string, image?: string) => void;
  addStory: (preview: string) => void;
  resolveUser: (id: string) => { id: string; name: string; avatar: string; bio: string; online: boolean };
};

const Ctx = createContext<AppStore | null>(null);

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [stories, setStories] = useState<Story[]>(SEED_STORIES);

  const addPost = (caption: string, image?: string) => {
    if (!caption.trim() && !image) return;
    const meId = currentUser?.id ?? "me";
    const post: Post = {
      id: `p_${Date.now()}`,
      userId: meId,
      time: "Just now",
      caption: caption.trim(),
      image,
      likes: 0,
      comments: [],
    };
    setPosts((p) => [post, ...p]);
  };

  const addStory = (preview: string) => {
    const meId = currentUser?.id ?? "me";
    setStories((s) => [{ id: `s_${Date.now()}`, userId: meId, preview }, ...s]);
  };

  const resolveUser = (id: string) => {
    if (currentUser && id === currentUser.id) {
      return {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        bio: currentUser.bio ?? "",
        online: true,
      };
    }
    if (id === "me") {
      return { id: ME.id, name: ME.name, avatar: ME.avatar, bio: ME.bio, online: ME.online };
    }
    const u = baseFindUser(id);
    return { id: u.id, name: u.name, avatar: u.avatar, bio: u.bio, online: u.online };
  };

  // Static "friend graph": everyone is friends with the current user, and pairs of mock users are friends.
  const friendsOf = (userId: string): string[] => {
    const meId = currentUser?.id ?? "me";
    if (userId === meId) return USERS.map((u) => u.id);
    // Each mock user is friends with the current user + 4 other mock users
    const idx = USERS.findIndex((u) => u.id === userId);
    if (idx < 0) return [meId];
    const others = USERS.filter((_, i) => i !== idx).slice(0, 4).map((u) => u.id);
    return [meId, ...others];
  };

  const value = useMemo(
    () => ({ posts, stories, addPost, addStory, friendsOf, resolveUser }),
    [posts, stories, currentUser]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAppStore = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
};
