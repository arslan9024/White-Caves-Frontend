/**
 * Company Master Ledger — Strongly-Typed Mock Data
 * Auto-generated from companyMasterLedger.json
 */

export interface ClientLoyaltyVoucher {
  voucherCode: string;
  cashbackAED: number;
  unlockedAt: string;
  expiresAt: string;
  redeemed: boolean;
  qualifyingDealNumber: string;
  description: string;
}

export interface LedgerEntry {
  id: string;
  name: string;
  role: string;
  roleTitle?: string;
  email?: string;
  level: number;
  merit_xp_count: number;
  reward_tier_split: number;
  clientLoyaltyVouchers: ClientLoyaltyVoucher[];
  assignedDepartment: string;
  departmentCode: string;
  departmentName: string;
}

