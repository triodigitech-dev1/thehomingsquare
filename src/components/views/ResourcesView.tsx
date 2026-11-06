import React, { useState } from 'react';
import { PLATFORM_RESOURCES, ResourceItem } from '../../data/resources';
import { NavView } from '../layout/Header';
import { Download, FileText, Image as ImageIcon, Copy, Check, ExternalLink, BookOpen, Layers } from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (view: NavView) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeResource, setActiveResource] = useState<ResourceItem>(PLATFORM_RESOURCES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'Visual Gallery & Assets', label: 'Visual Gallery' },
    { id: 'Curriculum & Guides', label: 'Curriculum & Guides' },
    { id: 'Foundations & Standards', label: 'Foundations & Standards' },
    { id: 'System Protocols', label: 'System Protocols' }
  ];

  const filteredResources = PLATFORM_RESOURCES.filter((res) => {
    if (selectedCategory === 'all') return true;
    return res.category === selectedCategory;
  });

  const handleCopyMarkdown = (res: ResourceItem) => {
    if (!res.markdownContent) return;
    navigator.clipboard.writeText(res.markdownContent);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadMarkdown = (res: ResourceItem) => {
    if (!res.markdownContent) return;
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
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            The Library
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans max-w-2xl">
            Curriculum guides, markdown files, and visual assets.
          </p>
        </div>

        {/* PDF Download Button */}
        <a
          href="/assets/aistudio/Structure_First_Chess_Mastery_31a83b4c.pdf"
          download="Structure_First_Chess_Mastery_Guide.pdf"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 bg-[#1E3A2F] text-[#F6F1E7] rounded-xl text-xs font-semibold hover:bg-[#152921] transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 text-[#C6A664]" />
          <span>Curriculum Guide PDF</span>
        </a>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#D9CFC0]/60 pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                : 'bg-[#EDE6D8] text-[#262626] hover:bg-[#FAF7F2]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Archive Grid: Left (List), Right (Active Viewer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Resource Items */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/60 shadow-sm space-y-3">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider">
              Archived Documents & Assets
            </span>
            <span className="text-xs text-[#595959] font-mono">
              {filteredResources.length} Items
            </span>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredResources.map((item) => {
              const isSelected = item.id === activeResource.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveResource(item)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]'
                      : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isSelected ? 'text-[#C6A664]' : 'text-[#595959]'}>
                      {item.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold ${
                        item.format === 'Image'
                          ? 'bg-[#C6A664]/20 text-[#C6A664]'
                          : item.format === 'PDF'
                          ? 'bg-[#A8553F]/20 text-[#A8553F]'
                          : 'bg-[#1E3A2F]/20 text-[#1E3A2F]'
                      }`}
                    >
                      {item.format}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'
                    }`}
                  >
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Active Viewer */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
          <div className="border-b border-[#D9CFC0]/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block mb-1">
                {activeResource.category} · {activeResource.format}
              </span>
              <h2 className="font-display text-xl sm:text-2xl text-[#1E3A2F]">
                {activeResource.title}
              </h2>
            </div>

            {/* Actions for active item */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {activeResource.markdownContent && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCopyMarkdown(activeResource)}
                    className="px-3 py-1.5 bg-white border border-[#D9CFC0] rounded-md text-xs text-[#262626] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
                    title="Copy Markdown"
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
                    className="px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-md text-xs font-medium hover:bg-[#152921] transition-colors flex items-center gap-1.5"
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
                  className="px-4 py-2 bg-[#1E3A2F] text-[#F6F1E7] rounded-md text-xs font-semibold hover:bg-[#152921] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#C6A664]" />
                  <span>Download PDF</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-[#595959] italic font-sans">
            {activeResource.description}
          </p>

          {/* Render Visual Plate Image */}
          {activeResource.imagePath && (
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-[#D9CFC0] bg-[#152921] shadow-md flex items-center justify-center">
                <img
                  src={activeResource.imagePath}
                  alt={activeResource.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-[#EDE6D8]/50 rounded-lg border border-[#D9CFC0] text-xs font-mono text-[#595959] flex items-center justify-between">
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

          {/* Render Markdown Content */}
          {activeResource.markdownContent && (
            <div className="bg-white rounded-xl p-5 border border-[#D9CFC0] max-h-[480px] overflow-y-auto">
              <pre className="text-xs font-mono text-[#262626] whitespace-pre-wrap leading-relaxed select-all">
                {activeResource.markdownContent}
              </pre>
            </div>
          )}

          {/* Render PDF preview card */}
          {activeResource.fileUrl && (
            <div className="p-6 bg-[#EDE6D8]/60 rounded-xl border border-[#D9CFC0] space-y-3 text-center">
              <BookOpen className="w-8 h-8 text-[#1E3A2F] mx-auto" />
              <h4 className="font-display text-base font-semibold text-[#1E3A2F]">
                Structure-First Chess Mastery: 18-Page Curriculum Guide
              </h4>
              <p className="text-xs text-[#595959] max-w-md mx-auto">
                Contains the full unit syllabi, learning objectives, change log of final-edition additions, and the capstone graduation rubric.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={activeResource.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] rounded-lg text-xs font-semibold flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C6A664]" />
                  <span>View in New Tab</span>
                </a>
                <a
                  href={activeResource.fileUrl}
                  download="Structure_First_Chess_Mastery.pdf"
                  className="px-4 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] rounded-lg text-xs font-semibold flex items-center gap-2"
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
