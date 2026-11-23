import { useState, useEffect } from 'react';
import type { MavenTabType, DcfCalculationResult } from './types';

export const calculateDcf = (
  initialInvestment: number,
  holdingYears: number,
  annualRentalGrowth: number,
  initialRent: number,
  exitCapRate: number
): DcfCalculationResult => {
  let totalCashFlow = 0;
  let currentRent = initialRent;
  for (let i = 1; i <= holdingYears; i++) {
    totalCashFlow += currentRent;
    currentRent *= 1 + annualRentalGrowth / 100;
  }
  const exitPrice = currentRent / (exitCapRate / 100);
  const totalReturn = totalCashFlow + exitPrice - initialInvestment;
  const irr = (((exitPrice + totalCashFlow) / initialInvestment) ** (1 / holdingYears) - 1) * 100;
  return {
    totalCashFlow: Math.round(totalCashFlow),
    exitPrice: Math.round(exitPrice),
    totalReturn: Math.round(totalReturn),
    irr: irr.toFixed(1),
  };
};

export const calculateYield = (propValue: number) => {
  const longTermRent = 165000;
  const longTermNet = longTermRent * 0.95; // 5% maintenance
  const shortTermGross = 245000;
  const shortTermNet = shortTermGross * 0.78; // 22% operator + DTCM fees

  const longTermYield = ((longTermNet / propValue) * 100).toFixed(2);
  const shortTermYield = ((shortTermNet / propValue) * 100).toFixed(2);

  return {
    longTermRent,
    longTermNet,
    shortTermGross,
    shortTermNet,
    longTermYield,
    shortTermYield,
  };
};

export const useMavenInvestment = (moduleId?: string) => {
  const [activeTab, setActiveTab] = useState<MavenTabType>('dcf');

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('dcf')) setActiveTab('dcf');
    else if (moduleId.includes('yield')) setActiveTab('yield');
    else if (moduleId.includes('rebalancer') || moduleId.includes('portfolio'))
      setActiveTab('rebalancer');
    else if (moduleId.includes('appreciation')) setActiveTab('appreciation');
  }, [moduleId]);

  // Feature 1: DCF Calculator
  const [initialInvestment, setInitialInvestment] = useState(5000000);
  const [holdingYears, setHoldingYears] = useState(5);
  const [annualRentalGrowth, setAnnualRentalGrowth] = useState(5);
  const [initialRent, setInitialRent] = useState(380000);
  const [exitCapRate, setExitCapRate] = useState(6.5);

  const dcfResults = calculateDcf(
    initialInvestment,
    holdingYears,
    annualRentalGrowth,
    initialRent,
    exitCapRate
  );

  // Feature 2: Yield Comparator
  const [propValue, setPropValue] = useState(2400000);
  const yieldResults = calculateYield(propValue);

  return {
    activeTab,
    setActiveTab,
    initialInvestment,
    setInitialInvestment,
    holdingYears,
    setHoldingYears,
    annualRentalGrowth,
    setAnnualRentalGrowth,
    initialRent,
    setInitialRent,
    exitCapRate,
    setExitCapRate,
    dcfResults,
    propValue,
    setPropValue,
    yieldResults,
  };
};
