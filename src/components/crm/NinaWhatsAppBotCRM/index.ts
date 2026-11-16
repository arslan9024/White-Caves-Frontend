/**
 * NinaWhatsAppBotCRM — Canonical Module Barrel Export
 * Standard: Mary Allen Wilkes Protocol
 *
 * Replaces the monolithic 1,336-line index.tsx with a clean,
 * typed barrel export directing to the modular layer files.
 */

export * from './NinaWhatsAppBotCRM.types';
export * from './NinaWhatsAppBotCRM.logic';
export * from './NinaWhatsAppBotCRM.workflow';
export * from './NinaWhatsAppBotCRM.fallback';
export * from './NinaWhatsAppBotCRM.styles';
export * from './NinaWhatsAppBotCRM.data';
export { NinaWhatsAppBotCRMView as NinaWhatsAppBotCRM } from './NinaWhatsAppBotCRM.view';
export { NinaWhatsAppBotCRMView as default } from './NinaWhatsAppBotCRM.view';

