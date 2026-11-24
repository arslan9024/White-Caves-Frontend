import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { PaletteItem } from './types';
import { DEPT_COLORS } from './paletteCatalog';
import {
  ResultsList,
  EmptyState,
  CategoryLabel,
  ResultItem,
  ResultIcon,
  ResultLabel,
  ResultArrow,
} from './CommandPalette.styles';

export interface CommandPaletteResultsProps {
  query: string;
  grouped: Record<string, PaletteItem[]>;
  filteredItems: PaletteItem[];
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  onSelectItem: (item: PaletteItem) => void;
}

export const CommandPaletteResults: React.FC<CommandPaletteResultsProps> = React.memo(
  function CommandPaletteResults({
    query,
    grouped,
    filteredItems,
    activeIndex,
    setActiveIndex,
    onSelectItem,
  }) {
    if (filteredItems.length === 0) {
      return (
        <ResultsList>
          <EmptyState>No results for &quot;{query}&quot;</EmptyState>
        </ResultsList>
      );
    }

    let flatIndex = -1;

    return (
      <ResultsList>
        {Object.entries(grouped).map(([category, categoryItems]) => (
          <div key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            {categoryItems.map(item => {
              flatIndex++;
              const idx = flatIndex;
              const Icon = item.icon;
              return (
                <ResultItem
                  key={item.id}
                  $active={idx === activeIndex}
                  onClick={() => onSelectItem(item)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <ResultIcon $color={DEPT_COLORS[item.id.replace('dept-', '')]}>
                    <Icon size={16} />
                  </ResultIcon>
                  <ResultLabel>{item.label}</ResultLabel>
                  <ResultArrow>
                    <ArrowRight size={14} />
                  </ResultArrow>
                </ResultItem>
              );
            })}
          </div>
        ))}
      </ResultsList>
    );
  }
);
