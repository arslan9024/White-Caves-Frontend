import { useState, useMemo } from 'react';
import { QuillTab } from './QuillCRM.types';
import { TEMPLATES } from './QuillCRM.data';

export const useQuillCRM = () => {
  const [activeTab, setActiveTab] = useState<QuillTab>('recent');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => catFilter === 'All' || t.category === catFilter).filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [catFilter, search]);

  const tabs: { id: QuillTab; label: string }[] = [
    { id: 'recent', label: '📄 Recent Docs' },
    { id: 'templates', label: '📋 Templates' },
    { id: 'generate', label: '✨ Generate' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    catFilter,
    setCatFilter,
    filteredTemplates,
    tabs,
  };
};
