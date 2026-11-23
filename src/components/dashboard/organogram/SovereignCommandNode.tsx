/**
 * SovereignCommandNode.tsx
 *
 * Level 0: Managing Director & Executive AI Zoe Sovereign Node.
 */

import React, { FC } from 'react';
import { motion } from 'framer-motion';

export const SovereignCommandNode: FC = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
        }}
      >
        <span style={{ fontSize: '1.8rem' }}>👑</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.68rem',
                background: '#EF4444',
                color: '#FFFFFF',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 900,
                textTransform: 'uppercase',
              }}
            >
              Level 0 Sovereign Command
            </span>
            <span style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 800 }}>
              ● Live Executive Link
            </span>
          </div>
          <h4 style={{ margin: '2px 0 0 0', fontSize: '1rem', fontWeight: 900 }}>
            Arslan Malik Bashir Ahmad (Founder & MD)
          </h4>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#94A3B8' }}>
            Paired with <strong>AI Zoe (Chief Operations Officer)</strong> • Floor 13 Sovereign
            Suite
          </p>
        </div>
      </motion.div>

      {/* Tree Connector Line */}
      <div style={{ width: '2px', height: '20px', background: '#CBD5E1', margin: '0 auto' }} />
      <div style={{ width: '80%', height: '2px', background: '#CBD5E1', margin: '0 auto' }} />
    </div>
  );
};
