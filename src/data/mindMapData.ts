import { Node, Edge } from '@xyflow/react';

export type PillarCategory = 'security' | 'trade' | 'resources' | 'climate' | 'nexus';

export interface MindMapNodeData {
  [key: string]: unknown;
  label: string;
  pillar: PillarCategory;
  subtitle: string;
  summary: string;
  keyActors: string[];
  metrics?: { label: string; value: string }[];
  quotes: { text: string; source: string; page: string }[];
  citations: string[];
  mapTarget?: {
    lat: number;
    lng: number;
    zoom: number;
    hotspotId: string;
    hotspotName: string;
  };
  threatLevel?: 'Critical' | 'High' | 'Medium' | 'Baseline';
  isPillarHeader?: boolean;
}

export const INITIAL_MINDMAP_NODES: Node<MindMapNodeData>[] = [
  // Central Core Node
  {
    id: 'core-nexus',
    type: 'customPillar',
    position: { x: 700, y: 350 },
    data: {
      label: 'ARCTIC REGIONAL NEXUS',
      pillar: 'nexus',
      subtitle: 'Post-Cold War Thaw to Great Power Conflict',
      summary: 'Convergence of rapid polar climate warming, unexploited critical mineral hegemony, and fracturing security architectures following the Ukraine invasion.',
      keyActors: ['United States', 'Russia', 'China', 'Denmark / Greenland', 'NATO (Arctic 7)'],
      metrics: [
        { label: 'Arctic Warming Rate', value: '3x Global Avg' },
        { label: 'Undiscovered Oil', value: '13% (~90B Barrels)' },
        { label: 'Greenland REEs', value: '25% Global' },
        { label: 'NATO Arctic States', value: '7 vs 1 (Russia)' }
      ],
      quotes: [
        {
          text: "Russia's invasion of Ukraine, alongside systemic climate change, has permanently altered the Arctic's security ecosystem—ending the era of 'High North, Low Tension'.",
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 1, Central Thesis'
        },
        {
          text: 'This strategic pivot effectively integrates Greenland into North American defense and supply-chain frameworks, drastically eroding Denmark\'s historical sovereign authority.',
          source: 'Report 1 (Greenland OSINT)',
          page: 'Page 1, Executive Summary'
        }
      ],
      citations: ['Report 1 (Page 1)', 'Report 2 (Page 1)'],
      mapTarget: { lat: 72.0, lng: -40.0, zoom: 3, hotspotId: 'pituffik-space-base', hotspotName: 'High North Polar Projection' },
      threatLevel: 'Critical'
    }
  },

  // PILLAR 1: SOVEREIGNTY & SECURITY CLAIMS (Left Top Branch)
  {
    id: 'pillar-security',
    type: 'customPillar',
    position: { x: 120, y: 100 },
    data: {
      label: '🛑 SOVEREIGNTY & SECURITY CLAIMS',
      pillar: 'security',
      isPillarHeader: true,
      subtitle: 'NATO 7 vs Russia & Bilateral Hegemony',
      summary: 'Decay of multilateral governance, U.S. bilateral consolidation over Greenland, and NATO northern expansion via Finland and Sweden.',
      keyActors: ['USA', 'Denmark', 'Greenland (Naalakkersuisut)', 'Russia', 'NATO'],
      metrics: [
        { label: 'NATO Arctic Coalition', value: '7 Member States' },
        { label: 'Finland Border Added', value: '832 Miles' }
      ],
      quotes: [
        {
          text: 'Finland’s NATO accession in April 2023 added an 832-mile land border with Russia, while Sweden’s entry moves the region to a state of seven NATO members opposing one (Russia).',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Actors'
        }
      ],
      citations: ['Report 1 (Page 1-2)', 'Report 2 (Page 1-2)'],
      threatLevel: 'Critical'
    }
  },
  {
    id: 'node-pituffik',
    type: 'customLeaf',
    position: { x: -180, y: -40 },
    data: {
      label: 'Pituffik Space Base (Thule)',
      pillar: 'security',
      subtitle: 'Aerospace Domain Awareness & NORTHCOM',
      summary: 'Positioned halfway between Washington and Moscow. Bedrock of North American early-warning missile radar and space surveillance, now subsumed under US Northern Command.',
      keyActors: ['US DoD', 'NORTHCOM', 'Danish Arctic Command'],
      metrics: [
        { label: 'Origin Accord', value: '1951 Defense Agreement' },
        { label: 'Status', value: 'US Operational Control' }
      ],
      quotes: [
        {
          text: 'Positioned halfway between Washington and Moscow, Pituffik became the bedrock of North American early-warning missile radar and space surveillance throughout the Cold War.',
          source: 'Report 1 (Greenland)',
          page: 'Page 1, Historical Context'
        },
        {
          text: 'American forces have filled structural capability gaps left by Denmark\'s underfunded Arctic Command... implicitly downgrading Denmark\'s independent security command.',
          source: 'Report 1 (Greenland)',
          page: 'Page 2, Security Integration'
        }
      ],
      citations: ['Report 1, Page 1 & 2'],
      mapTarget: { lat: 76.5312, lng: -68.7031, zoom: 6, hotspotId: 'pituffik-space-base', hotspotName: 'Pituffik Space Base' },
      threatLevel: 'Critical'
    }
  },
  {
    id: 'node-nuuk-diplomacy',
    type: 'customLeaf',
    position: { x: -200, y: 160 },
    data: {
      label: 'Direct Nuuk Bilateralism',
      pillar: 'security',
      subtitle: 'Consulate Reopening & Danish Marginalization',
      summary: 'U.S. Consulate reopened in 2020 after 67-year absence. Bypasses Copenhagen to establish direct economic, social, and administrative ties with the Greenlandic Government.',
      keyActors: ['U.S. State Dept', 'Naalakkersuisut', 'Copenhagen MFA'],
      metrics: [
        { label: 'Direct US Aid', value: '$12.1M Grant Aid' },
        { label: 'Consulate Reopened', value: '2020' },
        { label: 'Target Population', value: '56,000' }
      ],
      quotes: [
        {
          text: 'The reopening of the U.S. Consulate in Nuuk in 2020—after a 67-year absence—marked a definitive transition from static military presence to active administrative, diplomatic, and economic integration.',
          source: 'Report 1 (Greenland)',
          page: 'Page 1, Acceleration'
        },
        {
          text: 'Through its Nuuk Consulate, the U.S. State Department conducts direct bilateral engagement with the Naalakkersuisut... deliberately marginalizing Denmark\'s historical role.',
          source: 'Report 1 (Greenland)',
          page: 'Page 2, Soft Power'
        }
      ],
      citations: ['Report 1, Page 1 & Page 2'],
      mapTarget: { lat: 64.1814, lng: -51.6941, zoom: 7, hotspotId: 'nuuk-consulate', hotspotName: 'Nuuk Diplomatic Hub' },
      threatLevel: 'High'
    }
  },
  {
    id: 'node-danish-dilemma',
    type: 'customLeaf',
    position: { x: -160, y: 340 },
    data: {
      label: 'Danish Rigsfællesskabet Crisis',
      pillar: 'security',
      subtitle: 'Constitutional Crisis in Unity of Realm',
      summary: 'Copenhagen lacks capital to match U.S. infrastructure and military budget to defend Arctic airspace independently, forced to yield sovereignty while Nuuk seeks independence.',
      keyActors: ['Kingdom of Denmark', 'Naalakkersuisut', 'NATO'],
      metrics: [
        { label: 'Constitutional Status', value: 'Unity of the Realm' },
        { label: 'Sovereign Control', value: 'Eroding / Nominal' }
      ],
      quotes: [
        {
          text: 'Denmark faces an acute constitutional crisis within the "Unity of the Realm" (Rigsfællesskabet). Copenhagen lacks the capital to match U.S. infrastructure investments and the military budget to defend Arctic airspace independently.',
          source: 'Report 1 (Greenland)',
          page: 'Page 2, Section 4'
        }
      ],
      citations: ['Report 1, Page 2 & 3'],
      threatLevel: 'High'
    }
  },
  {
    id: 'node-nato-arctic-seven',
    type: 'customLeaf',
    position: { x: 80, y: -120 },
    data: {
      label: 'NATO Northern Flank Expansion',
      pillar: 'security',
      subtitle: 'Finland & Sweden Accession ("Arctic 7")',
      summary: 'Collapse of Scandinavian neutrality post-2022. Finland adds 832-mile land border with Russia. NATO Allied Command Transformation prioritizes transatlantic resupply.',
      keyActors: ['NATO', 'Finland', 'Sweden', 'Russian Federation'],
      metrics: [
        { label: 'New Land Border', value: '832 Miles' },
        { label: 'Arctic Coalition', value: '7 NATO vs 1 Russia' }
      ],
      quotes: [
        {
          text: 'Finland\'s NATO accession in April 2023 added an 832-mile land border with Russia, while Sweden\'s entry moves the region to a state of seven NATO members opposing one (Russia).',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Actors'
        }
      ],
      citations: ['Report 2, Page 1-2'],
      mapTarget: { lat: 60.1699, lng: 24.9384, zoom: 6, hotspotId: 'helsinki-border', hotspotName: 'Finnish NATO Frontier' },
      threatLevel: 'Critical'
    }
  },
  {
    id: 'node-russia-northern-fleet',
    type: 'customLeaf',
    position: { x: 300, y: -160 },
    data: {
      label: 'Russian Kola Nuclear Bastion',
      pillar: 'security',
      subtitle: 'Murmansk & Submarine Deterrence',
      summary: 'Russia relies heavily on Kola Peninsula bases to secure its second-strike nuclear submarine fleet and assert sovereign control over the Northern Sea Route approaches.',
      keyActors: ['Russian Federation', 'Northern Fleet', 'Atomflot'],
      metrics: [
        { label: 'Arctic Coastline Share', value: '~50%' },
        { label: 'Arctic Population Share', value: '2 Million' }
      ],
      quotes: [
        {
          text: 'Holds 20% of its landmass and about half of the Arctic coastline within the Arctic Circle, accommodating roughly two million Arctic residents.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 1, Stakeholders'
        }
      ],
      citations: ['Report 2, Page 1 & 2'],
      mapTarget: { lat: 68.9733, lng: 33.0856, zoom: 6, hotspotId: 'murmansk-naval-base', hotspotName: 'Murmansk Naval Base' },
      threatLevel: 'Critical'
    }
  },

  // PILLAR 2: STRATEGIC TRADE ROUTES (Right Top Branch)
  {
    id: 'pillar-trade',
    type: 'customPillar',
    position: { x: 1250, y: 100 },
    data: {
      label: '⚓ STRATEGIC TRADE ROUTES',
      pillar: 'trade',
      isPillarHeader: true,
      subtitle: 'Northern Sea Route & Northwest Passage',
      summary: 'Competition over emerging high-latitude maritime corridors as summer ice thins, complicated by Russian mandatory tariffs and legal disputes.',
      keyActors: ['Russia', 'China (COSCO)', 'Canada', 'United States', 'IMO'],
      metrics: [
        { label: 'Summer Ice-Free Target', value: '2030s' },
        { label: 'Non-Russian 2022 Traffic', value: 'Only 36/314 Ships' }
      ],
      quotes: [
        {
          text: 'Non-Russian traffic dropped in 2022: only 36 of 314 ships were non-Russian flagged; COSCO sent zero ships along NSR in 2022.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Trade Routes'
        }
      ],
      citations: ['Report 2 (Page 2)'],
      threatLevel: 'High'
    }
  },
  {
    id: 'node-northern-sea-route',
    type: 'customLeaf',
    position: { x: 1550, y: -40 },
    data: {
      label: 'Northern Sea Route (NSR)',
      pillar: 'trade',
      subtitle: 'Russian Tariffs & Escort Monopolies',
      summary: 'Russia asserts sovereign authority and mandates icebreaker fees across the NSR. Western sanctions collapsed international traffic in 2022.',
      keyActors: ['Rosatom', 'Russian Federation', 'China'],
      metrics: [
        { label: '2022 Commercial Transits', value: '314 total' },
        { label: 'Chinese COSCO Transits', value: '0 in 2022' }
      ],
      quotes: [
        {
          text: 'Russia seeks control/tariffs over the Northern Sea Route (NSR)... Non-Russian traffic dropped in 2022: only 36 of 314 ships were non-Russian flagged.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Navigation'
        }
      ],
      citations: ['Report 2, Page 2'],
      mapTarget: { lat: 77.9500, lng: 102.5000, zoom: 5, hotspotId: 'vilkitsky-strait', hotspotName: 'Vilkitsky Strait Chokepoint' },
      threatLevel: 'High'
    }
  },
  {
    id: 'node-northwest-passage',
    type: 'customLeaf',
    position: { x: 1580, y: 160 },
    data: {
      label: 'Northwest Passage (NWP)',
      pillar: 'trade',
      subtitle: 'Internal Waters vs International Strait',
      summary: 'Canadian claims of sovereign internal waters contrast with U.S. designation as an international strait. Thawing ice increases navigability but lacks deep-water port support.',
      keyActors: ['Canada', 'United States', 'Commercial Shipping'],
      metrics: [
        { label: 'Jurisdiction Dispute', value: 'Internal vs Transit Strait' },
        { label: 'Deep-Water Ports', value: 'Severe Shortage' }
      ],
      quotes: [
        {
          text: 'Ice-free summers expected in 2030s, but navigation remains complex... heightened competition over unmapped seabeds and navigation routes.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2 & 3'
        }
      ],
      citations: ['Report 2, Page 2'],
      mapTarget: { lat: 74.2167, lng: -80.5000, zoom: 6, hotspotId: 'northwest-passage', hotspotName: 'Northwest Passage Corridor' },
      threatLevel: 'Medium'
    }
  },
  {
    id: 'node-us-nome-port',
    type: 'customLeaf',
    position: { x: 1480, y: 320 },
    data: {
      label: 'Nome Deep-Water Port & Polar Cutters',
      pillar: 'trade',
      subtitle: 'U.S. Bering Strait Infrastructure Priority',
      summary: 'Priority U.S. infrastructure recommendation to build deep-water port at Nome, Alaska and fund USCG Polar Security Cutters to project presence in the Bering choke point.',
      keyActors: ['US Coast Guard', 'US Army Corps of Engineers', 'Alaska'],
      metrics: [
        { label: 'Target Location', value: 'Nome, Alaska' },
        { label: 'Priority Program', value: 'Polar Security Cutter' }
      ],
      quotes: [
        {
          text: 'Expedite construction of the deep-water port at Nome to support maritime security, commercial transit, and emergency response capacity.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 3, Policy Recommendation #2'
        },
        {
          text: 'Fully fund and accelerate the U.S. Coast Guard\'s Polar Security Cutter program to maintain operational presence.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 3, Recommendation #1'
        }
      ],
      citations: ['Report 2, Page 3'],
      mapTarget: { lat: 64.5011, lng: -165.4064, zoom: 7, hotspotId: 'nome-port', hotspotName: 'Nome Deep-Water Port' },
      threatLevel: 'High'
    }
  },

  // PILLAR 3: RESOURCE EXTRACTION (Left Bottom Branch)
  {
    id: 'pillar-resources',
    type: 'customPillar',
    position: { x: 120, y: 600 },
    data: {
      label: '⛏️ RESOURCE EXTRACTION',
      pillar: 'resources',
      isPillarHeader: true,
      subtitle: 'Critical Minerals, 90B Bbl Oil, & Capital Blocking',
      summary: '25% of global REE reserves in Greenland, 90B barrels of undiscovered Arctic oil, and major power financing clashes blocking Chinese hegemony.',
      keyActors: ['US EXIM & DFC', 'Shenghe Resources', 'Rosneft / Novatek', 'EU'],
      metrics: [
        { label: 'Global REE Share', value: '25% in Greenland' },
        { label: 'Undiscovered Oil', value: '13% (~90B Barrels)' },
        { label: 'Chinese Arctic Energy Aid', value: '>$90 Billion' }
      ],
      quotes: [
        {
          text: 'Greenland holds an estimated 25% of the world’s rare earth elements (REEs), alongside massive reserves of uranium, lithium, and titanium.',
          source: 'Report 1 (Greenland)',
          page: 'Page 2, Section 3.B'
        },
        {
          text: 'USGS estimates 13% (90B barrels) of undiscovered oil is in the Arctic.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Dimensions'
        }
      ],
      citations: ['Report 1 (Page 2)', 'Report 2 (Page 2)'],
      threatLevel: 'Critical'
    }
  },
  {
    id: 'node-greenland-ree',
    type: 'customLeaf',
    position: { x: -200, y: 550 },
    data: {
      label: 'Greenland 25% Global REE Bastion',
      pillar: 'resources',
      subtitle: 'EXIM / DFC Capital vs Shenghe Resources',
      summary: 'Washington deployed strategic financing through EXIM and DFC to secure off-take agreements and block Chinese state enterprise Shenghe Resources from critical extraction licenses.',
      keyActors: ['US EXIM Bank', 'US DFC', 'Shenghe Resources (China)', 'Greenland Miners'],
      metrics: [
        { label: 'Global REE Share', value: '25%' },
        { label: 'Key Minerals', value: 'REEs, Lithium, Uranium, Titanium' }
      ],
      quotes: [
        {
          text: 'By financing infrastructure and securing off-take agreements, the U.S. has effectively blocked Chinese state-owned enterprises—such as Shenghe Resources—from securing critical mining licenses.',
          source: 'Report 1 (Greenland)',
          page: 'Page 2, Mineral Hegemony'
        }
      ],
      citations: ['Report 1, Page 2'],
      mapTarget: { lat: 60.9856, lng: -46.0125, zoom: 7, hotspotId: 'kvanefjeld-deposit', hotspotName: 'Kvanefjeld REE Complex' },
      threatLevel: 'Critical'
    }
  },
  {
    id: 'node-yamal-china-energy',
    type: 'customLeaf',
    position: { x: -180, y: 730 },
    data: {
      label: 'Sino-Russian Energy Axis ($90B)',
      pillar: 'resources',
      subtitle: 'Yamal LNG & Post-Sanctions Oil Shift',
      summary: 'Western sanctions post-Ukraine isolated Moscow, cementing dependence on Chinese capital ($90B funneled). Concurrently, EU nations increased Russian LNG by 50%.',
      keyActors: ['Novatek', 'CNPC / Silk Road Fund', 'EU Importers (France, Spain, Belgium)'],
      metrics: [
        { label: 'Chinese Capital Inflow', value: '>$90 Billion' },
        { label: 'EU Post-Sanctions LNG Rise', value: '+50% Imports' }
      ],
      quotes: [
        {
          text: 'China self-identified as a "near-Arctic state" in 2018 and has funneled over $90 billion into Arctic energy and resource projects over the last decade.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Non-Arctic Observers'
        },
        {
          text: 'EU nations (notably Belgium, France, Spain) increased Russian LNG imports by 50% post-sanctions.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Energy Dimensions'
        }
      ],
      citations: ['Report 2, Page 2'],
      mapTarget: { lat: 71.2742, lng: 72.0725, zoom: 6, hotspotId: 'yamal-sabetta', hotspotName: 'Yamal Sabetta LNG' },
      threatLevel: 'High'
    }
  },
  {
    id: 'node-lomonosov-ridge',
    type: 'customLeaf',
    position: { x: -20, y: 840 },
    data: {
      label: 'Lomonosov Ridge Seabed Claim',
      pillar: 'resources',
      subtitle: 'Overlapping Continental Shelf Claims (CLCS)',
      summary: 'Canada, Russia, and Denmark/Greenland submit overlapping claims over the 1,800-km undersea ridge. UN CLCS gave non-binding approval to Russia in Feb 2023. U.S. handicapped by UNCLOS non-ratification.',
      keyActors: ['CLCS (UN)', 'Russia', 'Denmark', 'Canada', 'United States'],
      metrics: [
        { label: 'CLCS Decision', value: 'Feb 2023 Non-binding' },
        { label: 'US UNCLOS Status', value: 'Not Ratified' }
      ],
      quotes: [
        {
          text: 'Overlapping continental shelf claims exist over the Lomonosov Ridge (Canada, Russia, Denmark). CLCS issued non-binding recommendations for Russia in Feb 2023. U.S. is at a legal disadvantage due to non-ratification of UNCLOS.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Maritime Boundaries'
        }
      ],
      citations: ['Report 2, Page 2'],
      mapTarget: { lat: 85.0000, lng: 140.0000, zoom: 4, hotspotId: 'lomonosov-ridge', hotspotName: 'Lomonosov Ridge' },
      threatLevel: 'Critical'
    }
  },

  // PILLAR 4: CLIMATE & ENVIRONMENTAL SHIFTS (Right Bottom Branch)
  {
    id: 'pillar-climate',
    type: 'customPillar',
    position: { x: 1250, y: 600 },
    data: {
      label: '🌍 CLIMATE & ENVIRONMENTAL SHIFTS',
      pillar: 'climate',
      isPillarHeader: true,
      subtitle: 'Threat Multiplier & Physical Geography Shift',
      summary: '3x planetary warming rate, irreversible Greenland ice sheet melt, threats to 500,000 Indigenous peoples, and the Central Arctic Ocean Fisheries Agreement.',
      keyActors: ['Indigenous Peoples (ICC)', 'Arctic Council', 'NOAA / NASA', 'CAO Signatories'],
      metrics: [
        { label: 'Arctic Warming Rate', value: '3x Global Rate' },
        { label: 'Greenland Sheet Melt', value: '25 Consecutive Years' },
        { label: 'Threatened Alaska Native Villages', value: 'Nearly 60%' }
      ],
      quotes: [
        {
          text: 'The Arctic Circle (66.5°N) is experiencing global warming at an accelerated rate—potentially three times faster than the rest of the planet.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 1, Environmental Context'
        },
        {
          text: 'Climate change acts as a threat multiplier: Physical warming opens sea access, triggering competition over shared maritime commons... while destabilizing human security for Indigenous populations.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Threat Multiplier'
        }
      ],
      citations: ['Report 1 (Page 1)', 'Report 2 (Page 1-2)'],
      threatLevel: 'High'
    }
  },
  {
    id: 'node-ice-sheet-loss',
    type: 'customLeaf',
    position: { x: 1550, y: 550 },
    data: {
      label: '25-Year Greenland Ice Loss',
      pillar: 'climate',
      subtitle: 'Albedo Feedback & Ice-Free 2030s',
      summary: 'Continuous 25-year mass loss of the Greenland ice sheet reduces planetary albedo, warming high-latitude channels and exposing mineral belts previously locked under glaciers.',
      keyActors: ['Greenland', 'Climate Scientists', 'Mining Consortiums'],
      metrics: [
        { label: 'Melt Duration', value: '25 Consecutive Years' },
        { label: 'Warming Multiple', value: '3x Planet Average' }
      ],
      quotes: [
        {
          text: 'Shrinking sea ice reduces solar reflection, accelerating heat retention, while the Greenland ice sheet has continually lost ice over the past 25 years. Summer sea ice loss could lead to ice-free conditions in the Arctic Ocean as early as the 2030s.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 1, Environmental Background'
        }
      ],
      citations: ['Report 1, Page 1', 'Report 2, Page 1'],
      mapTarget: { lat: 72.0, lng: -40.0, zoom: 5, hotspotId: 'pituffik-space-base', hotspotName: 'Greenland Ice Sheet' },
      threatLevel: 'High'
    }
  },
  {
    id: 'node-indigenous-security',
    type: 'customLeaf',
    position: { x: 1580, y: 720 },
    data: {
      label: 'Indigenous Human Security',
      pillar: 'climate',
      subtitle: '500,000 People & Permafrost Erosion',
      summary: 'Over 500,000 Arctic Indigenous residents face erosion of traditional hunting, food security, and shoreline permafrost collapse. Nearly 60% of Alaska Native communities environmentally threatened.',
      keyActors: ['Inuit Circumpolar Council', 'Saami Council', 'Alaska Native Villages'],
      metrics: [
        { label: 'Indigenous Population', value: '~500,000 Total' },
        { label: 'Alaska Villages at Risk', value: '~60% Threatened' }
      ],
      quotes: [
        {
          text: 'Approximately 500,000 Indigenous people reside in the Arctic across traditional borders, represented as Permanent Participants in the Arctic Council... in Alaska, nearly 60% of Native communities are "environmentally threatened".',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 2, Indigenous Populations'
        }
      ],
      citations: ['Report 2, Page 2'],
      threatLevel: 'Medium'
    }
  },
  {
    id: 'node-arctic-council-paralysis',
    type: 'customLeaf',
    position: { x: 1350, y: 850 },
    data: {
      label: 'Arctic Council Multilateral Paralysis',
      pillar: 'climate',
      subtitle: 'Governance Suspension & Norway Chairmanship',
      summary: 'Cooperation in the Arctic Council froze post-2022 invasion; Arctic Coast Guard Forum dormant. Norway assumed chair in May 2023 aiming to preserve non-security scientific and climate dialogues.',
      keyActors: ['Arctic Council', 'Norway (2023 Chair)', 'Arctic 7 vs Russia'],
      metrics: [
        { label: 'Council Status', value: 'Operational Paralysis' },
        { label: 'Technical Exception', value: 'CAO Fisheries & Polar Code' }
      ],
      quotes: [
        {
          text: 'Cooperation in the Arctic Council paused following the 2022 invasion; the Arctic Coast Guard Forum remains dormant. Functional technical guardrails like the IMO Polar Code and CAO Fisheries Agreement remain operational exceptions.',
          source: 'Report 2 (CFR Testimony)',
          page: 'Page 3, Governance Breakdown'
        }
      ],
      citations: ['Report 1 (Page 3)', 'Report 2 (Page 3)'],
      mapTarget: { lat: 78.2232, lng: 15.6267, zoom: 6, hotspotId: 'svalbard-archipelago', hotspotName: 'Svalbard Arctic Post' },
      threatLevel: 'High'
    }
  }
];

export const INITIAL_MINDMAP_EDGES: Edge[] = [
  // Core to Pillars
  {
    id: 'edge-core-security',
    source: 'core-nexus',
    target: 'pillar-security',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 }
  },
  {
    id: 'edge-core-trade',
    source: 'core-nexus',
    target: 'pillar-trade',
    animated: true,
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  },
  {
    id: 'edge-core-resources',
    source: 'core-nexus',
    target: 'pillar-resources',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 2 }
  },
  {
    id: 'edge-core-climate',
    source: 'core-nexus',
    target: 'pillar-climate',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 }
  },

  // Security Sub-Nodes
  { id: 'edge-sec-pituffik', source: 'pillar-security', target: 'node-pituffik', style: { stroke: '#f87171' } },
  { id: 'edge-sec-nuuk', source: 'pillar-security', target: 'node-nuuk-diplomacy', style: { stroke: '#f87171' } },
  { id: 'edge-sec-danish', source: 'pillar-security', target: 'node-danish-dilemma', style: { stroke: '#f87171' } },
  { id: 'edge-sec-nato', source: 'pillar-security', target: 'node-nato-arctic-seven', style: { stroke: '#f87171' } },
  { id: 'edge-sec-russia', source: 'pillar-security', target: 'node-russia-northern-fleet', style: { stroke: '#f87171' } },

  // Trade Sub-Nodes
  { id: 'edge-trade-nsr', source: 'pillar-trade', target: 'node-northern-sea-route', style: { stroke: '#7dd3fc' } },
  { id: 'edge-trade-nwp', source: 'pillar-trade', target: 'node-northwest-passage', style: { stroke: '#7dd3fc' } },
  { id: 'edge-trade-nome', source: 'pillar-trade', target: 'node-us-nome-port', style: { stroke: '#7dd3fc' } },

  // Resources Sub-Nodes
  { id: 'edge-res-ree', source: 'pillar-resources', target: 'node-greenland-ree', style: { stroke: '#fcd34d' } },
  { id: 'edge-res-yamal', source: 'pillar-resources', target: 'node-yamal-china-energy', style: { stroke: '#fcd34d' } },
  { id: 'edge-res-lomonosov', source: 'pillar-resources', target: 'node-lomonosov-ridge', style: { stroke: '#fcd34d' } },

  // Climate Sub-Nodes
  { id: 'edge-clim-ice', source: 'pillar-climate', target: 'node-ice-sheet-loss', style: { stroke: '#6ee7b7' } },
  { id: 'edge-clim-indig', source: 'pillar-climate', target: 'node-indigenous-security', style: { stroke: '#6ee7b7' } },
  { id: 'edge-clim-council', source: 'pillar-climate', target: 'node-arctic-council-paralysis', style: { stroke: '#6ee7b7' } },

  // Strategic Cross-Links
  {
    id: 'cross-pituffik-greenland-ree',
    source: 'node-pituffik',
    target: 'node-greenland-ree',
    animated: true,
    style: { stroke: '#94a3b8', strokeDasharray: '5,5', strokeWidth: 1.5 }
  },
  {
    id: 'cross-nsr-yamal',
    source: 'node-northern-sea-route',
    target: 'node-yamal-china-energy',
    animated: true,
    style: { stroke: '#94a3b8', strokeDasharray: '5,5', strokeWidth: 1.5 }
  },
  {
    id: 'cross-ice-routes',
    source: 'node-ice-sheet-loss',
    target: 'node-northern-sea-route',
    animated: true,
    style: { stroke: '#94a3b8', strokeDasharray: '5,5', strokeWidth: 1.5 }
  }
];
