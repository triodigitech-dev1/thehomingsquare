import React from 'react';
import { CurriculumChapter, CurriculumUnit } from '../../types/chess';
import { CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

interface ChapterProgressProps {
  chapter: CurriculumChapter;
  completedUnitIds: string[];
  onSelectUnit: (unit: CurriculumUnit) => void;
  onOpenChapterMap?: (chapterId: string) => void;
  compact?: boolean;
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  chapter,
  completedUnitIds,
  onSelectUnit,
  onOpenChapterMap,
  compact = false
}) => {
  const totalUnits = chapter.units.length;
  const completedCount = chapter.units.filter((u) => completedUnitIds.includes(u.id)).length;
  const isFinished = completedCount === totalUnits && totalUnits > 0;
  const percent = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0;

  // Find next unfinished unit in this chapter
  const nextUnit = chapter.units.find((u) => !completedUnitIds.includes(u.id)) || chapter.units[0];

  const chapterLabel =
    chapter.number === 'P'
      ? 'Prerequisite'
      : chapter.number === 'App'
      ? 'Appendix'
      : `Chapter ${chapter.number}`;

  if (compact) {
    return (
      <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] hover:border-[#1E3A2F]/50 transition-all space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] font-semibold text-[#8C7A6B]">
            {chapterLabel}
          </span>
          <span className="font-mono text-[11px] text-[#595959]">
            {completedCount}/{totalUnits} ({percent}%)
          </span>
        </div>
        <div className="font-display text-sm font-semibold text-[#1E3A2F] truncate">
          {chapter.title}
        </div>
        <div className="w-full h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isFinished ? 'bg-emerald-600' : 'bg-[#C6A664]'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white rounded-2xl border border-[#D9CFC0] hover:border-[#1E3A2F]/40 transition-all shadow-xs space-y-3.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
              {chapterLabel}
            </span>
            {isFinished && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Complete</span>
              </span>
            )}
          </div>
          <h3 className="font-display text-base sm:text-lg font-bold text-[#1E3A2F] mt-0.5">
            {chapter.title}
          </h3>
          <p className="text-xs text-[#595959] mt-0.5 line-clamp-2 font-sans">
            {chapter.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectUnit(nextUnit)}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF7F2] hover:bg-[#1E3A2F] text-[#1E3A2F] hover:text-[#F6F1E7] border border-[#D9CFC0] transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>{isFinished ? 'Review' : 'Continue'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Bar & Unit Count */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-[#8C7A6B]">
          <span>{totalUnits} Lessons in Section</span>
          <span className="font-semibold text-[#1E3A2F]">
            {completedCount} of {totalUnits} Finished ({percent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isFinished ? 'bg-emerald-600' : 'bg-[#C6A664]'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
