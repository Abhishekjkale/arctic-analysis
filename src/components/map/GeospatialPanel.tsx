import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { STRATEGIC_HOTSPOTS, StrategicHotspot } from '../../data/hotspotsData.ts';
import { soundFx } from '../../utils/soundEffects.ts';
import {
  MapPin,
  Crosshair,
  Maximize2,
  Minimize2,
  Shield,
  Anchor,
  Pickaxe,
  AlertTriangle,
  ExternalLink,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface GeospatialPanelProps {
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: StrategicHotspot) => void;
  onCrossLinkToMindMapNode: (nodeId: string) => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  panTarget?: { lat: number; lng: number; zoom: number; hotspotId: string; hotspotName: string } | null;
}

// Dark minimalist tactical map style for Arctic intelligence operations
const DARK_TACTICAL_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#090d16' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#090d16' }, { weight: 2 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }, { weight: 1.2 }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e293b' }, { weight: 0.8 }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#131722' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#050811' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }, { opacity: 0.4 }],
  },
];

export const GeospatialPanel: React.FC<GeospatialPanelProps> = ({
  activeHotspotId,
  onSelectHotspot,
  onCrossLinkToMindMapNode,
  isMaximized,
  onToggleMaximize,
  panTarget,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [id: string]: google.maps.Marker }>({});
  const [selectedHotspot, setSelectedHotspot] = useState<StrategicHotspot | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'military' | 'trade' | 'resources' | 'disputed'>('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Initialize Google Maps using modern setOptions and importLibrary
  useEffect(() => {
    let isMounted = true;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyB0HS207LDdz3cmqtW2nxGQ0Rpm7KMZ4Wg';

    async function initGoogleMap() {
      try {
        setOptions({
          key: apiKey,
          v: 'weekly',
        });

        const { Map } = (await importLibrary('maps')) as google.maps.MapsLibrary;

        if (!isMounted || !mapContainerRef.current) return;

        const mapOptions: google.maps.MapOptions = {
          center: { lat: 72.0, lng: -40.0 }, // Polar High North centering
          zoom: 3,
          minZoom: 2,
          maxZoom: 14,
          styles: DARK_TACTICAL_MAP_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          backgroundColor: '#090d16',
          // Mandatory setting per Google Maps skill
          internalUsageAttributionIds: ['gmp_git_agentskills_v1'],
        };

        const map = new Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Create Markers
        STRATEGIC_HOTSPOTS.forEach((hotspot) => {
          let pinColor = '#38bdf8';
          if (hotspot.category === 'military') pinColor = '#f43f5e';
          if (hotspot.category === 'resources') pinColor = '#f59e0b';
          if (hotspot.category === 'disputed') pinColor = '#a855f7';

          const marker = new google.maps.Marker({
            position: hotspot.coordinates,
            map,
            title: hotspot.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: pinColor,
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 1.5,
            },
          });

          marker.addListener('click', () => {
            soundFx.playTargetLock();
            setSelectedHotspot(hotspot);
            onSelectHotspot(hotspot);
            map.panTo(hotspot.coordinates);
          });

          markersRef.current[hotspot.id] = marker;
        });

        const initial = STRATEGIC_HOTSPOTS.find((h) => h.id === 'pituffik-space-base') || STRATEGIC_HOTSPOTS[0];
        setSelectedHotspot(initial);
        setMapLoaded(true);
      } catch (err: any) {
        console.error('Failed to load Google Maps:', err);
        if (isMounted) {
          setLoadError(err.message || 'Error loading Google Maps JavaScript API');
        }
      }
    }

    initGoogleMap();

    return () => {
      isMounted = false;
      Object.values(markersRef.current).forEach((m) => m.setMap(null));
      markersRef.current = {};
    };
  }, []);

  // Handle Pan Target updates from Mind Map node selection
  useEffect(() => {
    if (!panTarget || !mapInstanceRef.current) return;
    const { lat, lng, zoom, hotspotId } = panTarget;

    mapInstanceRef.current.panTo({ lat, lng });
    mapInstanceRef.current.setZoom(zoom || 6);

    const found = STRATEGIC_HOTSPOTS.find((h) => h.id === hotspotId);
    if (found) {
      setSelectedHotspot(found);
      onSelectHotspot(found);
    }
  }, [panTarget]);

  // Handle activeHotspotId changes
  useEffect(() => {
    if (!activeHotspotId) return;
    const found = STRATEGIC_HOTSPOTS.find((h) => h.id === activeHotspotId);
    if (found) {
      setSelectedHotspot(found);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(found.coordinates);
      }
    }
  }, [activeHotspotId]);

  // Handle Category Filter
  useEffect(() => {
    if (!mapLoaded) return;
    STRATEGIC_HOTSPOTS.forEach((h) => {
      const marker = markersRef.current[h.id];
      if (!marker) return;
      const shouldShow = activeCategory === 'all' || h.category === activeCategory;
      marker.setVisible(shouldShow);
    });
  }, [activeCategory, mapLoaded]);

  const handleRecenterPolar = () => {
    soundFx.playClick();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: 72.0, lng: -40.0 });
      mapInstanceRef.current.setZoom(3);
    }
  };

  const filteredHotspots = STRATEGIC_HOTSPOTS.filter(
    (h) => activeCategory === 'all' || h.category === activeCategory
  );

  return (
    <div className="relative w-full h-full bg-[#090d16] flex flex-col overflow-hidden select-none border-l border-zinc-800/80">
      {/* Tactical Top Bar */}
      <div className="z-10 px-4 py-2.5 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700/60 text-xs font-mono text-zinc-300">
            <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-semibold text-zinc-200">GEOSPATIAL INTELLIGENCE RADAR</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">HIGH NORTH / 66.5°N+</span>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('all');
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
              activeCategory === 'all'
                ? 'bg-zinc-700 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            All ({STRATEGIC_HOTSPOTS.length})
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('military');
            }}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              activeCategory === 'military'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/60'
                : 'text-zinc-400 hover:text-rose-400'
            }`}
          >
            <Shield className="w-2.5 h-2.5" /> Bases
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('trade');
            }}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              activeCategory === 'trade'
                ? 'bg-sky-950 text-sky-300 border border-sky-700/60'
                : 'text-zinc-400 hover:text-sky-400'
            }`}
          >
            <Anchor className="w-2.5 h-2.5" /> Chokepoints
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('resources');
            }}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              activeCategory === 'resources'
                ? 'bg-amber-950 text-amber-300 border border-amber-700/60'
                : 'text-zinc-400 hover:text-amber-400'
            }`}
          >
            <Pickaxe className="w-2.5 h-2.5" /> Minerals
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('disputed');
            }}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              activeCategory === 'disputed'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-zinc-400 hover:text-purple-400'
            }`}
          >
            <AlertTriangle className="w-2.5 h-2.5" /> Disputed
          </button>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRecenterPolar}
            title="Recenter High North Polar View"
            className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              title={isMaximized ? 'Restore 3-Panel View' : 'Maximize Map'}
              className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 w-full h-full relative">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Fallback / Loading Overlay */}
        {!mapLoaded && !loadError && (
          <div className="absolute inset-0 bg-[#090d16] flex flex-col items-center justify-center gap-3 text-zinc-400 font-mono text-xs">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
            <span>INITIALIZING TACTICAL RADAR MAPPING...</span>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 bg-[#090d16]/95 flex flex-col items-center justify-center p-6 text-center text-zinc-400 font-mono text-xs">
            <AlertTriangle className="w-8 h-8 text-amber-400 mb-2" />
            <span className="text-zinc-200 font-bold mb-1">Maps Initialization Notice</span>
            <p className="max-w-md text-zinc-400 text-[11px] mb-4">{loadError}</p>
          </div>
        )}

        {/* Quick Location Pills overlay on map */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[85%] pointer-events-auto">
          {filteredHotspots.slice(0, 6).map((h) => {
            const isSelected = selectedHotspot?.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => {
                  soundFx.playTargetLock();
                  setSelectedHotspot(h);
                  onSelectHotspot(h);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.panTo(h.coordinates);
                    mapInstanceRef.current.setZoom(6);
                  }
                }}
                className={`px-2 py-1 rounded-md text-[10px] font-mono backdrop-blur-md border transition-all flex items-center gap-1 shadow-lg ${
                  isSelected
                    ? 'bg-cyan-950/90 text-cyan-200 border-cyan-500 shadow-cyan-950/50'
                    : 'bg-zinc-950/80 text-zinc-300 border-zinc-800/80 hover:bg-zinc-900/90 hover:border-zinc-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    h.category === 'military'
                      ? 'bg-rose-500'
                      : h.category === 'resources'
                      ? 'bg-amber-500'
                      : h.category === 'disputed'
                      ? 'bg-purple-500'
                      : 'bg-sky-500'
                  }`}
                />
                <span className="truncate max-w-[120px]">{h.name.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Tactical Hotspot Brief Card */}
        {selectedHotspot && (
          <div className="absolute bottom-6 left-4 right-4 z-10 max-w-lg mx-auto bg-zinc-950/95 border border-zinc-800 rounded-xl p-4 backdrop-blur-xl shadow-2xl transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${
                      selectedHotspot.category === 'military'
                        ? 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                        : selectedHotspot.category === 'resources'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                        : selectedHotspot.category === 'disputed'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                        : 'bg-sky-950/80 text-sky-300 border-sky-800/60'
                    }`}
                  >
                    {selectedHotspot.category.toUpperCase()} // {selectedHotspot.strategicSignificance}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {selectedHotspot.coordinatesLabel}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 font-mono">{selectedHotspot.name}</h3>
                <span className="text-[11px] text-zinc-400">{selectedHotspot.country} • {selectedHotspot.region}</span>
              </div>

              {/* Action Button: Cross link to mind map */}
              <button
                onClick={() => {
                  soundFx.playTargetLock();
                  onCrossLinkToMindMapNode(selectedHotspot.associatedNodeId);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-mono flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
              >
                <span>Mind Map</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-300 leading-relaxed mb-2.5">
              {selectedHotspot.summary}
            </p>

            {/* Tactical Intelligence bullets */}
            <div className="space-y-1 mb-2.5 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/70">
              {selectedHotspot.intelligenceDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-zinc-400 leading-tight">
                  <span className="text-cyan-400 font-mono">›</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Citation footer */}
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1.5 border-t border-zinc-900">
              <span className="text-zinc-400">OSINT Citation: <span className="text-zinc-300 font-medium">{selectedHotspot.pageCitation}</span></span>
              <span>Source: {selectedHotspot.sourceReport}</span>
            </div>
          </div>
        )}
      </div>

      {/* Attribution Requirement */}
      <div className="px-4 py-1.5 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1 text-cyan-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SATELLITE TELEMETRY LOCKED
        </span>
        <span>Google Maps</span>
      </div>
    </div>
  );
};
