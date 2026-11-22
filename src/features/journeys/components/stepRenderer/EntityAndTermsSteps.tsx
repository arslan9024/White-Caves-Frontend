import React, { type FC } from 'react';

interface StepDataProps {
  data: Record<string, any>;
  onUpdateData: (patch: Record<string, unknown>) => void;
}

export const EntitySelectionStep: FC<StepDataProps> = ({ data, onUpdateData }) => (
  <div className="space-y-6">
    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
        Search or Select Unit
      </label>
      <div className="relative">
        <input
          type="text"
          value={data.propertyName || ''}
          onChange={e => onUpdateData({ propertyName: e.target.value })}
          placeholder="Search by unit name, community, title deed..."
          className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
        />
        <span className="absolute right-3 top-2.5 text-slate-400 text-sm">🔍</span>
      </div>
    </div>

    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 rounded-2xl border border-amber-500/30 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
            🏠
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {data.propertyName || 'Sycamore 131'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
                Verified
              </span>
            </div>
            <p className="text-xs text-amber-400/90 font-medium mt-0.5">
              {data.community || 'DAMAC Hills 2'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {data.propertyType || '3 Bedroom Townhouse'}
            </p>
          </div>
        </div>

        <div className="text-right text-xs">
          <div className="text-slate-400">
            Plot:{' '}
            <span className="text-slate-200 font-semibold">{data.plotArea || '1,882 sqft'}</span>
          </div>
          <div className="text-slate-400 mt-0.5">
            BUA:{' '}
            <span className="text-slate-200 font-semibold">{data.buaArea || '2,460 sqft'}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 px-3 py-2 rounded-lg border border-emerald-500/20">
          <span>✓</span>
          <span>Property verified</span>
        </div>
        <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 px-3 py-2 rounded-lg border border-emerald-500/20">
          <span>✓</span>
          <span>Unit available</span>
        </div>
        <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 px-3 py-2 rounded-lg border border-emerald-500/20">
          <span>✓</span>
          <span>Landlord linked</span>
        </div>
      </div>
    </div>
  </div>
);

interface EntityReviewStepProps extends StepDataProps {
  isLandlord: boolean;
}

export const EntityReviewStep: FC<EntityReviewStepProps> = ({ data, onUpdateData, isLandlord }) => {
  const entityPrefix = isLandlord ? 'landlord' : 'tenant';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-300">
        <div className="flex items-center space-x-2">
          <span>ℹ️</span>
          <span>
            Source:{' '}
            <strong className="text-white">
              {isLandlord ? 'Property Owner Record' : 'Tenant Registry / Lead'}
            </strong>{' '}
            (Auto-imported)
          </span>
        </div>
        <span className="text-emerald-400 font-semibold">✓ Synchronized</span>
      </div>

      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/70 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {data[`${entityPrefix}Name`] || (isLandlord ? 'Arslan Malik' : 'Sarah Jenkins')}
              </h3>
              <span className="text-xs text-amber-400 font-medium">
                {isLandlord ? 'Verified Property Owner' : 'Verified Prospective Tenant'}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            KYC Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              value={data[`${entityPrefix}Name`] || ''}
              onChange={e => onUpdateData({ [`${entityPrefix}Name`]: e.target.value })}
              className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Emirates ID</label>
            <div className="relative">
              <input
                type="text"
                value={data[`${entityPrefix}EmiratesId`] || ''}
                onChange={e => onUpdateData({ [`${entityPrefix}EmiratesId`]: e.target.value })}
                placeholder="784-XXXX-XXXXXXX-X"
                className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
              {data[`${entityPrefix}EmiratesId`] && (
                <span className="absolute right-3 top-2 text-emerald-400 text-xs font-bold">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={data[`${entityPrefix}Email`] || ''}
              onChange={e => onUpdateData({ [`${entityPrefix}Email`]: e.target.value })}
              className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mobile Number
            </label>
            <input
              type="tel"
              value={data[`${entityPrefix}Phone`] || ''}
              onChange={e => onUpdateData({ [`${entityPrefix}Phone`]: e.target.value })}
              className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContractTermsStep: FC<StepDataProps> = ({ data, onUpdateData }) => {
  const annualRent = Number(data.annualRent) || 95000;
  const chequesCount = Number(data.chequesCount) || 2;
  const depositPct = Number(data.securityDepositPct) || 5;
  const perChequeAmount = chequesCount > 0 ? Math.round(annualRent / chequesCount) : annualRent;
  const depositAmount = Math.round(annualRent * (depositPct / 100));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/70 space-y-4">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Transaction Terms
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Annual Rent (AED)
            </label>
            <input
              type="number"
              value={data.annualRent || ''}
              onChange={e => onUpdateData({ annualRent: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-base font-bold text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Payment Frequency
              </label>
              <select
                value={data.chequesCount || 2}
                onChange={e => onUpdateData({ chequesCount: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                <option value={1}>1 Cheque</option>
                <option value={2}>2 Cheques</option>
                <option value={4}>4 Cheques</option>
                <option value={6}>6 Cheques</option>
                <option value={12}>12 Cheques</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Security Deposit
              </label>
              <select
                value={data.securityDepositPct || 5}
                onChange={e => onUpdateData({ securityDepositPct: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                <option value={5}>5% (Unfurnished)</option>
                <option value={10}>10% (Furnished)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={data.startDate || '2026-09-01'}
                onChange={e => onUpdateData({ startDate: e.target.value })}
                className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">End Date</label>
              <input
                type="date"
                value={data.endDate || '2027-08-31'}
                onChange={e => onUpdateData({ endDate: e.target.value })}
                className="w-full bg-slate-800 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Live Contract Summary
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                Auto-calculated
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-700/60">
                <span className="text-slate-400">Annual Rent</span>
                <span className="font-bold text-white">AED {annualRent.toLocaleString()}</span>
              </div>

              {Array.from({ length: Math.min(chequesCount, 4) }).map((_, idx) => (
                <div key={idx} className="flex justify-between py-1.5 text-xs">
                  <span className="text-slate-400">
                    Cheque {idx + 1} ({Math.round(100 / chequesCount)}%)
                  </span>
                  <span className="font-semibold text-slate-200">
                    AED {perChequeAmount.toLocaleString()}
                  </span>
                </div>
              ))}
              {chequesCount > 4 && (
                <div className="text-[11px] text-slate-500 italic text-right">
                  + {chequesCount - 4} additional cheques @ AED {perChequeAmount.toLocaleString()}
                </div>
              )}

              <div className="flex justify-between py-2 border-t border-slate-700/60 text-amber-300">
                <span className="font-medium">Security Deposit ({depositPct}%)</span>
                <span className="font-bold">AED {depositAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
            💡 Tenancy contract will automatically generate the post-dated cheque schedule with
            these exact amounts.
          </div>
        </div>
      </div>
    </div>
  );
};
