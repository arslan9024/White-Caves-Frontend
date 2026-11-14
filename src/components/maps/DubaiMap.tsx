/**
 * DubaiMap — Interactive Property Map Component
 * ==============================================
 * Leaflet-based map showing Dubai properties as markers with:
 * - Price tooltips on hover
 * - Cluster grouping when zoomed out
 * - Community boundary circles
 * - Click-to-filter integration with Redux propertySlice
 * - Brand Red (#E31E24) + White theme pins
 */

import React, { FC, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../store/propertySlice';
import { colors } from '../../styles/theme/colors';
import { formatPrice } from '../../utils';
import {
  DUBAI_CENTER,
  DEFAULT_ZOOM,
  COMMUNITY_COORDS,
  getCommunityCoords,
  jitterCoords,
  type CommunityCoords,
} from './dubaiCoordinates';
import './DubaiMap.css';
import { MapProperty, DubaiMapProps } from './DubaiMap.types';
import { PropertyMarkerPopup, DubaiMapLegend } from './DubaiMap.components';

/* ─── Fix Leaflet default marker icon in bundler environments ───── */
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

type LeafletDefaultIconPrototype = {
  _getIconUrl?: unknown;
};

const defaultIconPrototype = L.Icon.Default.prototype as unknown as LeafletDefaultIconPrototype;
delete defaultIconPrototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type { MapProperty, DubaiMapProps };

const resolveHeightClass = (height: string): string => {
  const value = height.trim().toLowerCase();
  switch (value) {
    case '300px':
      return 'map-height-300';
    case '350px':
      return 'map-height-350';
    case '400px':
      return 'map-height-400';
    case '450px':
      return 'map-height-450';
    case '500px':
      return 'map-height-500';
    default:
      return 'map-height-600';
  }
};

/* ─── Custom Marker Icon ────────────────────────────────────────── */

function createMarkerIcon(featured: boolean = false): L.DivIcon {
  const bg = featured ? colors.primary : colors.secondary;
  const border = featured ? colors.primaryDark : colors.secondaryDark;
  return L.divIcon({
    className: 'dubai-map-marker-wrapper',
    html: `
      <div class="dubai-map-marker" style="background:${bg};border-color:${border}">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
          <polyline points="9 22 9 12 15 12 15 22" fill="rgba(255,255,255,0.4)"/>
        </svg>
      </div>
      <div class="dubai-map-marker-stem"></div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -44],
  });
}

const featuredIcon = createMarkerIcon(true);
const standardIcon = createMarkerIcon(false);

/* ─── Map Fit Helper ────────────────────────────────────────────── */

const FitBounds: FC<{ markers: [number, number][] }> = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    if (markers.length === 0) return;
    if (markers.length === 1) {
      map.setView(markers[0], 14);
      return;
    }
    const bounds = L.latLngBounds(markers.map(([lat, lng]) => [lat, lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [map, markers]);
  return null;
};

const ViewportReporter: FC<{
  onViewportChange: (bounds: { north: number; south: number; east: number; west: number }) => void;
}> = ({ onViewportChange }) => {
  useMapEvents({
    moveend: map => {
      const bounds = map.target.getBounds();
      onViewportChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    },
  });

  return null;
};

/* ─── Main Component ────────────────────────────────────────────── */

const DubaiMap: FC<DubaiMapProps> = ({
  properties,
  activePropertyId,
  onPropertyClick,
  onViewportChange,
  defaultCenter = DUBAI_CENTER,
  defaultZoom = DEFAULT_ZOOM,
  showCommunities = true,
  height = '600px',
  className = '',
}) => {
  const dispatch = useDispatch();
  const mapRef = useRef<L.Map | null>(null);
  const heightClass = resolveHeightClass(height);

  // Build marker positions
  const markers = useMemo(() => {
    const locationIndices: Record<string, number> = {};
    return properties.map(prop => {
      const community = getCommunityCoords(prop.location);
      const baseLat = community?.lat ?? DUBAI_CENTER[0];
      const baseLng = community?.lng ?? DUBAI_CENTER[1];
      const idx = locationIndices[prop.location] ?? 0;
      locationIndices[prop.location] = idx + 1;
      const [lat, lng] = jitterCoords(baseLat, baseLng, idx);
      return { ...prop, lat, lng };
    });
  }, [properties]);

  const markerPositions = useMemo<[number, number][]>(
    () => markers.map(m => [m.lat, m.lng]),
    [markers]
  );

  const communityStats = useMemo(() => {
    const stats = new Map<string, { count: number; avgPrice: number }>();
    properties.forEach(p => {
      const entry = stats.get(p.location) ?? { count: 0, avgPrice: 0 };
      entry.count += 1;
      entry.avgPrice += p.price;
      stats.set(p.location, entry);
    });
    stats.forEach(entry => {
      entry.avgPrice = Math.round(entry.avgPrice / entry.count);
    });
    return stats;
  }, [properties]);

  const handleCommunityClick = useCallback(
    (community: CommunityCoords) => {
      dispatch(setFilters({ locations: [community.name] }));
    },
    [dispatch]
  );

  return (
    <div
      className={`dubai-map-container ${heightClass} ${className}`.trim()}
      data-testid="dubai-map"
      style={height ? { height } : undefined}
    >
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="dubai-map-leaflet"
        ref={mapRef}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds markers={markerPositions} />
        {onViewportChange ? <ViewportReporter onViewportChange={onViewportChange} /> : null}

        {showCommunities &&
          COMMUNITY_COORDS.map(community => {
            const stats = communityStats.get(community.name);
            const hasProperties = Boolean(stats && stats.count > 0);
            return (
              <Circle
                key={community.name}
                center={[community.lat, community.lng]}
                radius={community.radius}
                pathOptions={{
                  color: hasProperties ? colors.primary : '#94A3B8',
                  fillColor: hasProperties ? colors.primary : '#94A3B8',
                  fillOpacity: hasProperties ? 0.15 : 0.05,
                  weight: hasProperties ? 2 : 1,
                  dashArray: hasProperties ? undefined : '4 4',
                }}
              >
                <Popup className="community-popup">
                  <div className="community-popup-content">
                    <h4>{community.name}</h4>
                    <p className="community-desc">{community.description}</p>
                    {stats && (
                      <div className="community-stats">
                        <span>
                          {stats.count} {stats.count === 1 ? 'property' : 'properties'}
                        </span>
                        <span>Avg: {formatPrice(stats.avgPrice)}</span>
                      </div>
                    )}
                    <button
                      className="community-filter-btn"
                      onClick={() => handleCommunityClick(community)}
                    >
                      View Properties →
                    </button>
                  </div>
                </Popup>
              </Circle>
            );
          })}

        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={marker.featured ? featuredIcon : standardIcon}
            eventHandlers={{
              click: () => onPropertyClick?.(marker),
            }}
          >
            <PropertyMarkerPopup
              marker={marker}
              isActive={activePropertyId === marker.id}
              onPropertyClick={onPropertyClick}
            />
          </Marker>
        ))}
      </MapContainer>

      <DubaiMapLegend />
    </div>
  );
};

export default React.memo(DubaiMap);
