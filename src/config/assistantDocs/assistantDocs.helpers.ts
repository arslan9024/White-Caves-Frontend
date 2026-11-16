// @ts-nocheck
import { ASSISTANT_METADATA } from './assistantMetadata.data';
import { ASSISTANT_DOCS } from './assistantDocs.data';

export const getAssistantDocs = (assistantId) => {
  const docs = ASSISTANT_DOCS[assistantId];
  const metadata = ASSISTANT_METADATA[assistantId];
  if (!docs) return null;
  return {
    ...docs,
    name: metadata?.name || assistantId.charAt(0).toUpperCase() + assistantId.slice(1),
    color: metadata?.color || '#8B5CF6'
  };
};

export const getAllAssistantDocs = () => {
  return Object.entries(ASSISTANT_DOCS).map(([id, docs]) => ({
    id,
    ...docs
  }));
};


