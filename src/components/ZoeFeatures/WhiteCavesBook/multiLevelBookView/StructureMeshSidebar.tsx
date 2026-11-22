// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/StructureMeshSidebar.tsx
import React from 'react';
import { CornerDownRight, FolderTree } from 'lucide-react';
import {
  CantoNode,
  ChapterNode,
  LeafArtifactNode,
  SectionNode,
  SubChapterNode,
  TopicNode,
} from '../treeTypes';

interface StructureMeshSidebarProps {
  currentCanto: CantoNode;
  currentChapter: ChapterNode;
  currentSubChapter: SubChapterNode | null;
  currentSection: SectionNode | null;
  currentTopic: TopicNode | null;
  currentArtifact: LeafArtifactNode | null;
  selectChapter: (chapterId: string) => void;
  selectSubChapter: (subId: string) => void;
  selectSection: (secId: string) => void;
  selectTopic: (topId: string) => void;
  selectArtifact: (artId: string) => void;
}

export const StructureMeshSidebar: React.FC<StructureMeshSidebarProps> = ({
  currentCanto,
  currentChapter,
  currentSubChapter,
  currentSection,
  currentTopic,
  currentArtifact,
  selectChapter,
  selectSubChapter,
  selectSection,
  selectTopic,
  selectArtifact,
}) => {
  return (
    <div className="w-80 border-r border-sky-500/20 bg-slate-900/40 flex flex-col overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
        <span className="flex items-center gap-1.5">
          <FolderTree className="w-3.5 h-3.5 text-sky-400" /> Structure Mesh (L5-L12)
        </span>
        <span className="text-[10px] font-mono text-slate-500">
          {currentCanto.chapters.length} Ch
        </span>
      </div>

      {currentCanto.chapters.map(ch => {
        const isChapterActive = ch.nodeId === currentChapter.nodeId;
        return (
          <div
            key={ch.nodeId}
            className={`rounded-lg border transition ${
              isChapterActive
                ? 'border-sky-500/30 bg-sky-950/20'
                : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
            }`}
          >
            {/* Level 5: Chapter */}
            <button
              onClick={() => selectChapter(ch.nodeId)}
              className="w-full text-left p-2.5 flex items-start justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-sky-500/20 text-sky-300 font-bold">
                    {ch.chapterCode}
                  </span>
                  <span className="text-[10px] text-slate-500">{ch.readTimeMinutes}m read</span>
                </div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-sky-300 transition leading-snug">
                  {ch.title.split(': ')[1] || ch.title}
                </div>
              </div>
            </button>

            {/* Sub-Tree for Active Chapter */}
            {isChapterActive && (
              <div className="px-2 pb-2 pt-1 border-t border-slate-800/60 space-y-2">
                {ch.subChapters.map(subCh => {
                  const isSubActive = currentSubChapter?.nodeId === subCh.nodeId;
                  return (
                    <div key={subCh.nodeId} className="space-y-1 pl-2 border-l border-slate-800">
                      {/* Level 6: Sub-Chapter */}
                      <button
                        onClick={() => selectSubChapter(subCh.nodeId)}
                        className={`w-full text-left text-[11px] font-semibold py-0.5 transition flex items-center justify-between ${
                          isSubActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span>L6: Sub-Ch {subCh.subChapterNumber}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {subCh.sections.length} sec
                        </span>
                      </button>

                      {/* Level 7: Sections */}
                      {isSubActive && (
                        <div className="space-y-1 pl-2">
                          {subCh.sections.map(sec => {
                            const isSecActive = currentSection?.nodeId === sec.nodeId;
                            return (
                              <div key={sec.nodeId}>
                                <button
                                  onClick={() => selectSection(sec.nodeId)}
                                  className={`w-full text-left text-[11px] py-0.5 transition truncate flex items-center gap-1 ${
                                    isSecActive
                                      ? 'text-emerald-400 font-bold'
                                      : 'text-slate-400 hover:text-slate-300'
                                  }`}
                                >
                                  <CornerDownRight className="w-2.5 h-2.5 opacity-60" />
                                  L7: § {sec.sectionNumber}
                                </button>

                                {/* Level 8: Topics */}
                                {isSecActive && (
                                  <div className="pl-3 pt-1 space-y-1">
                                    {sec.topics.map(top => {
                                      const isTopActive = currentTopic?.nodeId === top.nodeId;
                                      return (
                                        <div key={top.nodeId}>
                                          <button
                                            onClick={() => selectTopic(top.nodeId)}
                                            className={`w-full text-left text-[10px] py-0.5 transition truncate flex items-center gap-1 ${
                                              isTopActive
                                                ? 'text-amber-400 font-bold'
                                                : 'text-slate-500 hover:text-slate-400'
                                            }`}
                                          >
                                            <span>L8: T-{top.topicNumber}</span>
                                          </button>

                                          {/* Level 9: Artifacts / Files */}
                                          {isTopActive && (
                                            <div className="pl-3 pt-1 space-y-0.5">
                                              {top.artifacts.map(art => {
                                                const isArtActive =
                                                  currentArtifact?.nodeId === art.nodeId;
                                                return (
                                                  <button
                                                    key={art.nodeId}
                                                    onClick={() => selectArtifact(art.nodeId)}
                                                    className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-mono transition flex items-center justify-between ${
                                                      isArtActive
                                                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                                                        : 'bg-slate-900/40 text-slate-400 hover:text-slate-200'
                                                    }`}
                                                  >
                                                    <span className="truncate">
                                                      L9: Art #{art.artifactNumber}
                                                    </span>
                                                    <span className="text-[8px] uppercase px-1 rounded bg-black/40">
                                                      {art.type}
                                                    </span>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
