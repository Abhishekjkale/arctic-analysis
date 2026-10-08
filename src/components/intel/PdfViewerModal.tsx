import React, { useState } from 'react';
import { REPORT_1, REPORT_2, ReportDocument } from '../../data/reportsData.ts';
import { soundFx } from '../../utils/soundEffects.ts';
import {
  X,
  FileText,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Download,
  Copy,
  Check,
  Upload,
} from 'lucide-react';

interface PdfViewerModalProps {
  initialReportId?: string;
  initialPage?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  initialReportId = 'greenland-us-takeover',
  initialPage = 1,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [selectedDocId, setSelectedDocId] = useState<string>(initialReportId);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const currentReport: ReportDocument =
    selectedDocId === 'greenland-us-takeover' ? REPORT_1 : REPORT_2;

  const pageData = currentReport.pages.find((p) => p.pageNumber === currentPage) || currentReport.pages[0];

  const handleCopyPageText = () => {
    soundFx.playClick();
    const text = pageData.sections.map((s) => `${s.heading}\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl h-[88vh] bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">
                  CLASSIFICATION: {currentReport.classification}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{currentReport.date}</span>
              </div>
              <h3 className="text-sm font-bold font-mono text-zinc-100 mt-0.5">
                {currentReport.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy button */}
            <button
              onClick={handleCopyPageText}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Page'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub Header: Document Selector & Page Tabs */}
        <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Doc Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedDocId('greenland-us-takeover');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                selectedDocId === 'greenland-us-takeover'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              Report 1: Greenland Takeover (2026)
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedDocId('cfr-arctic-geopolitics');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                selectedDocId === 'cfr-arctic-geopolitics'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              Report 2: CFR Arctic Geopolitics (2023)
            </button>
          </div>

          {/* Page Pagination Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {currentReport.pages.map((p) => (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentPage(p.pageNumber);
                  }}
                  className={`w-7 h-7 rounded text-xs font-mono transition-colors ${
                    currentPage === p.pageNumber
                      ? 'bg-zinc-700 text-zinc-100 font-bold border border-zinc-600'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {p.pageNumber}
                </button>
              ))}

              <button
                disabled={currentPage >= currentReport.pages.length}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentPage((p) => Math.min(currentReport.pages.length, p + 1));
                }}
                className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              Page {currentPage} of {currentReport.pages.length}
            </span>
          </div>
        </div>

        {/* Page Content Display (OCR Document Sheet) */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950/70">
          <div className="max-w-3xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-xl p-8 shadow-xl font-mono text-zinc-200 space-y-6">
            {/* Document Header Header Plate */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="text-[11px] text-cyan-400 tracking-wider uppercase font-semibold">
                {currentReport.source}
              </div>
              <h2 className="text-xl font-bold text-zinc-100 mt-1">{currentReport.title}</h2>
              <p className="text-xs text-zinc-400 mt-0.5">{currentReport.subtitle}</p>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-[10.5px]">
                <div>
                  <span className="text-zinc-500 block">AUTHOR / ROLE</span>
                  <span className="text-zinc-300 font-bold">{currentReport.author}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">DATE OF HEARING / BRIEF</span>
                  <span className="text-zinc-300 font-bold">{currentReport.date}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">CURRENT VIEW</span>
                  <span className="text-cyan-400 font-bold">PAGE {currentPage} OF 3</span>
                </div>
              </div>
            </div>

            {/* Sections in current page */}
            {pageData.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wide border-l-2 border-cyan-500 pl-2.5">
                  {section.heading}
                </h3>

                {/* Metrics */}
                {section.metrics && section.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2">
                    {section.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="text-[10px] text-zinc-400 block">{m.label}</span>
                        <span className="text-sm font-bold text-cyan-300 mt-0.5 block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-xs font-sans text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/60">
                  {section.content}
                </div>
              </div>
            ))}

            {/* Page Footer */}
            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-6 border-t border-zinc-800 font-mono">
              <span>{currentReport.title.toUpperCase()}</span>
              <span>PAGE {currentPage} OF 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
