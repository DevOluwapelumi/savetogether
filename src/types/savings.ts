export interface SavingsTier {
  id: number;
  name: string;
  amount: number;
  interestRate: number; // percentage per week
}

export interface Member {
  id: string;
  name: string;
  tier: SavingsTier;
  joinedWeek: number;
  totalContribution: number;
  accumulatedInterest: number;
}

export const SAVINGS_TIERS: SavingsTier[] = [
  { id: 1, name: "Tier 1", amount: 10000, interestRate: 5 },
  { id: 2, name: "Tier 2", amount: 20000, interestRate: 7 },
  { id: 3, name: "Tier 3", amount: 30000, interestRate: 10 },
];
