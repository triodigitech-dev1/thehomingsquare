import React from 'react';
import { CurriculumChapter, CurriculumUnit, UserProgressState } from '../../types/chess';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { ProgressSummary } from './ProgressSummary';
import { ChapterProgress } from './ChapterProgress';
import { LessonStatus } from './LessonStatus';
import { NavView } from '../layout/Header';
import {
  BookOpen,
  PlayCircle,
  FileText,
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Award,
  BookMarked
} from 'lucide-react';

interface CourseDashboardProps {
  progress: UserProgressState;
  currentUnit: CurriculumUnit;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onNavigate: (view: NavView) => void;
}

export const CourseDashboard: React.FC<CourseDashboardProps> = ({
  progress,
  currentUnit,
  onSelectUnit,
  onNavigate
}) => {
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const completedUnitIds = progress.completedUnitIds || [];

  // Determine current/next unfinished unit to resume
  const nextIncompleteUnit =
    allUnits.find((u) => !completedUnitIds.includes(u.id)) || currentUnit || allUnits[0];

  const currentChapter = CURRICULUM_CHAPTERS.find((ch) => ch.id === nextIncompleteUnit.chapterId);

  // Recently completed lessons
  const recentlyCompletedUnits = allUnits
    .filter((u) => completedUnitIds.includes(u.id))
    .slice(-4)
    .reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Course Hero Banner */}
      <div className="bg-gradient-to-br from-[#1E3A2F] via-[#244336] to-[#152921] rounded-3xl p-6 sm:p-10 text-[#F6F1E7] border border-[#C6A664]/30 shadow-xl relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <BookOpen className="w-96 h-96 -mr-20 text-[#C6A664]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C6A664] font-semibold bg-black/30 px-3 py-1 rounded-full border border-[#C6A664]/30">
              The Homing Square LMS
            </span>
            <span className="text-[11px] font-mono text-[#DFCA95] bg-white/10 px-2.5 py-0.5 rounded-full">
              Full 154-Page Manuscript Edition
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F6F1E7] leading-tight">
            Structure-First Chess Mastery
          </h1>

          <p className="text-sm sm:text-base text-[#D9CFC0] leading-relaxed font-sans max-w-2xl">
            A quiet, rigorous textbook learning system for the comeback. 10 comprehensive chapters, 46 structured units, and progressive diagnostic milestones. Every piece has a home square.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onSelectUnit(nextIncompleteUnit);
                onNavigate('lesson');
              }}
              className="px-5 py-3 rounded-xl bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-[#1E3A2F] text-[#C6A664]" />
              <span>Resume Current Lesson (Unit {nextIncompleteUnit.unitCode})</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#F6F1E7] border border-white/20 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#C6A664]" />
              <span>View Curriculum Map</span>
            </button>

            <a
              href="/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-black/20 hover:bg-black/30 text-[#DFCA95] border border-[#C6A664]/30 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#C6A664]" />
              <span>Open Textbook PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Dual Grid: Resume Learning Card + Recommended Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Continue Learning Primary Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-[#D9CFC0] shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
              <span className="text-[11px] font-mono uppercase text-[#C6A664] font-bold flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" />
                <span>Next Up to Study</span>
              </span>
              <LessonStatus
                status={completedUnitIds.includes(nextIncompleteUnit.id) ? 'completed' : 'in_progress'}
                size="sm"
              />
            </div>

            <div>
              <span className="text-xs font-mono text-[#8C7A6B]">
                {currentChapter ? `${currentChapter.code}: ${currentChapter.title}` : 'Current Section'}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1E3A2F] mt-0.5">
                Unit {nextIncompleteUnit.unitCode} — {nextIncompleteUnit.title}
              </h2>
              {nextIncompleteUnit.subtitle && (
                <p className="text-xs text-[#595959] mt-1 font-sans">
                  {nextIncompleteUnit.subtitle}
                </p>
              )}
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#D9CFC0]/70 text-xs text-[#262626] space-y-1.5">
              <div>
                <strong className="text-[#1E3A2F]">Core Objective:</strong>{' '}
                <span className="text-[#595959]">{nextIncompleteUnit.whatToLearn}</span>
              </div>
              <div className="pt-1 border-t border-[#D9CFC0]/50 text-[#8C7A6B] font-mono text-[11px]">
                Expected Outcome: {nextIncompleteUnit.expectedOutcome}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs font-mono text-[#8C7A6B]">
              ~15–20 minutes · Includes interactive board & checkpoint
            </span>
            <button
              type="button"
              onClick={() => {
                onSelectUnit(nextIncompleteUnit);
                onNavigate('lesson');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Classroom</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
            </button>
          </div>
        </div>

        {/* Recommended Daily Training & Diagnostics (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-2.5">
              <span className="text-[11px] font-mono uppercase text-[#C6A664] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Training Activity</span>
              </span>
            </div>

            <h3 className="font-display text-base font-bold text-[#1E3A2F]">
              Appendix Operational Routine
            </h3>
            <p className="text-xs text-[#595959] leading-relaxed">
              Pair your textbook lessons with the daily V1 scanning drill and game diagnostics:
            </p>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('drills')}
                className="w-full text-left p-3 rounded-xl bg-white border border-[#D9CFC0] hover:border-[#1E3A2F] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#C6A664]" />
                  <div>
                    <span className="font-semibold text-[#1E3A2F] block">15-Min V1 Scan Drill</span>
                    <span className="text-[11px] text-[#595959]">Checks → Captures → Threats → Loose Pieces</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#1E3A2F] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('log')}
                className="w-full text-left p-3 rounded-xl bg-white border border-[#D9CFC0] hover:border-[#1E3A2F] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#C6A664]" />
                  <div>
                    <span className="font-semibold text-[#1E3A2F] block">Gauntlet Game Diagnostic Log</span>
                    <span className="text-[11px] text-[#595959]">5-question error audit & path switch protocol</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#1E3A2F] transition-colors" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#D9CFC0] flex items-center justify-between text-xs font-mono text-[#8C7A6B]">
            <span>Active Term: 2026</span>
            <button
              type="button"
              onClick={() => onNavigate('mastery')}
              className="text-[#1E3A2F] font-semibold hover:underline"
            >
              View Mastery Standards →
            </button>
          </div>
        </div>
      </div>

      {/* Progress Summary Metrics Bar */}
      <ProgressSummary completedUnitIds={completedUnitIds} />

      {/* Complete Textbook Chapter Sections (All 10 Chapters) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-bold block">
              Syllabus Progression
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1E3A2F]">
              Textbook Chapters & Operational Sections
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="text-xs font-semibold text-[#1E3A2F] hover:underline flex items-center gap-1 font-mono"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM_CHAPTERS.map((ch) => (
            <ChapterProgress
              key={ch.id}
              chapter={ch}
              completedUnitIds={completedUnitIds}
              onSelectUnit={(u) => {
                onSelectUnit(u);
                onNavigate('lesson');
              }}
              onOpenChapterMap={() => onNavigate('map')}
            />
          ))}
        </div>
      </div>

      {/* Recently Completed Lessons */}
      {recentlyCompletedUnits.length > 0 && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D9CFC0] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#1E3A2F] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recently Verified Lessons</span>
            </span>
            <span className="text-xs font-mono text-[#8C7A6B]">
              {completedUnitIds.length} Total Mastered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentlyCompletedUnits.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  onSelectUnit(u);
                  onNavigate('lesson');
                }}
                className="text-left p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0] hover:border-[#1E3A2F] transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-[#8C7A6B]">
                  <span>Unit {u.unitCode}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="font-display text-sm font-semibold text-[#1E3A2F] truncate group-hover:text-[#C6A664] transition-colors">
                  {u.title}
                </div>
                <div className="text-[11px] text-[#595959] mt-1 line-clamp-1">
                  Checkpoint Passed ✓
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
