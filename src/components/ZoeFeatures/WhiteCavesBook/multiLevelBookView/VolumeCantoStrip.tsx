// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/VolumeCantoStrip.tsx
import React from 'react';
import { Layers } from 'lucide-react';
import { BookNode, CantoNode, VolumeNode } from '../treeTypes';

interface VolumeCantoStripProps {
  currentBook: BookNode;
  currentVolume: VolumeNode;
  currentCanto: CantoNode;
  selectVolume: (volId: string) => void;
  selectCanto: (cantoId: string) => void;
}

export const VolumeCantoStrip: React.FC<VolumeCantoStripProps> = ({
  currentBook,
  currentVolume,
  currentCanto,
  selectVolume,
  selectCanto,
}) => {
  return (
    <div className="px-5 py-2 bg-slate-950/95 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
      <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1 mr-2">
        <Layers className="w-3.5 h-3.5 text-sky-400" /> Volumes:
      </span>
      {currentBook.volumes.map(vol => (
        <button
          key={vol.nodeId}
          onClick={() => selectVolume(vol.nodeId)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
            vol.nodeId === currentVolume.nodeId
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span className="font-mono text-[10px] text-slate-500">L3: Vol {vol.volumeNumber}</span>
        </button>
      ))}

      <div className="h-4 w-[1px] bg-slate-800 mx-2" />

      <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Cantos:</span>
      {currentVolume.cantos.map(canto => (
        <button
          key={canto.nodeId}
          onClick={() => selectCanto(canto.nodeId)}
          className={`px-2.5 py-1 rounded text-xs font-medium transition whitespace-nowrap ${
            canto.nodeId === currentCanto.nodeId
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-900/40 text-slate-400 hover:text-slate-200'
          }`}
        >
          L4: Canto {canto.cantoNumber}
        </button>
      ))}
    </div>
  );
};
