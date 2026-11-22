// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/ChapterOverviewView.tsx
import React from 'react';
import { ChapterNode } from '../treeTypes';
import { RichHypertextRenderer } from './types';

interface ChapterOverviewViewProps {
  currentChapter: ChapterNode;
  selectSubChapter: (subId: string) => void;
  selectSection: (secId: string) => void;
  renderRichHypertext: RichHypertextRenderer;
}

export const ChapterOverviewView: React.FC<ChapterOverviewViewProps> = ({
  currentChapter,
  selectSubChapter,
  selectSection,
  renderRichHypertext,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded font-mono text-xs bg-sky-500/20 text-sky-300 font-bold">
            Level 5: {currentChapter.chapterCode}
          </span>
          <span className="text-xs text-slate-400">{currentChapter.readTimeMinutes} min read</span>
        </div>
        <h2 className="text-2xl font-bold text-white">{currentChapter.title}</h2>
        <p className="text-sm text-sky-400/90 font-medium mt-1 mb-4">{currentChapter.subtitle}</p>
        {currentChapter.overviewMarkdown && (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/20 text-xs text-slate-200 leading-relaxed mb-6 space-y-2">
            <div className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              Executive Chapter Overview &amp; Cross-References:
            </div>
            <div className="text-slate-300">
              {renderRichHypertext(currentChapter.overviewMarkdown)}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {currentChapter.subChapters.map(subCh => (
          <div
            key={subCh.nodeId}
            className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Level 6 Sub-Chapter {subCh.subChapterNumber}: {subCh.title}
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {subCh.sections.length} Sections
              </span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              {renderRichHypertext(subCh.summary)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {subCh.sections.map(sec => (
                <div
                  key={sec.nodeId}
                  onClick={() => {
                    selectSubChapter(subCh.nodeId);
                    selectSection(sec.nodeId);
                  }}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition"
                >
                  <div className="text-[10px] font-mono text-sky-400 font-bold mb-1">
                    Level 7: § {sec.sectionNumber}
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{sec.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
