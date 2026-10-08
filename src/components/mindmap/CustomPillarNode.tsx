import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Shield, Anchor, Pickaxe, CloudSnow, Globe, Crosshair } from 'lucide-react';
import { MindMapNodeData } from '../../data/mindMapData.ts';

const PILLAR_CONFIG = {
  nexus: {
    icon: Globe,
    border: 'border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.3)]',
    badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50',
    titleColor: 'text-cyan-100',
    headerBg: 'bg-gradient-to-r from-cyan-950/90 to-blue-950/80',
    handleColor: '#06b6d4',
  },
  security: {
    icon: Shield,
    border: 'border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.25)]',
    badge: 'bg-rose-950/80 text-rose-300 border-rose-700/50',
    titleColor: 'text-rose-100',
    headerBg: 'bg-gradient-to-r from-rose-950/80 to-zinc-900',
    handleColor: '#f43f5e',
  },
  trade: {
    icon: Anchor,
    border: 'border-sky-500/60 shadow-[0_0_20px_rgba(56,189,248,0.25)]',
    badge: 'bg-sky-950/80 text-sky-300 border-sky-700/50',
    titleColor: 'text-sky-100',
    headerBg: 'bg-gradient-to-r from-sky-950/80 to-zinc-900',
    handleColor: '#38bdf8',
  },
  resources: {
    icon: Pickaxe,
    border: 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    badge: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
    titleColor: 'text-amber-100',
    headerBg: 'bg-gradient-to-r from-amber-950/80 to-zinc-900',
    handleColor: '#f59e0b',
  },
  climate: {
    icon: CloudSnow,
    border: 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50',
    titleColor: 'text-emerald-100',
    headerBg: 'bg-gradient-to-r from-emerald-950/80 to-zinc-900',
    handleColor: '#10b981',
  },
};

export const CustomPillarNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as MindMapNodeData;
  const cfg = PILLAR_CONFIG[nodeData.pillar] || PILLAR_CONFIG.nexus;
  const Icon = cfg.icon;

  return (
    <div
      className={`relative min-w-[280px] max-w-[340px] rounded-xl border bg-zinc-950/95 backdrop-blur-md transition-all duration-300 ${
        selected ? 'ring-2 ring-cyan-400 scale-[1.02] shadow-[0_0_35px_rgba(34,211,238,0.4)]' : ''
      } ${cfg.border}`}
    >
      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-900" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-900" />
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-900" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-900" />

      {/* Card Header */}
      <div className={`px-4 py-3 border-b border-zinc-800/80 rounded-t-xl flex items-center justify-between ${cfg.headerBg}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-700/60 text-zinc-200">
            <Icon className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 block">PILLAR STRATEGY</span>
            <h3 className={`text-xs font-bold font-mono tracking-wide ${cfg.titleColor}`}>{nodeData.label}</h3>
          </div>
        </div>
        {nodeData.threatLevel && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${cfg.badge}`}>
            {nodeData.threatLevel}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-3.5 space-y-2.5">
        <p className="text-[11px] font-medium text-zinc-300 leading-snug">{nodeData.subtitle}</p>
        <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-3">{nodeData.summary}</p>

        {/* Metrics Grid */}
        {nodeData.metrics && nodeData.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-zinc-900">
            {nodeData.metrics.slice(0, 4).map((m, idx) => (
              <div key={idx} className="bg-zinc-900/70 p-1.5 rounded border border-zinc-800/70">
                <span className="text-[9px] text-zinc-400 block font-mono leading-none truncate">{m.label}</span>
                <span className="text-[10px] font-bold text-zinc-200 font-mono mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action footnote */}
        <div className="flex items-center justify-between pt-1 text-[9px] text-zinc-400 font-mono border-t border-zinc-900">
          <span className="flex items-center gap-1 text-cyan-400/90">
            <Crosshair className="w-2.5 h-2.5 animate-pulse" /> Click to Inspect & Pan Map
          </span>
          <span>{nodeData.citations.length} Sources</span>
        </div>
      </div>
    </div>
  );
};
