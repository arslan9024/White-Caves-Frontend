export type * from './auroraSoftwareDocs/auroraSoftwareDocs.types';
export { AURORA_SOFTWARE_CATEGORIES } from './auroraSoftwareDocs/auroraSoftwareDocs.types';
import { AURORA_SOFTWARE_DOCS_CORE } from './auroraSoftwareDocs/auroraSoftwareDocs.core';
import { AURORA_SOFTWARE_DOCS_PLATFORM } from './auroraSoftwareDocs/auroraSoftwareDocs.platform';

export const AURORA_SOFTWARE_DOCS = [
  ...AURORA_SOFTWARE_DOCS_CORE,
  ...AURORA_SOFTWARE_DOCS_PLATFORM,
];

