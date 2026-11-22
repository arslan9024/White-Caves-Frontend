import React, { useState } from 'react';
import { calculateCryptoRequired } from './constants';
import type { CryptoAsset } from './types';

export const CryptoFxTab: React.FC = () => {
  const [propertyPriceAed, setPropertyPriceAed] = useState<number>(15000000);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset>('USDT');

  const cryptoRequired = calculateCryptoRequired(propertyPriceAed, selectedCrypto);

  return (
    <div
      style={{
        background: 'var(--white, #FFFFFF)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--text-secondary, #E2E8F0)',
      }}
    >
      <h4
        style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Real Estate Crypto FX Rate Lock & Escrow Conversion
      </h4>
      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        Fully compliant with VARA (Virtual Assets Regulatory Authority) & UAE Central Bank
        crypto-to-fiat escrow transfers.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
            }}
          >
            Property Price in AED
          </label>
          <input
            type="number"
            value={propertyPriceAed}
            onChange={e => setPropertyPriceAed(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
            }}
          >
            Cryptocurrency Asset
          </label>
          <select
            value={selectedCrypto}
            onChange={e => setSelectedCrypto(e.target.value as CryptoAsset)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            <option value="USDT">USDT (Tether USD) - 1:3.6725 Peg</option>
            <option value="BTC">BTC (Bitcoin)</option>
            <option value="ETH">ETH (Ethereum)</option>
          </select>
        </div>
      </div>

      <div
        style={{
          background: 'var(--color-fdf2f8, #FDF2F8)',
          border: '1px solid var(--color-fbcfe8, #FBCFE8)',
          padding: '1.25rem',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-9d174d, #9D174D)',
            fontWeight: 800,
          }}
        >
          ESTIMATED CRYPTO CONVERSION LOCK (15-MIN GUARANTEE)
        </div>
        <div
          style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            color: 'var(--color-831843, #831843)',
            marginTop: '4px',
          }}
        >
          {cryptoRequired} {selectedCrypto}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-9d174d, #9D174D)',
            marginTop: '4px',
          }}
        >
          Settlement Currency: AED into White Caves Corporate Wio Escrow Account
        </div>
      </div>
    </div>
  );
};
