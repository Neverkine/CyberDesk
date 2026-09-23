export interface RoleplayChoice {
  id: string;
  text: string;
  icon?: "link" | "block" | "card" | "check" | "message";
  isDangerous?: boolean;
  consequence?: {
    title: string;
    alertText: string;
    notificationTitle: string;
    notificationBody: string;
    explanation: string;
    rule: string;
  };
  nextStepId?: string;
  isVictory?: boolean;
  victoryText?: string;
}

export interface RoleplayStep {
  id: string;
  attackerMessage: string;
  attackerAttachment?: {
    type: "link" | "image" | "file";
    text: string;
    title?: string;
    domain?: string;
    subtitle?: string;
  };
  mentorTips: Record<string, string>;
  choices: RoleplayChoice[];
}

export type ScenarioCategory =
  | "fintech"
  | "egov"
  | "social"
  | "phone"
  | "malware"
  | "hygiene";

export interface RoleplayScenario {
  id: string;
  nodeId?: string;
  category: ScenarioCategory;
  title: string;
  tagline: string;
  difficulty: "Легкий" | "Средний" | "Сложный";
  attackerName: string;
  attackerSubtitle: string;
  attackerAvatar: string;
  platform: "Telegram" | "WhatsApp" | "Discord" | "SMS" | "Email" | "Web";
  initialStepId: string;
  steps: Record<string, RoleplayStep>;
  rewardXp: number;
  rewardGems: number;
}
