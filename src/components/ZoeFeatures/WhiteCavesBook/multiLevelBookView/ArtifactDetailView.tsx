// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/ArtifactDetailView.tsx
import React from 'react';
import { AlignLeft, FileCode2, Sigma } from 'lucide-react';
import { LeafArtifactNode, LineNode, ParagraphNode, SentenceNode } from '../treeTypes';
import { RichHypertextRenderer } from './types';

interface ArtifactDetailViewProps {
  currentArtifact: LeafArtifactNode;
  currentParagraph: ParagraphNode | null;
  currentSentence: SentenceNode | null;
  currentLine: LineNode | null;
  selectParagraph: (pId: string) => void;
  selectSentence: (sId: string) => void;
  selectLine: (lId: string) => void;
  renderRichHypertext: RichHypertextRenderer;
}

export const ArtifactDetailView: React.FC<ArtifactDetailViewProps> = ({
  currentArtifact,
  currentParagraph,
  currentSentence,
  currentLine,
  selectParagraph,
  selectSentence,
  selectLine,
  renderRichHypertext,
}) => {
  return (
    <div className="space-y-6">
      {/* Level 9: Artifact Header */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-400 font-bold uppercase tracking-wider">
            Level 9 Artifact #{currentArtifact.artifactNumber} [{currentArtifact.type}]
          </span>
          {currentArtifact.complexity && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Complexity: {currentArtifact.complexity}
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-white mb-1">{currentArtifact.title}</h2>
        {currentArtifact.filePath && (
          <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5 mt-2">
            <FileCode2 className="w-4 h-4" /> {currentArtifact.filePath}
            {currentArtifact.totalLines && (
              <span className="text-slate-500">({currentArtifact.totalLines} lines)</span>
            )}
          </div>
        )}
      </div>

      {/* Level 10: Paragraphs */}
      <div className="space-y-4">
        {currentArtifact.paragraphs.map(p => {
          const isPActive = currentParagraph?.nodeId === p.nodeId;
          return (
            <div
              key={p.nodeId}
              onClick={() => selectParagraph(p.nodeId)}
              className={`p-4 rounded-xl border transition cursor-pointer ${
                isPActive
                  ? 'bg-slate-900/90 border-sky-500/50 shadow-md'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-sky-400 mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <AlignLeft className="w-3.5 h-3.5" /> Level 10 Paragraph ¶ {p.paragraphNumber}
                </span>
                <span className="text-slate-500">{p.sentences.length} sentences</span>
              </div>
              {p.header && <h4 className="text-sm font-bold text-white mb-2">{p.header}</h4>}
              <div className="text-xs text-slate-300 leading-relaxed mb-3">
                {renderRichHypertext(p.narrative)}
              </div>

              {/* Level 10 Math */}
              {p.mathFormulas && p.mathFormulas.length > 0 && (
                <div className="space-y-2 mb-3">
                  {p.mathFormulas.map((math, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-lg bg-slate-950 border border-emerald-500/30 text-emerald-300 space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <Sigma className="w-4 h-4" /> {math.title}
                      </div>
                      <div className="font-mono text-sm bg-black/60 px-3 py-2 rounded text-center text-emerald-200 overflow-x-auto">
                        {math.latex}
                      </div>
                      <p className="text-[11px] text-slate-400 italic">{math.explanation}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Level 11: Sentences inside Paragraph */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Level 11 Sentences (Atomic Propositions):
                </div>
                {p.sentences.map(sent => {
                  const isSActive = currentSentence?.nodeId === sent.nodeId;
                  return (
                    <div
                      key={sent.nodeId}
                      onClick={e => {
                        e.stopPropagation();
                        selectParagraph(p.nodeId);
                        selectSentence(sent.nodeId);
                      }}
                      className={`p-2.5 rounded-lg border text-xs transition ${
                        isSActive
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-emerald-400">
                          Sentence S.{sent.sentenceNumber}
                        </span>
                        {sent.statutoryInvariant && (
                          <span className="text-[9px] uppercase px-1 rounded bg-red-500/20 text-red-400 font-bold">
                            Statutory Invariant
                          </span>
                        )}
                      </div>
                      <div className="italic font-serif leading-relaxed mb-2">
                        &quot;{renderRichHypertext(sent.statement)}&quot;
                      </div>

                      {/* Level 12: Code Lines inside Sentence */}
                      <div className="space-y-1 pt-1.5 border-t border-slate-800/60 font-mono text-[11px]">
                        <div className="text-[9px] text-slate-500 uppercase tracking-wider">
                          Level 12 Code Lines &amp; Token Coordinates:
                        </div>
                        {sent.lines.map(line => {
                          const isLActive = currentLine?.nodeId === line.nodeId;
                          return (
                            <div
                              key={line.nodeId}
                              onClick={ev => {
                                ev.stopPropagation();
                                selectParagraph(p.nodeId);
                                selectSentence(sent.nodeId);
                                selectLine(line.nodeId);
                              }}
                              className={`px-2 py-1 rounded flex items-center gap-3 transition ${
                                isLActive
                                  ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40'
                                  : 'hover:bg-slate-800/60 text-slate-300'
                              }`}
                            >
                              <span className="text-slate-600 select-none w-6 text-right font-mono text-[10px]">
                                {line.lineNumber}
                              </span>
                              <code className="flex-1">{line.text}</code>
                              {line.tokenType && (
                                <span className="text-[9px] px-1 rounded bg-black/40 text-slate-400">
                                  {line.tokenType}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
