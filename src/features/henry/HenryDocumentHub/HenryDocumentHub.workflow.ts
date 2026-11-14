/**
 * Henry Document Hub — Workflow Layer (Mary Allen Wilkes Architecture)
 * Document lifecycle, API transitions, compliance checking, and archive sync
 */

import { authFetch } from '../../../utils/authFetch';
import type { ComplianceReport, HenryRecord, DocumentTemplate } from './HenryDocumentHub.types';

export async function fetchHenryRecords(): Promise<{
  success: boolean;
  records: HenryRecord[];
  error?: string;
}> {
  try {
    const res = await authFetch('/api/henry/records');
    const json = (await res.json()) as {
      success: boolean;
      data: { records: HenryRecord[] };
      error?: string;
    };
    if (json.success && json.data) {
      return { success: true, records: json.data.records };
    }
    return { success: false, records: [], error: json.error ?? 'Failed to load records' };
  } catch (err) {
    return {
      success: false,
      records: [],
      error: err instanceof Error ? err.message : 'Failed to load records',
    };
  }
}

export async function executeComplianceCheck(
  templateKey: string,
  formData: Record<string, unknown>
): Promise<{ success: boolean; data?: ComplianceReport; error?: string }> {
  try {
    const res = await authFetch('/api/henry/compliance/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateKey, documentData: formData }),
    });
    const json = (await res.json()) as {
      success: boolean;
      data: ComplianceReport;
      error?: string;
    };
    if (json.success && json.data) {
      return { success: true, data: json.data };
    }
    return { success: false, error: json.error ?? 'Compliance check failed' };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Compliance check failed',
    };
  }
}

export async function saveDocumentRecord(payload: {
  template: DocumentTemplate;
  formData: Record<string, unknown>;
  departmentTag: string;
  ownerUserEmail?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const fileName = `${payload.template.key}_${Date.now()}.pdf`;
    const res = await authFetch('/api/henry/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateKey: payload.template.key,
        templateLabel: payload.template.label,
        fileName,
        recordPath: '',
        unit: (payload.formData.unitNumber as string) ?? null,
        community: (payload.formData.propertyAddress as string) ?? null,
        tenantName: (payload.formData.tenantName as string) ?? null,
        departmentTag: payload.departmentTag,
        ownerUserEmail: payload.ownerUserEmail || null,
        isDraft: true,
        status: 'pending_signature',
        documentSnapshot: payload.formData,
      }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (json.success) {
      return { success: true };
    }
    return { success: false, error: json.error ?? 'Save failed' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Save failed' };
  }
}

export async function extractDocumentFields(
  templateKey: string,
  text: string
): Promise<{
  success: boolean;
  fields?: Record<string, unknown>;
  confidence?: number;
  error?: string;
}> {
  try {
    const res = await authFetch('/api/henry/ai/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, templateKey }),
    });
    const json = (await res.json()) as {
      success: boolean;
      data: { fields: Record<string, unknown>; confidence: number };
      error?: string;
    };
    if (json.success && json.data?.fields) {
      return { success: true, fields: json.data.fields, confidence: json.data.confidence };
    }
    return { success: false, error: json.error ?? 'Extraction failed' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'AI extraction failed' };
  }
}

export async function removeHenryRecord(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await authFetch(`/api/henry/records/${id}`, { method: 'DELETE' });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (json.success) return { success: true };
    return { success: false, error: json.error ?? 'Delete failed' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Delete failed' };
  }
}

export async function markHenryRecordSigned(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await authFetch(`/api/henry/records/${id}/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (json.success) return { success: true };
    return { success: false, error: json.error ?? 'Unable to mark record as signed' };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unable to mark record as signed',
    };
  }
}
