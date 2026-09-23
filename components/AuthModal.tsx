import React, { useState } from "react";
import { ShieldCheck, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { UserProfile, INITIAL_USER } from "@/lib/cyberhaven-data";

interface AuthModalProps {
  isOpen: boolean;
  onLoginSuccess: (user: UserProfile, isNewUser: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoadingGoogle(true);
    setError(null);
    setTimeout(() => {
      const googleUser: UserProfile = {
        ...INITIAL_USER,
        name: "Артём (Google)",
        avatar: "guest",
        xp: 1450,
        gems: 280,
      };
      setIsLoadingGoogle(false);
      onLoginSuccess(googleUser, true);
    }, 600);
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Пожалуйста, укажите email или логин");
      return;
    }
    if (!password) {
      setError("Пожалуйста, введите пароль");
      return;
    }

    const userName = trimmedEmail.split("@")[0] || "Пользователь";
    const loggedInUser: UserProfile = {
      ...INITIAL_USER,
      name: userName,
      avatar: "guest",
    };

    onLoginSuccess(loggedInUser, true);
  };

  const handleGuestLogin = () => {
    const guestUser: UserProfile = {
      ...INITIAL_USER,
      name: "Гость",
      avatar: "guest",
    };
    onLoginSuccess(guestUser, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck size={26} strokeWidth={2.4} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-soft-text dark:text-white">
            Вход в CyberDesk
          </h2>
          <p className="text-xs text-soft-muted dark:text-slate-400">
            Тренажер практической кибербезопасности для Казахстана
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
            {error}
          </div>
        )}

        {/* Google OAuth Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-subtle hover:bg-slate-50 dark:hover:bg-dark-border py-3 px-4 text-xs sm:text-sm font-bold text-soft-text dark:text-white shadow-2xs transition-all active:scale-98 disabled:opacity-50"
          >
            {isLoadingGoogle ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            ) : (
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Продолжить с Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200 dark:border-dark-border" />
          <span className="absolute bg-white dark:bg-dark-card px-3 text-[11px] font-medium text-slate-400">
            или по логину и паролю
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleFormLogin} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-soft-text dark:text-slate-300 mb-1">
              Email или логин
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.kz"
                className="w-full rounded-2xl border border-slate-200 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle py-2.5 pl-10 pr-3 text-xs text-soft-text dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-soft-text dark:text-slate-300 mb-1">
              Пароль
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle py-2.5 pl-10 pr-3 text-xs text-soft-text dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition-all"
          >
            <span>Войти в аккаунт</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Guest Access Button */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-soft-muted dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <User size={13} />
            <span>Войти как гость (без сохранения)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
