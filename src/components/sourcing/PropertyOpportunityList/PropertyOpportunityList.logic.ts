import { useState, useMemo } from 'react';
import { PropertyOpportunity, StatusMessage, SortByOption } from './PropertyOpportunityList.types';
import { INITIAL_OPPORTUNITIES } from './PropertyOpportunityList.data';

export const usePropertyOpportunityList = () => {
  const [opportunities, setOpportunities] = useState<PropertyOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterConfidence, setFilterConfidence] = useState(0);
  const [sortBy, setSortBy] = useState<SortByOption>('confidence');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<PropertyOpportunity | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const filteredAndSorted = useMemo(() => {
    const filtered = opportunities.filter(opp => {
      const matchesSearch =
        opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.propertyType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || opp.status === filterStatus;
      const matchesConfidence = opp.confidence >= filterConfidence;

      return matchesSearch && matchesStatus && matchesConfidence;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return b.confidence - a.confidence;
        case 'completeness':
          return b.completeness - a.completeness;
        case 'recent':
          return new Date(b.extractedAt).getTime() - new Date(a.extractedAt).getTime();
        case 'price':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [opportunities, searchTerm, filterStatus, filterConfidence, sortBy]);

  const handleAddToInventory = (opportunity: PropertyOpportunity) => {
    if (opportunity.status !== 'fully_verified') {
      setStatusMessage({
        type: 'error',
        text: 'Property must be fully verified before adding to inventory',
      });
      return;
    }
    setStatusMessage({
      type: 'success',
      text: 'Property queued for Mary Inventory successfully.',
    });
  };

  const handleUpdateStatus = (opportunityId: string, newStatus: string) => {
    setOpportunities(opps =>
      opps.map(opp => (opp.id === opportunityId ? { ...opp, status: newStatus } : opp))
    );
  };

  return {
    opportunities,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterConfidence,
    setFilterConfidence,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    selectedOpportunity,
    setSelectedOpportunity,
    statusMessage,
    filteredAndSorted,
    handleAddToInventory,
    handleUpdateStatus,
  };
};
