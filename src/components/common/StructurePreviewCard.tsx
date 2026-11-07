import React from 'react';
import { PawnStructureProfile } from '../../types/chess';
import { StudyCard } from './StudyCard';
import { Compass, Shield, ArrowUpRight } from 'lucide-react';

export interface StructurePreviewCardProps {
  structure: PawnStructureProfile;
  isActive?: boolean;
  onSelect?: (structureId: string) => void;
  compact?: boolean;
  className?: string;
}

export const StructurePreviewCard: React.FC<StructurePreviewCardProps> = ({
  structure,
  isActive = false,
  onSelect,
  compact = false,
  className = ''
}) => {
  return (
    <StudyCard
      variant={isActive ? 'accent' : 'default'}
      kicker={structure.category}
      title={structure.name}
      badge={
        isActive ? (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#C6A664] text-[#1E3A2F] font-semibold">
            Active Study
          </span>
        ) : onSelect ? (
          <button
            type="button"
            onClick={() => onSelect(structure.id)}
            className="text-xs text-[#1E3A2F] hover:text-[#C6A664] flex items-center gap-1 font-medium transition-colors"
          >
            <span>Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        ) : undefined
      }
      className={className}
    >
      <div className="space-y-4 text-xs font-sans">
        {/* The One-Sentence Plan */}
        <div
          className={`p-3 rounded-xl border ${
            isActive
              ? 'bg-[#152921] border-[#C6A664]/30 text-[#F6F1E7]'
              : 'bg-white border-[#D9CFC0] text-[#262626]'
          }`}
        >
          <span
            className={`text-[10px] font-mono uppercase tracking-wider block mb-1 font-semibold ${
              isActive ? 'text-[#C6A664]' : 'text-[#8C7A6B]'
            }`}
          >
            The One-Sentence Plan
          </span>
          <p className="leading-relaxed font-medium">{structure.oneSentencePlan}</p>
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* White Breaks */}
            <div>
              <span
                className={`font-semibold text-[11px] block mb-1 ${
                  isActive ? 'text-[#DFCA95]' : 'text-[#1E3A2F]'
                }`}
              >
                White Breaks
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                {structure.whiteBreaks.map((b) => (
                  <span
                    key={b}
                    className={`px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-[#152921] border-[#C6A664]/30 text-[#F6F1E7]'
                        : 'bg-[#EDE6D8] border-[#D9CFC0] text-[#262626]'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Black Breaks */}
            <div>
              <span
                className={`font-semibold text-[11px] block mb-1 ${
                  isActive ? 'text-[#DFCA95]' : 'text-[#1E3A2F]'
                }`}
              >
                Black Breaks
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                {structure.blackBreaks.map((b) => (
                  <span
                    key={b}
                    className={`px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-[#152921] border-[#C6A664]/30 text-[#F6F1E7]'
                        : 'bg-[#EDE6D8] border-[#D9CFC0] text-[#262626]'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Outposts */}
            <div>
              <span
                className={`font-semibold text-[11px] block mb-1 ${
                  isActive ? 'text-[#DFCA95]' : 'text-[#1E3A2F]'
                }`}
              >
                Key Outposts
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                {structure.keyOutposts.map((o) => (
                  <span
                    key={o}
                    className={`px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-[#152921] border-[#C6A664]/30 text-[#C6A664]'
                        : 'bg-white border-[#D9CFC0] text-[#1E3A2F]'
                    }`}
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>

            {/* Classical Model */}
            <div>
              <span
                className={`font-semibold text-[11px] block mb-1 ${
                  isActive ? 'text-[#DFCA95]' : 'text-[#1E3A2F]'
                }`}
              >
                Model Game
              </span>
              <span
                className={`block truncate font-mono text-[11px] ${
                  isActive ? 'text-[#D9CFC0]' : 'text-[#595959]'
                }`}
              >
                {structure.historicalModel}
              </span>
            </div>
          </div>
        )}
      </div>
    </StudyCard>
  );
};
