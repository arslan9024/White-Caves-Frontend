/**
 * Cipher Market CRM — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing valuation calculations, DLD clusters, and tab navigation
 */

import { useState, useEffect } from 'react';
import type { CipherTab, CmaValuation, DldClusterItem } from './CipherMarketCRM.types';
import { INITIAL_DLD_CLUSTER, computeCmaValuation } from './CipherMarketCRM.data';

export function useCipherMarketLogic(moduleId?: string) {
  const [activeTab, setActiveTab] = useState<CipherTab>('cma');

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('dld')) setActiveTab('dld');
    else if (moduleId.includes('trend')) setActiveTab('trends');
    else if (moduleId.includes('forecast')) setActiveTab('forecast');
    else if (moduleId.includes('cma')) setActiveTab('cma');
  }, [moduleId]);

  // Feature 1: Automated CMA Builder
  const [community, setCommunity] = useState('Palm Jumeirah');
  const [propertyType, setPropertyType] = useState('Villa');
  const [bedrooms, setBedrooms] = useState('4');
  const [builtUpArea, setBuiltUpArea] = useState(5500);
  const [cmaValuation, setCmaValuation] = useState<CmaValuation | null>(null);

  const calculateCma = () => {
    const val = computeCmaValuation(community, builtUpArea);
    setCmaValuation(val);
  };

  // Feature 2: DLD Live Cluster Regressor
  const [dldCluster] = useState<DldClusterItem[]>(INITIAL_DLD_CLUSTER);

  return {
    activeTab,
    setActiveTab,
    community,
    setCommunity,
    propertyType,
    setPropertyType,
    bedrooms,
    setBedrooms,
    builtUpArea,
    setBuiltUpArea,
    cmaValuation,
    calculateCma,
    dldCluster,
  };
}

