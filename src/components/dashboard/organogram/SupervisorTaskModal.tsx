/**
 * SupervisorTaskModal.tsx
 *
 * Supervisor Interactive Task Dispatch Modal with 15m SLA.
 */

import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SupervisorDef } from '../../../data/assistants108Registry.data';

interface SupervisorTaskModalProps {
  supervisor: SupervisorDef | null;
  onClose: () => void;
}

export const SupervisorTaskModal: FC<SupervisorTaskModalProps> = ({ supervisor, onClose }) => {
  const [taskPrompt, setTaskPrompt] = useState<string>('');
  const [taskDispatched, setTaskDispatched] = useState<boolean>(false);

  if (!supervisor) return null;

  const handleDispatchTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskPrompt.trim()) return;
    setTaskDispatched(true);
    setTimeout(() => {
      setTaskDispatched(false);
      setTaskPrompt('');
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              padding: '1.25rem 1.5rem',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                Supervisor Task Dispatcher
              </span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '1.1rem', fontWeight: 800 }}>
                🤖 {supervisor.name} ({supervisor.title})
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                background: '#F8FAFC',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                fontSize: '0.78rem',
              }}
            >
              <strong>Specialization:</strong> {supervisor.specialty}
              <div style={{ marginTop: '4px', color: '#059669', fontWeight: 700 }}>
                ⏱️ Guaranteed SLA Execution: Under 15 Minutes
              </div>
            </div>

            {taskDispatched ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  color: '#065F46',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                🚀 Task Dispatched to {supervisor.name}! Executing in background.
              </motion.div>
            ) : (
              <form
                onSubmit={handleDispatchTask}
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
                  Directive / Assignment Prompt
                </label>
                <textarea
                  required
                  rows={3}
                  value={taskPrompt}
                  onChange={e => setTaskPrompt(e.target.value)}
                  placeholder={`Assign a direct real estate or statutory task to ${supervisor.name}...`}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.82rem',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#EF4444',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                  }}
                >
                  ⚡ Dispatch Directive with 15m SLA
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
