import React, { useState } from 'react';
import { PLATFORM_RESOURCES, ResourceItem } from '../../data/resources';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { playWoodenClick } from '../board/ChessBoard';
import { StudentAccount } from '../../types/chess';
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
  Lock,
  ShieldAlert,
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

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeResourceId, setActiveResourceId] = useState<string>(PLATFORM_RESOURCES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // If user is not an admin/maintainer, show the maintainer gate
  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
        <div className="bg-[#FAF7F2] rounded-2xl p-8 sm:p-12 border-2 border-[#1E3A2F]/20 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#1E3A2F] border-2 border-[#C6A664] flex items-center justify-center text-[#C6A664] shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C6A664] font-semibold flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#C6A664]" />
              <span>Maintainer Archives · Restricted Access</span>
            </span>
            <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F]">
              The Library is Visible Only to Admins & Maintainers
            </h1>
            <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
              Curriculum source markdown documents, syllabus accreditation protocols, and master vector assets are classified for academy curators.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] max-w-md mx-auto text-xs text-[#262626] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#595959]">
              <span>Current Status</span>
              <span className="font-semibold text-[#1E3A2F]">
                {studentAccount?.role ? `${studentAccount.role.toUpperCase()} (Restricted)` : 'Public Guest (No Clearance)'}
              </span>
            </div>
            <p className="text-[11px] text-[#8C7A6B]">
              To explore the archives, sign in with administrator credentials or switch to the Maintainer role.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onSwitchToAdmin && (
              <button
                type="button"
                onClick={() => {
                  playWoodenClick(soundEnabled);
                  onSwitchToAdmin();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-[#C6A664]" />
                <span>Switch to Maintainer Role (Unlock Library)</span>
              </button>
            )}

            {onOpenAuthModal && (
              <button
                type="button"
                onClick={() => {
                  playWoodenClick(soundEnabled);
                  onOpenAuthModal();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-white border border-[#D9CFC0] hover:bg-[#FAF7F2] text-[#1E3A2F] text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Sign In with Admin Key</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playWoodenClick(soundEnabled);
                onNavigate('cockpit');
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#EDE6D8] hover:bg-[#D9CFC0] text-[#1E3A2F] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Return to Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'Visual Gallery & Assets', label: 'Visual Gallery' },
    { id: 'Curriculum & Guides', label: 'Curriculum & Guides' },
    { id: 'Foundations & Standards', label: 'Foundations & Standards' },
    { id: 'System Protocols', label: 'System Protocols' }
  ];

  const filteredResources = PLATFORM_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.markdownContent && res.markdownContent.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const activeResource =
    PLATFORM_RESOURCES.find((r) => r.id === activeResourceId) ||
    filteredResources[0] ||
    PLATFORM_RESOURCES[0];

  const handleSelectResource = (item: ResourceItem) => {
    setActiveResourceId(item.id);
    playWoodenClick(soundEnabled);
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    playWoodenClick(soundEnabled);
  };

  const handleCopyMarkdown = (res: ResourceItem) => {
    if (!res.markdownContent) return;
    navigator.clipboard.writeText(res.markdownContent);
    playWoodenClick(soundEnabled);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadMarkdown = (res: ResourceItem) => {
    if (!res.markdownContent) return;
    playWoodenClick(soundEnabled);
    const blob = new Blob([res.markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <StudyCard
        badge="Golden Academy Archive"
        badgeVariant="gold"
        title="The Library"
        subtitle="Primary texts, official curriculum guides, formatted markdown documents, and high-fidelity visual assets."
        headerAction={
          <a
            href="/assets/aistudio/Structure_First_Chess_Mastery_31a83b4c.pdf"
            download="Structure_First_Chess_Mastery_Guide.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-xl text-xs font-semibold hover:bg-[#152921] transition-colors flex items-center gap-2 shadow-xs shrink-0"
          >
            <Download className="w-4 h-4 text-[#C6A664]" />
            <span>Curriculum Guide PDF (18-Page)</span>
          </a>
        }
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
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

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D9CFC0] rounded-lg text-[#262626] placeholder-[#8C7A6B] focus:outline-none focus:border-[#1E3A2F]"
            />
          </div>
        </div>
      </StudyCard>

      {/* Main Grid: Left Archive Drawer & Right Active Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Resource Items */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#D9CFC0]/70 shadow-sm space-y-3">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider font-semibold flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Cataloged Documents</span>
            </span>
            <span className="text-xs text-[#595959] font-mono">
              {filteredResources.length} {filteredResources.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {filteredResources.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#8C7A6B] font-sans">
                No archived materials match "{searchQuery}".
              </div>
            ) : (
              filteredResources.map((item) => {
                const isSelected = item.id === activeResource.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectResource(item)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-sm'
                        : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                      <span className={isSelected ? 'text-[#C6A664]' : 'text-[#8C7A6B]'}>
                        {item.category}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold font-mono ${
                          isSelected
                            ? 'bg-black/30 text-[#DFCA95]'
                            : item.format === 'Image'
                            ? 'bg-[#C6A664]/20 text-[#8C6D23]'
                            : item.format === 'PDF'
                            ? 'bg-[#A8553F]/15 text-[#A8553F]'
                            : 'bg-[#1E3A2F]/15 text-[#1E3A2F]'
                        }`}
                      >
                        {item.format}
                      </span>
                    </div>

                    <h3 className="font-display text-sm font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-2 font-sans ${
                        isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Active Document Reader with MarkdownRenderer */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/70 shadow-sm space-y-6">
          <div className="border-b border-[#D9CFC0]/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block mb-1 font-semibold">
                {activeResource.category} · {activeResource.format}
              </span>
              <h2 className="font-display text-xl sm:text-2xl text-[#1E3A2F]">
                {activeResource.title}
              </h2>
            </div>

            {/* Actions for active item */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              {activeResource.markdownContent && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCopyMarkdown(activeResource)}
                    className="px-3 py-1.5 bg-white border border-[#D9CFC0] rounded-lg text-xs text-[#262626] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Copy Markdown Source"
                  >
                    {copiedId === activeResource.id ? (
                      <Check className="w-3.5 h-3.5 text-[#1E3A2F]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === activeResource.id ? 'Copied' : 'Copy MD'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadMarkdown(activeResource)}
                    className="px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg text-xs font-medium hover:bg-[#152921] transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Download .md file"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C6A664]" />
                    <span>Save .md</span>
                  </button>
                </>
              )}

              {activeResource.fileUrl && (
                <a
                  href={activeResource.fileUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg text-xs font-semibold hover:bg-[#152921] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#C6A664]" />
                  <span>Download PDF</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-[#595959] italic font-sans leading-relaxed">
            {activeResource.description}
          </p>

          {/* Render Visual Plate Image */}
          {activeResource.imagePath && (
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-[#D9CFC0] bg-[#152921] shadow-md flex items-center justify-center p-2">
                <img
                  src={activeResource.imagePath}
                  alt={activeResource.title}
                  className="w-full h-auto object-contain max-h-[520px] rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#D9CFC0] text-xs font-mono text-[#595959] flex items-center justify-between">
                <span>Asset File: {activeResource.imagePath.split('/').pop()}</span>
                <a
                  href={activeResource.imagePath}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open Full Resolution</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Render Formatted Markdown Document using MarkdownRenderer */}
          {activeResource.markdownContent && (
            <div className="bg-white rounded-xl border border-[#D9CFC0] p-4 sm:p-6 shadow-xs max-h-[600px] overflow-y-auto">
              <MarkdownRenderer
                content={activeResource.markdownContent}
                soundEnabled={soundEnabled}
              />
            </div>
          )}

          {/* Render PDF preview card */}
          {activeResource.fileUrl && (
            <div className="p-6 bg-white rounded-xl border border-[#D9CFC0] space-y-3 text-center shadow-xs">
              <BookOpen className="w-10 h-10 text-[#1E3A2F] mx-auto" />
              <h4 className="font-display text-base font-semibold text-[#1E3A2F]">
                Structure-First Chess Mastery: 18-Page Curriculum Guide
              </h4>
              <p className="text-xs text-[#595959] max-w-md mx-auto leading-relaxed">
                Contains the full unit syllabi, learning objectives, change log of final-edition additions, and the capstone graduation rubric.
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
                  download="Structure_First_Chess_Mastery.pdf"
                  className="px-4 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Offline</span>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
