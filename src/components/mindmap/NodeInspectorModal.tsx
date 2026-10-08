import React from 'react';
import { Node } from '@xyflow/react';
import { MindMapNodeData } from '../../data/mindMapData.ts';
import { soundFx } from '../../utils/soundEffects.ts';
import {
  X,
  MapPin,
  FileText,
  Quote,
  Shield,
  ExternalLink,
  Users,
  BarChart3,
  Crosshair,
  Compass,
} from 'lucide-react';

interface NodeInspectorModalProps {
  node: Node<MindMapNodeData> | null;
  onClose: () => void;
  onPanToMap: (target: { lat: number; lng: number; zoom: number; hotspotId: string; hotspotName: string }) => void;
  onOpenPdfModal: (reportId: string, pageNumber?: number) => void;
}

export const NodeInspectorModal: React.FC<NodeInspectorModalProps> = ({
  node,
  onClose,
  onPanToMap,
  onOpenPdfModal,
}) => {
  if (!node) return null;
  const data = node.data;

  const handlePanClick = () => {
    if (data.mapTarget) {
      soundFx.playRadarPing();
      onPanToMap(data.mapTarget);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950/95 border-l border-zinc-800/90 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              MIND MAP NODE INTELLIGENCE
            </span>
            <h3 className="text-sm font-bold font-mono text-zinc-100">{data.label}</h3>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status / Threat banner */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono">
          <span className="text-zinc-400 uppercase">PILLAR DOMAIN:</span>
          <span className="text-cyan-300 font-bold uppercase">{data.pillar}</span>
        </div>

        {/* Subtitle & Summary */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-zinc-200 font-mono">{data.subtitle}</h4>
          <p className="text-xs font-sans text-zinc-300 leading-relaxed bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/70">
            {data.summary}
          </p>
        </div>

        {/* Associated Geospatial Target Link */}
        {data.mapTarget && (
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 block font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> LINKED STRATEGIC HOTSPOT
              </span>
              <span className="text-xs font-bold text-zinc-100 font-mono mt-0.5 block">
                {data.mapTarget.hotspotName}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Lat {data.mapTarget.lat.toFixed(2)}°, Lng {data.mapTarget.lng.toFixed(2)}°
              </span>
            </div>

            <button
              onClick={handlePanClick}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-all shrink-0"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Pan Map</span>
            </button>
          </div>
        )}

        {/* Quantitative Metrics */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold flex items-center gap-1">
              <BarChart3 className="w-3 h-3 text-cyan-400" /> Key Intelligence Indicators
            </span>
            <div className="grid grid-cols-2 gap-2">
              {data.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800">
                  <span className="text-[9.5px] font-mono text-zinc-400 block truncate">{m.label}</span>
                  <span className="text-xs font-bold font-mono text-zinc-100 mt-0.5 block">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Actors */}
        {data.keyActors && data.keyActors.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold flex items-center gap-1">
              <Users className="w-3 h-3 text-cyan-400" /> Stakeholders Involved
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.keyActors.map((actor, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Direct Document Quotes */}
        {data.quotes && data.quotes.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold flex items-center gap-1">
              <Quote className="w-3 h-3 text-amber-400" /> Verbatim PDF Report Excerpts
            </span>
            {data.quotes.map((q, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/90 space-y-1.5">
                <p className="text-[11px] font-serif italic text-zinc-200 leading-relaxed">
                  "{q.text}"
                </p>
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/60">
                  <span>{q.source}</span>
                  <span className="text-amber-400 font-semibold">{q.page}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Citations & Open Raw PDF Action */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-900">
          <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold flex items-center gap-1">
            <FileText className="w-3 h-3 text-cyan-400" /> Source Report References
          </span>
          <div className="space-y-1">
            {data.citations.map((cite, idx) => (
              <div
                key={idx}
                onClick={() => {
                  soundFx.playClick();
                  const targetDoc = cite.includes('Report 1') ? 'greenland-us-takeover' : 'cfr-arctic-geopolitics';
                  onOpenPdfModal(targetDoc, 1);
                }}
                className="flex items-center justify-between p-2 rounded bg-zinc-900/40 hover:bg-zinc-800/80 border border-zinc-800/60 cursor-pointer text-[10.5px] font-mono text-zinc-300 transition-colors group"
              >
                <span>{cite}</span>
                <span className="text-[9px] text-cyan-400 group-hover:underline flex items-center gap-1">
                  Inspect in PDF <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
