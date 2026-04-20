import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, UserPlus, UserCheck } from "lucide-react";
import { TopNav } from "@/components/fb/TopNav";
import { MobileMenu } from "@/components/fb/MobileMenu";
import { PostCard } from "@/components/fb/PostCard";
import { useAuth } from "@/context/AuthContext";
import { useAppStore } from "@/context/AppStore";

const Profile = () => {
  const { id = "me" } = useParams();
  const navigate = useNavigate();
  const { isAuthed, currentUser } = useAuth();
  const { resolveUser, friendsOf, posts } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  if (!isAuthed) return <Navigate to="/login" replace />;

  const profileId = id === "me" && currentUser ? currentUser.id : id;
  const user = resolveUser(profileId);
  const isMe = currentUser?.id === user.id || profileId === "me";
  const userPosts = posts.filter((p) => p.userId === user.id);
  const friends = friendsOf(user.id);

  return (
    <div className="min-h-screen bg-background">
      <TopNav onOpenMobileMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-[940px] px-3 py-4 md:px-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Cover */}
        <div className="overflow-hidden rounded-xl bg-surface shadow-card">
          <div className="h-40 w-full bg-gradient-to-br from-primary/80 to-love/70 md:h-56" />
          <div className="flex flex-col items-center px-4 pb-4 md:flex-row md:items-end md:gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="-mt-14 h-32 w-32 rounded-full object-cover ring-4 ring-surface md:-mt-16 md:h-40 md:w-40"
            />
            <div className="mt-3 flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold md:text-3xl">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.bio || "—"}</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                {friends.length} friends
              </p>
            </div>
            <div className="mt-3 flex gap-2 md:mt-0">
              {!isMe && (
                <>
                  <button
                    onClick={() => setFollowing((f) => !f)}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold ${
                      following
                        ? "bg-secondary text-foreground hover:bg-muted"
                        : "bg-primary text-primary-foreground hover:bg-primary-hover"
                    }`}
                  >
                    {following ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                    {following ? "Friends" : "Add Friend"}
                  </button>
                  <button className="flex items-center gap-1.5 rounded-md bg-secondary px-4 py-2 text-sm font-semibold hover:bg-muted">
                    <MessageCircle className="h-4 w-4" /> Message
                  </button>
                </>
              )}
              {isMe && (
                <button className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold hover:bg-muted">
                  Edit profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Friends grid */}
        <section className="mt-4 rounded-xl bg-surface p-4 shadow-card">
          <h2 className="mb-3 text-lg font-bold">Friends</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {friends.map((fid) => {
              const f = resolveUser(fid);
              return (
                <button
                  key={fid}
                  onClick={() => navigate(`/profile/${fid}`)}
                  className="group text-left"
                >
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="aspect-square w-full rounded-lg object-cover transition-transform group-hover:scale-[1.02]"
                  />
                  <p className="mt-1 truncate text-sm font-semibold">{f.name}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Posts */}
        <section className="mt-4 space-y-4">
          <h2 className="px-1 text-lg font-bold">Posts</h2>
          {userPosts.length === 0 ? (
            <div className="rounded-xl bg-surface p-6 text-center text-muted-foreground shadow-card">
              No posts yet.
            </div>
          ) : (
            userPosts.map((p) => <PostCard key={p.id} post={p} />)
          )}
        </section>
      </motion.main>
    </div>
  );
};

export default Profile;
