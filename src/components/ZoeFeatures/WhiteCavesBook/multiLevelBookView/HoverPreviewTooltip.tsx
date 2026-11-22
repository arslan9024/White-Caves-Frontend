// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/HoverPreviewTooltip.tsx
import React from 'react';
import { HoveredTarget } from './types';

interface HoverPreviewTooltipProps {
  hoveredTarget: HoveredTarget;
}

export const HoverPreviewTooltip: React.FC<HoverPreviewTooltipProps> = ({ hoveredTarget }) => {
  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 w-72 p-3 bg-slate-900/95 border border-sky-500/40 rounded-xl shadow-2xl backdrop-blur-md transition-opacity duration-150 animate-in fade-in"
      style={{
        left: `${hoveredTarget.x}px`,
        top: `${hoveredTarget.y}px`,
      }}
    >
      <div className="flex items-center justify-between text-[10px] mb-1.5 pb-1 border-b border-slate-800">
        <span className="font-mono text-sky-400 font-bold bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-500/30">
          {hoveredTarget.data.badge}
        </span>
        <span className="text-slate-400 font-medium">{hoveredTarget.data.levelText}</span>
      </div>
      <div className="text-xs font-bold text-white mb-0.5">{hoveredTarget.data.title}</div>
      {hoveredTarget.data.category && (
        <div className="text-[10px] text-amber-400/90 font-mono mb-1.5">
          {hoveredTarget.data.category}
        </div>
      )}
      <p className="text-[11px] text-slate-300 leading-snug line-clamp-3">
        {hoveredTarget.data.snippet}
      </p>
      <div className="mt-2 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500 font-mono">
        <span>Click to navigate</span>
        <span className="text-sky-400">AEGIS 12-Level Mesh</span>
      </div>
    </div>
  );
};
