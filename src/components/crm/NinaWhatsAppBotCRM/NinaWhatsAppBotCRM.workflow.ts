/**
 * NinaWhatsAppBotCRM — Deterministic RUP Workflow Engine
 * Standard: Mary Allen Wilkes Protocol (.workflow.ts)
 * Single Purpose File Law: < 350 lines
 */

import type { RUPStage, GatewayStatus } from './NinaWhatsAppBotCRM.types';

export interface NinaWorkflowContext {
  currentStage: RUPStage;
  isConnected: boolean;
  gatewayStatus: GatewayStatus;
}

export type NinaWorkflowAction =
  | { type: 'ADVANCE_STAGE'; targetStage: RUPStage }
  | { type: 'GATEWAY_CONNECTED' }
  | { type: 'GATEWAY_DISCONNECTED'; reason?: string }
  | { type: 'RESET_FLOW' };

export interface NinaWorkflowTransitionResult {
  nextStage: RUPStage;
  nextStatus: GatewayStatus;
  allowed: boolean;
  message?: string;
}

/**
 * Pure state machine enforcing RUP 3-Stage gated progression:
 * - Stage 1 (Inception): Device Authentication
 * - Stage 2 (Elaboration): Feature Selection (requires hardware link)
 * - Stage 3 (Construction): Live Dispatcher & Conversations
 */
export function transitionNinaWorkflow(
  ctx: NinaWorkflowContext,
  action: NinaWorkflowAction
): NinaWorkflowTransitionResult {
  switch (action.type) {
    case 'ADVANCE_STAGE': {
      // Stage 2 and 3 strictly require hardware connection
      if (action.targetStage > 1 && !ctx.isConnected) {
        return {
          nextStage: ctx.currentStage,
          nextStatus: ctx.gatewayStatus,
          allowed: false,
          message: 'Cannot advance past Inception without an active WhatsApp hardware link.',
        };
      }
      return {
        nextStage: action.targetStage,
        nextStatus: ctx.gatewayStatus,
        allowed: true,
      };
    }

    case 'GATEWAY_CONNECTED': {
      return {
        nextStage: ctx.currentStage === 1 ? 2 : ctx.currentStage,
        nextStatus: 'LIVE_CONNECTED_STREAM',
        allowed: true,
        message: 'Device handshake verified. Unlocking Elaboration & Feature Matrix.',
      };
    }

    case 'GATEWAY_DISCONNECTED': {
      return {
        nextStage: 1, // Fall back to Inception
        nextStatus: 'UNLINKED_ERROR',
        allowed: true,
        message: action.reason || 'Hardware link terminated. Returning to Inception gate.',
      };
    }

    case 'RESET_FLOW': {
      return {
        nextStage: 1,
        nextStatus: 'UNLINKED_ERROR',
        allowed: true,
        message: 'Nina control center reset to baseline Inception state.',
      };
    }

    default:
      return {
        nextStage: ctx.currentStage,
        nextStatus: ctx.gatewayStatus,
        allowed: false,
      };
  }
}

