/**
 * VirtualTourModal.tsx — Modal viewer for VirtualTourGallery
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { type FC } from 'react';
import {
  ActionButton,
  CloseModalButton,
  ControlIcon,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ModalActions,
  ModalContent,
  ModalHeader,
  ModalInfo,
  ModalOverlay,
  StartTourButton,
  TourModal,
  TourViewer,
  ViewerControls,
  ViewerPlaceholder,
} from '../VirtualTourGallery.styles';
import type { VirtualTour } from './virtualTour.data';

interface VirtualTourModalProps {
  tour: VirtualTour;
  onClose: () => void;
}

export const VirtualTourModal: FC<VirtualTourModalProps> = ({ tour, onClose }) => (
  <TourModal>
    <ModalOverlay onClick={onClose} aria-label="Close virtual tour overlay" type="button" />
    <ModalContent role="dialog" aria-modal="true" aria-label={`Virtual tour: ${tour.title}`}>
      <CloseModalButton onClick={onClose} aria-label="Close virtual tour" type="button">
        ×
      </CloseModalButton>
      <ModalHeader>
        <h3>{tour.title}</h3>
        <p>
          {tour.location} | {tour.type}
        </p>
      </ModalHeader>
      <TourViewer>
        <ViewerPlaceholder>
          <img
            src={tour.thumbnail}
            alt={tour.title}
            loading="lazy"
            width={600}
            height={400}
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <ViewerControls>
            <ControlIcon>
              <span>360</span>
            </ControlIcon>
            <p>Click to start virtual tour</p>
            <StartTourButton href={tour.tourUrl} target="_blank" rel="noopener noreferrer">
              Launch Full Tour
            </StartTourButton>
          </ViewerControls>
        </ViewerPlaceholder>
      </TourViewer>
      <ModalInfo>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Bedrooms</InfoLabel>
            <InfoValue>{tour.beds}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Bathrooms</InfoLabel>
            <InfoValue>{tour.baths}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Area</InfoLabel>
            <InfoValue>{(tour.sqft ?? 0).toLocaleString()} sqft</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Price</InfoLabel>
            <InfoValue $price>AED {(tour.price ?? 0).toLocaleString()}</InfoValue>
          </InfoItem>
        </InfoGrid>
        <ModalActions>
          <ActionButton $variant="primary" aria-label="Schedule a property viewing" type="button">
            Schedule Viewing
          </ActionButton>
          <ActionButton $variant="secondary" aria-label="Contact the listing agent" type="button">
            Contact Agent
          </ActionButton>
          <ActionButton $variant="outline" aria-label="Download property brochure" type="button">
            Download Brochure
          </ActionButton>
        </ModalActions>
      </ModalInfo>
    </ModalContent>
  </TourModal>
);

export default VirtualTourModal;
