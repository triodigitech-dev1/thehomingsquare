import React, { useState } from 'react';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { CurriculumUnit, UserProgressState, CurriculumChapter } from '../../types/chess';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { playWoodenClick } from '../board/ChessBoard';
import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  Lock,
  BookOpen,
  ChevronRight,
  Layers,
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';

interface MapViewProps {
  progress: UserProgressState;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onNavigate: (view: NavView) => void;
  soundEnabled?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  progress,
  onSelectUnit,
  onNavigate,
  soundEnabled = true
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CURRICULUM_CHAPTERS[2].id); // Chapter 2 by default

  // Count total units and progress
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const totalUnits = allUnits.length;
  const completedUnitsCount = progress.completedUnitIds.length;
  const progressPct = Math.round((completedUnitsCount / totalUnits) * 100);

  const selectedChapter: CurriculumChapter =
    CURRICULUM_CHAPTERS.find((c) => c.id === selectedChapterId) || CURRICULUM_CHAPTERS[0];

  // Filter units within selected chapter
  const chapterUnits = selectedChapter.units.filter((unit) => {
    const isCompleted = progress.completedUnitIds.includes(unit.id);
    if (selectedFilter === 'completed') return isCompleted;
    if (selectedFilter === 'in_progress') return !isCompleted;
    return true;
  });

  const handleSelectChapter = (chId: string) => {
    setSelectedChapterId(chId);
    playWoodenClick(soundEnabled);
  };

  const currentChapterIndex = CURRICULUM_CHAPTERS.findIndex((c) => c.id === selectedChapter.id);
  const prevChapter = currentChapterIndex > 0 ? CURRICULUM_CHAPTERS[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < CURRICULUM_CHAPTERS.length - 1 ? CURRICULUM_CHAPTERS[currentChapterIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      
      {/* Journey Banner with Global Progress Gauge */}
      <StudyCard
        badge="Curriculum Cartography"
        badgeVariant="gold"
        title="The Map"
        subtitle="Syllabus regions from Region 0 (Threshold) to Region 8 (Capstone Mastery). Browse chapters and launch any unit into the classroom."
        headerAction={
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#1E3A2F] text-[#F6F1E7] px-3.5 py-2 rounded-xl border border-[#C6A664]/30 text-right">
              <div className="text-[10px] font-mono text-[#C6A664] uppercase tracking-wider">
                Journey Progress
              </div>
              <div className="font-display text-base sm:text-lg font-bold text-[#F6F1E7]">
                {completedUnitsCount} / {totalUnits} Units ({progressPct}%)
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('mastery')}
              className="px-3.5 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mastery Capstone</span>
              <span className="sm:hidden">Capstone</span>
            </button>
          </div>
        }
      >
        {/* Global Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#D9CFC0]/60">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-[#8C7A6B] mr-1">Filter Units:</span>
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'completed', label: `Completed (${completedUnitsCount})` },
              { id: 'in_progress', label: `Remaining (${totalUnits - completedUnitsCount})` }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setSelectedFilter(f.id as any);
                  playWoodenClick(soundEnabled);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedFilter === f.id
                    ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                    : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-[#595959]">
            Active Region: <strong className="text-[#1E3A2F]">{selectedChapter.code}</strong>
          </div>
        </div>
      </StudyCard>

      {/* 2-Column Partitioned Layout: Left (Region Syllabus) vs Right (Regional Stage & Units) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (4 cols): Scrollable Chapter / Region Syllabus */}
        <div className="lg:col-span-4 bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#D9CFC0]/70 shadow-sm space-y-3">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Regions Syllabus</span>
            </span>
            <span className="text-xs text-[#595959] font-mono">
              9 Regions
            </span>
          </div>

          {/* Smooth Scrollable Region Navigator */}
          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {CURRICULUM_CHAPTERS.map((ch) => {
              const isSelected = ch.id === selectedChapter.id;
              const chapterDoneCount = ch.units.filter((u) => progress.completedUnitIds.includes(u.id)).length;
              const isAllDone = chapterDoneCount === ch.units.length && ch.units.length > 0;
              const chPct = Math.round((chapterDoneCount / ch.units.length) * 100);

              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs group ${
                    isSelected
                      ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-sm'
                      : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isSelected ? 'text-[#C6A664]' : 'text-[#8C7A6B]'}>
                      Region {ch.number === 'P' ? '0 · Intro' : `0${ch.number}`}
                    </span>
                    <span className={isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'}>
                      {chapterDoneCount}/{ch.units.length}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-semibold leading-tight">
                    {ch.title}
                  </h3>

                  {/* Tiny progress line */}
                  <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected ? 'bg-[#C6A664]' : 'bg-[#1E3A2F]'
                      }`}
                      style={{ width: `${chPct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN (8 cols): Selected Region Landmark & Scrollable Units Grid */}
        <div className="lg:col-span-8 bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0]/70 shadow-sm space-y-6">
          
          {/* Active Region Landmark Header */}
          <div className="border-b border-[#D9CFC0]/60 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C6A664] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Region {selectedChapter.number === 'P' ? '0 · Prerequisite' : `0${selectedChapter.number}`} · Landmark Stage</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-[#D9CFC0] text-[#1E3A2F] font-semibold">
                {selectedChapter.units.filter((u) => progress.completedUnitIds.includes(u.id)).length} of {selectedChapter.units.length} Units Finished
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-[#1E3A2F]">
              {selectedChapter.title}
            </h2>
            <p className="text-xs text-[#595959] font-sans">
              {selectedChapter.subtitle}
            </p>
            <p className="text-xs text-[#262626] italic font-sans max-w-2xl pt-1 leading-relaxed">
              "{selectedChapter.description}"
            </p>
          </div>

          {/* Scrollable Units Grid (Partitioned with internal scroll) */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {chapterUnits.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#8C7A6B] bg-white rounded-xl border border-dashed border-[#D9CFC0]">
                No units match the "{selectedFilter}" filter in this region.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {chapterUnits.map((unit) => {
                  const isCompleted = progress.completedUnitIds.includes(unit.id);
                  return (
                    <div
                      key={unit.id}
                      onClick={() => {
                        playWoodenClick(soundEnabled);
                        onSelectUnit(unit);
                        onNavigate('lesson');
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                        isCompleted
                          ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-500 shadow-xs'
                          : 'bg-white border-[#D9CFC0] hover:border-[#1E3A2F] shadow-xs hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-semibold text-[#1E3A2F]">
                            Unit {unit.unitCode}
                          </span>
                          {isCompleted ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EDE6D8] text-[#595959] font-semibold">
                              Available
                            </span>
                          )}
                        </div>

                        <h4 className="font-display text-sm font-semibold text-[#1E3A2F] group-hover:text-[#C6A664] transition-colors leading-snug">
                          {unit.title}
                        </h4>

                        <p className="text-[11px] text-[#595959] line-clamp-2 leading-relaxed">
                          {unit.whatToLearn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between text-[11px]">
                        <span className="text-[#8C7A6B] font-mono truncate max-w-[150px]">
                          Outcome: {unit.expectedOutcome}
                        </span>
                        <span className="text-[#1E3A2F] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5 shrink-0">
                          <span>Enter</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Region Footer Navigation (Prev / Next Region) */}
          <div className="pt-3 border-t border-[#D9CFC0]/60 flex items-center justify-between text-xs">
            {prevChapter ? (
              <button
                type="button"
                onClick={() => handleSelectChapter(prevChapter.id)}
                className="px-3 py-1.5 bg-white border border-[#D9CFC0] hover:bg-[#FAF7F2] rounded-lg text-[#1E3A2F] font-medium transition-colors"
              >
                ← Region {prevChapter.number === 'P' ? '0' : prevChapter.number}: {prevChapter.title}
              </button>
            ) : <div />}

            {nextChapter && (
              <button
                type="button"
                onClick={() => handleSelectChapter(nextChapter.id)}
                className="px-3 py-1.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] rounded-lg font-medium transition-colors ml-auto"
              >
                Region {nextChapter.number}: {nextChapter.title} →
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
