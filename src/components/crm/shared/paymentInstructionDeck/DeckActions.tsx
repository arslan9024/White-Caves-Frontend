import { memo } from 'react';
import { CreditCard, Download, Share2, Copy, Check } from 'lucide-react';

export interface DeckActionsProps {
  intentLoading: boolean;
  copied: string | null;
  onCreatePaymentIntent: () => void;
  onGenerateMessage: () => void;
  intentStatus: string | null;
  intentError: string | null;
}

export const DeckActions = memo(
  ({
    intentLoading,
    copied,
    onCreatePaymentIntent,
    onGenerateMessage,
    intentStatus,
    intentError,
  }: DeckActionsProps) => {
    return (
      <>
        <div className="deck-actions">
          <button
            className="action-btn primary"
            onClick={onCreatePaymentIntent}
            disabled={intentLoading}
          >
            <CreditCard size={16} />
            {intentLoading ? 'Generating…' : 'Generate Payment Link'}
          </button>
          <button className="action-btn primary" onClick={onGenerateMessage}>
            {copied === 'message' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'message' ? 'Copied!' : 'Copy Message'}
          </button>
          <button className="action-btn secondary">
            <Download size={16} />
            Download PDF
          </button>
          <button className="action-btn secondary">
            <Share2 size={16} />
            Share via WhatsApp
          </button>
        </div>

        {intentStatus && <p className="payment-intent-success">{intentStatus}</p>}
        {intentError && <p className="payment-intent-error">{intentError}</p>}
      </>
    );
  }
);

DeckActions.displayName = 'DeckActions';
