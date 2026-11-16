// @ts-nocheck
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const selectAuroraState = (state) => state.aurora;


export const selectProviders = createSelector(
  [selectAurora],
  (aurora) => aurora?.providers || initialState.providers
);

export const selectAnalysis = createSelector(
  [selectAurora],
  (aurora) => aurora?.analysis || initialState.analysis
);

export const selectComponents = createSelector(
  [selectAurora],
  (aurora) => aurora?.components || initialState.components
);

export const selectSRS = createSelector(
  [selectAurora],
  (aurora) => aurora?.srs || initialState.srs
);

export const selectAudit = createSelector(
  [selectAurora],
  (aurora) => aurora?.audit || initialState.audit
);

export const selectActions = createSelector(
  [selectAurora],
  (aurora) => aurora?.actions || initialState.actions
);

export const selectUI = createSelector(
  [selectAurora],
  (aurora) => aurora?.ui || initialState.ui
);

export const selectCompletionScore = createSelector(
  [selectAnalysis],
  (analysis) => analysis?.summary?.completionScore || analysis?.data?.codeQuality?.completionScore || 0
);

export const selectTotalFiles = createSelector(
  [selectAnalysis],
  (analysis) => analysis?.summary?.totalFiles || analysis?.data?.summary?.totalFiles || 0
);

export const selectTotalComponents = createSelector(
  [selectAnalysis],
  (analysis) => analysis?.summary?.components || analysis?.data?.components?.total || 0
);


