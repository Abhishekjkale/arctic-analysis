import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Crosshair, MapPin, FileText } from 'lucide-react';
import { MindMapNodeData } from '../../data/mindMapData.ts';

const PILLAR_ACCENTS = {
  nexus: 'border-zinc-700 hover:border-cyan-500/80',
  security: 'border-rose-900/60 hover:border-rose-500/80',
  trade: 'border-sky-900/60 hover:border-sky-500/80',
  resources: 'border-amber-900/60 hover:border-amber-500/80',
  climate: 'border-emerald-900/60 hover:border-emerald-500/80',
};

const PILLAR_BADGES = {
  nexus: 'bg-zinc-800 text-zinc-300',
  security: 'bg-rose-950/70 text-rose-300 border-rose-800/50',
  trade: 'bg-sky-950/70 text-sky-300 border-sky-800/50',
  resources: 'bg-amber-950/70 text-amber-300 border-amber-800/50',
  climate: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/50',
};

export const CustomLeafNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as MindMapNodeData;
  const borderClass = PILLAR_ACCENTS[nodeData.pillar] || PILLAR_ACCENTS.nexus;
  const badgeClass = PILLAR_BADGES[nodeData.pillar] || PILLAR_BADGES.nexus;

  return (
    <div
      className={`relative min-w-[240px] max-w-[290px] rounded-lg border bg-zinc-950/95 p-3 backdrop-blur-sm transition-all duration-200 cursor-pointer ${
        selected ? 'ring-2 ring-cyan-400 scale-[1.03] shadow-[0_0_25px_rgba(34,211,238,0.35)] !border-cyan-400' : ''
      } ${borderClass}`}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-zinc-700 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-zinc-700 !border-2 !border-zinc-950" />
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-zinc-700 !border-2 !border-zinc-950" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-zinc-700 !border-2 !border-zinc-950" />

      {/* Header */}
      <div className="flex items-start justify-between gap-1.5 mb-1.5">
        <h4 className="text-xs font-semibold text-zinc-100 font-mono tracking-tight leading-snug">
          {nodeData.label}
        </h4>
        {nodeData.threatLevel && (
          <span className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded border font-medium uppercase tracking-wider shrink-0 ${badgeClass}`}>
            {nodeData.threatLevel}
          </span>
        )}
      </div>

      <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed mb-2">
        {nodeData.subtitle}
      </p>

      {/* Footer Tags */}
      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1.5 border-t border-zinc-900">
        {nodeData.mapTarget ? (
          <div className="flex items-center gap-1 text-cyan-400 font-medium">
            <MapPin className="w-2.5 h-2.5" />
            <span className="truncate max-w-[120px]">{nodeData.mapTarget.hotspotName}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-zinc-400">
            <FileText className="w-2.5 h-2.5" />
            <span>Policy Vector</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300">
          <Crosshair className="w-2.5 h-2.5" />
          <span>Detail</span>
        </div>
      </div>
    </div>
  );
};
