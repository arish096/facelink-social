import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = mode === "login" ? login(email, password) : signup(name, email, password);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    toast.success(mode === "login" ? "Welcome back!" : "Account created!");
    navigate("/");
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
    if (mode === "login") {
      setEmail("");
      setPassword("");
    } else {
      setEmail("alex@example.com");
      setPassword("demo1234");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto grid min-h-screen items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-0">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-primary md:text-6xl">FaceLink</h1>
          <p className="mt-4 max-w-md text-2xl leading-snug text-foreground md:text-[28px]">
            Connect with friends and the world around you on FaceLink.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl bg-surface p-6 shadow-pop"
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <Input
                placeholder="Full name"
                required
                className="h-12 text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              type="email"
              placeholder="Email address"
              required
              className="h-12 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              className="h-12 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="h-12 w-full bg-primary text-base font-semibold hover:bg-primary-hover"
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </Button>
            <div className="pt-2 text-center">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgotten password?
              </button>
            </div>
            <div className="my-4 h-px bg-border" />
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={switchMode}
                className="h-12 bg-success px-6 text-base font-semibold text-success-foreground hover:opacity-90"
              >
                {mode === "login" ? "Create new account" : "Back to log in"}
              </Button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Demo account: <strong>alex@example.com</strong> / <strong>demo1234</strong>
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default Login;
