import { memo } from 'react';
import { CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

export interface DeckHeaderProps {
  expanded: boolean;
  onToggle: () => void;
}

export const DeckHeader = memo(({ expanded, onToggle }: DeckHeaderProps) => {
  return (
    <div
      className="deck-header"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={expanded}
      aria-label="Toggle payment instructions"
    >
      <div className="deck-title">
        <CreditCard size={20} />
        <h3>Payment Instructions</h3>
      </div>
      <button className="expand-btn" tabIndex={-1} aria-hidden="true">
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
    </div>
  );
});

DeckHeader.displayName = 'DeckHeader';
