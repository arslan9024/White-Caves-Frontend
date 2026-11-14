export const defaultSuggestedFeatures: string[] = [
  'swimming pool',
  'gym',
  'parking',
  'garden',
  'balcony',
  'terrace',
  'maid room',
  'laundry',
  'ac',
  'kitchen appliances',
  'security',
  'playground',
];

export const formatFeatureLabel = (f: string): string => {
  if (!f) return '';
  return f.charAt(0).toUpperCase() + f.slice(1);
};
