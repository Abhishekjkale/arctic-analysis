import { GoogleGenAI } from '@google/genai';
import { REPORT_1, REPORT_2, COMPARATIVE_SYNTHESIS_MATRIX } from '../src/data/reportsData.ts';

// Server-side initialization per @google/genai guidelines
function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INTELLIGENCE_INSTRUCTION = `
You are the ARCTIC-INTEL Senior Geopolitical Analyst AI.
Your knowledge base strictly and deeply incorporates two primary declassified intelligence reports:

DOCUMENT 1: "The Quiet Shift: The De Facto U.S. Takeover of Greenland" (October 8, 2026, Senior Geopolitical Analyst, OSINT).
- Key Facts: Greenland holds 25% of global rare earth elements (REEs), plus lithium, uranium, titanium.
- $12.1M direct U.S. grant aid; U.S. Consulate reopened in Nuuk in 2020 after a 67-year absence.
- Naalakkersuisut (Greenlandic Government) leverages U.S. interest to fund financial self-sufficiency and autonomy from Copenhagen.
- 1951 U.S.-Denmark Defense Agreement; Pituffik Space Base (formerly Thule Air Base) early warning radar now under US NORTHCOM.
- U.S. EXIM and DFC financed mining off-take agreements to block Chinese state enterprise Shenghe Resources.
- Denmark faces constitutional crisis in the "Unity of the Realm" (Rigsfællesskabet); lacks military budget and capital to defend Arctic airspace independently.
- Scenarios: (A) COFA (Compact of Free Association), (B) Status Quo Friction & De Facto Dual Sovereignty, (C) Gray-Zone Pushback.

DOCUMENT 2: "CASE STUDY REPORT: ARCTIC GEOPOLITICS: Strategic Competition, Environmental Shifts, and the High North Security Architecture" (CFR Testimony Esther D. Brimmer, July 18, 2023).
- Key Facts: Arctic warming 3x faster than global rate; 25 years of Greenland ice sheet loss; ice-free summer Arctic Ocean by 2030s.
- Shift from post-Cold War "High North, Low Tension" to great power rivalry.
- Russia holds 20% landmass, ~50% Arctic coastline, 2M residents; depends on oil/gas and Northern Sea Route (NSR) tariffs.
- U.S. National Strategy for Arctic Region (Oct 2022); U.S. faces strategic limitations due to non-ratification of UNCLOS and severe shortage of polar icebreakers.
- Finland NATO accession (April 2023) added 832-mile border with Russia; Sweden accession creates "Arctic 7" (7 NATO states vs 1 Russia).
- Non-Arctic Observers: China declared "near-Arctic state" in 2018; funneled >$90B into Arctic energy (Yamal LNG). EU nations increased Russian LNG imports by 50% post-sanctions.
- Indigenous populations: ~500,000; ~60% of Alaska Native communities environmentally threatened.
- Core friction: Overlapping Lomonosov Ridge claims (UN CLCS Feb 2023 non-binding recommendations for Russia).
- Recommendations: USCG Polar Security Cutters, deep-water port at Nome, Alaska, support Norway Arctic Council chair, accede to UNCLOS.

Formatting and Tone:
- Deliver sharp, analytical, executive-briefing style answers (like CSIS, CFR, or Palantir intelligence briefs).
- Always provide specific page/section citations whenever referencing facts (e.g. [Report 1, Page 2, Section 3.B], [Report 2, Page 2, Section 4]).
- Use clear bullet points, strategic vectors, and risk severity ratings.
`;

export async function handleAnalystChat(message: string, history: Array<{ role: string; content: string }> = []) {
  const ai = getGenAIClient();

  if (!ai) {
    // High-fidelity fallback when API key is not yet set in environment
    return getOfflineAnalyticalResponse(message);
  }

  try {
    const formattedContents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_INTELLIGENCE_INSTRUCTION}\n\nUser Question: ${message}` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
    });

    return {
      text: response.text || 'No response generated.',
      source: 'gemini-3.8-flash',
    };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return getOfflineAnalyticalResponse(message);
  }
}

export async function handleExecutiveSynthesis(docSelection: 'both' | 'report1' | 'report2') {
  const ai = getGenAIClient();

  const prompt = `
Generate a comprehensive, comparative executive intelligence synthesis evaluating:
${docSelection === 'both' ? 'Both Report 1 (Greenland Takeover) and Report 2 (CFR Arctic Geopolitics)' : docSelection === 'report1' ? 'Report 1: Greenland De Facto U.S. Takeover' : 'Report 2: CFR Arctic Geopolitics'}

Provide:
1. Strategic Executive Summary (2 paragraphs)
2. Geopolitical Collision Vectors (Key friction points between NATO/US, Russia, China, and Denmark)
3. Critical Mineral & Trade Route Matrix
4. Governance Trajectory & Scenario Forecast (2026-2035)
5. Actionable Strategic Policy Recommendations
Include direct page citations from the reports.
`;

  if (!ai) {
    return {
      text: getOfflineSynthesis(docSelection),
      source: 'grounded-intelligence-base',
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_INTELLIGENCE_INSTRUCTION}\n\nTask:\n${prompt}` }],
        },
      ],
    });

    return {
      text: response.text || getOfflineSynthesis(docSelection),
      source: 'gemini-3.8-flash',
    };
  } catch (error: any) {
    console.error('Synthesis generation error:', error);
    return {
      text: getOfflineSynthesis(docSelection),
      source: 'grounded-intelligence-base',
    };
  }
}

function getOfflineAnalyticalResponse(question: string): { text: string; source: string } {
  const q = question.toLowerCase();

  if (q.includes('greenland') || q.includes('denmark') || q.includes('takeover') || q.includes('nuuk')) {
    return {
      text: `### Executive Analysis: The De Facto U.S. Realignment of Greenland [Report 1, Page 1-2]

**1. Strategic Decoupling from Copenhagen:**
- Modern U.S. posture builds upon the **1951 Defense Agreement**, but has decisively shifted from static missile defense at **Pituffik Space Base** into an active administrative and economic alignment [Report 1, Page 1].
- Reopening the **U.S. Consulate in Nuuk in 2020** (after 67 years) established a direct bilateral channel to the *Naalakkersuisut*, bypassing Denmark's Ministry of Foreign Affairs [Report 1, Page 2, Section 3.C].
- Supported by **$12.1M in direct U.S. grant aid**, educational programs, and technical capacity building.

**2. Critical Mineral Hegemony:**
- Greenland holds **25% of global Rare Earth Elements (REEs)** alongside titanium, lithium, and uranium [Report 1, Page 1 & 2].
- Through **U.S. EXIM Bank** and **DFC** financing, Washington secured off-take agreements and successfully blocked Chinese state-backed firms (such as *Shenghe Resources*) from critical extraction concessions [Report 1, Page 2, Section 3.B].

**3. The Danish Dilemma (*Rigsfællesskabet*):**
- Copenhagen is trapped in an acute constitutional crisis: it lacks the capital to match U.S. investments and cannot independently defend Arctic airspace, reducing Danish authority to nominal legal sovereignty [Report 1, Page 2, Section 4].

**Strategic Trajectory:** The most probable future outcome is *Scenario A* (Compact of Free Association - COFA), wherein Greenland declares formal independence from Denmark and trades full defense authority to the U.S. for financial subsidies [Report 1, Page 3].`,
      source: 'grounded-intelligence-base',
    };
  }

  if (q.includes('russia') || q.includes('china') || q.includes('yamal') || q.includes('nsr') || q.includes('trade')) {
    return {
      text: `### Strategic Assessment: Sino-Russian Arctic Axis & Northern Sea Route [Report 2, Page 1-3]

**1. The Sino-Russian Arctic Axis ($90B Investment):**
- Post-2022 Western sanctions severed Russia from Western capital and technology, forcing Moscow into strategic dependence on Beijing [Report 2, Page 2, Section 5].
- China, having declared itself a *"near-Arctic state"* in 2018, has funneled **over $90 billion** into Russian Arctic energy projects, particularly Yamal LNG and Arctic LNG 2 [Report 2, Page 2, Section 3].
- Paradoxically, EU member states (notably France, Spain, Belgium) increased imports of Russian LNG by **50%** post-sanctions [Report 2, Page 2].

**2. Northern Sea Route (NSR) Realities:**
- Russia asserts sovereign domestic authority over the NSR, requiring permits and imposing icebreaker tariffs [Report 2, Page 2, Section 4].
- While ice melt accelerates, non-Russian commercial transits collapsed in 2022: **only 36 of 314 ships** were non-Russian flagged, and Chinese carrier COSCO sent zero vessels [Report 2, Page 2].

**3. Military Footprint & Chokepoints:**
- Russia maintains ~50% of the Arctic coastline and 2 million residents, anchoring its nuclear deterrent in the Kola Peninsula (Murmansk) [Report 2, Page 1].
- Russia is fortifying chokepoints like the **Vilkitsky Strait**, deploying intelligence submarines to counter NATO encirclement [Report 1, Page 3 & Report 2, Page 2].`,
      source: 'grounded-intelligence-base',
    };
  }

  if (q.includes('nato') || q.includes('finland') || q.includes('sweden') || q.includes('arctic 7')) {
    return {
      text: `### Tactical Intelligence: NATO Northern Flank ("Arctic 7 vs 1") [Report 2, Page 1-2]

**1. End of "High North, Low Tension":**
- Decades of Scandinavian neutrality collapsed following Russia's 2022 invasion of Ukraine.
- **Finland's accession in April 2023** added an **832-mile land border** directly adjacent to Russia's critical Kola Peninsula nuclear bastion [Report 2, Page 1-2].
- With Sweden's entry, NATO consolidates seven of the eight Arctic states (*Canada, Denmark/Greenland, Finland, Iceland, Norway, Sweden, USA*), isolating Russia as the lone regional outlier [Report 2, Page 2].

**2. Allied Command Transformation:**
- High North operations are now prioritized for transatlantic resupply and northern flank protection.
- However, the U.S. faces significant operational vulnerabilities:
  1. Severe shortage of polar icebreakers relative to Russia's heavy fleet [Report 2, Page 1].
  2. Lack of deep-water Arctic port infrastructure (prompting priority construction at **Nome, Alaska**) [Report 2, Page 3].
  3. Non-ratification of **UNCLOS**, leaving Washington legally disadvantaged in extended continental shelf disputes over the **Lomonosov Ridge** [Report 2, Page 2].`,
      source: 'grounded-intelligence-base',
    };
  }

  return {
    text: `### Cross-Report Strategic Synthesis [Report 1 & Report 2]

**1. The Multilateral Governance Vacuum:**
Both reports conclude that the post-Cold War era of *"High North, Low Tension"* has permanently ended [Report 2, Page 1]. The **Arctic Council** remains operationally paralyzed following Russia's 2022 invasion of Ukraine, while the U.S. is advancing unilateral and bilateral arrangements—bypassing both traditional Danish sovereignty in Greenland [Report 1, Page 1] and multilateral consensus mechanisms.

**2. Key Intelligence Findings:**
- **Greenland Mineral Core:** Greenland holds **25% of global REEs**. The U.S. has integrated Greenland into its NORTHCOM defense umbrella and deployed EXIM/DFC capital to block Chinese extraction [Report 1, Page 2].
- **Sino-Russian Energy Axis:** Russia's economic isolation has forced Moscow to accept >$90B in Chinese capital across Yamal LNG and the Northern Sea Route [Report 2, Page 2].
- **Climate Multiplier:** Arctic warming at **3x planetary speed** and 25 years of Greenland ice melt are unlocking maritime passages while destabilizing 500,000 Indigenous residents (with ~60% of Alaska Native villages environmentally threatened) [Report 2, Page 1-2].
- **Critical Policy Imperatives:** U.S. must accelerate the **USCG Polar Security Cutter** program, expedite the deep-water port at **Nome, Alaska**, and re-evaluate accession to **UNCLOS** [Report 2, Page 3].`,
    source: 'grounded-intelligence-base',
  };
}

function getOfflineSynthesis(docSelection: 'both' | 'report1' | 'report2'): string {
  if (docSelection === 'report1') {
    return `# EXECUTIVE BRIEFING: U.S. DE FACTO REALIGNMENT OF GREENLAND
**Source:** OSINT Case Study Report | Senior Geopolitical Analyst (October 8, 2026)

### 1. Executive Summary
Greenland is undergoing a profound structural realignment away from Copenhagen and into the strategic security and industrial orbit of Washington. Driven by Arctic warming, vast unexploited mineral wealth, and great-power competition, the United States has systematically bypassed the Danish Foreign Ministry to forge direct bilateral ties with Nuuk (*Naalakkersuisut*).

### 2. Core Pillars of Influence
- **Defense Integration:** Modernized radar and space surveillance at **Pituffik Space Base** (formerly Thule) under U.S. Northern Command (NORTHCOM) filling capability voids left by Denmark's underfunded Arctic Command [Report 1, Page 2].
- **Mineral Hegemony:** Greenland holds **25% of global rare earth elements (REEs)**. U.S. EXIM Bank and DFC strategic financing secured off-take agreements, effectively locking out Chinese state-owned enterprises like *Shenghe Resources* [Report 1, Page 2].
- **Soft Power & Direct Diplomacy:** U.S. Consulate reopened in Nuuk (2020) after 67 years, deploying $12.1M in direct grant aid and civil training to foster pro-American alignment [Report 1, Page 1-2].

### 3. Future Scenarios
- **Scenario A (COFA):** Formal independence via Compact of Free Association with the U.S. (high probability).
- **Scenario B (Dual Sovereignty):** Nominal Danish flag, full U.S. operational dominance.
- **Scenario C (Gray-Zone Pushback):** Russian submarine probing and Chinese gray-zone scientific operations.`;
  }

  if (docSelection === 'report2') {
    return `# EXECUTIVE BRIEFING: HIGH NORTH SECURITY ARCHITECTURE & ARCTIC GEOPOLITICS
**Source:** CFR Testimony (Dr. Esther D. Brimmer) | Hearing Date: July 18, 2023

### 1. Strategic Context & Threat Multipliers
- The era of *"High North, Low Tension"* has permanently collapsed following the 2022 invasion of Ukraine.
- Warming at **3x the global rate** makes summer ice-free Arctic conditions probable by the 2030s, opening navigation while endangering ~500,000 Indigenous residents [Report 2, Page 1-2].

### 2. Great Power Standoff: NATO 7 vs Russia 1
- **NATO Consolidation:** Finland's accession added an 832-mile direct border with Russia, placing the Russian Northern Fleet base at Murmansk in close proximity to NATO surveillance [Report 2, Page 1-2].
- **Sino-Russian Energy Axis:** Isolated from Europe, Russia welcomed >$90B in Chinese capital for Arctic energy extraction (Yamal LNG) and Northern Sea Route infrastructure [Report 2, Page 2].
- **U.S. Asymmetries:** U.S. lacks icebreakers and deep-water Arctic ports; U.S. non-ratification of UNCLOS handicaps legal claims over the **Lomonosov Ridge** [Report 2, Page 2].

### 3. Recommended Actions
1. Fund the USCG Polar Security Cutter program.
2. Expedite the deep-water port at Nome, Alaska.
3. Support Norway's Arctic Council chairmanship.
4. Ratify UNCLOS to substantiate extended continental shelf rights.`;
  }

  return `# COMPARATIVE EXECUTIVE INTELLIGENCE SYNTHESIS
**Cross-Report Analysis: Report 1 (Greenland OSINT 2026) & Report 2 (CFR Arctic 2023)**

### 1. Strategic Convergence: The Death of Multilateralism
Both intelligence reports document the rapid unraveling of post-Cold War multilateralism. While Report 2 details the functional paralysis of the **Arctic Council** and the emergence of a polarized "NATO 7 vs Russia 1" bloc, Report 1 reveals how the United States has responded by executing unilateral bilateralism in Greenland—sidestepping its own NATO ally Denmark to lock down Arctic airspace and critical supply chains [Report 1, Page 1; Report 2, Page 3].

### 2. The Global Resource Battleground
- **Western Hemisphere (Greenland):** Washington is securing an estimated **25% of global rare earth element (REE) reserves** to insulate North American defense industries, leveraging EXIM and DFC financing to eliminate Chinese mining concessions [Report 1, Page 2].
- **Eastern Hemisphere (Russian Arctic):** Cut off from Western technologies, Moscow has ceded economic leverage to Beijing, with China funneling **>$90 billion** into Yamal LNG and Arctic fossil fuels [Report 2, Page 2].

### 3. Infrastructure & Strategic Asymmetries
- Russia retains commanding surface dominance with deep-water bases at **Murmansk** and a massive nuclear icebreaker fleet [Report 2, Page 1].
- In contrast, while the U.S. dominates polar aerospace awareness from **Pituffik Space Base** [Report 1, Page 1], it faces a chronic surface vessel and deep-water port deficit in Alaska, making the planned port at **Nome** and Polar Security Cutters existential priorities [Report 2, Page 3].

### 4. Climate as Geopolitical Accelerator
With polar warming proceeding at **3 times the planetary rate** and 25 years of Greenland ice melt, emerging sea routes (NSR and NWP) and unmapped seabeds (**Lomonosov Ridge**) will remain the primary flashpoints of great power confrontation into the 2030s.`;
}
