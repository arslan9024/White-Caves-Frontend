/**
 * CommandPalette — Global search overlay (Cmd+K / Ctrl+K)
 *
 * Inspired by VS Code, Linear, Notion command palettes.
 * Features:
 * - Full-screen overlay with search input
 * - Categories: Departments, Services, Properties, Settings
 * - Keyboard navigation (↑↓ to move, Enter to select, Esc to close)
 * - Recent searches, type "/" for category filters
 */

import React from 'react';
import { Search, Command } from 'lucide-react';
import {
  Overlay,
  PaletteContainer,
  SearchRow,
  SearchIcon,
  SearchInput,
  CloseHint,
  Footer,
  FooterHint,
} from './command-palette/CommandPalette.styles';
import { useCommandPalette } from './command-palette/useCommandPalette';
import { CommandPaletteResults } from './command-palette/CommandPaletteResults';

// Re-export types, styles, catalog, hook, and results for consumers
export * from './command-palette';

const CommandPalette: React.FC = React.memo(function CommandPalette() {
  const {
    isOpen,
    query,
    setQuery,
    activeIndex,
    setActiveIndex,
    inputRef,
    filteredItems,
    grouped,
    handleClose,
    handleKeyDown,
    handleSelectItem,
  } = useCommandPalette();

  if (!isOpen) return null;

  return (
    <Overlay
      onClick={e => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <PaletteContainer onKeyDown={handleKeyDown}>
        <SearchRow>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search departments, services, properties..."
            autoComplete="off"
            spellCheck={false}
          />
          <CloseHint>ESC</CloseHint>
        </SearchRow>

        <CommandPaletteResults
          query={query}
          grouped={grouped}
          filteredItems={filteredItems}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onSelectItem={handleSelectItem}
        />

        <Footer>
          <FooterHint>
            <kbd>↑↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close
          </FooterHint>
          <FooterHint>
            <Command size={12} /> White Caves CRM
          </FooterHint>
        </Footer>
      </PaletteContainer>
    </Overlay>
  );
});

export default CommandPalette;
