export interface StrategicHotspot {
  id: string;
  name: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  coordinatesLabel: string;
  category: "military" | "trade" | "resources" | "disputed";
  status: string;
  sourceReport: "Report 1 (Greenland)" | "Report 2 (CFR Arctic)" | "Joint";
  pageCitation: string;
  summary: string;
  intelligenceDetails: string[];
  associatedNodeId: string;
  strategicSignificance: "High" | "Critical" | "Elevated";
}

export const STRATEGIC_HOTSPOTS: StrategicHotspot[] = [
  {
    id: "pituffik-space-base",
    name: "Pituffik Space Base (Thule)",
    region: "Northwest Greenland",
    country: "Greenland / USA",
    coordinates: { lat: 76.5312, lng: -68.7031 },
    coordinatesLabel: "76°31'52\" N, 68°42'11\" W",
    category: "military",
    status: "Active U.S. Aerospace & Early-Warning Installation",
    sourceReport: "Report 1 (Greenland)",
    pageCitation: "Report 1, Page 1 (Section 2) & Page 2 (Section 3.A)",
    summary: "Bedrock of North American early-warning missile radar and space surveillance positioned halfway between Washington and Moscow. Formalized under 1951 Defense Agreement; modernized under US NORTHCOM.",
    intelligenceDetails: [
      "Subsumed under U.S. Northern Command (NORTHCOM) domain awareness.",
      "Modernized radar installations and joint cold-weather military exercises fill structural gaps left by Denmark's underfunded Arctic Command.",
      "Expanded bilateral defense agreements grant U.S. personnel expanded freedom of movement across Greenlandic territory."
    ],
    associatedNodeId: "node-pituffik",
    strategicSignificance: "Critical"
  },
  {
    id: "nuuk-consulate",
    name: "Nuuk Diplomatic Hub & Naalakkersuisut",
    region: "Southwest Greenland",
    country: "Greenland",
    coordinates: { lat: 64.1814, lng: -51.6941 },
    coordinatesLabel: "64°10'53\" N, 51°41'39\" W",
    category: "military",
    status: "Direct Bilateral Diplomatic Channel",
    sourceReport: "Report 1 (Greenland)",
    pageCitation: "Report 1, Page 1 (Metrics & Section 2) & Page 2 (Section 3.C)",
    summary: "U.S. Consulate reopened in 2020 after a 67-year absence. Bypasses Copenhagen to conduct direct bilateral relations with the Naalakkersuisut on economics, mining, and soft power.",
    intelligenceDetails: [
      "$12.1M direct U.S. grant aid and targeted USAID-style capacity building.",
      "Educational exchanges and English-language training systematically cultivate pro-American civil alignment.",
      "Naalakkersuisut leverages U.S. interest as strategic counterweight against Danish colonial legacy to fund self-sufficiency."
    ],
    associatedNodeId: "node-nuuk-diplomacy",
    strategicSignificance: "Critical"
  },
  {
    id: "kvanefjeld-deposit",
    name: "Kvanefjeld (Kuannersuit) Critical Minerals",
    region: "Southern Greenland (Narsaq)",
    country: "Greenland",
    coordinates: { lat: 60.9856, lng: -46.0125 },
    coordinatesLabel: "60°59'08\" N, 46°00'45\" W",
    category: "resources",
    status: "Strategic Critical Mineral Bastion",
    sourceReport: "Report 1 (Greenland)",
    pageCitation: "Report 1, Page 2 (Section 3.B) & Page 3 (Stakeholder Matrix)",
    summary: "Greenland holds ~25% of global rare earth elements (REEs) along with lithium, uranium, and titanium. Chinese firm Shenghe Resources blocked via U.S. EXIM and DFC financing.",
    intelligenceDetails: [
      "Washington deployed strategic capital through U.S. Export-Import Bank (EXIM) and International Development Finance Corporation (DFC).",
      "Off-take agreements ensure critical rare earth elements are secured exclusively into North American defense supply chains.",
      "Prevents Chinese state-owned enterprise hegemony in the Western Arctic."
    ],
    associatedNodeId: "node-greenland-ree",
    strategicSignificance: "Critical"
  },
  {
    id: "murmansk-naval-base",
    name: "Murmansk & Kola Naval Bastion",
    region: "Kola Peninsula",
    country: "Russian Federation",
    coordinates: { lat: 68.9733, lng: 33.0856 },
    coordinatesLabel: "68°58'24\" N, 33°05'08\" E",
    category: "military",
    status: "Russian Northern Fleet Nuclear Submarine HQ",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 1 (Section 3) & Page 2 (Section 4)",
    summary: "Command center of Russia's Northern Fleet and submarine nuclear deterrent. Controls western approaches to the Northern Sea Route and Barents Sea bastion.",
    intelligenceDetails: [
      "Home to Russia's nuclear-powered icebreaker fleet (Atomflot) and strategic ballistic missile submarines.",
      "Post-Ukraine expansion of NATO puts Russian naval exits in closer proximity to hostile NATO airspace and surveillance.",
      "Heightened submarine intelligence patrols probing GIUK gap and Greenlandic waters."
    ],
    associatedNodeId: "node-russia-northern-fleet",
    strategicSignificance: "Critical"
  },
  {
    id: "nome-port",
    name: "Nome Arctic Deep-Water Port",
    region: "Seward Peninsula, Alaska",
    country: "United States",
    coordinates: { lat: 64.5011, lng: -165.4064 },
    coordinatesLabel: "64°30'04\" N, 165°24'23\" W",
    category: "military",
    status: "Proposed / Priority U.S. Deep-Water Arctic Base",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 3 (Policy Recommendation #2)",
    summary: "Priority U.S. infrastructure project to establish the first deep-water Arctic port in the United States, directly monitoring the Bering Strait choke point.",
    intelligenceDetails: [
      "Expediting construction at Nome is recommended to support U.S. Coast Guard Polar Security Cutters.",
      "Provides critical resupply, emergency response, and commercial escort capability near the Bering Strait.",
      "Offsets Russia's massive asymmetric advantage in Arctic deep-water naval bases."
    ],
    associatedNodeId: "node-us-nome-port",
    strategicSignificance: "High"
  },
  {
    id: "lomonosov-ridge",
    name: "Lomonosov Ridge Seabed Claim",
    region: "Central Arctic Ocean Basin",
    country: "Disputed (Russia / Denmark / Canada)",
    coordinates: { lat: 85.0000, lng: 140.0000 },
    coordinatesLabel: "85°00'00\" N, 140°00'00\" E",
    category: "disputed",
    status: "Overlapping Continental Shelf Claims (CLCS)",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 2 (Section 4: Territorial Claims)",
    summary: "1,800-km underwater continental ridge claimed by Russia, Denmark (via Greenland), and Canada under UNCLOS Article 76.",
    intelligenceDetails: [
      "In Feb 2023, UN Commission on the Limits of the Continental Shelf (CLCS) issued non-binding recommendations largely validating Russia's outer shelf submission.",
      "U.S. non-ratification of UNCLOS prevents Washington from formalizing its own extended shelf claims through legal treaty mechanisms.",
      "Area believed to hold massive unmapped seabed resources and energy deposits."
    ],
    associatedNodeId: "node-lomonosov-ridge",
    strategicSignificance: "Critical"
  },
  {
    id: "vilkitsky-strait",
    name: "Vilkitsky Strait (NSR Choke Point)",
    region: "Severnaya Zemlya / Taymyr Peninsula",
    country: "Russian Federation",
    coordinates: { lat: 77.9500, lng: 102.5000 },
    coordinatesLabel: "77°57'00\" N, 102°30'00\" E",
    category: "trade",
    status: "Key Maritime Choke Point & Tariff Zone",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 2 (Section 4: Trade Routes)",
    summary: "Strategic narrow strait connecting Kara Sea to Laptev Sea. Russia asserts internal waters status, requiring prior notice, permits, and mandatory icebreaker tariffs.",
    intelligenceDetails: [
      "Non-Russian commercial transit plummeted in 2022 to only 36 out of 314 vessels.",
      "Chinese COSCO shipping sent zero transits along NSR in 2022 despite Sino-Russian alignment.",
      "Future ice-free summers in the 2030s may prompt Western powers to challenge Russian domestic navigational mandates."
    ],
    associatedNodeId: "node-northern-sea-route",
    strategicSignificance: "High"
  },
  {
    id: "yamal-sabetta",
    name: "Yamal Peninsula (Sabetta LNG Terminal)",
    region: "Yamal-Nenets Autonomous Okrug",
    country: "Russian Federation",
    coordinates: { lat: 71.2742, lng: 72.0725 },
    coordinatesLabel: "71°16'27\" N, 72°04'21\" E",
    category: "resources",
    status: "Sino-Russian Energy Export Anchor",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 2 (Section 3: China & EU) & Page 3",
    summary: "Anchor of Russian liquefied natural gas (Yamal LNG & Arctic LNG 2). Heavily financed by Chinese capital ($90B+ Arctic energy funding).",
    intelligenceDetails: [
      "China self-identified as a 'near-Arctic state' in 2018 and has funneled over $90B into Russian Arctic projects.",
      "EU nations paradoxically increased Russian LNG imports by 50% post-2022 sanctions (Belgium, France, Spain).",
      "Demonstrates Russia's deepening financial and technological dependence on Beijing."
    ],
    associatedNodeId: "node-yamal-china-energy",
    strategicSignificance: "High"
  },
  {
    id: "helsinki-border",
    name: "Eastern Finnish Border & NATO Flank",
    region: "Fennoscandia",
    country: "Finland",
    coordinates: { lat: 60.1699, lng: 24.9384 },
    coordinatesLabel: "60°10'11\" N, 24°56'18\" E",
    category: "military",
    status: "Expanded NATO Northern Flank (832-Mile Border)",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 1 (Section 3: Finland & Sweden) & Page 2",
    summary: "Finland's April 2023 NATO accession added an 832-mile land border with Russia, fundamentally transforming Arctic defense from neutrality to 'Arctic 7 vs 1'.",
    intelligenceDetails: [
      "Sweden and Finland abandoned centuries/decades of neutrality following Russia's 2022 invasion of Ukraine.",
      "NATO now controls seven of the eight Arctic states, isolating Moscow.",
      "High North prioritized by NATO Allied Command Transformation for transatlantic resupply lines."
    ],
    associatedNodeId: "node-nato-arctic-seven",
    strategicSignificance: "Critical"
  },
  {
    id: "svalbard-archipelago",
    name: "Svalbard (Longyearbyen)",
    region: "Svalbard, High North",
    country: "Norway",
    coordinates: { lat: 78.2232, lng: 15.6267 },
    coordinatesLabel: "78°13'23\" N, 15°37'36\" E",
    category: "disputed",
    status: "Demilitarized Zone under 1920 Spitsbergen Treaty",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 2 (Section 3: Norway) & Page 3",
    summary: "Sovereign Norwegian territory subject to the 1920 Svalbard Treaty. Norway assumed the two-year Arctic Council chair in May 2023, seeking to sustain non-security dialogue.",
    intelligenceDetails: [
      "Norway prioritized oceans, climate, and Indigenous populations during its 2023-2025 Arctic Council chairmanship.",
      "Russian presence in Barentsburg creates persistent diplomatic and gray-zone friction.",
      "Scientific monitoring station for High North environmental shifts."
    ],
    associatedNodeId: "node-arctic-council-paralysis",
    strategicSignificance: "Elevated"
  },
  {
    id: "northwest-passage",
    name: "Northwest Passage (Lancaster Sound)",
    region: "Canadian Arctic Archipelago",
    country: "Canada",
    coordinates: { lat: 74.2167, lng: -80.5000 },
    coordinatesLabel: "74°13'00\" N, 80°30'00\" W",
    category: "trade",
    status: "Strategic Maritime Passage",
    sourceReport: "Report 2 (CFR Arctic)",
    pageCitation: "Report 2, Page 2 (Section 4: Trade Routes)",
    summary: "Alternative maritime route linking Atlantic and Pacific. Canada claims the waterways as internal sovereign waters, while the U.S. and others view it as an international transit strait.",
    intelligenceDetails: [
      "Thawing sea ice makes navigational windows more frequent, but drifting pack ice and lack of salvage infrastructure pose extreme risks.",
      "Commercial viability lags behind NSR due to lack of deep-water port infrastructure in northern Canada.",
      "Serves as strategic approach route to Greenland and North American defense perimeter."
    ],
    associatedNodeId: "node-northwest-passage",
    strategicSignificance: "Elevated"
  }
];
