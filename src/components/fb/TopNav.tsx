import { Home, Store, Users, Bell, MessageCircle, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { ME } from "@/data/mock";
import logo from "@/assets/facelink-logo.jpeg";

type Props = {
  onOpenMobileMenu: () => void;
};

export const TopNav = ({ onOpenMobileMenu }: Props) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const avatar = currentUser?.avatar ?? ME.avatar;

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
          <button onClick={() => navigate("/")} aria-label="Home">
            <img
              src={logo}
              alt="FaceLink"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/20"
            />
          </button>
          <SearchBar className="hidden md:block" />
        </div>

        {/* Center: nav */}
        <nav className="hidden items-center justify-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative flex h-12 w-28 items-center justify-center rounded-lg transition-colors hover:bg-secondary ${
                isActive ? "border-b-[3px] border-primary text-primary" : "text-muted-foreground"
              }`
            }
            aria-label="Home"
          >
            <Home className="h-6 w-6" />
          </NavLink>
          <button className="flex h-12 w-28 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary" aria-label="Marketplace">
            <Store className="h-6 w-6" />
          </button>
          <button className="flex h-12 w-28 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary" aria-label="Groups">
            <Users className="h-6 w-6" />
          </button>
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
          <button onClick={() => navigate("/profile/me")} aria-label="Your profile">
            <img
              src={avatar}
              alt={currentUser?.name ?? "Me"}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent hover:ring-primary"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
