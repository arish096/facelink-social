import { Search, Home, Store, Users, Bell, MessageCircle, Menu, LogOut } from "lucide-react";
import { ME } from "@/data/mock";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/facelink-logo.jpeg";

type Props = {
  onOpenMobileMenu: () => void;
};

const NavIcon = ({
  icon: Icon,
  active,
  label,
}: {
  icon: typeof Home;
  active?: boolean;
  label: string;
}) => (
  <button
    aria-label={label}
    className={`relative flex h-12 w-full items-center justify-center rounded-lg transition-colors hover:bg-secondary md:w-28 ${
      active ? "border-b-[3px] border-primary text-primary" : "text-muted-foreground"
    }`}
  >
    <Icon className="h-6 w-6" />
  </button>
);

export const TopNav = ({ onOpenMobileMenu }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 h-14 w-full bg-surface shadow-nav">
      <div className="mx-auto grid h-full grid-cols-[auto_1fr_auto] items-center gap-2 px-3 md:px-4">
        {/* Left: logo + search */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img
            src={logo}
            alt="FaceLink"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search facelink"
              className="h-10 w-60 rounded-full bg-secondary pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Center: nav */}
        <nav className="hidden items-center justify-center gap-1 md:flex">
          <NavIcon icon={Home} label="Home" active />
          <NavIcon icon={Store} label="Marketplace" />
          <NavIcon icon={Users} label="Groups" />
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-muted md:flex" aria-label="Messages">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-muted md:flex" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-muted md:flex"
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
          </button>
          <img
            src={ME.avatar}
            alt={ME.name}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent hover:ring-primary"
          />
        </div>
      </div>
    </header>
  );
};
