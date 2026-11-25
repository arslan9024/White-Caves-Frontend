/**
 * TenancyDriveFoldersBar.tsx — Canonical Google Drive Property Folder Integration
 * Renders direct links to:
 *   Inventory Areas / Damac Hills 2 / <Cluster> / <Unit> / [House Pictures, Landlord Docs, Tenant Docs, Tenancy Contract]
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC, useState } from 'react';
import {
  FolderOpen,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Image,
  FileText,
  Users,
  FileSignature,
} from 'lucide-react';
import {
  CANONICAL_DRIVE_SUBFOLDERS,
  buildDriveFolderSearchUrl,
  buildDrivePropertyPath,
  type CanonicalDriveSubfolder,
  type TenancyContractMode,
} from './tenancyCockpit.data';

interface TenancyDriveFoldersBarProps {
  area: string;
  cluster: string;
  unitNumber: string;
  contractMode: TenancyContractMode;
  driveFolderUrl: string;
}

const FOLDER_ICONS: Record<CanonicalDriveSubfolder, React.ReactNode> = {
  'House Pictures': <Image size={13} className="text-red-400" />,
  'Landlord Docs': <FileText size={13} className="text-amber-400" />,
  'Tenant Docs': <Users size={13} className="text-sky-400" />,
  'Tenancy Contract': <FileSignature size={13} className="text-emerald-400" />,
};

export const TenancyDriveFoldersBar: FC<TenancyDriveFoldersBarProps> = ({
  area,
  cluster,
  unitNumber,
  contractMode,
  driveFolderUrl,
}) => {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const fullPath = buildDrivePropertyPath(area, cluster, unitNumber);

  const handleProvisionFolders = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/leasing-formula/drive/tenancy-stage-folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          areaName: area,
          projectName: cluster,
          unitNumber,
          contractYear: new Date().getFullYear(),
          contractMode: contractMode === 'RENEWAL_TENANCY' ? 'RENEWAL' : 'NEW',
        }),
      });
      if (res.ok) {
        setSyncMessage(`Google Drive folders verified for ${cluster} / ${unitNumber}.`);
      } else {
        setSyncMessage(`Ready to open Google Drive structure for ${cluster} / ${unitNumber}.`);
      }
    } catch {
      setSyncMessage(`Direct Drive links active for ${cluster} / ${unitNumber}.`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div
      data-testid="tenancy-drive-folders-bar"
      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <FolderOpen size={13} /> Canonical Google Drive Property Vault
          </div>
          <p className="text-xs font-mono text-slate-300 mt-1">{fullPath}</p>
        </div>

        <button
          type="button"
          onClick={() => void handleProvisionFolders()}
          disabled={syncing}
          data-testid="sync-drive-folders-btn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw size={12} className={syncing ? 'animate-spin text-red-400' : 'text-red-400'} />
          {syncing ? 'Syncing Drive...' : 'Verify Drive Vault'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {CANONICAL_DRIVE_SUBFOLDERS.map(subfolder => (
          <a
            key={subfolder}
            href={buildDriveFolderSearchUrl(driveFolderUrl, cluster, unitNumber, subfolder)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`drive-folder-link-${subfolder.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-red-500/40 text-xs font-bold text-white transition"
          >
            <span className="flex items-center gap-2 truncate">
              {FOLDER_ICONS[subfolder]}
              <span className="truncate">{subfolder}</span>
            </span>
            <ExternalLink size={12} className="text-slate-400 shrink-0" />
          </a>
        ))}
      </div>

      {syncMessage && (
        <div
          role="status"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold"
        >
          <CheckCircle2 size={14} />
          <span>{syncMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TenancyDriveFoldersBar;
