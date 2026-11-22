export interface LeadBudget {
  min?: number;
  max?: number;
}

export interface LeadInteraction {
  timestamp: string | number | Date;
  [key: string]: unknown;
}

export interface LeadInput {
  score?: number;
  budget?: LeadBudget;
  propertyType?: string[];
  preferredLocations?: string[];
  source?: string;
  interactions?: LeadInteraction[];
  savedSearches?: unknown[];
  timeline?: string;
  notes?: string;
  financingApproved?: boolean;
  financingInProgress?: boolean;
  previousTransactions?: number;
  isCorporate?: boolean;
  companyName?: string;
  idVerified?: boolean;
  uaePassVerified?: boolean;
  interestedPropertyIds?: string[];
  communityPreference?: string;
  downPaymentReady?: boolean;
  downPaymentAmount?: number;
  incomeVerified?: boolean;
  jobTitle?: string;
  employer?: string;
  [key: string]: unknown;
}

export interface ScoreFactor {
  factor: string;
  points: number;
}

export interface ScoreComponent {
  points: number;
  factors: ScoreFactor[];
  maxPoints: number;
}

export interface ScoringWeights {
  profileFit: number;
  engagementLevel: number;
  urgency: number;
  seriousness: number;
  propertySpecificity: number;
  financialCapacity: number;
}

export interface ScoringCriterionFactor {
  criterion: string;
  maxPoints: number;
}

export interface ScoringCriterionConfig {
  weight: number;
  factors: ScoringCriterionFactor[];
}

export type ScoringCriteriaMap = Record<keyof ScoringWeights, ScoringCriterionConfig>;

export interface RecommendedAction {
  action: string;
  description: string;
  priority: string;
  assignmentRecommendation: string;
  followUpTimeline: string;
}

export interface ScoreComponentsMap {
  profileFit: ScoreComponent;
  engagementLevel: ScoreComponent;
  urgency: ScoreComponent;
  seriousness: ScoreComponent;
  propertySpecificity: ScoreComponent;
  financialCapacity: ScoreComponent;
}

export interface LeadScoreResult {
  overallScore: number;
  scoreGrade: string;
  scoreRange: string;
  conversionProbability: string;
  recommendedAction: RecommendedAction;
  components: ScoreComponentsMap;
  generatedAt: Date;
  expiresAt: Date;
}

export interface EmptyLeadScoreResult {
  score: number;
  reason: string;
  breakdown: Record<string, never>;
}

export interface InteractionScoreUpdate {
  oldScore: number;
  newScore: number;
  boost: number;
  reason: string;
}

export interface RoutingContext {
  customerTier?: string;
  complexity?: string;
  urgency?: string;
  preferredLanguage?: string;
  [key: string]: unknown;
}

export interface RoutingHistoryRecord {
  taskType: string;
  assistant: string;
  success: boolean;
  processingTime: number;
  context: RoutingContext;
  timestamp: Date;
}

export type AssistantProbabilityMap = Record<string, number>;
export type RoutingProbabilitiesMap = Record<string, AssistantProbabilityMap>;

export interface AlternativeAssistant {
  assistant: string;
  confidence: string;
}

export interface OptimalAssistantSuccessResult {
  success: true;
  recommendedAssistant: string | null;
  confidence: string;
  alternativeAssistants: AlternativeAssistant[];
  estimatedSuccessRate: string;
  estimatedProcessingTime: string;
  context: RoutingContext;
}

export interface OptimalAssistantErrorResult {
  success: false;
  error: string;
  recommendation: string;
}

export type OptimalAssistantResult = OptimalAssistantSuccessResult | OptimalAssistantErrorResult;

export interface AssistantCombo {
  rank: number;
  assistants: string[];
  estimatedSuccessRate: string;
  executionTime: string;
  parallelizable: boolean;
  reasoning: string;
}

export interface TopAssistantCombosResult {
  taskType?: string;
  error?: string;
  combos: AssistantCombo[];
}

export interface RoutingOutcomeResult {
  recorded: boolean;
  learningPoints: number;
}

export interface AssistantAnalyticsBreakdown {
  routed: number;
  successful: number;
  avgTime: string;
  successRate: string;
}

export interface RoutingAnalyticsResult {
  totalRoutings: number;
  successCount: number;
  successRate: string;
  averageProcessingTime: string;
  byAssistant: Record<string, AssistantAnalyticsBreakdown>;
}

export interface EmptyRoutingAnalyticsResult {
  message: string;
}
