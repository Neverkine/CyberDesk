import React from "react";

interface AvatarProps {
  type: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const CharacterAvatar: React.FC<AvatarProps> = ({
  type,
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const renderSvgContent = () => {
    if (!type || type === "guest") {
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="32" cy="32" r="32" fill="#F1F5F9" />
          <path d="M16 54C16 44 23 39 32 39C41 39 48 44 48 54V64H16V54Z" fill="#94A3B8" />
          <circle cx="32" cy="24" r="10" fill="#94A3B8" />
          <circle cx="32" cy="24" r="8" fill="#CBD5E1" />
          <path d="M18 54C18 45.5 24.5 41 32 41C39.5 41 46 45.5 46 54" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    }

    if (type === "mascot" || type === "hacker") {
      return (
        <img
          src="/mascot-hacker.png"
          alt="Маскот CyberDesk"
          className="w-full h-full object-cover rounded-2xl bg-slate-900/5 p-0.5"
        />
      );
    }

    if (type === "strict" || type === "officer") {
      return (
        <img
          src="/mentor-strict.jpg"
          alt="Строгий куратор"
          className="w-full h-full object-cover rounded-2xl shadow-xs"
        />
      );
    }

    if (type === "gentle" || type === "family") {
      return (
        <img
          src="/mentor-gentle.jpg"
          alt="Мягкий наставник"
          className="w-full h-full object-cover rounded-2xl shadow-xs"
        />
      );
    }

    if (type === "tutor" || type === "academic") {
      return (
        <img
          src="/mentor-tutor.jpg"
          alt="Обучающий тренер"
          className="w-full h-full object-cover rounded-2xl shadow-xs"
        />
      );
    }

    if (
      type.startsWith("data:image/") ||
      type.startsWith("http://") ||
      type.startsWith("https://") ||
      type.startsWith("/") ||
      type.startsWith("blob:")
    ) {
      return (
        <img
          src={type}
          alt="Аватар пользователя"
          className="w-full h-full object-cover rounded-2xl"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      );
    }

    switch (type) {
      case "strict":
      case "officer":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#F1F5F9" />
            {/* Officer Uniform Base */}
            <path d="M12 60C12 47 21 42 32 42C43 42 52 47 52 60V64H12V60Z" fill="#0F172A" />
            <path d="M28 42L32 50L36 42" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            {/* Security Badge on chest */}
            <path d="M24 50L26 48H28L26 53L24 50Z" fill="#10B981" />
            {/* Neck & Face */}
            <rect x="28" y="34" width="8" height="9" fill="#FCE8DB" />
            <path d="M22 25C22 18 26.5 15 32 15C37.5 15 42 18 42 25C42 32 37.5 36 32 36C26.5 36 22 32 22 25Z" fill="#FCE8DB" />
            {/* Dark Cap with emerald visor */}
            <path d="M18 19C18 12 24 9 32 9C40 9 46 12 46 19H18Z" fill="#1E293B" />
            <rect x="16" y="18" width="32" height="4" rx="2" fill="#0F172A" />
            <circle cx="32" cy="14" r="2.5" fill="#10B981" />
            {/* Vigilant eyes & focused brow */}
            <path d="M24 23L28 24M40 23L36 24" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="26" cy="27" r="1.5" fill="#0F172A" />
            <circle cx="38" cy="27" r="1.5" fill="#0F172A" />
            <line x1="29" y1="32" x2="35" y2="32" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case "gentle":
      case "family":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#ECFDF5" />
            {/* Cozy Emerald & Cream Sweater */}
            <path d="M12 60C12 47 21 42 32 42C43 42 52 47 52 60V64H12V60Z" fill="#10B981" />
            <path d="M26 42C26 47 38 47 38 42" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="#ECFDF5" />
            {/* Face */}
            <rect x="28" y="34" width="8" height="9" fill="#FCE8DB" />
            <path d="M22 25C22 18 26.5 15 32 15C37.5 15 42 18 42 25C42 32 37.5 36 32 36C26.5 36 22 32 22 25Z" fill="#FCE8DB" />
            {/* Warm soft hair */}
            <path d="M20 20C20 12 25 10 32 10C39 10 44 12 44 20C41 14 37 13 32 13C27 13 23 14 20 20Z" fill="#4B382A" />
            {/* Kind smile & soft eyes */}
            <circle cx="27" cy="26" r="1.5" fill="#2D3748" />
            <circle cx="37" cy="26" r="1.5" fill="#2D3748" />
            <path d="M28 30C30 32.5 34 32.5 36 30" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="24" cy="28" r="2" fill="#F4A261" opacity="0.4" />
            <circle cx="40" cy="28" r="2" fill="#F4A261" opacity="0.4" />
          </svg>
        );

      case "tutor":
      case "academic":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EEF2FF" />
            {/* Tech Jacket Base */}
            <path d="M12 60C12 47 21 42 32 42C43 42 52 47 52 60V64H12V60Z" fill="#3B82F6" />
            <path d="M28 42L32 49L36 42" stroke="#FFFFFF" strokeWidth="2" fill="#1D4ED8" />
            {/* Face */}
            <rect x="28" y="34" width="8" height="9" fill="#FCE8DB" />
            <path d="M22 25C22 18 26.5 15 32 15C37.5 15 42 18 42 25C42 32 37.5 36 32 36C26.5 36 22 32 22 25Z" fill="#FCE8DB" />
            {/* Neat hair */}
            <path d="M21 19C21 12 26 10 32 10C38 10 43 12 43 19C40 14 36 13 32 13C28 13 24 14 21 19Z" fill="#1E293B" />
            {/* Smart Holographic / Reading Glasses */}
            <circle cx="27" cy="25" r="4.5" stroke="#1D4ED8" strokeWidth="1.8" fill="#FFF" fillOpacity="0.4" />
            <circle cx="37" cy="25" r="4.5" stroke="#1D4ED8" strokeWidth="1.8" fill="#FFF" fillOpacity="0.4" />
            <line x1="31.5" y1="25" x2="32.5" y2="25" stroke="#1D4ED8" strokeWidth="1.8" />
            <circle cx="27" cy="25" r="1.3" fill="#0F172A" />
            <circle cx="37" cy="25" r="1.3" fill="#0F172A" />
            <path d="M29 31C30.5 32 33.5 32 35 31" stroke="#1D4ED8" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        );

      case "tony":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background base */}
            <circle cx="32" cy="32" r="32" fill="#FEF5ED" />
            {/* Suit & Collar */}
            <path d="M12 58C12 46 22 42 32 42C42 42 52 46 52 58V64H12V58Z" fill="#1E293B" />
            <path d="M26 42L32 50L38 42H26Z" fill="#DC8B4B" />
            {/* Arc Reactor */}
            <circle cx="32" cy="53" r="4.5" fill="#38BDF8" />
            <circle cx="32" cy="53" r="2.5" fill="#FFFFFF" />
            {/* Neck & Face */}
            <rect x="28" y="34" width="8" height="10" rx="3" fill="#F4A261" opacity="0.8" />
            <path d="M20 25C20 18.5 25.5 15 32 15C38.5 15 44 18.5 44 25C44 32 38 37 32 37C26 37 20 32 20 25Z" fill="#F4A261" />
            {/* Hair */}
            <path d="M18 22C17 14 23 10 32 10C41 10 47 14 46 22C44 14 40 12 32 12C24 12 20 14 18 22Z" fill="#0F172A" />
            <path d="M22 13L26 8L31 11L37 7L41 12" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Goatee Beard */}
            <path d="M30 33H34V35C34 36.5 33 37 32 37C31 37 30 36.5 30 35V33Z" fill="#0F172A" />
            <path d="M29 30C30 29.5 34 29.5 35 30" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
            {/* Tech Sunglasses */}
            <rect x="21" y="21" width="10" height="6" rx="2" fill="#E07A5F" />
            <rect x="33" y="21" width="10" height="6" rx="2" fill="#E07A5F" />
            <line x1="31" y1="23" x2="33" y2="23" stroke="#DC8B4B" strokeWidth="2" />
            <line x1="23" y1="23" x2="27" y2="23" stroke="#FFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          </svg>
        );

      case "senku":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EBF6F0" />
            {/* Spiky hair background tips */}
            <path d="M24 14L20 4L28 10L32 2L36 10L44 4L40 14" fill="#52B788" />
            <path d="M27 15L32 6L37 15" fill="#A7F3D0" />
            {/* Lab coat */}
            <path d="M14 60C14 48 22 43 32 43C42 43 50 48 50 60V64H14V60Z" fill="#FFFFFF" stroke="#EAECEF" strokeWidth="1.5" />
            <path d="M28 43L32 52L36 43" stroke="#52B788" strokeWidth="2" fill="#EBF6F0" />
            {/* Face */}
            <path d="M21 26C21 19 26 15 32 15C38 15 43 19 43 26C43 33 38 37 32 37C26 37 21 33 21 26Z" fill="#FCE8DB" />
            {/* Hair front strands */}
            <path d="M20 22C20 16 25 12 32 12C39 12 44 16 44 22C42 16 38 14 32 14C26 14 22 16 20 22Z" fill="#FFFFFF" />
            <path d="M26 13L24 7M38 13L40 7" stroke="#52B788" strokeWidth="2" strokeLinecap="round" />
            {/* Eyes & Smirk */}
            <path d="M25 25L28 26M39 25L36 26" stroke="#40986E" strokeWidth="2" strokeLinecap="round" />
            <circle cx="27" cy="27" r="1.5" fill="#40986E" />
            <circle cx="37" cy="27" r="1.5" fill="#40986E" />
            <path d="M30 32C31.5 33.2 34 32.8 35 32" stroke="#40986E" strokeWidth="1.4" strokeLinecap="round" />
            {/* Flask emblem */}
            <circle cx="32" cy="55" r="3" fill="#52B788" />
            <rect x="31" y="49" width="2" height="4" fill="#52B788" />
          </svg>
        );

      case "elliot":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EEF0FB" />
            {/* Dark Hacker Hoodie base */}
            <path d="M12 60C12 47 20 41 32 41C44 41 52 47 52 60V64H12V60Z" fill="#1E293B" />
            {/* Hood over head */}
            <path d="M16 32C16 17 22 10 32 10C42 10 48 17 48 32C48 40 43 44 32 44C21 44 16 40 16 32Z" fill="#0F172A" />
            {/* Face in shadow */}
            <ellipse cx="32" cy="29" rx="10" ry="11" fill="#E2E8F0" />
            <path d="M22 25C22 19 26 16 32 16C38 16 42 19 42 25C38 21 26 21 22 25Z" fill="#334155" />
            {/* Piercing Eyes */}
            <ellipse cx="28" cy="28" rx="2.5" ry="3" fill="#0F172A" />
            <ellipse cx="36" cy="28" rx="2.5" ry="3" fill="#0F172A" />
            <circle cx="28.5" cy="27.5" r="1" fill="#38BDF8" />
            <circle cx="36.5" cy="27.5" r="1" fill="#38BDF8" />
            <path d="M30 35C31 35.5 33 35.5 34 35" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
            {/* Terminal prompt symbol on chest */}
            <text x="32" y="55" textAnchor="middle" fill="#7E8CE0" fontSize="9" fontWeight="bold" fontFamily="monospace">&gt;_</text>
          </svg>
        );

      case "cyber":
      case "robot":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EBF6F0" />
            {/* Antenna */}
            <line x1="32" y1="14" x2="32" y2="7" stroke="#40986E" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="32" cy="6" r="3" fill="#52B788" />
            {/* Bot Body */}
            <rect x="18" y="45" width="28" height="19" rx="8" fill="#FFFFFF" stroke="#EAECEF" strokeWidth="1.5" />
            <circle cx="32" cy="54" r="3.5" fill="#52B788" opacity="0.8" />
            {/* Bot Head */}
            <rect x="15" y="14" width="34" height="28" rx="14" fill="#FFFFFF" stroke="#D1FAE5" strokeWidth="2" />
            {/* Screen Visor */}
            <rect x="19" y="18" width="26" height="18" rx="8" fill="#1E293B" />
            {/* Glowing friendly eyes */}
            <path d="M23 27C24.5 24 27.5 24 29 27" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M35 27C36.5 24 39.5 24 41 27" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" />
            {/* Ear nodes */}
            <rect x="12" y="24" width="3" height="8" rx="1.5" fill="#52B788" />
            <rect x="49" y="24" width="3" height="8" rx="1.5" fill="#52B788" />
          </svg>
        );

      case "student":
      case "artem":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EBF6F0" />
            {/* Sage hoodie */}
            <path d="M12 60C12 47 21 42 32 42C43 42 52 47 52 60V64H12V60Z" fill="#52B788" />
            <path d="M28 42L32 48L36 42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            {/* Neck & Face */}
            <rect x="28" y="34" width="8" height="8" fill="#FCE8DB" />
            <path d="M22 25C22 18 26.5 15 32 15C37.5 15 42 18 42 25C42 32 37.5 36 32 36C26.5 36 22 32 22 25Z" fill="#FCE8DB" />
            {/* Undercut hair */}
            <path d="M20 20C20 12 26 10 32 10C38 10 44 12 44 20C40 14 36 13 32 13C28 13 24 14 20 20Z" fill="#4B382A" />
            <path d="M24 16L32 12L40 16" stroke="#4B382A" strokeWidth="3" strokeLinecap="round" />
            {/* Headphones */}
            <path d="M18 22C18 12 24 7 32 7C40 7 46 12 46 22" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <rect x="16" y="21" width="5" height="10" rx="2.5" fill="#7E8CE0" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="43" y="21" width="5" height="10" rx="2.5" fill="#7E8CE0" stroke="#1E293B" strokeWidth="1.5" />
            {/* Face details */}
            <circle cx="28" cy="26" r="1.5" fill="#2D3748" />
            <circle cx="36" cy="26" r="1.5" fill="#2D3748" />
            <path d="M29 31C30.5 32.5 33.5 32.5 35 31" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case "senior":
      case "valentina":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#FEF5ED" />
            {/* Cozy honey sweater */}
            <path d="M12 60C12 47 21 42 32 42C43 42 52 47 52 60V64H12V60Z" fill="#F4A261" />
            <path d="M26 42C26 46 38 46 38 42" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" />
            {/* Hair Bun */}
            <circle cx="32" cy="11" r="7" fill="#CBD5E1" />
            <path d="M30 6L34 6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            {/* Face */}
            <path d="M22 26C22 19 26.5 15 32 15C37.5 15 42 19 42 26C42 33 37.5 37 32 37C26.5 37 22 33 22 26Z" fill="#FCE8DB" />
            {/* Silver wavy bangs */}
            <path d="M21 21C24 16 28 14 32 14C36 14 40 16 43 21C40 17 36 16 32 16C28 16 24 17 21 21Z" fill="#E2E8F0" />
            {/* Round reading glasses */}
            <circle cx="27" cy="25" r="4.5" stroke="#C9654B" strokeWidth="1.8" fill="#FFF" fillOpacity="0.3" />
            <circle cx="37" cy="25" r="4.5" stroke="#C9654B" strokeWidth="1.8" fill="#FFF" fillOpacity="0.3" />
            <line x1="31.5" y1="25" x2="32.5" y2="25" stroke="#C9654B" strokeWidth="1.8" />
            {/* Friendly eyes & warm smile */}
            <circle cx="27" cy="25" r="1.3" fill="#2D3748" />
            <circle cx="37" cy="25" r="1.3" fill="#2D3748" />
            <path d="M29 32C30.5 33.5 33.5 33.5 35 32" stroke="#C9654B" strokeWidth="1.5" strokeLinecap="round" />
            {/* Gentle cheek blush */}
            <circle cx="24" cy="29" r="2" fill="#F4A261" opacity="0.4" />
            <circle cx="40" cy="29" r="2" fill="#F4A261" opacity="0.4" />
          </svg>
        );

      case "fox":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#FEF5ED" />
            {/* Fox Ears */}
            <path d="M14 26L18 8L30 18L14 26Z" fill="#E07A5F" />
            <path d="M18 22L20 12L27 17L18 22Z" fill="#FFF" />
            <path d="M50 26L46 8L34 18L50 26Z" fill="#E07A5F" />
            <path d="M46 22L44 12L37 17L46 22Z" fill="#FFF" />
            {/* Head */}
            <polygon points="16,24 48,24 32,46" fill="#E07A5F" />
            {/* White Cheeks */}
            <polygon points="16,24 24,36 32,46 24,24" fill="#FFFFFF" />
            <polygon points="48,24 40,36 32,46 40,24" fill="#FFFFFF" />
            {/* Cyber Visor on left eye */}
            <circle cx="25" cy="28" r="5" fill="#38BDF8" fillOpacity="0.4" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="25" cy="28" r="1.5" fill="#0284C7" />
            {/* Right eye */}
            <circle cx="39" cy="28" r="2" fill="#1E293B" />
            {/* Nose */}
            <polygon points="30,44 34,44 32,47" fill="#0F172A" />
          </svg>
        );

      case "owl":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EEF0FB" />
            {/* Ear Tufts */}
            <polygon points="18,22 14,10 26,16" fill="#7E8CE0" />
            <polygon points="46,22 50,10 38,16" fill="#7E8CE0" />
            {/* Body / Head */}
            <circle cx="32" cy="34" r="18" fill="#7E8CE0" />
            <ellipse cx="32" cy="38" rx="11" ry="12" fill="#EEF0FB" />
            {/* Academic Glasses */}
            <circle cx="26" cy="30" r="7" stroke="#1E293B" strokeWidth="2" fill="#FFF" />
            <circle cx="38" cy="30" r="7" stroke="#1E293B" strokeWidth="2" fill="#FFF" />
            <line x1="33" y1="30" x2="31" y2="30" stroke="#1E293B" strokeWidth="2" />
            <circle cx="26" cy="30" r="3" fill="#F4A261" />
            <circle cx="38" cy="30" r="3" fill="#F4A261" />
            <circle cx="27" cy="29" r="1" fill="#FFF" />
            <circle cx="39" cy="29" r="1" fill="#FFF" />
            {/* Beak */}
            <polygon points="30,35 34,35 32,40" fill="#E07A5F" />
          </svg>
        );

      case "shield":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EBF6F0" />
            {/* Heraldic Cyber Shield */}
            <path
              d="M32 10L46 16V31C46 41 39 49 32 54C25 49 18 41 18 31V16L32 10Z"
              fill="#52B788"
              stroke="#40986E"
              strokeWidth="2"
            />
            <path
              d="M32 15L42 20V31C42 39 37 45 32 49C27 45 22 39 22 31V20L32 15Z"
              fill="#40986E"
            />
            {/* Core glow */}
            <circle cx="32" cy="30" r="6" fill="#A7F3D0" />
            <path d="M29 30L31.5 33L35.5 27" stroke="#065F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case "lion":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#FEF5ED" />
            {/* Mane */}
            <circle cx="32" cy="32" r="19" fill="#DC8B4B" />
            <polygon points="32,10 36,15 28,15" fill="#C9654B" />
            <polygon points="48,22 43,26 44,20" fill="#C9654B" />
            <polygon points="16,22 21,26 20,20" fill="#C9654B" />
            {/* Face */}
            <circle cx="32" cy="33" r="12" fill="#F4A261" />
            <circle cx="28" cy="31" r="1.8" fill="#1E293B" />
            <circle cx="36" cy="31" r="1.8" fill="#1E293B" />
            <polygon points="30,36 34,36 32,38" fill="#9A3412" />
            <path d="M30 40C31 41 33 41 34 40" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" />
            {/* Cyber Crown/Visor */}
            <rect x="25" y="22" width="14" height="4" rx="2" fill="#52B788" />
          </svg>
        );

      case "panda":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EBF6F0" />
            {/* Black Ears */}
            <circle cx="20" cy="18" r="6" fill="#1E293B" />
            <circle cx="44" cy="18" r="6" fill="#1E293B" />
            {/* White Head */}
            <circle cx="32" cy="33" r="16" fill="#FFFFFF" stroke="#EAECEF" strokeWidth="1.5" />
            {/* Eye Patches */}
            <ellipse cx="25" cy="31" rx="4.5" ry="5.5" fill="#1E293B" transform="rotate(-15 25 31)" />
            <ellipse cx="39" cy="31" rx="4.5" ry="5.5" fill="#1E293B" transform="rotate(15 39 31)" />
            <circle cx="26" cy="31" r="1.5" fill="#FFFFFF" />
            <circle cx="38" cy="31" r="1.5" fill="#FFFFFF" />
            {/* Nose & Smile */}
            <ellipse cx="32" cy="38" rx="2.5" ry="1.8" fill="#1E293B" />
            <path d="M30 41C31 42 33 42 34 41" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case "racoon":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#EEF0FB" />
            {/* Ears */}
            <polygon points="18,22 16,10 26,16" fill="#475569" />
            <polygon points="46,22 48,10 38,16" fill="#475569" />
            {/* Head */}
            <circle cx="32" cy="33" r="15" fill="#94A3B8" />
            {/* Mask */}
            <path d="M18 31C22 28 42 28 46 31C44 37 38 37 32 35C26 37 20 37 18 31Z" fill="#1E293B" />
            <circle cx="25" cy="32" r="1.8" fill="#38BDF8" />
            <circle cx="39" cy="32" r="1.8" fill="#38BDF8" />
            {/* Snout */}
            <polygon points="29,37 35,37 32,41" fill="#FFFFFF" />
            <circle cx="32" cy="39" r="1.5" fill="#0F172A" />
            {/* Detective cap brim */}
            <path d="M22 22C22 17 42 17 42 22Z" fill="#C2410C" />
            <rect x="20" y="21" width="24" height="3" rx="1.5" fill="#9A3412" />
          </svg>
        );

      case "custom":
      default:
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="#F8F9FA" />
            <circle cx="32" cy="32" r="18" fill="#EEF0FB" stroke="#7E8CE0" strokeWidth="2" strokeDasharray="3 3" />
            {/* Sparkles / Magic Star */}
            <path
              d="M32 18L35 27L44 30L35 33L32 42L29 33L20 30L29 27L32 18Z"
              fill="#7E8CE0"
            />
            <circle cx="22" cy="20" r="2" fill="#52B788" />
            <circle cx="42" cy="42" r="2.5" fill="#F4A261" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center select-none overflow-hidden rounded-2xl shadow-sm transition-transform hover:scale-105 active:scale-95 ${sizeMap[size]} ${className}`}
    >
      {renderSvgContent()}
    </div>
  );
};
