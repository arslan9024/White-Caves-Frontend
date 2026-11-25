/**
 * VirtualTourGallery.tsx — Immersive 360 Virtual Property Tours Gallery
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines) with backwards-compatible exports.
 */

import React, { useEffect, useMemo, useState } from 'react';
import type { HomepageProperty } from '../store/slices/homepageSlice';
import {
  AllToursSection,
  Badge,
  FeaturedSlider,
  FeaturedTourCard,
  FeaturedToursSection,
  GalleryHeader,
  HeaderContent,
  PlayButton,
  SpecItem,
  TourBadges,
  TourCard,
  TourContent,
  TourInfo,
  TourLocation,
  TourMetaRow,
  TourOverlay,
  TourPrice,
  ToursGrid,
  ToursList,
  TourSpecs,
  TourThumbnail,
  TourType,
  TourViews,
  ViewBtn,
  ViewControls,
  VirtualTourGalleryContainer,
} from './VirtualTourGallery.styles';
import {
  STATIC_VIRTUAL_TOURS,
  buildLiveTours,
  type VirtualTour,
} from './virtualTour/virtualTour.data';
import { VirtualTourModal } from './virtualTour/VirtualTourModal';

export { STATIC_VIRTUAL_TOURS, buildLiveTours, type VirtualTour };

interface VirtualTourGalleryProps {
  featuredProperties?: HomepageProperty[];
}

const VirtualTourGallery = ({ featuredProperties = [] }: VirtualTourGalleryProps) => {
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const virtualTours = useMemo(
    () =>
      featuredProperties.length > 0 ? buildLiveTours(featuredProperties) : STATIC_VIRTUAL_TOURS,
    [featuredProperties]
  );

  const featuredTours = virtualTours.filter(t => t.featured);
  const closeTour = () => setSelectedTour(null);

  useEffect(() => {
    if (!selectedTour) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTour();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedTour]);

  const AllToursContainer = viewMode === 'grid' ? ToursGrid : ToursList;

  return (
    <VirtualTourGalleryContainer>
      <GalleryHeader>
        <HeaderContent>
          <h2>Virtual Property Tours</h2>
          <p>Experience luxury properties with immersive 360 walkthroughs</p>
        </HeaderContent>
        <ViewControls>
          <ViewBtn
            $active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            type="button"
          >
            Grid
          </ViewBtn>
          <ViewBtn
            $active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            type="button"
          >
            List
          </ViewBtn>
        </ViewControls>
      </GalleryHeader>

      <FeaturedToursSection>
        <h3>Featured Virtual Tours</h3>
        <FeaturedSlider>
          {featuredTours.map(tour => (
            <FeaturedTourCard
              key={tour.id}
              onClick={() => setSelectedTour(tour)}
              aria-label={`View virtual tour of ${tour.title}`}
              type="button"
            >
              <TourThumbnail>
                <img
                  src={tour.thumbnail}
                  alt={tour.title}
                  loading="lazy"
                  width={280}
                  height={180}
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <TourOverlay>
                  <PlayButton>
                    <span>360</span>
                  </PlayButton>
                </TourOverlay>
                <TourBadges>
                  {tour.hasDrone && <Badge type="drone">Drone View</Badge>}
                  {tour.hasVideo && <Badge type="video">Video Tour</Badge>}
                </TourBadges>
              </TourThumbnail>
              <TourInfo>
                <h4>{tour.title}</h4>
                <TourLocation>{tour.location}</TourLocation>
                <TourSpecs>
                  <SpecItem>{tour.beds} Beds</SpecItem>
                  <SpecItem>{tour.baths} Baths</SpecItem>
                  <SpecItem>{(tour.sqft ?? 0).toLocaleString()} sqft</SpecItem>
                </TourSpecs>
                <TourMetaRow>
                  <TourPrice>AED {(tour.price ?? 0).toLocaleString()}</TourPrice>
                  <TourViews>{tour.views} views</TourViews>
                </TourMetaRow>
              </TourInfo>
            </FeaturedTourCard>
          ))}
        </FeaturedSlider>
      </FeaturedToursSection>

      <AllToursSection>
        <h3>All Virtual Tours</h3>
        <AllToursContainer>
          {virtualTours.map(tour => (
            <TourCard
              key={tour.id}
              onClick={() => setSelectedTour(tour)}
              aria-label={`View virtual tour of ${tour.title}`}
              type="button"
            >
              <TourThumbnail>
                <img
                  src={tour.thumbnail}
                  alt={tour.title}
                  loading="lazy"
                  width={280}
                  height={180}
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <TourOverlay>
                  <PlayButton>
                    <span>360</span>
                  </PlayButton>
                </TourOverlay>
                <TourBadges>
                  {tour.hasDrone && <Badge type="drone">Drone</Badge>}
                  {tour.hasVideo && <Badge type="video">Video</Badge>}
                </TourBadges>
                <TourType>{tour.type}</TourType>
              </TourThumbnail>
              <TourContent>
                <h4>{tour.title}</h4>
                <TourLocation>{tour.location}</TourLocation>
                <TourSpecs>
                  <SpecItem>{tour.beds} Beds</SpecItem>
                  <SpecItem>{tour.baths} Baths</SpecItem>
                  <SpecItem>{(tour.sqft ?? 0).toLocaleString()} sqft</SpecItem>
                </TourSpecs>
                <TourMetaRow>
                  <TourPrice>AED {(tour.price ?? 0).toLocaleString()}</TourPrice>
                  <TourViews>{tour.views} views</TourViews>
                </TourMetaRow>
              </TourContent>
            </TourCard>
          ))}
        </AllToursContainer>
      </AllToursSection>

      {selectedTour && <VirtualTourModal tour={selectedTour} onClose={closeTour} />}
    </VirtualTourGalleryContainer>
  );
};

export default VirtualTourGallery;
