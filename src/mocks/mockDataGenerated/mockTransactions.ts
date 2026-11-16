import { MockTransaction } from './mockDataGenerated.types';
import { MOCK_TRANSACTIONS_PART1 } from './mockTransactionsPart1';
import { MOCK_TRANSACTIONS_PART2 } from './mockTransactionsPart2';

export const MOCK_TRANSACTIONS: MockTransaction[] = [
  ...MOCK_TRANSACTIONS_PART1,
  ...MOCK_TRANSACTIONS_PART2,
];

