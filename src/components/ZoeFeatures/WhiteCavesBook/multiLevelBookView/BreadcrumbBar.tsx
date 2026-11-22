// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/BreadcrumbBar.tsx
import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpLeft, ChevronRight } from 'lucide-react';
import { NavigationBreadcrumb } from '../treeTypes';

interface BreadcrumbBarProps {
  activeLevel: number;
  breadcrumbs: NavigationBreadcrumb[];
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  returnUpOneLevel: () => void;
  resetToChapter: () => void;
}

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  activeLevel,
  breadcrumbs,
  canGoBack,
  canGoForward,
  goBack,
  goForward,
  returnUpOneLevel,
  resetToChapter,
}) => {
  return (
    <div className="px-6 py-2.5 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        {/* Browser-style Back / Forward Navigation Controls */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={`p-1.5 rounded transition ${
              canGoBack
                ? 'text-sky-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed opacity-40'
            }`}
            title="Navigate back (History)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={`p-1.5 rounded transition ${
              canGoForward
                ? 'text-sky-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed opacity-40'
            }`}
            title="Navigate forward (History)"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breadcrumb Lineage */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-slate-400">
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={bc.pathId + idx}>
              <span className="hover:text-slate-200 font-mono text-[11px] whitespace-nowrap cursor-pointer">
                <span className="text-sky-500 font-semibold">{bc.levelName.split(':')[0]}:</span>{' '}
                {bc.label}
              </span>
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Level Return Controls */}
      <div className="flex items-center gap-2">
        {activeLevel > 5 && (
          <button
            onClick={returnUpOneLevel}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-sky-400 transition"
            title="Return up one level in hierarchy"
          >
            <ArrowUpLeft className="w-3.5 h-3.5" /> Up to L{activeLevel - 1}
          </button>
        )}
        {activeLevel > 5 && (
          <button
            onClick={resetToChapter}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-white transition"
          >
            Back to Chapter (L5)
          </button>
        )}
      </div>
    </div>
  );
};
