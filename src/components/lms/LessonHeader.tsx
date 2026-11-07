import React from 'react';
import { CurriculumUnit, CurriculumChapter } from '../../types/chess';
import { LessonStatus, LessonProgressStatus } from './LessonStatus';
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2, Bookmark, BookOpen } from 'lucide-react';
import { NavView } from '../layout/Header';

interface LessonHeaderProps {
  currentUnit: CurriculumUnit;
  chapter?: CurriculumChapter;
  isCompleted: boolean;
  onToggleComplete: () => void;
  prevUnit: CurriculumUnit | null;
  nextUnit: CurriculumUnit | null;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onNavigate: (view: NavView) => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  currentUnit,
  chapter,
  isCompleted,
  onToggleComplete,
  prevUnit,
  nextUnit,
  onSelectUnit,
  onNavigate
}) => {
  const status: LessonProgressStatus = isCompleted ? 'completed' : 'current';

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9CFC0] shadow-xs space-y-4">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#8C7A6B]"
      >
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="hover:text-[#1E3A2F] transition-colors font-medium flex items-center gap-1"
        >
          <span>Course Dashboard</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D9CFC0]" />
        <button
          type="button"
          onClick={() => onNavigate('map')}
          className="hover:text-[#1E3A2F] transition-colors font-medium"
        >
          <span>{chapter ? `${chapter.code}: ${chapter.title}` : 'Curriculum Map'}</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D9CFC0]" />
        <span className="text-[#1E3A2F] font-bold">
          Lesson {currentUnit.unitCode}
        </span>
      </nav>

      {/* Main Title, Subtitle, and Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#D9CFC0]/60 pb-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EDE6D8] text-[#1E3A2F] font-semibold">
              Unit {currentUnit.unitCode}
            </span>
            <LessonStatus status={status} size="sm" />
            <span className="text-xs font-mono text-[#8C7A6B]">
              ~15–20 min study
            </span>
          </div>

          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E3A2F] leading-tight">
            {currentUnit.title}
          </h1>

          {currentUnit.subtitle && (
            <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
              {currentUnit.subtitle}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap sm:flex-col items-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleComplete}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-[#1E3A2F] text-[#F6F1E7] hover:bg-[#152921]'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-[#C6A664]'}`} />
            <span>{isCompleted ? 'Completed ✓ (Re-mark)' : 'Mark Lesson Complete'}</span>
          </button>

          {/* Quick Prev / Next Lesson Buttons */}
          <div className="flex items-center gap-1.5">
            {prevUnit && (
              <button
                type="button"
                onClick={() => onSelectUnit(prevUnit)}
                title={`Previous: Unit ${prevUnit.unitCode}`}
                className="px-2.5 py-1.5 rounded-lg border border-[#D9CFC0] bg-[#FAF7F2] hover:bg-[#EDE6D8] text-xs font-mono text-[#262626] flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}

            {nextUnit && (
              <button
                type="button"
                onClick={() => onSelectUnit(nextUnit)}
                title={`Next: Unit ${nextUnit.unitCode}`}
                className="px-3 py-1.5 rounded-lg border border-[#C6A664] bg-[#C6A664]/10 hover:bg-[#C6A664]/20 text-xs font-semibold text-[#1E3A2F] flex items-center gap-1 transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C6D28]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
