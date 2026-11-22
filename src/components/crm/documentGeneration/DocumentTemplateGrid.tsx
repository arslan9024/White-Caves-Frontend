import React, { FC } from 'react';
import { DocTemplate } from './types';
import { RED, BORDER, CARD_BG, SLATE, TEXT_MUTED } from './constants';

interface DocumentTemplateGridProps {
  templates: DocTemplate[];
  selectedTemplate: DocTemplate | null;
  onSelectTemplate: (template: DocTemplate) => void;
}

export const DocumentTemplateGrid: FC<DocumentTemplateGridProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div>
      <h3 style={{ color: SLATE, marginTop: 0, fontSize: '1rem', fontWeight: 700 }}>
        Select Document Template
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {templates.map(template => {
          const isSelected = selectedTemplate?.id === template.id;
          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              style={{
                background: isSelected ? '#FEF2F2' : CARD_BG,
                border: `2px solid ${isSelected ? RED : BORDER}`,
                padding: '16px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{template.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: SLATE, marginBottom: '4px' }}>
                {template.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: TEXT_MUTED, lineHeight: 1.4 }}>
                {template.description}
              </div>
              {isSelected && (
                <div style={{ marginTop: '8px', fontSize: '0.7rem', fontWeight: 700, color: RED, textTransform: 'uppercase' }}>
                  ● Selected
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
