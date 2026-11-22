import { EnterpriseReport } from '../../../../../data/theodoraReportsRegistry';

export interface FilterReportsParams {
  reports: EnterpriseReport[];
  searchQuery: string;
  selectedCategory: string;
  showFavoritesOnly: boolean;
  favorites: Record<string, boolean>;
}

export const filterReports = ({
  reports,
  searchQuery,
  selectedCategory,
  showFavoritesOnly,
  favorites,
}: FilterReportsParams): EnterpriseReport[] => {
  return reports.filter(report => {
    if (selectedCategory !== 'all' && report.categoryKey !== selectedCategory) {
      return false;
    }
    if (showFavoritesOnly && !favorites[report.id]) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = report.name.toLowerCase().includes(q);
      const matchesId = report.id.toLowerCase().includes(q);
      const matchesCategory = report.categoryName.toLowerCase().includes(q);
      const matchesDesc = report.description.toLowerCase().includes(q);
      const matchesTags = report.tags.some(t => t.toLowerCase().includes(q));
      if (!matchesName && !matchesId && !matchesCategory && !matchesDesc && !matchesTags) {
        return false;
      }
    }
    return true;
  });
};

export const downloadReportCSV = (report: EnterpriseReport, reportDateRange: string): void => {
  const headers = report.columns.join(',');
  const rows = report.sampleRows
    .map(row => report.columns.map(col => `"${row[col] ?? ''}"`).join(','))
    .join('\n');
  const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(
    `${report.name} (${report.id})\nGenerated: ${new Date().toISOString()}\n\n${headers}\n${rows}`
  )}`;
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', `${report.id}_${report.key}_${reportDateRange}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
