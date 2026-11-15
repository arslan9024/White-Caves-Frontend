import React from 'react';

interface DuplicateFieldComparisonProps {
  duplicate: any;
}

export const DuplicateFieldComparison: React.FC<DuplicateFieldComparisonProps> = ({ duplicate }) => {
  const details = {
    new: duplicate.newData,
    existing: duplicate.existingData,
    matched: duplicate.matchedFields || [],
    confidence: duplicate.confidence || 0,
  };

  const allKeys = new Set([
    ...Object.keys(details.new || {}),
    ...Object.keys(details.existing || {}),
  ]);

  return (
    <div className="field-comparison">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Field</th>
            <th className="matched">Matched</th>
            <th>Existing Value</th>
            <th>New Value</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(allKeys)
            .sort()
            .map(field => {
              const isMatched = details.matched.includes(field);
              const existingValue = details.existing[field];
              const newValue = details.new[field];

              return (
                <tr key={field} className={isMatched ? 'matched-field' : ''}>
                  <td className="field-name">
                    <strong>{field}</strong>
                  </td>
                  <td className="matched-badge">
                    {isMatched ? (
                      <span className="badge-matched">✓ Match</span>
                    ) : (
                      <span className="badge-different">─ Different</span>
                    )}
                  </td>
                  <td className="field-value existing">
                    <code>{existingValue ? String(existingValue).substring(0, 40) : '-'}</code>
                  </td>
                  <td className="field-value new">
                    <code>{newValue ? String(newValue).substring(0, 40) : '-'}</code>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
