import { AIIntentClassifier } from './aiServices/AIIntentClassifier.js';
import { AILeadScorer } from './aiServices/AILeadScorer.js';
import { AISentimentAnalyzer } from './aiServices/AISentimentAnalyzer.js';
import { AILanguageDetector } from './aiServices/AILanguageDetector.js';
import { AIResponseGenerator } from './aiServices/AIResponseGenerator.js';
import { AIEntityExtractor } from './aiServices/AIEntityExtractor.js';
import { AISmartRouter } from './aiServices/AISmartRouter.js';

export const intentClassifier = new AIIntentClassifier();
export const leadScorer = new AILeadScorer();
export const sentimentAnalyzer = new AISentimentAnalyzer();
export const languageDetector = new AILanguageDetector();
export const responseGenerator = new AIResponseGenerator();
export const entityExtractor = new AIEntityExtractor();
export const smartRouter = new AISmartRouter();

export default {
  intentClassifier,
  leadScorer,
  sentimentAnalyzer,
  languageDetector,
  responseGenerator,
  entityExtractor,
  smartRouter,
  version: '2.0.0',
  type: 'open-source',
  cost: 'free'
};
