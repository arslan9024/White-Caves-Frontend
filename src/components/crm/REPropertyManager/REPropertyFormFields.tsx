import React, { FC } from 'react';
import type {
  REPropertyType,
  REPropertyPurpose,
} from './REPropertyManager.types';
import { PROPERTY_TYPES, PROPERTY_LOCATIONS } from './REPropertyManager.data';

export interface REPropertyFormFieldsProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const REPropertyFormFields: FC<REPropertyFormFieldsProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <>
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">Property Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Palm Jumeirah Ultra-Luxury Frond Villa"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          data-testid="input-property-title"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Purpose</label>
          <select
            value={formData.purpose}
            onChange={e =>
              setFormData({ ...formData, purpose: e.target.value as REPropertyPurpose })
            }
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="BUY">BUY (For Sale)</option>
            <option value="RENT">RENT (For Lease)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">
            Property Type
          </label>
          <select
            value={formData.propertyType}
            onChange={e =>
              setFormData({ ...formData, propertyType: e.target.value as REPropertyType })
            }
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            {PROPERTY_TYPES.filter(t => t !== 'All Types').map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Price (AED)</label>
          <input
            type="number"
            required
            value={formData.priceAED}
            onChange={e =>
              setFormData({ ...formData, priceAED: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
            data-testid="input-property-price"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Area (Sqft)</label>
          <input
            type="number"
            required
            value={formData.areaSqft}
            onChange={e =>
              setFormData({ ...formData, areaSqft: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">
            Location Community
          </label>
          <select
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            {PROPERTY_LOCATIONS.filter(l => l !== 'All Locations').map(l => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Sub-Location</label>
          <input
            type="text"
            value={formData.subLocation}
            onChange={e => setFormData({ ...formData, subLocation: e.target.value })}
            placeholder="e.g. Frond N Beachfront"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Bedrooms</label>
          <input
            type="number"
            value={formData.bedrooms}
            onChange={e =>
              setFormData({ ...formData, bedrooms: parseInt(e.target.value, 10) || 0 })
            }
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Bathrooms</label>
          <input
            type="number"
            value={formData.bathrooms}
            onChange={e =>
              setFormData({ ...formData, bathrooms: parseInt(e.target.value, 10) || 0 })
            }
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">
            Trakheesi Permit #
          </label>
          <input
            type="text"
            value={formData.trakheesiPermit}
            onChange={e => setFormData({ ...formData, trakheesiPermit: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Title Deed #</label>
          <input
            type="text"
            value={formData.dldTitleDeedNumber}
            onChange={e => setFormData({ ...formData, dldTitleDeedNumber: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
        />
      </div>
    </>
  );
};

