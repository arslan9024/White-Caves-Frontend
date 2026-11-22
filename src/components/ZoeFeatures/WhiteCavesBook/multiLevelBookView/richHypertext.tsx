// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/richHypertext.tsx
import React from 'react';

export interface RichHypertextHandlers {
  onNavigate: (targetId: string) => void;
  onMouseEnterLink: (e: React.MouseEvent, targetId: string) => void;
  onMouseLeaveLink: () => void;
}

/**
 * Universal Hyperlink & Reference Parser:
 * Converts [anchor text](#nodeId) or protocol codes (TURING-*, AEG-*) into active, clickable navigation portals.
 */
export function renderRichHypertextContent(
  text: string,
  handlers: RichHypertextHandlers
): React.ReactNode {
  if (!text) return null;

  // Pattern 1: Markdown hyperlinks [Label](#NodeId) or [Label](NodeId)
  const markdownLinkRegex = /\[([^\]]+)\]\((#[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+)\)/g;

  // First replace markdown links with unique markers
  const markdownMatches: { label: string; target: string }[] = [];
  const textWithMarkers = text.replace(markdownLinkRegex, (_, label: string, target: string) => {
    const idx = markdownMatches.length;
    markdownMatches.push({ label, target: target.replace(/^#/, '') });
    return `@@MD_LINK_${idx}@@`;
  });

  // Split by protocol tokens and markdown markers
  const combinedRegex = /(@@MD_LINK_\d+@@|\bTURING-[A-Z0-9-]+\b|\bAEG-\d{3}\b)/g;
  const parts = textWithMarkers.split(combinedRegex);

  return parts.map((part, index) => {
    if (part.startsWith('@@MD_LINK_') && part.endsWith('@@')) {
      const linkIndex = parseInt(part.replace('@@MD_LINK_', '').replace('@@', ''), 10);
      const match = markdownMatches[linkIndex];
      if (match) {
        return (
          <button
            key={`link-${index}`}
            onClick={e => {
              e.stopPropagation();
              handlers.onNavigate(match.target);
            }}
            onMouseEnter={e => handlers.onMouseEnterLink(e, match.target)}
            onMouseLeave={handlers.onMouseLeaveLink}
            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-200 underline font-semibold decoration-sky-500/50 hover:decoration-sky-300 transition-colors mx-0.5"
            title={`Jump to ${match.target}`}
          >
            <span>{match.label}</span>
            <span className="text-[10px] text-sky-500 no-underline">↗</span>
          </button>
        );
      }
    }

    if (/^(TURING-[A-Z0-9-]+|AEG-\d{3})$/.test(part)) {
      return (
        <button
          key={`proto-${index}`}
          onClick={e => {
            e.stopPropagation();
            handlers.onNavigate(part);
          }}
          onMouseEnter={e => handlers.onMouseEnterLink(e, part)}
          onMouseLeave={handlers.onMouseLeaveLink}
          className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all mx-0.5 shadow-sm"
          title={`Statutory Protocol: ${part}`}
        >
          {part}
        </button>
      );
    }

    return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
  });
}
