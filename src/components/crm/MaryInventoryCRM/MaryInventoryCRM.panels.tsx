import React from 'react';
import { XCircle, Home, MapPin, Users } from 'lucide-react';
import FullScreenDetailModal from '../../../shared/components/ui/FullScreenDetailModal';
import PropertyDetailsCard from '../inventory/PropertyDetailsCard';
import DamacAssetFetcher from '../inventory/DamacAssetFetcher';
import ImageDataExtractor from '../inventory/ImageDataExtractor';
import WebDataHarvester from '../inventory/WebDataHarvester';
import { DATA_TOOLS } from './MaryInventoryCRM.data';

interface DataToolsSectionProps {
  activeToolTab: string;
  setActiveToolTab: (tab: string | null) => void;
  selectedProperty: any;
}

export const DataToolsSection: React.FC<DataToolsSectionProps> = ({
  activeToolTab,
  setActiveToolTab,
  selectedProperty,
}) => (
  <div className="data-tools-section">
    <div className="tool-tabs">
      {DATA_TOOLS.map(tool => (
        <button
          key={tool.id}
          className={`tool-tab ${activeToolTab === tool.id ? 'active' : ''}`}
          onClick={() => setActiveToolTab(tool.id)}
          style={{ '--tab-color': tool.color } as any}
        >
          <tool.icon size={16} />
          {tool.label}
        </button>
      ))}
      <button className="tool-tab close" onClick={() => setActiveToolTab(null)}>
        <XCircle size={16} />
      </button>
    </div>
    <div className="tool-content">
      {activeToolTab === 'assets' && <DamacAssetFetcher selectedProperty={selectedProperty} />}
      {activeToolTab === 'ocr' && <ImageDataExtractor onDataExtracted={() => {}} />}
      {activeToolTab === 'harvester' && <WebDataHarvester onDataHarvested={() => {}} />}
    </div>
  </div>
);

interface ActiveFilterTagsProps {
  filters: any;
  onMultiOwnerToggle: () => void;
  onMultiPhoneToggle: () => void;
  onMultiPropertyToggle: () => void;
  onFilterChange: (key: string, val: any) => void;
}

export const ActiveFilterTags: React.FC<ActiveFilterTagsProps> = ({
  filters,
  onMultiOwnerToggle,
  onMultiPhoneToggle,
  onMultiPropertyToggle,
  onFilterChange,
}) => (
  <div className="active-filters">
    {filters.showMultiOwner && (
      <span className="filter-tag" onClick={onMultiOwnerToggle}>
        Multi-Owner Only <XCircle size={14} />
      </span>
    )}
    {filters.showMultiPhone && (
      <span className="filter-tag" onClick={onMultiPhoneToggle}>
        Multi-Phone Only <XCircle size={14} />
      </span>
    )}
    {filters.showMultiProperty && (
      <span className="filter-tag" onClick={onMultiPropertyToggle}>
        Multi-Property Owners <XCircle size={14} />
      </span>
    )}
    {filters.layout && (
      <span className="filter-tag" onClick={() => onFilterChange('layout', null)}>
        Layout: {filters.layout} <XCircle size={14} />
      </span>
    )}
    {filters.status && (
      <span className="filter-tag" onClick={() => onFilterChange('status', null)}>
        Status: {filters.status} <XCircle size={14} />
      </span>
    )}
    {filters.view && (
      <span className="filter-tag" onClick={() => onFilterChange('view', null)}>
        View: {filters.view} <XCircle size={14} />
      </span>
    )}
  </div>
);

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty: any;
  getPropertyOwners: (prop: any) => any[];
  handleOwnerClick: (owner: any) => void;
  setEditProperty: (prop: any) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  getPropertyOwners,
  handleOwnerClick,
  setEditProperty,
}) => (
  <FullScreenDetailModal
    isOpen={isOpen}
    onClose={onClose}
    title={selectedProperty?.pNumber || 'Property Details'}
    subtitle={`${selectedProperty?.cluster || ''} - ${selectedProperty?.area || ''}`}
    images={[]}
    tabs={[
      {
        label: 'All Details',
        icon: Home,
        content: selectedProperty && (
          <PropertyDetailsCard
            property={selectedProperty}
            owners={getPropertyOwners(selectedProperty)}
            onOwnerClick={handleOwnerClick}
          />
        ),
      },
      {
        label: 'Location',
        icon: MapPin,
        content: selectedProperty && (
          <div className="detail-location">
            <div className="detail-section">
              <h3>Location Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Area</span>
                  <span className="value">{selectedProperty.area || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Project</span>
                  <span className="value">{selectedProperty.project || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Cluster</span>
                  <span className="value">{selectedProperty.cluster || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Master Project</span>
                  <span className="value">{selectedProperty.masterProject || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Building</span>
                  <span className="value">{selectedProperty.building || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Unit Number</span>
                  <span className="value">{selectedProperty.unitNumber || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Floor</span>
                  <span className="value">{selectedProperty.floor || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Municipality No</span>
                  <span className="value">{selectedProperty.municipalityNo || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: 'Owners',
        icon: Users,
        content: selectedProperty && (
          <div className="owners-tab">
            <h3>Property Owners ({selectedProperty.owners?.length || 0})</h3>
            <div className="owners-list">
              {getPropertyOwners(selectedProperty).map((owner: any) => (
                <div key={owner.id} className="owner-card" onClick={() => handleOwnerClick(owner)}>
                  <div className="owner-avatar">{(owner.name || 'U').charAt(0)}</div>
                  <div className="owner-info">
                    <span className="owner-name">{owner.name}</span>
                    <span className="owner-contacts">
                      {owner.contacts?.length || 0} contact(s)
                      {owner.dateOfBirth && ` | DOB: ${owner.dateOfBirth}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ]}
    actions={[
      {
        label: 'Edit Property',
        onClick: () => {
          onClose();
          setEditProperty(selectedProperty);
        },
      },
      {
        label: 'Contact Owner',
        primary: true,
        onClick: () => {
          const owners = getPropertyOwners(selectedProperty);
          if (owners.length > 0) {
            handleOwnerClick(owners[0]);
          }
        },
      },
    ]}
  />
);

