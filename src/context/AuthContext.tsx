import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Account = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio?: string;
};

type AuthState = {
  isAuthed: boolean;
  currentUser: Account | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthCtx = createContext<AuthState | null>(null);

const ACCOUNTS_KEY = "fl-accounts";
const SESSION_KEY = "fl-session";

const defaultAccount: Account = {
  id: "me",
  name: "Alex Morgan",
  email: "alex@example.com",
  password: "demo1234",
  avatar: "https://i.pravatar.cc/200?img=8",
  bio: "Welcome to my profile",
};

const loadAccounts = (): Account[] => {
  if (typeof window === "undefined") return [defaultAccount];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [defaultAccount];
    const parsed = JSON.parse(raw) as Account[];
    return parsed.length ? parsed : [defaultAccount];
  } catch {
    return [defaultAccount];
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts);
  const [currentUser, setCurrentUser] = useState<Account | null>(() => {
    if (typeof window === "undefined") return null;
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    return loadAccounts().find((a) => a.id === id) ?? null;
  });

  useEffect(() => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(SESSION_KEY, currentUser.id);
    else localStorage.removeItem(SESSION_KEY);
  }, [currentUser]);

  const login: AuthState["login"] = (email, password) => {
    const acc = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!acc) return { ok: false, error: "Invalid email or password." };
    setCurrentUser(acc);
    return { ok: true };
  };

  const signup: AuthState["signup"] = (name, email, password) => {
    if (!name.trim()) return { ok: false, error: "Name is required." };
    if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const id = `acc_${Date.now()}`;
    const avatar = `https://i.pravatar.cc/200?u=${encodeURIComponent(email)}`;
    const acc: Account = { id, name: name.trim(), email, password, avatar, bio: "Hi, I'm new on FaceLink!" };
    setAccounts((a) => [...a, acc]);
    setCurrentUser(acc);
    return { ok: true };
  };

  return (
    <AuthCtx.Provider
      value={{
        isAuthed: !!currentUser,
        currentUser,
        login,
        signup,
        logout: () => setCurrentUser(null),
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
