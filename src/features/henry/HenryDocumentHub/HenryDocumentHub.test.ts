import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useHenryDocumentHubLogic } from './HenryDocumentHub.logic';
import { DOCUMENT_TEMPLATES } from './HenryDocumentHub.data';

vi.mock('../../../utils/authFetch', () => ({
  authFetch: vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ success: true, data: { records: [] } }),
  }),
}));

describe('HenryDocumentHub Logic & Wilkes layers', () => {
  it('initializes with default state and selects templates properly', () => {
    const { result } = renderHook(() => useHenryDocumentHubLogic());

    expect(result.current.activeTemplate).toBeNull();
    expect(result.current.records).toEqual([]);
    expect(result.current.activePanel).toBe('editor');

    act(() => {
      result.current.handleTemplateSelect(DOCUMENT_TEMPLATES[0]);
    });

    expect(result.current.activeTemplate?.key).toBe('tenancy_contract');
    expect(result.current.formData).toEqual({});
  });

  it('updates form fields', () => {
    const { result } = renderHook(() => useHenryDocumentHubLogic());

    act(() => {
      result.current.handleFieldChange('tenantName', 'Sheikh Mohammed');
    });

    expect(result.current.formData.tenantName).toBe('Sheikh Mohammed');
  });
});
