/**
 * Default pricing factors, base rates, and pure pricing calculation helpers.
 */

import type { BaseRateConfig, PricingBreakdownFactor, PricingFactors } from './types';

export function createDefaultPricingFactors(): PricingFactors {
  return {
    propertyRarity: {
      STANDARD: 1.0, // Base rate 100%
      PREMIUM: 1.25, // 25% premium
      ULTRA_PREMIUM: 1.5, // 50% premium
      ULTRA_RARE: 2.0, // 100% premium (ultra-rare properties command premium rate)
    },
    clientTierDiscount: {
      BASIC: 0, // No discount
      ESSENTIAL: 0.05, // 5% loyalty discount
      PREMIUM: 0.1, // 10% loyalty discount
      ULTRA_PREMIUM: 0.15, // 15% loyalty discount
      CORPORATE: 0.2, // 20% loyalty discount
    },
    transactionComplexity: {
      SIMPLE: 1.0, // Standard property, straightforward
      MODERATE: 1.15, // Off-plan, developer coordination, multiple stakeholders
      COMPLEX: 1.3, // International buyer, corporate entity, financing issues
      HIGHLY_COMPLEX: 1.5, // All of above combined
    },
    seasonalityMultiplier: {
      Q1: 0.9, // January-March: Low season, offer incentive (10% discount)
      Q2: 0.95, // April-June: Moderate season, 5% discount
      Q3: 1.15, // July-September: Peak season, 15% premium
      Q4: 1.2, // October-December: Peak holiday season, 20% premium
    },
    volumeBonus: {
      // Cumulative bonus for clients doing multiple transactions
      SINGLE: 0, // No bonus
      '2-3': 0.05, // 5% bonus for 2-3 deals in last 12 months
      '4-6': 0.1, // 10% bonus
      '7-9': 0.15, // 15% bonus
      '10+': 0.2, // 20% bonus for high-volume clients
    },
    marketCondition: {
      // Adjustment based on real-time market conditions
      BUYER_MARKET: 0.95, // Many properties, fewer buyers - offer incentive
      BALANCED: 1.0, // Normal market conditions
      SELLER_MARKET: 1.15, // Few properties, many buyers - charge premium
    },
  };
}

export function createDefaultBaseRates(): Record<string, BaseRateConfig> {
  return {
    PROPERTY_SALE: {
      baseline: 0.025, // 2.5% instead of flat 2-3%
      min: 0.015, // Minimum 1.5% even with max discounts
      max: 0.05, // Maximum 5% even with all premiums
    },
    LEASING: {
      baseline: 0.05, // 5% of annual rent
      min: 0.03, // Minimum 3%
      max: 0.08, // Maximum 8%
    },
    PROPERTY_MANAGEMENT: {
      baseline: 0.08, // 8% of monthly rent
      min: 0.05, // Minimum 5%
      max: 0.12, // Maximum 12%
    },
    CONSULTATION: {
      baseline: 5000, // AED 5,000 base fee
      min: 3000, // Minimum AED 3,000
      max: 15000, // Maximum AED 15,000
    },
    DOCUMENTATION: {
      baseline: 2000, // AED 2,000 base fee
      min: 1500, // Minimum AED 1,500
      max: 5000, // Maximum AED 5,000
    },
  };
}

export const OLD_FLAT_RATES: Record<string, number> = {
  PROPERTY_SALE: 0.025, // 2.5% (between 2-3%)
  LEASING: 0.05, // 5%
  PROPERTY_MANAGEMENT: 0.08, // 8%
  CONSULTATION: 5000,
  DOCUMENTATION: 2000,
};

/**
 * Estimate property rarity based on value.
 */
export function estimateRarity(propertyValue: number): string {
  if (propertyValue >= 50000000) return 'ULTRA_RARE'; // AED 50M+
  if (propertyValue >= 10000000) return 'ULTRA_PREMIUM'; // AED 10M+
  if (propertyValue >= 2000000) return 'PREMIUM'; // AED 2M+
  return 'STANDARD';
}

/**
 * Get current quarter for seasonality.
 */
export function getCurrentQuarter(): string {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'Q1'; // Jan-Mar
  if (month >= 3 && month <= 5) return 'Q2'; // Apr-Jun
  if (month >= 6 && month <= 8) return 'Q3'; // Jul-Sep
  return 'Q4'; // Oct-Dec
}

/**
 * Determine volume bracket.
 */
export function getVolumeBracket(transactionCount: number): string {
  if (transactionCount === 1) return 'SINGLE';
  if (transactionCount <= 3) return '2-3';
  if (transactionCount <= 6) return '4-6';
  if (transactionCount <= 9) return '7-9';
  return '10+';
}

/**
 * Get old hardcoded flat rate for comparison.
 */
export function getOldFlatRate(serviceType: string): number {
  return OLD_FLAT_RATES[serviceType] || 0.025;
}

/**
 * Generate human-readable reason for price adjustment.
 */
export function generatePriceReason(breakdownFactors: PricingBreakdownFactor[]): string {
  const reasons = breakdownFactors
    .filter(f => Math.abs(f.impact) > 1) // Only significant factors
    .map(f => {
      if (f.impact > 0) {
        return `${f.factor} (+${f.impact.toFixed(0)}%)`;
      } else {
        return `${f.factor} (${f.impact.toFixed(0)}%)`;
      }
    });

  if (reasons.length === 0) {
    return 'Standard market rate applied';
  }

  return reasons.join(', ');
}
