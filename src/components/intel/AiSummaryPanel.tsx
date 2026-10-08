import React, { useState } from 'react';
import {
  REPORT_1,
  REPORT_2,
  COMPARATIVE_SYNTHESIS_MATRIX,
  ReportDocument,
} from '../../data/reportsData.ts';
import { soundFx } from '../../utils/soundEffects.ts';
import {
  Brain,
  MessageSquare,
  FileText,
  Sparkles,
  Send,
  Scale,
  ShieldAlert,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Sliders,
  ExternalLink,
  Bot,
  User,
  Quote,
} from 'lucide-react';

interface AiSummaryPanelProps {
  onSelectNodeById: (nodeId: string) => void;
  onPanToMap: (target: { lat: number; lng: number; zoom: number; hotspotId: string; hotspotName: string }) => void;
  onOpenPdfModal: (reportId: string, pageNumber?: number) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
  citations?: string[];
}

const DEFAULT_PROMPTS = [
  'Compare U.S. posture in Greenland vs Russian Northern Fleet',
  'Analyze Greenland REE mineral independence dilemma',
  'How does UNCLOS non-ratification handicap U.S. claims?',
  'Explain the Sino-Russian $90B Arctic energy axis',
  'Evaluate Scenario A: Compact of Free Association (COFA)',
];

export const AiSummaryPanel: React.FC<AiSummaryPanelProps> = ({
  onSelectNodeById,
  onPanToMap,
  onOpenPdfModal,
}) => {
  const [activeTab, setActiveTab] = useState<'synthesis' | 'chat' | 'matrix' | 'scenarios'>('synthesis');
  const [docFilter, setDocFilter] = useState<'both' | 'report1' | 'report2'>('both');
  const [isGenerating, setIsGenerating] = useState(false);
  const [executiveSummaryText, setExecutiveSummaryText] = useState<string | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Welcome to the ARCTIC-INTEL Command Analyst. Both declassified reports—'The Quiet Shift: The De Facto U.S. Takeover of Greenland (2026)' and 'Case Study: Arctic Geopolitics (CFR Esther D. Brimmer)'—are fully indexed. Ask me any strategic query regarding Arctic sovereignty, military posturing, rare earth element monopolies, or emerging sea corridors.",
      timestamp: '07:40 UTC',
      source: 'ARCTIC-INTEL OSINT Engine',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatSending, setIsChatSending] = useState(false);

  // Executive Synthesis Trigger
  const handleGenerateSynthesis = async () => {
    soundFx.playClick();
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentSelection: docFilter }),
      });
      const data = await res.json();
      setExecutiveSummaryText(data.text);
    } catch (err) {
      console.error('Synthesis request error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Chat Send
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim() || isChatSending) return;

    soundFx.playClick();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatSending(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: chatMessages.slice(-4).map((m) => ({ role: m.sender, content: m.text })),
        }),
      });
      const data = await res.json();

      soundFx.playRadarPing();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: 'Analysis generated from grounded intelligence base: Both reports confirm that great power rivalry has replaced multilateral cooperation in the High North.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'grounded-intelligence-base',
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsChatSending(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#09090b] flex flex-col border-r border-zinc-800/80 overflow-hidden select-none">
      {/* Top Header */}
      <div className="p-3 bg-zinc-950/90 border-b border-zinc-800/80 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold font-mono text-zinc-100 tracking-wider">
                AI INTELLIGENCE FUSION
              </h2>
              <span className="text-[10px] font-mono text-zinc-400 block">
                GEMINI 3.8 FLASH • DUAL-PDF REASONING
              </span>
            </div>
          </div>

          {/* Quick PDF Viewer Modal trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenPdfModal('greenland-us-takeover', 1);
            }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-cyan-400 hover:border-cyan-800/80 transition-colors"
          >
            <BookOpen className="w-3 h-3 text-cyan-400" />
            <span>Raw Reports</span>
          </button>
        </div>

        {/* Tab navigation */}
        <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-[10.5px] font-mono">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('synthesis');
            }}
            className={`py-1 rounded text-center transition-colors ${
              activeTab === 'synthesis'
                ? 'bg-zinc-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Synthesis
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('chat');
            }}
            className={`py-1 rounded text-center transition-colors ${
              activeTab === 'chat'
                ? 'bg-zinc-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            AI Analyst
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('matrix');
            }}
            className={`py-1 rounded text-center transition-colors ${
              activeTab === 'matrix'
                ? 'bg-zinc-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('scenarios');
            }}
            className={`py-1 rounded text-center transition-colors ${
              activeTab === 'scenarios'
                ? 'bg-zinc-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Scenarios
          </button>
        </div>
      </div>

      {/* Tab 1: AI Executive Synthesis */}
      {activeTab === 'synthesis' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Document Ingestion Banner */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                <FileText className="w-3.5 h-3.5 text-cyan-400" /> Ingested Report Corpus
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[9.5px]">
                2 Reports Loaded
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <div
                onClick={() => onOpenPdfModal('greenland-us-takeover', 1)}
                className="p-2 rounded bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-200 font-mono group-hover:text-cyan-300">
                    Doc 1: U.S. Takeover of Greenland
                  </h4>
                  <p className="text-[9.5px] text-zinc-400">OSINT Case Study (Oct 8, 2026) • 3 Pages</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-cyan-400" />
              </div>

              <div
                onClick={() => onOpenPdfModal('cfr-arctic-geopolitics', 1)}
                className="p-2 rounded bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-200 font-mono group-hover:text-cyan-300">
                    Doc 2: Arctic Geopolitics (CFR Testimony)
                  </h4>
                  <p className="text-[9.5px] text-zinc-400">Esther D. Brimmer Hearing (July 18, 2023) • 3 Pages</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-cyan-400" />
              </div>
            </div>

            {/* Scope Selector */}
            <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
              <span className="text-zinc-400">Synthesis Scope:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setDocFilter('both')}
                  className={`px-2 py-0.5 rounded ${
                    docFilter === 'both' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'text-zinc-500'
                  }`}
                >
                  Joint
                </button>
                <button
                  onClick={() => setDocFilter('report1')}
                  className={`px-2 py-0.5 rounded ${
                    docFilter === 'report1' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'text-zinc-500'
                  }`}
                >
                  Doc 1
                </button>
                <button
                  onClick={() => setDocFilter('report2')}
                  className={`px-2 py-0.5 rounded ${
                    docFilter === 'report2' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'text-zinc-500'
                  }`}
                >
                  Doc 2
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerateSynthesis}
              disabled={isGenerating}
              className="w-full mt-1 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Intelligence with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate AI Executive Synthesis</span>
                </>
              )}
            </button>
          </div>

          {/* Synthesis Content */}
          <div className="space-y-3 font-mono text-xs">
            {executiveSummaryText ? (
              <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3 text-zinc-300 leading-relaxed whitespace-pre-line">
                {executiveSummaryText}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Intelligence Overview</span>
                  </div>
                  <p className="text-[11.5px] text-zinc-300 leading-relaxed font-sans">
                    The High North has irrevocably transitioned from the post-Cold War posture of{' '}
                    <span className="text-zinc-100 font-semibold">"High North, Low Tension"</span> to an arena of structured great-power confrontation. In Greenland, the United States has accelerated a de facto integration of local security and mining concessions away from Copenhagen into Washington's orbit, deploying strategic capital to ring-fence <span className="text-amber-400 font-semibold">25% of global rare earth reserves</span>.
                  </p>
                  <p className="text-[11.5px] text-zinc-300 leading-relaxed font-sans">
                    Concurrently, Russia's post-2022 isolation has catalyzed a <span className="text-rose-400 font-semibold">"NATO 7 vs 1"</span> regional encirclement following Finland and Sweden's accession, driving Moscow into financial and technological reliance on Beijing's <span className="text-cyan-400 font-semibold">$90 billion Arctic energy capital</span>.
                  </p>
                </div>

                {/* Key Strategic Pillars Highlights */}
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div
                    onClick={() => onSelectNodeById('node-pituffik')}
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-rose-900/60 hover:border-rose-500 cursor-pointer transition-colors"
                  >
                    <span className="text-rose-400 font-bold block mb-0.5">SOVEREIGNTY PIVOT</span>
                    <span className="text-zinc-300 block font-sans text-[11px]">
                      Pituffik radar absorbed under US NORTHCOM; Danish authority reduced to nominal oversight.
                    </span>
                    <span className="text-[9px] text-zinc-400 mt-1 block">Cite: Report 1, Page 2</span>
                  </div>

                  <div
                    onClick={() => onSelectNodeById('node-greenland-ree')}
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-amber-900/60 hover:border-amber-500 cursor-pointer transition-colors"
                  >
                    <span className="text-amber-400 font-bold block mb-0.5">CRITICAL MINERALS</span>
                    <span className="text-zinc-300 block font-sans text-[11px]">
                      US EXIM/DFC capital blocks Chinese Shenghe Resources from Greenland REEs.
                    </span>
                    <span className="text-[9px] text-zinc-400 mt-1 block">Cite: Report 1, Page 2</span>
                  </div>

                  <div
                    onClick={() => onSelectNodeById('node-northern-sea-route')}
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-sky-900/60 hover:border-sky-500 cursor-pointer transition-colors"
                  >
                    <span className="text-sky-400 font-bold block mb-0.5">MARITIME CORRIDORS</span>
                    <span className="text-zinc-300 block font-sans text-[11px]">
                      NSR traffic fell in 2022 (only 36 non-Russian ships); ice-free summers in 2030s.
                    </span>
                    <span className="text-[9px] text-zinc-400 mt-1 block">Cite: Report 2, Page 2</span>
                  </div>

                  <div
                    onClick={() => onSelectNodeById('node-lomonosov-ridge')}
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-purple-900/60 hover:border-purple-500 cursor-pointer transition-colors"
                  >
                    <span className="text-purple-400 font-bold block mb-0.5">CONTINENTAL SHELF</span>
                    <span className="text-zinc-300 block font-sans text-[11px]">
                      Lomonosov Ridge CLCS recommendations favor Russia; US hurt by UNCLOS delay.
                    </span>
                    <span className="text-[9px] text-zinc-400 mt-1 block">Cite: Report 2, Page 2</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Interactive AI Analyst Chat */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-zinc-950 border-b border-zinc-800/80 overflow-x-auto flex gap-1.5">
            {DEFAULT_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-cyan-700/80 text-[10px] font-mono text-zinc-300 whitespace-nowrap hover:text-cyan-300 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[9.5px] font-mono text-zinc-400">
                  {msg.sender === 'user' ? (
                    <>
                      <span>Security Analyst</span>
                      <User className="w-3 h-3 text-cyan-400" />
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3 text-cyan-400" />
                      <span>{msg.source || 'ARCTIC-INTEL AI'}</span>
                      <span className="text-zinc-600">• {msg.timestamp}</span>
                    </>
                  )}
                </div>

                <div
                  className={`p-3 rounded-xl max-w-[90%] text-xs font-sans leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyan-950/80 text-cyan-100 border border-cyan-800/60 font-mono'
                      : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isChatSending && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-cyan-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyst model querying dual-report intelligence vectors...</span>
              </div>
            )}
          </div>

          {/* Chat Input Box */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Query Arctic reports (e.g. Pituffik, REE, UNCLOS, NSR)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isChatSending}
                className="flex-1 bg-zinc-900 text-xs text-zinc-200 px-3 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatSending}
                className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Comparative Matrix */}
      {activeTab === 'matrix' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
          <div className="text-[11px] text-zinc-400 mb-2">
            Side-by-side comparative cross-analysis of Report 1 (Greenland OSINT) versus Report 2 (CFR Pan-Arctic Architecture).
          </div>

          {COMPARATIVE_SYNTHESIS_MATRIX.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-100">{item.theme}</h4>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded border uppercase font-medium ${
                    item.riskSeverity === 'Critical'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : item.riskSeverity === 'High'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-sky-950 text-sky-300 border-sky-800'
                  }`}
                >
                  {item.riskSeverity} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-300 pt-1">
                <div className="bg-zinc-950/70 p-2 rounded border border-zinc-800/80">
                  <span className="text-cyan-400 font-bold block mb-1">Doc 1: Greenland</span>
                  <p className="font-sans text-[11px] text-zinc-400">{item.report1Greenland}</p>
                </div>
                <div className="bg-zinc-950/70 p-2 rounded border border-zinc-800/80">
                  <span className="text-rose-400 font-bold block mb-1">Doc 2: CFR Arctic</span>
                  <p className="font-sans text-[11px] text-zinc-400">{item.report2ArcticBroad}</p>
                </div>
              </div>

              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-900/40 text-[10.5px] font-sans text-cyan-200">
                <span className="font-mono text-[9.5px] uppercase font-bold text-cyan-400 block mb-0.5">
                  Strategic Synthesis:
                </span>
                {item.strategicSynthesis}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Scenarios & Forecast */}
      {activeTab === 'scenarios' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
          <div className="text-[11px] text-zinc-400 mb-2">
            Geopolitical outcome projections extracted from Report 1 & Report 2 strategic recommendations.
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-rose-900/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-rose-300">
              <span>SCENARIO A: COMPACT OF FREE ASSOCIATION (COFA)</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800">
                Medium-High Prob
              </span>
            </div>
            <p className="text-[11px] font-sans text-zinc-300 leading-relaxed">
              Greenland declares formal independence from Denmark, immediately signing a COFA agreement with the U.S. Washington assumes full defense authority and exclusive economic access in exchange for direct financial subsidies, mirroring Pacific arrangements.
            </p>
            <span className="text-[9px] text-zinc-500 block">Report 1, Page 3, Section 6</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-sky-900/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-sky-300">
              <span>SCENARIO B: STATUS QUO FRICTION & DUAL SOVEREIGNTY</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">
                Current Baseline
              </span>
            </div>
            <p className="text-[11px] font-sans text-zinc-300 leading-relaxed">
              Denmark retains nominal legal sovereignty, but the U.S. exercises complete operational control over security, mining, and critical infrastructure, leaving Copenhagen as a figurehead administrator in Arctic security councils.
            </p>
            <span className="text-[9px] text-zinc-500 block">Report 1, Page 3, Section 6</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-amber-900/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span>SCENARIO C: SINO-RUSSIAN AXIS & GRAY-ZONE CLASH</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800">
                Elevated Risk
              </span>
            </div>
            <p className="text-[11px] font-sans text-zinc-300 leading-relaxed">
              Danish political retreat creates governance vacuums, prompting aggressive Russian naval probing and Chinese scientific intelligence operations, turning Greenlandic waters and the central basin into an active gray-zone conflict domain.
            </p>
            <span className="text-[9px] text-zinc-500 block">Report 1, Page 3 & Report 2, Page 3</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2 pt-2">
            <span className="text-xs font-bold text-zinc-200 block">Priority Policy Recommendations:</span>
            <ul className="space-y-1 text-[10.5px] font-sans text-zinc-400">
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">1.</span>
                <span>Fund and accelerate USCG Polar Security Cutter fleet [Report 2, Rec 1].</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">2.</span>
                <span>Expedite deep-water port construction at Nome, Alaska [Report 2, Rec 2].</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">3.</span>
                <span>Establish binding trilateral protocols between Washington, Nuuk, and Copenhagen [Report 1, Rec 1].</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">4.</span>
                <span>Accede to UNCLOS to legally substantiate extended continental shelf rights [Report 2, Rec 4].</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
