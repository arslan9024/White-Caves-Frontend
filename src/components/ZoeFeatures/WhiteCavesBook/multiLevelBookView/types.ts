// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/types.ts
import React from 'react';
import { PreviewData } from '../previewHelper';

export interface HoveredTarget {
  targetId: string;
  x: number;
  y: number;
  data: PreviewData;
}

export type RichHypertextRenderer = (text: string) => React.ReactNode;
