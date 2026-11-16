import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../utils/authFetch';
import { PropertyDetails, StatusMessage, GalleryTabType } from './PropertyGalleryPage.types';

export function usePropertyGallery() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<GalleryTabType>('gallery');
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  useEffect(() => {
    if (!propertyId) return;
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`/api/crud/properties/${propertyId}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        const data = await response.json();
        setProperty(data);

        // Fetch similar properties
        const similarResponse = await authFetch(`/api/properties/${propertyId}/similar`);
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          setSimilarProperties(similarData);
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const images = property?.gallery || property?.images || (property?.image ? [property.image] : []);
  const currentImage = images[currentImageIndex] || '';

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share && property) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch {
        // user dismissed share dialog
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setStatusMessage({ type: 'success', text: 'Link copied to clipboard!' });
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await authFetch(`/api/favorites`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      });
      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch {
      // silent catch
    }
  };

  return {
    propertyId,
    property,
    images,
    currentImage,
    currentImageIndex,
    setCurrentImageIndex,
    isFullscreen,
    setIsFullscreen,
    isFavorite,
    similarProperties,
    loading,
    error,
    selectedTab,
    setSelectedTab,
    statusMessage,
    handlePrevImage,
    handleNextImage,
    handleShare,
    handleFavorite,
  };
}

