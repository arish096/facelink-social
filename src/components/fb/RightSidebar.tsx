import { Search, Video, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { USERS } from "@/data/mock";

export const RightSidebar = () => (
  <aside className="hidden h-[calc(100vh-3.5rem)] w-80 shrink-0 overflow-y-auto px-3 py-4 xl:block">
    <section>
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Sponsored</h3>
      </div>
      <a className="mt-2 flex gap-3 rounded-lg p-2 hover:bg-secondary" href="#">
        <img
          src="https://picsum.photos/seed/ad-1/120/120"
          alt="Sponsored"
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-[15px] font-medium">Minimal Linen Shirts</p>
          <p className="text-xs text-muted-foreground">linenco.shop</p>
        </div>
      </a>
    </section>

    <div className="my-3 h-px bg-border" />

    <section>
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Contacts</h3>
        <div className="flex items-center gap-1 text-muted-foreground">
          <button className="rounded-full p-2 hover:bg-secondary" aria-label="Video">
            <Video className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 hover:bg-secondary" aria-label="Search contacts">
            <Search className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 hover:bg-secondary" aria-label="More">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ul className="mt-1">
        {USERS.map((u) => (
          <li key={u.id}>
            <Link
              to={`/profile/${u.id}`}
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
    </section>
  </aside>
);
