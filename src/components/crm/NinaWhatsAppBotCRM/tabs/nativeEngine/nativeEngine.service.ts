import { SimulationResult } from './nativeEngine.types';

export function evaluateNinaEngineSimulation(input: string): SimulationResult {
  const queryLower = input.toLowerCase();

  if (
    queryLower.includes('vardon') ||
    queryLower.includes('albizia') ||
    queryLower.includes('pacifica') ||
    queryLower.includes('villa') ||
    queryLower.includes('damac hills')
  ) {
    return {
      intent: 'DAMAC Hills 2 Villa Matcher',
      matchedCount: 48,
      score: 95,
      reply: `Greeting! Nina AI here for White Caves. Found 48 verified villa mandates in DAMAC Hills 2 (Clusters: VARDON, ALBIZIA, PACIFICA). Starting from AED 1.35M (Sale) or AED 85,000/yr (Rent). Direct contact: Arslan Malik (+971 50 576 0056).`,
    };
  }

  if (
    queryLower.includes('ejari') ||
    queryLower.includes('rent') ||
    queryLower.includes('lease')
  ) {
    return {
      intent: 'Ejari & Tenancy Support',
      matchedCount: 12,
      score: 88,
      reply: `Hello! Nina AI & Victoria AI handle instant Ejari contract generation, Sharjah Law No. 5 fee audits, and 4-PDC cheque schedules for White Caves leasing portfolios.`,
    };
  }

  if (
    queryLower.includes('dld') ||
    queryLower.includes('title deed') ||
    queryLower.includes('verify')
  ) {
    return {
      intent: 'DLD Title Deed Audit',
      matchedCount: 100,
      score: 98,
      reply: `All White Caves property mandates are 100% verified against official Dubai Land Department (DLD) REST title deeds. Zero unverified listings permitted.`,
    };
  }

  return {
    intent: 'General Inquiry',
    matchedCount: 0,
    score: 50,
    reply: `Thank you for contacting White Caves Real Estate LLC (+971 50 576 0056). Nina AI is assigning your inquiry to Managing Director Arslan Malik.`,
  };
}
