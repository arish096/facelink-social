import { AnimatePresence, motion } from "framer-motion";
import { X, Users, Clock, Bookmark, Store, Calendar, Flag, LogOut, User } from "lucide-react";
import { ME, USERS } from "@/data/mock";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type Props = { open: boolean; onClose: () => void };

const items = [
  { icon: Users, label: "Friends" },
  { icon: Clock, label: "Memories" },
  { icon: Bookmark, label: "Saved" },
  { icon: Store, label: "Marketplace" },
  { icon: Calendar, label: "Events" },
  { icon: Flag, label: "Pages" },
];

export const MobileMenu = ({ open, onClose }: Props) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const me = currentUser ?? ME;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85%] overflow-y-auto bg-surface p-4 shadow-pop lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Link
              to="/profile/me"
              onClick={onClose}
              className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-secondary"
            >
              <img src={me.avatar} alt={me.name} className="h-10 w-10 rounded-full object-cover" />
              <span className="text-[15px] font-semibold">{me.name}</span>
            </Link>

            <ul className="mt-3 space-y-1">
              {items.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <button
                    onClick={onClose}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-secondary"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[15px] font-medium">{label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t" />

            <h3 className="px-2 pb-2 text-sm font-semibold text-muted-foreground">Contacts</h3>
            <ul className="space-y-1">
              {USERS.slice(0, 6).map((u) => (
                <li key={u.id}>
                  <Link
                    to={`/profile/${u.id}`}
                    onClick={onClose}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-secondary"
                  >
                    <span className="relative">
                      <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                      {u.online && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
                      )}
                    </span>
                    <span className="text-[15px] font-medium">{u.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t" />

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-destructive hover:bg-secondary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                <LogOut className="h-5 w-5" />
              </span>
              <span className="text-[15px] font-medium">Log out</span>
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
