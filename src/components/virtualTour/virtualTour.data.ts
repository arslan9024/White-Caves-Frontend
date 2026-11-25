/**
 * virtualTour.data.ts — Data types & builders for VirtualTourGallery
 * Single-purpose module (< 350 lines, AEG-042).
 */

import type { HomepageProperty } from '../../store/slices/homepageSlice';

export interface VirtualTour {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  thumbnail: string;
  tourUrl: string;
  hasDrone: boolean;
  hasVideo: boolean;
  views: number;
  featured: boolean;
}

export const STATIC_VIRTUAL_TOURS: VirtualTour[] = [
  {
    id: 1,
    title: 'Luxury Penthouse - Downtown Dubai',
    location: 'Downtown Dubai',
    price: 15000000,
    type: 'Penthouse',
    beds: 4,
    baths: 5,
    sqft: 8500,
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    tourUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    hasDrone: true,
    hasVideo: true,
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: 'Beachfront Villa - Palm Jumeirah',
    location: 'Palm Jumeirah',
    price: 45000000,
    type: 'Villa',
    beds: 6,
    baths: 7,
    sqft: 12000,
    thumbnail: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800',
    tourUrl: 'https://my.matterport.com/show/?m=sample2',
    hasDrone: true,
    hasVideo: true,
    views: 2340,
    featured: true,
  },
  {
    id: 3,
    title: 'Modern Apartment - Dubai Marina',
    location: 'Dubai Marina',
    price: 3500000,
    type: 'Apartment',
    beds: 2,
    baths: 3,
    sqft: 1800,
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    tourUrl: 'https://my.matterport.com/show/?m=sample3',
    hasDrone: false,
    hasVideo: true,
    views: 890,
    featured: false,
  },
  {
    id: 4,
    title: 'Golf Course Villa - Emirates Hills',
    location: 'Emirates Hills',
    price: 28000000,
    type: 'Villa',
    beds: 5,
    baths: 6,
    sqft: 9500,
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    tourUrl: 'https://my.matterport.com/show/?m=sample4',
    hasDrone: true,
    hasVideo: true,
    views: 1680,
    featured: true,
  },
  {
    id: 5,
    title: 'Waterfront Townhouse - Dubai Creek',
    location: 'Dubai Creek Harbour',
    price: 5800000,
    type: 'Townhouse',
    beds: 4,
    baths: 4,
    sqft: 3200,
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    tourUrl: 'https://my.matterport.com/show/?m=sample5',
    hasDrone: false,
    hasVideo: true,
    views: 720,
    featured: false,
  },
  {
    id: 6,
    title: 'Sky Collection Apartment - DIFC',
    location: 'DIFC',
    price: 8500000,
    type: 'Apartment',
    beds: 3,
    baths: 4,
    sqft: 3800,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    tourUrl: 'https://my.matterport.com/show/?m=sample6',
    hasDrone: true,
    hasVideo: true,
    views: 1120,
    featured: true,
  },
];

export function buildLiveTours(featuredProperties: HomepageProperty[] = []): VirtualTour[] {
  return featuredProperties.slice(0, 6).map((property, index) => ({
    id: Number(property.id) || index + 101,
    title: `${property.title} - ${property.location}`,
    location: property.location,
    price: property.price,
    type: property.type,
    beds: property.bedrooms,
    baths: property.bathrooms,
    sqft: property.sqft,
    thumbnail:
      property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    tourUrl: `${window.location.origin}/properties/${property.id}`,
    hasDrone: property.price >= 10_000_000 || property.sqft >= 5000,
    hasVideo: true,
    views: 900 + index * 175,
    featured: index < 4,
  }));
}
