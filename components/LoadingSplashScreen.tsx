import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

interface LoadingSplashScreenProps {
  onFinish?: () => void;
}

export const LoadingSplashScreen: React.FC<LoadingSplashScreenProps> = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsMounted(false);
        onFinish?.();
      }, 400);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F9FA] dark:bg-[#131F24] px-4 transition-opacity duration-400 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full text-center space-y-4 animate-fade-in">
        {/* Floating Mascot without background */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-40 h-52 sm:w-48 sm:h-60 animate-float transition-transform">
            <img
              src="/mascot-hacker.png"
              alt="CyberDesk Mascot"
              className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.15)] select-none pointer-events-none"
            />
          </div>
          <div className="w-28 sm:w-32 h-3.5 bg-slate-300/40 dark:bg-emerald-950/40 rounded-full blur-[3px] animate-pulse mt-1" />
        </div>

        {/* Brand Badge & Title */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>CyberDesk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-soft-text dark:text-white">
            Спокойная кибербезопасность
          </h1>
          <p className="text-xs text-soft-muted dark:text-slate-400">
            Интерактивный симулятор защиты в eGov, банках и мессенджерах
          </p>
        </div>
      </div>
    </div>
  );
};
