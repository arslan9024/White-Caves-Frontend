import { useState, useCallback } from 'react';
import { DocTemplate, GeneratedDoc, GenerationStatus, ToastItem } from './types';
import { INITIAL_GENERATED_DOCS } from './data';
import { RED } from './constants';

export const useDocumentGeneration = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocTemplate | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [genStatus, setGenStatus] = useState<GenerationStatus>('idle');
  const [previewDoc, setPreviewDoc] = useState<GeneratedDoc | null>(null);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDoc[]>(INITIAL_GENERATED_DOCS);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'generate' | 'library'>('generate');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, color = RED) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const openTemplate = useCallback((template: DocTemplate) => {
    setSelectedTemplate(template);
    const defaults: Record<string, string> = {};
    template.fields.forEach(f => {
      defaults[f.key] = f.defaultValue;
    });
    setFormValues(defaults);
    setGenStatus('idle');
  }, []);

  const handleGenerate = useCallback(() => {
    if (!selectedTemplate) return;
    setGenStatus('generating');
    setTimeout(() => {
      const recipientName =
        formValues['tenantName'] ||
        formValues['agentName'] ||
        formValues['buyerName'] ||
        formValues['applicantName'] ||
        'Generated';
      const newDoc: GeneratedDoc = {
        id: `doc-${Date.now()}`,
        type: selectedTemplate.type,
        title: `${selectedTemplate.title} — ${recipientName} / ${new Date().toLocaleDateString('en-GB')}`,
        timestamp: new Date().toLocaleString('en-GB'),
        sizeKb: Math.floor(Math.random() * 120) + 60,
        status: 'ready',
      };
      setGeneratedDocs(prev => [newDoc, ...prev]);
      setGenStatus('done');
    }, 1800);
  }, [selectedTemplate, formValues]);

  const filteredDocs = generatedDocs.filter(d => {
    const matchType = filterType === 'ALL' || d.type === filterType;
    const matchSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return {
    selectedTemplate,
    setSelectedTemplate,
    formValues,
    setFormValues,
    genStatus,
    setGenStatus,
    previewDoc,
    setPreviewDoc,
    generatedDocs,
    setGeneratedDocs,
    filterType,
    setFilterType,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toasts,
    showToast,
    openTemplate,
    handleGenerate,
    filteredDocs,
  };
};
