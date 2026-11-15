export const DEFAULT_PROPERTY_FIELDS = [
  'referenceNo',
  'projectName',
  'area',
  'plotNo',
  'building',
  'unit',
  'bedrooms',
  'bathrooms',
  'area',
  'type',
  'status',
  'price',
  'rentPriceAnnual',
  'furnishing',
  'amenities',
  'description',
  'legalStatus',
  'occupancyStatus',
  'marketStatus',
];

export const DEFAULT_OWNER_FIELDS = [
  'name',
  'email',
  'phone',
  'nationality',
  'emiratesID',
  'passportNo',
  'address',
  'city',
  'country',
  'companyName',
  'companyRegistration',
  'companyTRN',
  'contactPerson',
];

export const COMMON_PATTERNS: Record<string, string[]> = {
  ref: ['reference', 'ref', 'id', 'referenceno'],
  project: ['project', 'projectname', 'project name'],
  area: ['area', 'area name', 'location'],
  plotNo: ['plot', 'plott no', 'plot number'],
  building: ['building', 'bldg', 'building name'],
  unit: ['unit', 'unit no', 'apartment'],
  bedrooms: ['bedroom', 'bed', 'br', 'bedrooms', 'bed rooms'],
  bathrooms: ['bathroom', 'bath', 'bathrooms', 'bath rooms'],
  type: ['type', 'property type', 'propertytype'],
  price: ['price', 'salePrice', 'sale price'],
  rent: ['rent', 'rental', 'annual rent'],
  furnishing: ['furnish', 'furnished', 'furnishing'],
  name: ['name', 'owner name', 'ownername', 'client name'],
  email: ['email', 'email address'],
  phone: ['phone', 'mobile', 'contact', 'phone number'],
  emiratesID: ['emirates id', 'eid', 'id number', 'emiratesid'],
  passportNo: ['passport', 'passport no', 'passportno'],
};

export const autoDetectMapping = (cols: string[]): Record<string, string> => {
  const detected: Record<string, string> = {};

  cols.forEach(col => {
    const lowerCol = col.toLowerCase().trim();
    for (const [fieldKey, patterns] of Object.entries(COMMON_PATTERNS)) {
      if (patterns.some(p => lowerCol.includes(p))) {
        detected[col] = fieldKey;
        break;
      }
    }
  });

  return detected;
};
