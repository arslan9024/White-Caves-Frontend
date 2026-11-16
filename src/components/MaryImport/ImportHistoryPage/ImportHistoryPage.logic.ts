/**
 * Import History Page — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing import history fetching, status filters, and pagination
 */

import { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../../utils/authFetch';
import type { ImportBatchItem } from './ImportHistoryPage.types';

export function useImportHistoryLogic() {
  const [imports, setImports] = useState<ImportBatchItem[]>([]);
  const [selectedImport, setSelectedImport] = useState<ImportBatchItem | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchImports = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        status: filterStatus === 'all' ? '' : filterStatus,
        sortBy,
        limit: '100',
      });

      const response = await authFetch(`/api/inventory/import/history?${params}`);
      const result = (await response.json()) as {
        success: boolean;
        data: { imports: ImportBatchItem[] };
      };

      if (result.success && result.data) {
        setImports(result.data.imports || []);
      }
    } catch {
      // Non-blocking fetch
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus, sortBy]);

  useEffect(() => {
    fetchImports();
  }, [fetchImports]);

  const filteredImports = imports.filter(imp => {
    return imp.fileName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedImports = filteredImports.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredImports.length / itemsPerPage) || 1;

  return {
    imports,
    selectedImport,
    setSelectedImport,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    displayedImports,
    totalPages,
    fetchImports,
  };
}

