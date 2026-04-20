import { Users, Clock, Bookmark, Flag, Calendar, Store, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ME } from "@/data/mock";

const items = [
  { icon: Users, label: "Friends" },
  { icon: Clock, label: "Memories" },
  { icon: Bookmark, label: "Saved" },
  { icon: Flag, label: "Pages" },
  { icon: Calendar, label: "Events" },
  { icon: Store, label: "Marketplace" },
];

export const LeftSidebar = () => {
  const { currentUser } = useAuth();
  const me = currentUser ?? ME;
  return (
  <aside className="hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 overflow-y-auto px-3 py-4 lg:block">
    <ul className="space-y-1">
      <li>
        <Link
          to="/profile/me"
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-secondary"
        >
          <img src={me.avatar} alt={me.name} className="h-9 w-9 rounded-full object-cover" />
          <span className="text-[15px] font-medium">{me.name}</span>
        </Link>
      </li>
      {items.map(({ icon: Icon, label }) => (
        <li key={label}>
          <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-secondary">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-medium">{label}</span>
          </button>
        </li>
      ))}
      <li>
        <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-secondary">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
            <ChevronDown className="h-5 w-5" />
          </span>
          <span className="text-[15px] font-medium">See more</span>
        </button>
      </li>
    </ul>

    <div className="mt-4 border-t pt-3">
      <h3 className="px-2 pb-2 text-sm font-semibold text-muted-foreground">Your shortcuts</h3>
      <ul className="space-y-1">
        {["Design Crit", "Trail Runners", "Indie Devs"].map((s) => (
          <li key={s}>
            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-secondary">
              <span className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-love" />
              <span className="text-[15px] font-medium">{s}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </aside>
  );
};

