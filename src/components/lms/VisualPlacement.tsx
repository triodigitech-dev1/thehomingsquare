import React from 'react';
import { VisualPlacementInfo } from '../../types/chess';
import { Image as ImageIcon, AlertCircle, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface VisualPlacementProps {
  placement?: VisualPlacementInfo;
  className?: string;
  defaultTitle?: string;
}

export const VisualPlacement: React.FC<VisualPlacementProps> = ({
  placement,
  className = '',
  defaultTitle = 'Visual Explanation'
}) => {
  if (!placement) return null;

  const isInserted = placement.assetStatus === 'INSERTED' && Boolean(placement.assetPath);

  if (isInserted && placement.assetPath) {
    return (
      <figure
        className={`my-4 rounded-xl border border-[#1E3A2F]/20 bg-white overflow-hidden shadow-xs ${className}`}
      >
        <div className="bg-[#152921] p-3 text-center border-b border-[#D9CFC0]">
          <img
            src={placement.assetPath}
            alt={placement.concept || defaultTitle}
            className="max-h-80 mx-auto rounded-lg object-contain shadow-xs border border-white/20"
            loading="lazy"
          />
        </div>
        <figcaption className="p-3.5 text-xs text-[#262626] bg-[#FAF7F2] space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-[#1E3A2F] text-xs font-mono uppercase tracking-wide flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#C6A664]" />
              <span>{placement.concept || defaultTitle}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Verified Asset · INSERTED</span>
            </span>
          </div>
          <p className="text-[#595959] text-xs leading-relaxed font-sans">
            {placement.description}
          </p>
          {(placement.attribution || placement.license) && (
            <div className="pt-2 border-t border-[#D9CFC0] text-[10px] font-mono text-[#8C7A6B] flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Licence: {placement.license || 'Verified Open Licence'}</span>
              </span>
              {placement.sourceUrl ? (
                <a
                  href={placement.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E3A2F] hover:underline flex items-center gap-1 truncate max-w-xs"
                >
                  <span>{placement.attribution}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                <span className="truncate max-w-xs">{placement.attribution}</span>
              )}
            </div>
          )}
        </figcaption>
      </figure>
    );
  }

  // Placeholder presentation per PDF editorial instructions
  return (
    <figure
      className={`my-4 rounded-xl border-2 border-dashed border-[#C6A664] bg-[#FAF7F2] shadow-xs overflow-hidden ${className}`}
    >
      <div className="p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6D28] font-bold bg-[#EDE6D8] px-2 py-0.5 rounded flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3" />
            <span>Visual Placement</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-medium">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Asset Status: Placeholder (Not Yet Inserted)</span>
          </span>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-[#1E3A2F]">
            Concept: {placement.concept || defaultTitle}
          </h4>
          <p className="text-xs text-[#595959] leading-relaxed mt-1 font-sans">
            <strong className="text-[#1E3A2F]">Required Visual:</strong> {placement.description}
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-white border border-[#D9CFC0] text-[11px] font-mono text-[#595959] space-y-1">
          <div>
            <strong className="text-[#1E3A2F]">Intended Asset Type:</strong> {placement.plannedAsset}
          </div>
          <div>
            <strong className="text-[#1E3A2F]">Placement Rule:</strong> Must appear immediately beside or after this concept explanation.
          </div>
        </div>
      </div>

      <figcaption className="px-4 py-2 text-[10px] leading-relaxed text-[#8C7A6B] font-mono border-t border-[#D9CFC0] bg-[#EDE6D8]/50">
        Asset status: not inserted yet. Source a downloaded public-domain or Creative Commons file, verify the file-level licence, and add attribution before publication.
      </figcaption>
    </figure>
  );
};
