import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const FlameIcon: React.FC<IconProps> = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C10.5 4.5 10.5 7 12 9C13.5 7 15 5.5 15 3.5C18 6.5 19.5 10.5 19 14.5C18.5 18.5 15.5 21.5 12 21.5C8.5 21.5 5.5 18.5 5 14.5C4.5 10.5 6.5 6.5 9.5 4C9 6 9.5 8 11 9C11 7 11 4.5 12 2Z"
      fill="currentColor"
    />
    <path
      d="M12 11C10.8 12.5 10.8 14 12 15C13 14 13.8 13.2 13.8 12C15 13.5 15.5 15.5 15 17.5C14.5 19.5 13.2 20.5 12 20.5C10.8 20.5 9.5 19.5 9 17.5C8.6 15.5 9.5 13.5 11 12C10.8 13 11 14 11.5 14.5C11.5 13.5 11.5 12 12 11Z"
      fill="#FFE8D6"
    />
  </svg>
);

export const ZapIcon: React.FC<IconProps> = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GemIcon: React.FC<IconProps> = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 3H18L22 9L12 22L2 9L6 3Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M2 9H22M12 22L7.5 9L10 3M12 22L16.5 9L14 3"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
  </svg>
);

export const PasswordKeyIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="12" cy="14" r="3" fill="currentColor" opacity="0.4" />
    <path
      d="M17.5 18.5L26 27M22 23L24 25M25 20L27 22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="20" y="5" width="8" height="9" rx="2" fill="#52B788" />
    <path d="M22 5V4C22 2.89543 22.8954 2 24 2V2C25.1046 2 26 2.89543 26 4V5" stroke="#52B788" strokeWidth="1.5" />
    <circle cx="24" cy="9.5" r="1.2" fill="white" />
  </svg>
);

export const SecureLinkIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.5 18.5C11.5 20.5 8.5 20.5 6.5 18.5C4.5 16.5 4.5 13.5 6.5 11.5L9.5 8.5C11.5 6.5 14.5 6.5 16.5 8.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M18.5 13.5C20.5 11.5 23.5 11.5 25.5 13.5C27.5 15.5 27.5 18.5 25.5 20.5L22.5 23.5C20.5 25.5 17.5 25.5 15.5 23.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line x1="11" y1="21" x2="21" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="3.5" fill="#52B788" />
    <path d="M14.5 16L15.5 17L17.5 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PhishingHookIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 4V13C19 17.4183 15.4183 21 11 21C8.2 21 6 18.8 6 16C6 14 7.5 12.5 9.5 12.5C11 12.5 12 13.5 12 15L8 16"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="15" y="16" width="13" height="9" rx="2" fill="#E07A5F" />
    <path d="M15 18L21.5 22L28 18" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="21.5" cy="12" r="2" fill="#E07A5F" />
  </svg>
);

export const ScamPhoneIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="8" y="4" width="14" height="24" rx="3" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="15" cy="24" r="1.2" fill="currentColor" />
    <line x1="12" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="22" cy="10" r="4.5" fill="#E07A5F" />
    <text x="22" y="13.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">!</text>
  </svg>
);

export const MalwareRatIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="16" cy="17" r="7.5" fill="currentColor" opacity="0.85" />
    <circle cx="13.5" cy="15.5" r="1.5" fill="#FFFFFF" />
    <circle cx="18.5" cy="15.5" r="1.5" fill="#FFFFFF" />
    <path d="M12 9L9 6M20 9L23 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 15H10M22 15H26M7 21L10 19M25 21L22 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="17" r="2.5" fill="#7E8CE0" />
  </svg>
);

export const DataStealerIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="5" y="7" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
    <line x1="16" y1="12" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="18" x2="16" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 25L6 28M24 25L26 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SnowflakeFreezeIcon: React.FC<IconProps> = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="16" y1="3" x2="16" y2="29" stroke="#7E8CE0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="3" y1="16" x2="29" y2="16" stroke="#7E8CE0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="6.8" y1="6.8" x2="25.2" y2="25.2" stroke="#7E8CE0" strokeWidth="2" strokeLinecap="round" />
    <line x1="6.8" y1="25.2" x2="25.2" y2="6.8" stroke="#7E8CE0" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="3.5" fill="#EEF0FB" stroke="#7E8CE0" strokeWidth="1.5" />
    <path d="M13 7L16 9L19 7M13 25L16 23L19 25M7 13L9 16L7 19M25 13L23 16L25 19" stroke="#7E8CE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const XpSurgeIcon: React.FC<IconProps> = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="2" y="2" width="28" height="28" rx="8" fill="#FDF1EE" stroke="#E07A5F" strokeWidth="1.5" />
    <path
      d="M17 5L9 16H16L14 25L23 13H16L18 5H17Z"
      fill="#E07A5F"
      stroke="#C9654B"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <text x="7" y="14" fill="#C9654B" fontSize="8" fontWeight="900" fontFamily="sans-serif">2X</text>
  </svg>
);
