/**
 * Aurora Analysis Dashboard — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook integrating with Redux auroraSlice
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store';
import {
  fetchProviders,
  fetchAnalysisSummary,
  fetchSRSDocuments,
  fetchActionCatalog,
  fetchComponentCompletion,
  selectProviders,
  selectAnalysis,
  selectSRS,
  selectAudit,
  selectActions,
  selectComponents,
  selectUI,
  setActiveTab,
} from '../../../store/slices/auroraSlice';
import type { AuroraTabId } from './AuroraAnalysisDashboard.types';

export function useAuroraAnalysisLogic() {
  const dispatch = useDispatch<AppDispatch>();
  const providers = useSelector(selectProviders);
  const analysis = useSelector(selectAnalysis);
  const srs = useSelector(selectSRS);
  const audit = useSelector(selectAudit);
  const actions = useSelector(selectActions);
  const components = useSelector(selectComponents);
  const ui = useSelector(selectUI);

  useEffect(() => {
    dispatch(fetchProviders());
    dispatch(fetchAnalysisSummary());
    dispatch(fetchSRSDocuments());
  }, [dispatch]);

  const handleTabChange = (tabId: AuroraTabId) => {
    dispatch(setActiveTab(tabId));

    if (tabId === 'components' && components.list.length === 0) {
      dispatch(fetchComponentCompletion());
    }
    if (tabId === 'actions' && actions.catalog.length === 0) {
      dispatch(fetchActionCatalog());
    }
  };

  return {
    dispatch,
    providers,
    analysis,
    srs,
    audit,
    actions,
    components,
    ui,
    handleTabChange,
  };
}
