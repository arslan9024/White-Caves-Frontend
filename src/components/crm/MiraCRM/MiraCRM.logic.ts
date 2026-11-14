import { useState } from 'react';
import { MiraTabType } from './MiraCRM.types';

export const useMiraCRMLogic = () => {
  const [activeTab, setActiveTab] = useState<MiraTabType>('queue');
  const [inputText, setInputText] = useState(
    'Welcome to White Caves Real Estate. We specialise in luxury Dubai properties.'
  );
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Arabic');

  return {
    activeTab,
    setActiveTab,
    inputText,
    setInputText,
    fromLang,
    setFromLang,
    toLang,
    setToLang,
  };
};
