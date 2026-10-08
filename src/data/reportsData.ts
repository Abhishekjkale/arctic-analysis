export interface ReportDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  source: string;
  classification: string;
  pages: {
    pageNumber: number;
    title: string;
    sections: {
      heading: string;
      content: string;
      bullets?: string[];
      metrics?: { label: string; value: string }[];
    }[];
  }[];
  executiveSummary: string;
  keyActors: {
    name: string;
    posture: string;
    risksOrGains: string;
  }[];
  scenarios: {
    title: string;
    description: string;
    probability?: string;
  }[];
  recommendations: string[];
}

export const REPORT_1: ReportDocument = {
  id: "greenland-us-takeover",
  title: "The Quiet Shift: The De Facto U.S. Takeover of Greenland",
  subtitle: "Strategic Realignment, Mineral Hegemony, and the Recasting of Arctic Sovereignty",
  date: "October 8, 2026",
  author: "Senior Geopolitical Analyst",
  source: "Case Study Report | Open Source Intelligence (OSINT)",
  classification: "Unclassified / OSINT",
  executiveSummary: "Greenland is undergoing a profound geopolitical transition, marked by a de facto realignment of its security, economic, and administrative infrastructure away from Copenhagen and into the strategic orbit of Washington. Accelerated by rapid Arctic ice melt, vast unexploited critical mineral deposits, and intensifying power competition with Russia and China, the United States has bypassed traditional diplomatic channels to establish direct bilateral ties with Nuuk. This strategic pivot effectively integrates Greenland into North American defense and supply-chain frameworks, drastically eroding Denmark's historical sovereign authority and fundamentally recasting Arctic governance.",
  keyActors: [
    {
      name: "United States",
      posture: "Direct infrastructure investment; integration into NORAD and NORTHCOM defense perimeters; EXIM/DFC mineral financing.",
      risksOrGains: "Secures critical REE supply chain (25% global); neutralizes Sino-Russian Arctic ambition; operational control of Pituffik Space Base."
    },
    {
      name: "Kingdom of Denmark",
      posture: "Passive acquiescence to U.S. security dominance; focus on maintaining constitutional unity (Rigsfællesskabet).",
      risksOrGains: "Irreversible loss of sovereign authority and diplomatic irrelevance in Arctic affairs; acute constitutional crisis."
    },
    {
      name: "Greenland (Naalakkersuisut)",
      posture: "Leverages American interest as strategic counterweight against Danish colonial legacy to fund financial self-sufficiency.",
      risksOrGains: "Risk of exchanging post-colonial Danish governance for American security and economic dependence."
    },
    {
      name: "Russian Federation",
      posture: "Increased military posture along Northern Sea Route; deployment of submarine intelligence assets.",
      risksOrGains: "Perimeter encirclement risk; potential escalation in Arctic maritime choke points."
    },
    {
      name: "People's Republic of China",
      posture: "Shifted from blocked direct mining investment (Shenghe Resources) to gray-zone scientific research and commercial shipping push.",
      risksOrGains: "Strategic exclusion from North American critical mineral supply chains."
    },
    {
      name: "NATO / Arctic Council",
      posture: "Reinforcement of NATO's northern flank; operational paralysis of Arctic Council multilateralism.",
      risksOrGains: "Heightened collective security; risk of bilateral agreements usurping consensus."
    }
  ],
  scenarios: [
    {
      title: "Scenario A: Formalized Independence via Compact of Free Association (COFA)",
      description: "Greenland declares formal independence from Denmark, immediately signing a COFA agreement with the U.S. Washington assumes full defense authority and exclusive economic access in exchange for direct financial subsidies, mirroring Pacific arrangements.",
      probability: "Medium-High"
    },
    {
      title: "Scenario B: Status Quo Friction & De Facto Dual Sovereignty",
      description: "Denmark retains nominal legal sovereignty, but the U.S. exercises complete operational control over security, mining, and critical infrastructure, leaving Copenhagen as a figurehead administrator in Arctic security councils.",
      probability: "Current Baseline"
    },
    {
      title: "Scenario C: Multi-Polar Flashpoint & Gray-Zone Pushback",
      description: "Danish political retreat creates governance vacuums, prompting aggressive Russian naval probing and Chinese scientific intelligence operations, turning Greenlandic waters into an active gray-zone conflict domain.",
      probability: "Elevated Escalation Risk"
    }
  ],
  recommendations: [
    "Formalize Trilateral Governance Frameworks: Establish explicit, binding trilateral protocols between Washington, Nuuk, and Copenhagen to ensure security integration respects constitutional law and local consent.",
    "Institute Multilateral Critical Mineral Oversight: Diversify investment alliances in Greenlandic mining to include EU and NATO partners, preventing single-nation economic hegemony and boosting supply resilience.",
    "Strengthen Arctic Council Operational Norms: Re-engage multilateral Arctic forums to prevent bilateral defense arrangements from undermining environmental protections and high-latitude navigation treaties.",
    "Enhance Local Institutional Capacity: Channel international technical assistance directly into Nuuk's civil administrative apparatus to preserve native policy autonomy amid major power competition."
  ],
  pages: [
    {
      pageNumber: 1,
      title: "Executive Summary & Historical Context",
      sections: [
        {
          heading: "Key Indicators & Baseline Metrics",
          content: "Critical baseline intelligence statistics establishing the strategic significance of the Greenland theatre.",
          metrics: [
            { label: "Global REE Reserves", value: "25%" },
            { label: "Direct U.S. Grant Aid", value: "$12.1M" },
            { label: "Nuuk Consulate Reopened", value: "2020 (after 67 yrs)" },
            { label: "Greenland Population", value: "56,000" }
          ]
        },
        {
          heading: "1. Executive Summary",
          content: "Greenland is undergoing a profound geopolitical transition, marked by a de facto realignment of its security, economic, and administrative infrastructure away from Copenhagen and into the strategic orbit of Washington. Accelerated by rapid Arctic ice melt, vast unexploited critical mineral deposits, and intensifying power competition with Russia and China, the United States has bypassed traditional diplomatic channels to establish direct bilateral ties with Nuuk. This strategic pivot effectively integrates Greenland into North American defense and supply-chain frameworks, drastically eroding Denmark's historical sovereign authority and fundamentally recasting Arctic governance."
        },
        {
          heading: "2. Historical Context & The Gradual Shift",
          content: "The Legacy Foundation: Modern U.S. strategic posture in Greenland traces directly to the 1951 Defense Agreement between the United States and the Kingdom of Denmark. This accord formalized American security guarantees over the island, leading to the construction of Pituffik Space Base (formerly Thule Air Base). Positioned halfway between Washington and Moscow, Pituffik became the bedrock of North American early-warning missile radar and space surveillance throughout the Cold War. For decades, Washington maintained a policy of passive military access, granting Copenhagen full diplomatic and domestic administrative dominance.\n\nThe Catalysts for Acceleration: The functional paradigm shifted dramatically over the past decade. Escalating Arctic warming unlocked high-latitude shipping channels and exposed unprecedented deposits of critical minerals, transforming Greenland into a focal point of global resource competition. The reopening of the U.S. Consulate in Nuuk in 2020—after a 67-year absence—marked a definitive transition from static military presence to active administrative, diplomatic, and economic integration. Supported by targeted USAID-style technical packages, infrastructure funding, and direct bilateral dialogues, Washington has established a persistent presence that systematically side-steps the Danish Ministry of Foreign Affairs."
        }
      ]
    },
    {
      pageNumber: 2,
      title: "Mechanisms of Takeover & Sovereignty Dilemma",
      sections: [
        {
          heading: "3. Mechanisms of the De Facto Takeover",
          content: "A. Security & Defense Integration: The U.S. Department of Defense has expanded its operational footprint across Greenland, effectively subsuming local domain awareness under U.S. Northern Command (NORTHCOM). Through modernized radar installations, expanded air surveillance networks, and joint cold-weather military exercises, American forces have filled structural capability gaps left by Denmark's underfunded Arctic Command. Furthermore, defense agreements now grant U.S. personnel expanded freedom of movement, implicitly downgrading Denmark's independent security command over its own sovereign territory.\n\nB. Economic & Critical Minerals Hegemony: Greenland holds an estimated 25% of the world’s rare earth elements (REEs), alongside massive reserves of uranium, lithium, and titanium. Washington has deployed strategic capital through the U.S. Export-Import Bank (EXIM) and the International Development Finance Corporation (DFC) to fund extraction ventures. By financing infrastructure and securing off-take agreements, the U.S. has effectively blocked Chinese state-owned enterprises—such as Shenghe Resources—from securing critical mining licenses, anchoring Greenland's supply chains exclusively to North America.\n\nC. Diplomatic & Soft Power Presence: Through its Nuuk Consulate, the U.S. State Department conducts direct bilateral engagement with the Naalakkersuisut (Greenlandic Government), bypassing Copenhagen on key economic and social policy initiatives. Targeted educational exchanges, English-language training, and municipal capacity-building programs foster a distinct pro-American civil alignment. This direct institutional bridging deliberately marginalizes Denmark's historical role as the primary administrator and benefactor of the Greenlandic population."
        },
        {
          heading: "4. Danish Dilemma and Greenlandic Sovereignty",
          content: "The View from Copenhagen: Denmark faces an acute constitutional crisis within the 'Unity of the Realm' (Rigsfællesskabet). Copenhagen lacks the capital to match U.S. infrastructure investments and the military budget to defend Arctic airspace independently. Forced to yield to NATO and U.S. security mandates, Danish officials struggle to preserve nominal territorial sovereignty while being systematically excluded from high-level economic decisions between Nuuk and Washington.\n\nThe View from Nuuk: The Naalakkersuisut leverages American interest as strategic counterweight against Danish colonial legacy, using direct U.S. aid to accelerate financial self-sufficiency required for formal independence. However, local leaders face growing internal debate over the risk of exchanging post-colonial Danish governance for a new form of American security and economic dependence."
        }
      ]
    },
    {
      pageNumber: 3,
      title: "Global Repercussions, Scenarios & Recommendations",
      sections: [
        {
          heading: "5. Arctic Geopolitics & Global Repercussions",
          content: "Stakeholder breakdown matrix evaluating strategic response to alignment and primary risk/opportunity profile for United States, Kingdom of Denmark, Russian Federation, People's Republic of China, and NATO / Arctic Council."
        },
        {
          heading: "6. Future Scenarios & Strategic Outlook",
          content: "Scenario A: Formalized Independence via Compact of Free Association (COFA)\nScenario B: Status Quo Friction & De Facto Dual Sovereignty\nScenario C: Multi-Polar Flashpoint & Gray-Zone Pushback"
        },
        {
          heading: "7. Strategic Recommendations",
          content: "Policy roadmap advocating for trilateral protocols between Washington, Nuuk, and Copenhagen, multilateral mineral consortiums including EU/NATO allies, reviving Arctic Council norm compliance, and strengthening local civil capacity."
        }
      ]
    }
  ]
};

export const REPORT_2: ReportDocument = {
  id: "cfr-arctic-geopolitics",
  title: "Case Study Report: Arctic Geopolitics",
  subtitle: "Strategic Competition, Environmental Shifts, and the High North Security Architecture",
  date: "July 18, 2023",
  author: "Senior Geopolitical Analyst",
  source: "CFR Testimony (Esther D. Brimmer)",
  classification: "Case Study Report | Congressional / CFR Hearing",
  executiveSummary: "This case study evaluates the geopolitical dynamics of the Arctic, a region situated at the convergence of shifting international relations, rapid climate change, and the strategic ramifications of Russia's 2022 invasion of Ukraine. The core geopolitical friction centers on the transition from the post–Cold War posture of 'High North, Low Tension' to heightened great power competition. This shift is marked by the expansion of NATO, the disruption of critical regional governance mechanisms like the Arctic Council, and increased Chinese economic influence in the Russian Arctic. Primary findings indicate that while climate change opens theoretical economic opportunities and navigation routes, it simultaneously acts as a destabilizing catalyst. Mitigating future escalation will require sustained allied cooperation, investment in maritime capabilities, and the diplomatic preservation of governance frameworks despite deep political fractures.",
  keyActors: [
    {
      name: "Russian Federation",
      posture: "Holds 20% landmass and ~50% Arctic coastline. Relies heavily on oil/gas reserves; enforces Northern Sea Route (NSR) tariffs and military escorts.",
      risksOrGains: "Economic isolation post-Ukraine; forced into strategic and financial dependence on China ($90B invested); defensive militarization along Kola peninsula."
    },
    {
      name: "United States",
      posture: "Positioned via Alaska; Oct 2022 National Strategy for Arctic Region. Seeks maritime domain awareness and allied coordination.",
      risksOrGains: "Strategic vulnerabilities: Non-ratification of UNCLOS compromises continental shelf claims; severe shortage of polar icebreakers; deep-water port deficits."
    },
    {
      name: "Finland & Sweden",
      posture: "Abandoned decades of neutrality following 2022 invasion of Ukraine; joined NATO (Finland April 2023, Sweden following).",
      risksOrGains: "Added 832-mile direct border between NATO and Russia; consolidates Arctic 7 (seven NATO states against one: Russia)."
    },
    {
      name: "Canada, Denmark, Iceland, Norway",
      posture: "Primary NATO Arctic states. Norway assumed two-year Arctic Council chairmanship in May 2023 focusing on oceans, climate, and indigenous wellbeing.",
      risksOrGains: "Must balance regional environmental stewardship against heightened NATO collective defense mandates."
    },
    {
      name: "China (Non-Arctic Observer)",
      posture: "Self-designated 'Near-Arctic State' (2018 White Paper); funneled >$90B into Arctic energy (Yamal LNG) and Belt & Road polar infrastructure.",
      risksOrGains: "Gains leveraged energy access from isolated Russia; seeks access to NSR commercial transit lanes."
    },
    {
      name: "Indigenous Arctic Populations",
      posture: "~500,000 Indigenous people across traditional boundaries; Permanent Participants in Arctic Council.",
      risksOrGains: "Disproportionately threatened: Climate warming is 3x faster; in Alaska, ~60% of Native communities are environmentally threatened."
    }
  ],
  scenarios: [
    {
      title: "Transatlantic Security Integration",
      description: "NATO increasingly integrates High North logistics, surveillance, and polar exercises into core operations following Finnish and Swedish accession.",
      probability: "Active Reality"
    },
    {
      title: "Sino-Russian Arctic Axis",
      description: "Western economic isolation deepens Russian dependency on Chinese capital ($90B+) along the Northern Sea Route and Yamal LNG/Arctic LNG 2 energy projects.",
      probability: "Accelerating"
    },
    {
      title: "Friction in Global Commons",
      description: "Heightened competition over unmapped seabeds (Lomonosov Ridge) and navigation routes sharply increases operational demands on U.S. and allied naval and coast guard forces.",
      probability: "High Long-term Risk"
    }
  ],
  recommendations: [
    "Expand Polar Fleet Capabilities: Fully fund and accelerate the U.S. Coast Guard's Polar Security Cutter program to maintain operational presence and ensure maritime domain awareness.",
    "Build Infrastructure in Nome, Alaska: Expedite construction of the deep-water port at Nome to support maritime security, commercial transit, and emergency response capacity near the Bering Strait.",
    "Sustain Multilateral Engagement: Support Norway's Arctic Council chairmanship to preserve non-security mechanisms focusing on environmental, scientific, and Indigenous welfare.",
    "Accession to UNCLOS: Re-evaluate U.S. non-ratification of the UN Convention on the Law of the Sea to legally substantiate extended continental shelf rights on equal ground with international rivals."
  ],
  pages: [
    {
      pageNumber: 1,
      title: "Executive Summary, Environmental Context & Key Stakeholders",
      sections: [
        {
          heading: "1. Executive Summary",
          content: "This case study evaluates the geopolitical dynamics of the Arctic, a region situated at the convergence of shifting international relations, rapid climate change, and the strategic ramifications of Russia's 2022 invasion of Ukraine. The core geopolitical friction centers on the transition from the post–Cold War posture of 'High North, Low Tension' to heightened great power competition. This shift is marked by the expansion of NATO, the disruption of critical regional governance mechanisms like the Arctic Council, and increased Chinese economic influence in the Russian Arctic. Primary findings indicate that while climate change opens theoretical economic opportunities and navigation routes, it simultaneously acts as a destabilizing catalyst. Mitigating future escalation will require sustained allied cooperation, investment in maritime capabilities, and the diplomatic preservation of governance frameworks despite deep political fractures."
        },
        {
          heading: "2. Introduction & Background",
          content: "Environmental Context: The Arctic Circle (66.5°N) is experiencing global warming at an accelerated rate—potentially three times faster than the rest of the planet. Shrinking sea ice reduces solar reflection, accelerating heat retention, while the Greenland ice sheet has continually lost ice over the past 25 years. Summer sea ice loss could lead to ice-free conditions in the Arctic Ocean as early as the 2030s, altering ocean accessibility and physical geography.\n\nScope and Significance: Home to approximately four million people, the Arctic serves as both a geographical area and a critical geopolitical framework—often dubbed 'America's Fourth Coast'. It acts as an amplifier of external strategic decisions, where international rivalries directly impact regional stability, global sea routes, environmental conservation, and local populations.\n\nCentral Thesis: Russia's invasion of Ukraine, alongside systemic climate change, has permanently altered the Arctic's security ecosystem—ending the era of 'High North, Low Tension' and transforming the region into an arena of active great power rivalry between NATO, Russia, and non-Arctic actors like China."
        },
        {
          heading: "3. Key Actors and Stakeholders (Part 1)",
          content: "Russian Federation: Holds 20% of its landmass and about half of the Arctic coastline within the Arctic Circle, accommodating roughly two million Arctic residents. Russia relies heavily on the Arctic for economic development, particularly through undiscovered conventional oil and gas reserves, and actively promotes usage and tariffs for the Northern Sea Route (NSR).\n\nUnited States: Positioned as an Arctic power via Alaska, focusing policy through its October 2022 National Strategy for the Arctic Region. The U.S. faces strategic limitations due to its non-ratification of UNCLOS and a need for improved polar icebreaking and deep-water port infrastructure.\n\nFinland & Sweden: Long-standing neutral states that shifted their national security calculations following Russia's 2022 invasion of Ukraine. Finland's NATO accession in April 2023 added an 832-mile land border with Russia, while Sweden's entry moves the region to a state of seven NATO members opposing one (Russia)."
        }
      ]
    },
    {
      pageNumber: 2,
      title: "Geopolitical Dimensions & Conflict Drivers",
      sections: [
        {
          heading: "Key Stakeholders (Part 2)",
          content: "Canada, Denmark (Greenland/Faroe Islands), Iceland, Norway: Primary NATO states in the region. Norway assumed the two-year chair of the Arctic Council in May 2023, prioritizing oceans, climate/environment, sustainable economic development, and Arctic populations.\n\nNon-Arctic Observers (China, EU, Others): China self-identified as a 'near-Arctic state' in 2018 and has funneled over $90 billion into Arctic energy and resource projects over the last decade. EU nations (notably Belgium, France, Spain) increased Russian LNG imports by 50% post-sanctions.\n\nIndigenous Populations: Approximately 500,000 Indigenous people reside in the Arctic across traditional borders, represented as Permanent Participants in the Arctic Council. Climate change threatens traditional hunting and food security; in Alaska, nearly 60% of Native communities are 'environmentally threatened'."
        },
        {
          heading: "4. Core Geopolitical Dimensions",
          content: "Territorial Claims & Maritime Boundaries:\n• All eight Arctic states claim 200-nautical-mile Exclusive Economic Zones (EEZs).\n• Overlapping continental shelf claims exist over the Lomonosov Ridge (Canada, Russia, Denmark). CLCS issued non-binding recommendations for Russia in Feb 2023.\n• U.S. is at a legal disadvantage due to non-ratification of UNCLOS.\n\nTrade Routes & Navigation:\n• Russia seeks control/tariffs over the Northern Sea Route (NSR).\n• Non-Russian traffic dropped in 2022: only 36 of 314 ships were non-Russian flagged; COSCO sent zero ships along NSR in 2022.\n• Ice-free summers expected in 2030s, but navigation remains complex.\n\nResource Exploitation:\n• USGS estimates 13% (90B barrels) of undiscovered oil is in the Arctic.\n• 2021 CAO Fisheries Agreement protects central Arctic high seas against IUU fishing through 2037.\n\nMilitarization & Security:\n• NATO expands to 7 Arctic states vs. Russia; Finland added an 832-mile NATO-Russia border.\n• High North prioritized by NATO's Allied Command Transformation for transatlantic resupply."
        },
        {
          heading: "5. Critical Analysis & Conflict Drivers",
          content: "• Drivers of Conflict & Strategic Realignment: Western sanctions post-invasion isolated Russia, forcing it into a closer strategic alignment with China. Chinese capital ($90B invested) supports Russian energy extraction and Belt & Road goals in global spaces.\n• Climate Change as a Threat Multiplier: Physical warming opens sea access, triggering competition over shared maritime commons and energy reserves while simultaneously destabilizing human security for Indigenous populations."
        }
      ]
    },
    {
      pageNumber: 3,
      title: "Governance Breakdown & Policy Recommendations",
      sections: [
        {
          heading: "Governance Breakdown & Strategic Scenarios",
          content: "Breakdown of Governance Frameworks: Cooperation in the Arctic Council paused following the 2022 invasion; the Arctic Coast Guard Forum remains dormant. Functional technical guardrails like the IMO Polar Code and CAO Fisheries Agreement remain operational exceptions.\n\nStrategic Implications:\n• Transatlantic Security Integration: NATO will increasingly integrate High North logistics, surveillance, and polar exercises into core operations.\n• Sino-Russian Arctic Axis: Economic isolation will deepen Russian dependency on Chinese investments along the Northern Sea Route and energy sector.\n• Friction in Global Commons: Heightened competition over unmapped seabeds and navigation routes will increase operational demands on U.S. and allied naval and coast guard forces."
        },
        {
          heading: "7. Conclusion & Policy Recommendations",
          content: "The post–Cold War posture of 'High North, Low Tension' has permanently transitioned into structured great power competition. Key policy recommendations:\n1. Expand Polar Fleet Capabilities (USCG Polar Security Cutter program)\n2. Build Infrastructure in Nome, Alaska (expedite deep-water port construction)\n3. Sustain Multilateral Engagement (support Norway's Arctic Council chairmanship)\n4. Accession to UNCLOS (re-evaluate non-ratification to legally substantiate extended continental shelf rights)"
        }
      ]
    }
  ]
};

export interface ComparativeSynthesis {
  theme: string;
  report1Greenland: string;
  report2ArcticBroad: string;
  strategicSynthesis: string;
  riskSeverity: "High" | "Critical" | "Elevated" | "Medium";
}

export const COMPARATIVE_SYNTHESIS_MATRIX: ComparativeSynthesis[] = [
  {
    theme: "Sovereignty & Bilateral vs Multilateral Architecture",
    report1Greenland: "U.S. directly bypasses Copenhagen to execute direct bilateral diplomacy with Nuuk, exploiting Danish defense underfunding and Greenlandic desires for self-determination.",
    report2ArcticBroad: "The post-Cold War multilateral consensus ('High North, Low Tension') has fractured. Arctic Council suspended after Russia's 2022 Ukraine invasion, leaving a 'NATO 7 vs Russia 1' confrontational bloc.",
    strategicSynthesis: "Both reports demonstrate the rapid decay of post-Cold War multilateral governance. In both the Western hemisphere (Greenland) and the pan-Arctic theater, bilateral hard-power and resource alignments are usurping traditional forums.",
    riskSeverity: "Critical"
  },
  {
    theme: "Critical Minerals & Resource Dominance",
    report1Greenland: "Greenland holds 25% of global REE reserves (plus uranium, lithium, titanium). U.S. deployed EXIM and DFC capital to block Chinese state enterprise Shenghe Resources from critical extraction licenses.",
    report2ArcticBroad: "Arctic harbors 13% (~90B barrels) of undiscovered oil and vast natural gas. China poured >$90B into Russian Arctic energy (Yamal LNG) as Western sanctions isolated Moscow.",
    strategicSynthesis: "A stark bipolar resource divide: The U.S. is ring-fencing Greenlandic critical minerals exclusively into North American supply chains, while Russia has become financially dependent on Beijing's capital to exploit its fossil fuel reserves.",
    riskSeverity: "Critical"
  },
  {
    theme: "Military Foothold & Base Infrastructure",
    report1Greenland: "Pituffik Space Base (formerly Thule) modernized under US NORTHCOM; grants U.S. forces unimpeded freedom of movement, relegating Danish Arctic Command to figurehead status.",
    report2ArcticBroad: "NATO's northern flank expanded via Finland's 832-mile border with Russia. However, the U.S. suffers chronic polar deficits: lack of icebreakers and absence of deep-water Arctic ports, necessitating urgent expansion at Nome, Alaska.",
    strategicSynthesis: "While the U.S. maintains dominant aerospace/radar surveillance at Pituffik, its surface maritime presence is severely outmatched by Russia's icebreaker fleet, driving an urgent scramble for polar security cutters and deep-water ports.",
    riskSeverity: "High"
  },
  {
    theme: "Trade Corridors & Ice Melt Geopolitics",
    report1Greenland: "Ice sheet loss over 25 years unlocks Greenlandic mineral access and reveals high-latitude Northwest Passage maritime approaches.",
    report2ArcticBroad: "Accelerated warming (3x planetary average) leads toward ice-free summer Arctic Ocean by the 2030s. Russia aggressively levies tariffs along the Northern Sea Route (NSR), though non-Russian commercial traffic collapsed post-2022.",
    strategicSynthesis: "Physical climate change is functioning as a geopolitical threat multiplier, transforming theoretically shared commons into competitive maritime corridors and disputed extended continental shelves (e.g., Lomonosov Ridge).",
    riskSeverity: "Elevated"
  },
  {
    theme: "Legal Regimes & UNCLOS Vulnerability",
    report1Greenland: "1951 U.S.-Denmark Defense Agreement reinterpreted as Washington exercises de facto operational hegemony; potential Pacific COFA model.",
    report2ArcticBroad: "U.S. non-ratification of UNCLOS leaves Washington at a severe legal disadvantage against Russian and Canadian claims over the seabed (CLCS recommendations).",
    strategicSynthesis: "The U.S. is relying on de facto operational dominance and bilateral agreements (such as with Nuuk) precisely because its failure to ratify UNCLOS deprives it of legitimate multilateral adjudication mechanisms.",
    riskSeverity: "High"
  }
];
