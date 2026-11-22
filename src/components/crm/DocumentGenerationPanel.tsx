import React, { FC } from 'react';
import { DocumentGenerationContainer } from './documentGeneration/DocumentGenerationContainer';

export const DocumentGenerationPanel: FC = () => {
  return <DocumentGenerationContainer />;
};

export default DocumentGenerationPanel;

export * from './documentGeneration';
