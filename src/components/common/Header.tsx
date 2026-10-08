import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/soundEffects.ts';
import {
  Shield,
  Volume2,
  VolumeX,
  BookOpen,
  LayoutGrid,
  Map as MapIcon,
  GitBranch,
  Brain,
  Globe,
  Radio,
  Share2,
} from 'lucide-react';

export type LayoutMode = 'three-column' | 'mindmap-focus' | 'map-focus' | 'ai-focus';

interface HeaderProps {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  onOpenPdfModal: () => void;
  onExportBrief: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  layoutMode,
  setLayoutMode,
  onOpenPdfModal,
  onExportBrief,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toUTCString().replace('GMT', 'UTC')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundFx.setEnabled(next);
    if (next) soundFx.playClick();
  };

  return (
    <header className="h-14 bg-zinc-950 border-b border-zinc-800/90 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Project Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-900 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Globe className="w-4 h-4 animate-spin-slow" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-extrabold tracking-wider font-mono text-zinc-100 flex items-center gap-1.5">
              <span>ARCTIC-INTEL</span>
              <span className="text-zinc-600 font-normal">|</span>
              <span className="text-cyan-400 font-semibold text-xs tracking-normal">GEOPOLITICAL NEXUS</span>
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[9px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono hidden md:block">
            High North Sovereignty • Critical Minerals • Sea Lanes • NATO 7 vs 1
          </span>
        </div>
      </div>

      {/* Middle: UTC Clock & Status */}
      <div className="hidden lg:flex items-center gap-3 font-mono text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{currentTime || 'SYNCHRONIZING UTC...'}</span>
        </div>
        <div className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
          OSINT: <span className="text-zinc-200">2 REPORTS INDEXED</span>
        </div>
      </div>

      {/* Right Controls: View Switchers & Audio FX */}
      <div className="flex items-center gap-2">
        {/* Layout Switchers */}
        <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
          <button
            onClick={() => {
              soundFx.playClick();
              setLayoutMode('three-column');
            }}
            title="3-Panel Command View"
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              layoutMode === 'three-column'
                ? 'bg-zinc-800 text-cyan-300 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Grid (3-Col)</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setLayoutMode('mindmap-focus');
            }}
            title="Mind Map Focus"
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              layoutMode === 'mindmap-focus'
                ? 'bg-zinc-800 text-cyan-300 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Mind Map</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setLayoutMode('map-focus');
            }}
            title="Geospatial Map Focus"
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              layoutMode === 'map-focus'
                ? 'bg-zinc-800 text-cyan-300 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Map</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setLayoutMode('ai-focus');
            }}
            title="AI Intelligence Focus"
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              layoutMode === 'ai-focus'
                ? 'bg-zinc-800 text-cyan-300 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">AI Intel</span>
          </button>
        </div>

        {/* View Raw PDF Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenPdfModal();
          }}
          className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-800 text-xs font-mono text-zinc-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">PDF Corpus</span>
        </button>

        {/* Export Briefing Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onExportBrief();
          }}
          className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Brief</span>
        </button>

        {/* Audio FX Toggle */}
        <button
          onClick={toggleAudio}
          title={audioEnabled ? 'Mute Tactical Audio FX' : 'Enable Tactical Audio FX'}
          className={`p-1.5 rounded-lg border text-xs transition-colors ${
            audioEnabled
              ? 'bg-zinc-900 border-zinc-800 text-cyan-400 hover:bg-zinc-800'
              : 'bg-zinc-900/60 border-zinc-800 text-zinc-500'
          }`}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
