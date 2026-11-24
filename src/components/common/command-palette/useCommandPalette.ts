import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCommandPaletteOpen,
  closeCommandPalette,
  selectDepartment,
} from '../../../store/slices/sidebarSlice';
import type { PaletteItem } from './types';
import { buildDefaultPaletteItems } from './paletteCatalog';

export interface UseCommandPaletteReturn {
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  filteredItems: PaletteItem[];
  grouped: Record<string, PaletteItem[]>;
  handleClose: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSelectItem: (item: PaletteItem) => void;
}

export function useCommandPalette(): UseCommandPaletteReturn {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const items = useMemo<PaletteItem[]>(() => {
    return buildDefaultPaletteItems({
      navigate,
      onSelectDepartment: deptId => dispatch(selectDepartment(deptId)),
    });
  }, [navigate, dispatch]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      item =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords?.some(k => k.includes(q))
    );
  }, [items, query]);

  const grouped = useMemo(() => {
    const groups: Record<string, PaletteItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const handleClose = useCallback(() => {
    dispatch(closeCommandPalette());
  }, [dispatch]);

  const handleSelectItem = useCallback(
    (item: PaletteItem) => {
      item.action();
      dispatch(closeCommandPalette());
    },
    [dispatch]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeCommandPalette());
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
      } else if (
        e.key === 'Enter' &&
        // eslint-disable-next-line security/detect-object-injection
        filteredItems[activeIndex]
      ) {
        e.preventDefault();
        // eslint-disable-next-line security/detect-object-injection
        filteredItems[activeIndex].action();
        dispatch(closeCommandPalette());
      }
    },
    [dispatch, filteredItems, activeIndex]
  );

  return {
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
  };
}
