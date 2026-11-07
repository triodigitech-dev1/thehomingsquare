import React, { useState } from 'react';
import { PLATFORM_RESOURCES, ResourceItem } from '../../data/resources';
import { VISUAL_PLACEHOLDERS } from '../../data/visualPlaceholders';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { playWoodenClick } from '../board/ChessBoard';
import { StudentAccount } from '../../types/chess';
import { useToast } from '../common/Toast';
import {
  Download,
  FileText,
  Image as ImageIcon,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Search,
  BookMarked,
  Filter,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Database,
  ArrowRight
} from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (view: NavView) => void;
  soundEnabled?: boolean;
  studentAccount?: StudentAccount;
  onOpenAuthModal?: () => void;
  onSwitchToAdmin?: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  onNavigate,
  soundEnabled = true,
  studentAccount,
  onOpenAuthModal,
  onSwitchToAdmin
}) => {
  const isAdmin = studentAccount?.role === 'admin';
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeResourceId, setActiveResourceId] = useState<string>(PLATFORM_RESOURCES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'resources' | 'asset_registry'>('resources');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'Curriculum & Guides', label: 'Curriculum & Guides' },
    { id: 'Visual Gallery & Assets', label: 'Visual Gallery' },
    { id: 'Foundations & Standards', label: 'Foundations & Datasets' },
    { id: 'System Protocols', label: 'System Protocols' }
  ];

  const filteredResources = PLATFORM_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeResource =
    PLATFORM_RESOURCES.find((r) => r.id === activeResourceId) || PLATFORM_RESOURCES[0];

  const handleSelectResource = (res: ResourceItem) => {
    setActiveResourceId(res.id);
    playWoodenClick(soundEnabled);
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    playWoodenClick(soundEnabled);
  };

  const handleCopyMarkdown = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to Clipboard', 'Markdown text ready to paste');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Flatten all units for visual asset audit
  const allCurriculumUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* Header Banner */}
      <StudyCard
        badge="Textbook & Research Archive"
        badgeVariant="gold"
        title="The Library"
        subtitle="Primary textbook PDF, official curriculum guides, research datasets (Lichess DB, Syzygy, ECO), and visual placement registry."
        headerAction={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveViewMode(activeViewMode === 'resources' ? 'asset_registry' : 'resources');
                playWoodenClick(soundEnabled);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] border border-[#C6A664] text-[#1E3A2F] hover:bg-[#EDE6D8] transition-colors"
            >
              {activeViewMode === 'resources' ? 'View Visual Asset Audit' : 'Browse Research Library'}
            </button>

            <a
              href="/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf"
              download="Chess_Textbook_Visual_Placement_Edition.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#1E3A2F] text-[#F6F1E7] rounded-xl text-xs font-semibold hover:bg-[#152921] transition-colors flex items-center gap-2 shadow-xs shrink-0"
            >
              <Download className="w-4 h-4 text-[#C6A664]" />
              <span>Download Full Textbook PDF (500+ pp.)</span>
            </a>
          </div>
        }
      >
        {activeViewMode === 'resources' ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1 border-t border-[#D9CFC0]/60">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                      : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#D9CFC0] rounded-lg text-xs focus:outline-none focus:border-[#1E3A2F]"
              />
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-[#D9CFC0]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[#8C7A6B]">
              Authoritative Registry Mapped to public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
            </span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                1 Inserted (Chessground 2D GPL-3.0)
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                45 Placeholders
              </span>
            </div>
          </div>
        )}
      </StudyCard>

      {/* VIEW MODE 1: Standard Research Document Browser */}
      {activeViewMode === 'resources' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Resource List (4 cols) */}
          <div className="lg:col-span-4 bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#D9CFC0]/70 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-2.5">
              <span className="text-xs font-mono uppercase text-[#C6A664] font-semibold">
                Available Documents ({filteredResources.length})
              </span>
              <span className="text-xs font-mono text-[#8C7A6B]">All Open Access</span>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredResources.map((res) => {
                const isSelected = res.id === activeResource.id;
                return (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => handleSelectResource(res)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs group flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-sm'
                        : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={isSelected ? 'text-[#C6A664]' : 'text-[#8C7A6B]'}>
                        {res.category}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded font-semibold ${
                          isSelected ? 'bg-black/30 text-[#DFCA95]' : 'bg-[#EDE6D8] text-[#595959]'
                        }`}
                      >
                        {res.format}
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-sm leading-snug">
                      {res.title}
                    </h4>

                    <p
                      className={`text-[11px] line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'
                      }`}
                    >
                      {res.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Active Resource Inspector / Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0]/70 shadow-sm space-y-6">
            <div className="border-b border-[#D9CFC0]/60 pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                  {activeResource.category} · {activeResource.format}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-[#D9CFC0] text-[#1E3A2F]">
                  ID: {activeResource.id}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-[#1E3A2F]">
                {activeResource.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                {activeResource.description}
              </p>
            </div>

            {/* Markdown Inspector */}
            {activeResource.markdownContent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8C7A6B]">Markdown Document</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyMarkdown(activeResource.markdownContent || '', activeResource.id)}
                      className="px-3 py-1 bg-white border border-[#D9CFC0] hover:bg-[#FAF7F2] rounded-lg text-[#1E3A2F] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      {copiedId === activeResource.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#C6A664]" />
                          <span>Copy Content</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadFile(activeResource.markdownContent || '', `${activeResource.id}.md`)}
                      className="px-3 py-1 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#C6A664]" />
                      <span>Download .md</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl border border-[#D9CFC0] shadow-xs max-h-[500px] overflow-y-auto">
                  <MarkdownRenderer content={activeResource.markdownContent} />
                </div>
              </div>
            )}

            {/* Image Preview */}
            {activeResource.imagePath && (
              <div className="p-6 bg-[#152921] rounded-xl border border-[#D9CFC0] flex items-center justify-center">
                <img
                  src={activeResource.imagePath}
                  alt={activeResource.title}
                  className="max-h-96 rounded-lg object-contain shadow-md border border-white/20"
                />
              </div>
            )}

            {/* PDF Preview Card */}
            {activeResource.fileUrl && (
              <div className="p-6 bg-white rounded-xl border border-[#D9CFC0] space-y-3 text-center shadow-xs">
                <BookOpen className="w-10 h-10 text-[#1E3A2F] mx-auto" />
                <h4 className="font-display text-base font-semibold text-[#1E3A2F]">
                  Structure-First Chess Mastery: Visual Placement Edition
                </h4>
                <p className="text-xs text-[#595959] max-w-md mx-auto leading-relaxed">
                  The complete source of truth curriculum: Prerequisite Chapter + Chapters 1–8 + Appendix + Visual Placement briefs and worked positions.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={activeResource.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C6A664]" />
                    <span>View in New Tab</span>
                  </a>
                  <a
                    href={activeResource.fileUrl}
                    download="Chess_Textbook_Visual_Placement_Edition.pdf"
                    className="px-4 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save Offline PDF</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Visual Asset Status Registry Audit Table */}
      {activeViewMode === 'asset_registry' && (
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0]/70 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9CFC0]/60 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                Visual Concept-to-Asset Mapping
              </span>
              <h3 className="font-display text-xl font-bold text-[#1E3A2F]">
                Complete 46-Unit Visual Placement Audit
              </h3>
            </div>

            <div className="text-xs font-mono text-[#595959]">
              Source: <code>assets/concepts/source-register.json</code>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#D9CFC0] bg-white shadow-xs">
            <table className="w-full text-left text-xs divide-y divide-[#D9CFC0]">
              <thead className="bg-[#FAF7F2] text-[#1E3A2F] font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Concept / Topic</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Intended Asset Type</th>
                  <th className="py-3 px-4">Licence / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9CFC0]/60 font-sans">
                {allCurriculumUnits.map((u) => {
                  const reg = VISUAL_PLACEHOLDERS[u.unitCode];
                  const status = reg?.status || reg?.assetStatus || 'PLACEHOLDER';
                  const isInserted = status === 'INSERTED';

                  return (
                    <tr key={u.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#1E3A2F]">
                        {u.unitCode}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#1E3A2F]">{u.title}</div>
                        <div className="text-[11px] text-[#595959] line-clamp-1">{reg?.description || u.whatToLearn}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {isInserted ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            INSERTED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-semibold">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            PLACEHOLDER
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-[#595959] max-w-xs truncate">
                        {reg?.plannedAsset || 'Instructional position diagram or licensed photograph'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#8C7A6B] whitespace-nowrap">
                        {isInserted ? (
                          <span className="text-emerald-700 font-semibold">{reg?.license || 'GPL-3.0'}</span>
                        ) : (
                          <span>Pending Asset Ingestion</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#D9CFC0] text-xs text-[#595959] flex items-center justify-between">
            <span className="font-mono text-[11px]">
              Strict Editorial Rule: Never claim an asset is licensed or downloaded until physically verified.
            </span>
            <button
              type="button"
              onClick={() => onNavigate('lesson')}
              className="px-3.5 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg font-semibold hover:bg-[#152921] transition-colors flex items-center gap-1.5"
            >
              <span>Return to Lesson Classroom</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
