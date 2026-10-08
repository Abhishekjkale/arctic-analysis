import React, { useState, useCallback } from 'react';
import { Node } from '@xyflow/react';
import { Header, LayoutMode } from './components/common/Header.tsx';
import { AiSummaryPanel } from './components/intel/AiSummaryPanel.tsx';
import { MindMapCanvas } from './components/mindmap/MindMapCanvas.tsx';
import { GeospatialPanel } from './components/map/GeospatialPanel.tsx';
import { NodeInspectorModal } from './components/mindmap/NodeInspectorModal.tsx';
import { PdfViewerModal } from './components/intel/PdfViewerModal.tsx';
import { MindMapNodeData } from './data/mindMapData.ts';
import { STRATEGIC_HOTSPOTS, StrategicHotspot } from './data/hotspotsData.ts';
import { soundFx } from './utils/soundEffects.ts';
import confetti from 'canvas-confetti';

export default function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('three-column');
  const [selectedNode, setSelectedNode] = useState<Node<MindMapNodeData> | null>(null);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('pituffik-space-base');
  const [panTarget, setPanTarget] = useState<{
    lat: number;
    lng: number;
    zoom: number;
    hotspotId: string;
    hotspotName: string;
  } | null>(null);

  // PDF Viewer Modal state
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [pdfModalDocId, setPdfModalDocId] = useState<string>('greenland-us-takeover');
  const [pdfModalPage, setPdfModalPage] = useState<number>(1);

  // Export Notification state
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Handler: When a node is selected in Mind Map
  const handleSelectNode = useCallback((node: Node<MindMapNodeData> | null) => {
    setSelectedNode(node);
  }, []);

  // Handler: When map panning is requested (from Mind Map node or Inspector)
  const handlePanToMap = useCallback(
    (target: { lat: number; lng: number; zoom: number; hotspotId: string; hotspotName: string }) => {
      setPanTarget(target);
      setActiveHotspotId(target.hotspotId);
    },
    []
  );

  // Handler: When a hotspot is clicked on Google Map
  const handleSelectHotspot = useCallback((hotspot: StrategicHotspot) => {
    setActiveHotspotId(hotspot.id);
  }, []);

  // Handler: Cross-link from Map hotspot directly to Mind Map node
  const handleCrossLinkToMindMapNode = useCallback((nodeId: string) => {
    soundFx.playTargetLock();
    // Set pan target and notify
    setActiveHotspotId((prev) => {
      const match = STRATEGIC_HOTSPOTS.find((h) => h.associatedNodeId === nodeId);
      return match ? match.id : prev;
    });
  }, []);

  // Open PDF modal with target document and page
  const handleOpenPdfModal = useCallback((reportId: string = 'greenland-us-takeover', page: number = 1) => {
    soundFx.playClick();
    setPdfModalDocId(reportId);
    setPdfModalPage(page);
    setPdfModalOpen(true);
  }, []);

  // Export Executive Intelligence Brief
  const handleExportBrief = useCallback(() => {
    soundFx.playTargetLock();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ['#38bdf8', '#06b6d4', '#10b981'],
    });

    const briefText = `ARCTIC-INTEL EXECUTIVE INTELLIGENCE BRIEF
Generated: ${new Date().toUTCString()}
Classification: UNCLASSIFIED // OSINT DUAL-REPORT SYNTHESIS

1. GREENLAND DE FACTO U.S. REALIGNMENT [Report 1, 2026]
- 25% of global Rare Earth Elements secured via US EXIM/DFC capital.
- Pituffik Space Base absorbed under US NORTHCOM early warning radar.
- Direct bilateral engagement via reopened Nuuk Consulate (2020) marginalizing Copenhagen.
- Highest probability outcome: Compact of Free Association (COFA).

2. HIGH NORTH GEOPOLITICS & "ARCTIC 7" [Report 2, CFR Testimony]
- Finland's April 2023 NATO entry added 832-mile border with Russia.
- Arctic Council operational paralysis leaves NATO 7 opposing isolated Russia.
- China invested >$90B in Russian Arctic energy (Yamal LNG).
- U.S. strategic priority: expedite Nome deep-water port & Polar Security Cutters.`;

    navigator.clipboard.writeText(briefText);
    setExportNotice('Executive Intelligence Brief copied to clipboard!');
    setTimeout(() => setExportNotice(null), 3500);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Top Tactical Command Header */}
      <Header
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        onOpenPdfModal={() => handleOpenPdfModal('greenland-us-takeover', 1)}
        onExportBrief={handleExportBrief}
      />

      {/* Main Command Dashboard Layout */}
      <main className="flex-1 w-full overflow-hidden relative">
        {/* Toast Alert for Export */}
        {exportNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-cyan-950/90 border border-cyan-500/80 text-cyan-200 text-xs font-mono shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in duration-200">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* 3-Column Layout or Focused Modes */}
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Panel: Gemini AI Synthesis & PDF Chat Analyst */}
          <section
            className={`h-full overflow-hidden transition-all duration-300 ${
              layoutMode === 'three-column'
                ? 'md:col-span-4 xl:col-span-3 block'
                : layoutMode === 'ai-focus'
                ? 'md:col-span-12 block'
                : 'hidden'
            }`}
          >
            <AiSummaryPanel
              onSelectNodeById={(id) => {
                setActiveHotspotId(id);
              }}
              onPanToMap={handlePanToMap}
              onOpenPdfModal={handleOpenPdfModal}
            />
          </section>

          {/* Center Panel: The Interactive Mind Map canvas */}
          <section
            className={`h-full overflow-hidden transition-all duration-300 relative ${
              layoutMode === 'three-column'
                ? 'md:col-span-4 xl:col-span-5 block'
                : layoutMode === 'mindmap-focus'
                ? 'md:col-span-12 block'
                : 'hidden'
            }`}
          >
            <MindMapCanvas
              onSelectNode={handleSelectNode}
              selectedNodeId={selectedNode?.id || null}
              onPanToMap={handlePanToMap}
              isMaximized={layoutMode === 'mindmap-focus'}
              onToggleMaximize={() =>
                setLayoutMode((prev) => (prev === 'mindmap-focus' ? 'three-column' : 'mindmap-focus'))
              }
            />
          </section>

          {/* Right Panel: Embedded Google Map showcasing strategic coordinates */}
          <section
            className={`h-full overflow-hidden transition-all duration-300 ${
              layoutMode === 'three-column'
                ? 'md:col-span-4 xl:col-span-4 block'
                : layoutMode === 'map-focus'
                ? 'md:col-span-12 block'
                : 'hidden'
            }`}
          >
            <GeospatialPanel
              activeHotspotId={activeHotspotId}
              onSelectHotspot={handleSelectHotspot}
              onCrossLinkToMindMapNode={handleCrossLinkToMindMapNode}
              isMaximized={layoutMode === 'map-focus'}
              onToggleMaximize={() =>
                setLayoutMode((prev) => (prev === 'map-focus' ? 'three-column' : 'map-focus'))
              }
              panTarget={panTarget}
            />
          </section>
        </div>

        {/* Glassmorphism Inspector Modal / Slide-over Drawer when a Node is clicked */}
        {selectedNode && (
          <NodeInspectorModal
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onPanToMap={handlePanToMap}
            onOpenPdfModal={handleOpenPdfModal}
          />
        )}

        {/* Full PDF Document Viewer Modal */}
        <PdfViewerModal
          isOpen={pdfModalOpen}
          initialReportId={pdfModalDocId}
          initialPage={pdfModalPage}
          onClose={() => setPdfModalOpen(false)}
        />
      </main>
    </div>
  );
}
