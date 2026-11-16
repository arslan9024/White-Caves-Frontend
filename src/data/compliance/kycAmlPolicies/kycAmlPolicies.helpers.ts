// @ts-nocheck
import { kycRules } from './kycAmlPolicies.rules';
import { kycOperations } from './kycAmlPolicies.operations';

export const KYC_AML_POLICIES = {
  ...kycRules,
  ...kycOperations,
};

export const getTransactionValueCategory = (amountAED) => {
  if (amountAED < 50000) return 'below_50k';
  if (amountAED < 500000) return '50k_to_500k';
  if (amountAED < 2000000) return '500k_to_2m';
  if (amountAED < 10000000) return '2m_to_10m';
  return 'above_10m';
};

export const calculateRiskScore = (factors) => {
  const matrix = KYC_AML_POLICIES.riskScoringMatrix;
  let score = 0;
  
  if (factors.customerType && matrix.customerType[factors.customerType]) {
    score += matrix.customerType[factors.customerType];
  }
  if (factors.nationality && matrix.nationality[factors.nationality]) {
    score += matrix.nationality[factors.nationality];
  }
  if (factors.transactionValue) {
    const category = getTransactionValueCategory(factors.transactionValue);
    score += matrix.transactionValue[category] || 0;
  }
  if (factors.transactionType && matrix.transactionType[factors.transactionType]) {
    score += matrix.transactionType[factors.transactionType];
  }
  if (factors.sourceOfFunds && matrix.sourceOfFunds[factors.sourceOfFunds]) {
    score += matrix.sourceOfFunds[factors.sourceOfFunds];
  }
  if (factors.occupation && matrix.occupation[factors.occupation]) {
    score += matrix.occupation[factors.occupation];
  }
  
  return Math.min(score, 100);
};

export const getRiskCategory = (score) => {
  const thresholds = KYC_AML_POLICIES.riskThresholds;
  if (score <= thresholds.low.max) return 'LOW';
  if (score <= thresholds.medium.max) return 'MEDIUM';
  if (score <= thresholds.high.max) return 'HIGH';
  return 'PROHIBITED';
};

export const getRequiredDocuments = (riskCategory, customerType = 'individual') => {
  const cdd = KYC_AML_POLICIES.customerDueDiligence;
  const docs = KYC_AML_POLICIES.documentRequirements;
  
  let requiredDocs = [...cdd.CDD.documents];
  
  if (riskCategory === 'HIGH' || riskCategory === 'PROHIBITED') {
    requiredDocs = [...cdd.EDD.documents];
  }
  
  if (customerType === 'corporate') {
    requiredDocs.push('company_documents');
  }
  
  return requiredDocs.map(docId => docs[docId]).filter(Boolean);
};

export default KYC_AML_POLICIES;

