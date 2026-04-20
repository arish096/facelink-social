import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { USERS } from "@/data/mock";

export const SearchBar = ({ className = "" }: { className?: string }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = q.trim()
    ? USERS.filter((u) => u.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search facelink"
        className="h-10 w-60 rounded-full bg-secondary pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
      />

      {open && q.trim() && (
        <div className="absolute left-0 top-12 z-50 w-72 overflow-hidden rounded-xl bg-surface shadow-pop">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No people found.</p>
          ) : (
            <ul>
              {results.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => {
                      navigate(`/profile/${u.id}`);
                      setOpen(false);
                      setQ("");
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-secondary"
                  >
                    <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.bio}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
