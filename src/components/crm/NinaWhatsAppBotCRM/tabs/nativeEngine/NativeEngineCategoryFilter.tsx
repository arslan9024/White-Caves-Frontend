import React from 'react';
import { filterBarContainerStyle } from './nativeEngine.styles';

interface FilterBarProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const NativeEngineCategoryFilter: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div style={filterBarContainerStyle}>
      {categories.map(cat => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              background: isSelected ? '#06B6D4' : '#F8FAFC',
              color: isSelected ? '#FFFFFF' : '#475569',
              border: isSelected ? '1px solid #06B6D4' : '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
