import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadInventoryData,
  selectFilteredProperties,
  selectInventoryStats,
  selectFilters,
  selectOwners,
  selectFilterOptions,
  selectActiveFiltersCount,
  setFilter,
  clearFilters,
  toggleMultiOwnerFilter,
  toggleMultiPhoneFilter,
  toggleMultiPropertyFilter,
} from '../../../store/slices/inventorySlice';
import { FEATURE_TO_TAB } from './MaryInventoryCRM.data';

export const useMaryInventoryCRM = (activeFeature?: string) => {
  const dispatch = useDispatch();
  const properties = useSelector(selectFilteredProperties);
  const stats = useSelector(selectInventoryStats);
  const filters = useSelector(selectFilters);
  const owners = useSelector(selectOwners);
  const filterOptions = useSelector(selectFilterOptions);
  const activeFiltersCount = useSelector(selectActiveFiltersCount);
  const loading = useSelector((state: any) => state.inventory?.loading);

  const [showFeatures, setShowFeatures] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProperty, setEditProperty] = useState<any>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any>(null);
  const [showOwnerDrawer, setShowOwnerDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [activeToolTab, setActiveToolTab] = useState<string | null>(null);

  useEffect(() => {
    if (activeFeature && FEATURE_TO_TAB[activeFeature] !== undefined) {
      setActiveToolTab(FEATURE_TO_TAB[activeFeature]);
    }
  }, [activeFeature]);

  useEffect(() => {
    dispatch(loadInventoryData() as any);
  }, [dispatch]);

  const handleOwnerClick = (owner: any) => {
    setSelectedOwner(owner);
    setShowOwnerDrawer(true);
  };

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
  };

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ key: key as Parameters<typeof setFilter>[0]['key'], value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleFilterToggle = (filterKey: string) => {
    switch (filterKey) {
      case 'showMultiOwner':
        dispatch(toggleMultiOwnerFilter());
        break;
      case 'showMultiPhone':
        dispatch(toggleMultiPhoneFilter());
        break;
      case 'showMultiProperty':
        dispatch(toggleMultiPropertyFilter());
        break;
    }
  };

  const getOwnerProperties = (ownerId: string | number) => {
    const propertyIds = owners.byId?.[ownerId]?.properties || [];
    return propertyIds.map((id: string | number) => {
      const prop = properties.find((p: any) => p.pNumber === id);
      return (
        prop || {
          pNumber: id,
          project: 'Unknown',
          area: 'Unknown',
          status: 'Unknown',
        }
      );
    });
  };

  const getPropertyOwners = (property: any) => {
    if (!property?.owners) return [];
    return property.owners
      .map((ownerId: string | number) => owners.byId?.[ownerId])
      .filter(Boolean);
  };

  return {
    dispatch,
    properties,
    stats,
    filters,
    owners,
    filterOptions,
    activeFiltersCount,
    loading,
    showFeatures,
    setShowFeatures,
    showAddForm,
    setShowAddForm,
    editProperty,
    setEditProperty,
    selectedProperty,
    setSelectedProperty,
    showDetailModal,
    setShowDetailModal,
    selectedOwner,
    setSelectedOwner,
    showOwnerDrawer,
    setShowOwnerDrawer,
    showFilters,
    setShowFilters,
    selectedCluster,
    setSelectedCluster,
    activeToolTab,
    setActiveToolTab,
    handleOwnerClick,
    handlePropertyClick,
    handleFilterChange,
    handleClearFilters,
    handleFilterToggle,
    getOwnerProperties,
    getPropertyOwners,
  };
};

