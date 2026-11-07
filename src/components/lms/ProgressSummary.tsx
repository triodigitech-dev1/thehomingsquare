import React from 'react';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { CheckCircle2, Clock, BookOpen, FileText, Award } from 'lucide-react';

interface ProgressSummaryProps {
  completedUnitIds: string[];
  className?: string;
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  completedUnitIds,
  className = ''
}) => {
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const totalUnits = allUnits.length;
  const completedCount = completedUnitIds.length;
  const progressPercent = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0;

  // Compute completed chapters
  const completedChaptersCount = CURRICULUM_CHAPTERS.filter((ch) =>
    ch.units.every((u) => completedUnitIds.includes(u.id))
  ).length;

  // Approximate time estimation (18 minutes per unit average)
  const remainingUnits = Math.max(0, totalUnits - completedCount);
  const remainingHours = (remainingUnits * 18) / 60;

  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#D9CFC0] shadow-xs space-y-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9CFC0]/60 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-bold block">
            Academic Status
          </span>
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#1E3A2F]">
            Course Completion Overview
          </h2>
        </div>

        <a
          href="/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF7F2] text-[#1E3A2F] border border-[#D9CFC0] hover:bg-[#EDE6D8] transition-colors shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5 text-[#C6A664]" />
          <span>Open Textbook PDF</span>
        </a>
      </div>

      {/* 4 Quantitative Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80 text-center space-y-1">
          <span className="text-[11px] font-mono text-[#8C7A6B] block">Course Progress</span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#1E3A2F]">
            {progressPercent}%
          </div>
          <span className="text-[10px] text-[#595959] block">Overall Completion</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80 text-center space-y-1">
          <span className="text-[11px] font-mono text-[#8C7A6B] block">Lessons Finished</span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#1E3A2F]">
            {completedCount} <span className="text-base font-normal text-[#8C7A6B]">/ {totalUnits}</span>
          </div>
          <span className="text-[10px] text-[#595959] block">Textbook Units Mastered</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80 text-center space-y-1">
          <span className="text-[11px] font-mono text-[#8C7A6B] block">Chapters Finished</span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#1E3A2F]">
            {completedChaptersCount} <span className="text-base font-normal text-[#8C7A6B]">/ {CURRICULUM_CHAPTERS.length}</span>
          </div>
          <span className="text-[10px] text-[#595959] block">Mastery Sections</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80 text-center space-y-1">
          <span className="text-[11px] font-mono text-[#8C7A6B] block">Est. Time Remaining</span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#1E3A2F]">
            {remainingHours > 0 ? `~${Math.ceil(remainingHours)}h` : '0h'}
          </div>
          <span className="text-[10px] text-[#595959] block">{remainingUnits} Lessons Left</span>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-[#595959]">
          <span>Full Textbook Journey (Prerequisite → Chapters 1–8 → Appendix)</span>
          <span className="font-semibold text-[#1E3A2F]">{completedCount} of {totalUnits} Checkpoints</span>
        </div>
        <div className="w-full h-3 bg-[#EDE6D8] rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#1E3A2F] via-[#2A5141] to-[#C6A664] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
