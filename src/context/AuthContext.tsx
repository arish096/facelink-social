import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthState = {
  isAuthed: boolean;
  login: () => void;
  logout: () => void;
};

const AuthCtx = createContext<AuthState | null>(null);

const KEY = "fb-clone-authed";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(KEY) === "1";
  });

  useEffect(() => {
    localStorage.setItem(KEY, isAuthed ? "1" : "0");
  }, [isAuthed]);

  return (
    <AuthCtx.Provider
      value={{
        isAuthed,
        login: () => setIsAuthed(true),
        logout: () => setIsAuthed(false),
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
