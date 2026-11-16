// @ts-nocheck
import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';
import { auroraTechDocs } from './auroraTechDocs.data';
import { auroraPlatformDocs } from './auroraPlatformDocs.data';
import { companyDocs } from './companyDocs.data';

export const DOCUMENT_REGISTRY = {
  ...auroraTechDocs,
  ...auroraPlatformDocs,
  ...companyDocs,
};

export const getDocumentById = docId => DOCUMENT_REGISTRY[docId] || null;

export const getDocumentsBySource = source =>
  Object.values(DOCUMENT_REGISTRY).filter(doc => doc.source === source);

export const getDocumentsByCategory = category =>
  Object.values(DOCUMENT_REGISTRY).filter(doc => doc.category === category);

export const getAuroraDocuments = () => getDocumentsBySource(DOCUMENT_SOURCES.AURORA);

export const getCompanyDocuments = () => getDocumentsBySource(DOCUMENT_SOURCES.COMPANY);

export const getAllDocuments = () => Object.values(DOCUMENT_REGISTRY);

export const AURORA_DOCUMENT_INDEX = [
  { id: 'aurora_srs', title: 'Software Requirements Specification', icon: 'FileText' },
  { id: 'aurora_sad', title: 'System Architecture Document', icon: 'Network' },
  { id: 'aurora_api', title: 'API Specification', icon: 'Code' },
  { id: 'aurora_database', title: 'Database Schema', icon: 'Database' },
  { id: 'aurora_ai_catalog', title: 'AI Assistant Catalog', icon: 'Bot' },
  { id: 'aurora_roadmap', title: 'Project Roadmap', icon: 'Map' },
  { id: 'aurora_feature_registry', title: 'Feature Registry', icon: 'List' },
  { id: 'aurora_release_history', title: 'Release History', icon: 'History' },
];

export const COMPANY_DOCUMENT_INDEX = [
  { id: 'company_rera_compliance', title: 'RERA Compliance Guidelines', icon: 'Shield' },
  { id: 'company_ejari_guide', title: 'Ejari Registration Guide', icon: 'FileCheck' },
  { id: 'company_service_catalog', title: 'Service Catalog', icon: 'Briefcase' },
];

export default DOCUMENT_REGISTRY;

