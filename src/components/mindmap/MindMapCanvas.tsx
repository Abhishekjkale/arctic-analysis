import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionLineType,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomPillarNode } from './CustomPillarNode.tsx';
import { CustomLeafNode } from './CustomLeafNode.tsx';
import {
  INITIAL_MINDMAP_NODES,
  INITIAL_MINDMAP_EDGES,
  MindMapNodeData,
  PillarCategory,
} from '../../data/mindMapData.ts';
import { soundFx } from '../../utils/soundEffects.ts';
import {
  Search,
  Filter,
  Maximize2,
  Minimize2,
  RefreshCw,
  Compass,
  Layers,
  MapPin,
} from 'lucide-react';

const nodeTypes = {
  customPillar: CustomPillarNode,
  customLeaf: CustomLeafNode,
};

interface MindMapCanvasProps {
  onSelectNode: (node: Node<MindMapNodeData> | null) => void;
  selectedNodeId: string | null;
  onPanToMap: (target: { lat: number; lng: number; zoom: number; hotspotId: string; hotspotName: string }) => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

const FlowCanvasInternal: React.FC<MindMapCanvasProps> = ({
  onSelectNode,
  selectedNodeId,
  onPanToMap,
  isMaximized,
  onToggleMaximize,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_MINDMAP_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_MINDMAP_EDGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<'all' | PillarCategory>('all');
  const { fitView, setCenter } = useReactFlow();

  // Filter nodes based on selected pillar and search
  const filteredNodes = useMemo(() => {
    return nodes.map((n) => {
      const data = n.data as MindMapNodeData;
      const matchesPillar =
        selectedPillar === 'all' || data.pillar === selectedPillar || data.pillar === 'nexus';
      const matchesSearch =
        !searchQuery ||
        data.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const isHidden = !(matchesPillar && matchesSearch);
      const isHighlighted = selectedNodeId === n.id;

      return {
        ...n,
        hidden: isHidden,
        selected: isHighlighted,
      };
    });
  }, [nodes, selectedPillar, searchQuery, selectedNodeId]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      soundFx.playTargetLock();
      const nodeData = node.data as unknown as MindMapNodeData;
      onSelectNode(node as Node<MindMapNodeData>);

      // Trigger map transition if node has a mapTarget
      if (nodeData.mapTarget) {
        soundFx.playRadarPing();
        onPanToMap(nodeData.mapTarget);
      }
    },
    [onSelectNode, onPanToMap]
  );

  const handleResetView = () => {
    soundFx.playClick();
    fitView({ duration: 600, padding: 0.2 });
  };

  const handleSearchFocusNode = (query: string) => {
    setSearchQuery(query);
    if (!query) return;
    const match = nodes.find(
      (n) =>
        (n.data as MindMapNodeData).label.toLowerCase().includes(query.toLowerCase()) ||
        (n.data as MindMapNodeData).subtitle.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      setCenter(match.position.x + 100, match.position.y + 50, { zoom: 1.1, duration: 600 });
      onSelectNode(match as Node<MindMapNodeData>);
      if ((match.data as MindMapNodeData).mapTarget) {
        onPanToMap((match.data as MindMapNodeData).mapTarget!);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-[#09090b] select-none flex flex-col overflow-hidden">
      {/* Top Tactical Controls Bar */}
      <div className="z-10 px-4 py-2.5 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/60 text-xs font-mono text-zinc-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span className="font-semibold text-zinc-200">STRATEGIC MIND MAP CANVAS</span>
          </div>

          {/* Search */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter nodes / actors..."
              value={searchQuery}
              onChange={(e) => handleSearchFocusNode(e.target.value)}
              className="bg-zinc-900/90 text-xs text-zinc-200 pl-8 pr-3 py-1 rounded-md border border-zinc-800 focus:outline-none focus:border-cyan-500/80 font-mono w-44 lg:w-56 transition-all"
            />
          </div>
        </div>

        {/* Pillar filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedPillar('all');
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              selectedPillar === 'all'
                ? 'bg-zinc-700 text-zinc-100 border border-zinc-600'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            All Pillars
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedPillar('security');
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
              selectedPillar === 'security'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
                : 'text-zinc-400 hover:text-rose-400 hover:bg-zinc-900'
            }`}
          >
            <span>🛑</span> Sovereignty
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedPillar('trade');
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
              selectedPillar === 'trade'
                ? 'bg-sky-950/80 text-sky-300 border border-sky-700/60'
                : 'text-zinc-400 hover:text-sky-400 hover:bg-zinc-900'
            }`}
          >
            <span>⚓</span> Trade
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedPillar('resources');
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
              selectedPillar === 'resources'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                : 'text-zinc-400 hover:text-amber-400 hover:bg-zinc-900'
            }`}
          >
            <span>⛏️</span> Minerals
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedPillar('climate');
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
              selectedPillar === 'climate'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                : 'text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900'
            }`}
          >
            <span>🌍</span> Climate
          </button>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetView}
            title="Recenter and fit view"
            className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              title={isMaximized ? 'Restore 3-Panel View' : 'Maximize Mind Map'}
              className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Flow Canvas */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          maxZoom={2}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { strokeWidth: 1.5 },
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#27272a" gap={28} size={1} variant={BackgroundVariant.Dots} />
          <Controls showInteractive={false} position="bottom-left" className="!m-4" />
          <MiniMap
            position="bottom-right"
            className="!m-4 !border-zinc-800 !bg-zinc-950/90"
            nodeColor={(n) => {
              const data = n.data as MindMapNodeData;
              switch (data.pillar) {
                case 'security':
                  return '#f43f5e';
                case 'trade':
                  return '#38bdf8';
                case 'resources':
                  return '#f59e0b';
                case 'climate':
                  return '#10b981';
                default:
                  return '#06b6d4';
              }
            }}
            maskColor="rgba(9, 9, 11, 0.75)"
          />
        </ReactFlow>

        {/* Legend Overlay at bottom */}
        <div className="absolute bottom-4 left-24 z-10 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-zinc-950/85 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400 pointer-events-none">
          <span className="text-zinc-500 uppercase tracking-widest font-semibold">Pillar Legend:</span>
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Sovereignty
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Trade Routes
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Resources
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Climate Shifts
          </span>
        </div>
      </div>
    </div>
  );
};

export const MindMapCanvas: React.FC<MindMapCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <FlowCanvasInternal {...props} />
    </ReactFlowProvider>
  );
};
