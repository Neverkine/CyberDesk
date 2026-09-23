export * from "./roleplay-types";
import { RoleplayScenario } from "./roleplay-types";
import { FINTECH_SCENARIOS } from "./scenarios/fintech";
import { EGOV_SCENARIOS } from "./scenarios/egov";
import { SOCIAL_SCENARIOS } from "./scenarios/social";
import { PHONE_SCENARIOS } from "./scenarios/phone";
import { MALWARE_SCENARIOS } from "./scenarios/malware";
import { HYGIENE_SCENARIOS } from "./scenarios/hygiene";

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  ...FINTECH_SCENARIOS,
  ...EGOV_SCENARIOS,
  ...SOCIAL_SCENARIOS,
  ...PHONE_SCENARIOS,
  ...MALWARE_SCENARIOS,
  ...HYGIENE_SCENARIOS,
];

export const getScenarioByNodeId = (nodeId: string): RoleplayScenario => {
  const found = ROLEPLAY_SCENARIOS.find((s) => s.nodeId === nodeId || s.id === nodeId);
  return found || ROLEPLAY_SCENARIOS[0];
};

export const getScenarioById = (scenarioId: string): RoleplayScenario => {
  const found = ROLEPLAY_SCENARIOS.find((s) => s.id === scenarioId);
  return found || ROLEPLAY_SCENARIOS[0];
};

export const ORDERED_STAGE_NODE_IDS = [
  "passwords",
  "links",
  "kaspi-qr-fraud",
  "kaspi-wrong-transfer",
  "egov-tax-debt",
  "egov-social-benefit",
  "phishing-chat",
  "telegram-premium-gift",
  "phone-scams",
  "relative-accident",
  "rat-malware",
  "stealers",
];

export const STAGE_NODE_TO_SCENARIO: Record<string, string> = {
  "passwords": "passwords-scam",
  "links": "delivery-link",
  "kaspi-qr-fraud": "kaspi-qr-fraud",
  "kaspi-wrong-transfer": "kaspi-wrong-transfer",
  "egov-tax-debt": "egov-tax-debt",
  "egov-social-benefit": "egov-social-benefit",
  "phishing-chat": "telegram-vote",
  "telegram-premium-gift": "telegram-premium-gift",
  "phone-scams": "bank-security",
  "relative-accident": "relative-accident",
  "rat-malware": "rat-trojan",
  "stealers": "stealer-job",
};

export const SCENARIO_TO_STAGE_NODE: Record<string, string> = Object.fromEntries(
  Object.entries(STAGE_NODE_TO_SCENARIO).map(([k, v]) => [v, k])
);

export const getNextStageNodeId = (currentNodeId: string): string | null => {
  const idx = ORDERED_STAGE_NODE_IDS.indexOf(currentNodeId);
  if (idx !== -1 && idx < ORDERED_STAGE_NODE_IDS.length - 1) {
    return ORDERED_STAGE_NODE_IDS[idx + 1];
  }
  return null;
};

