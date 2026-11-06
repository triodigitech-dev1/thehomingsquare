import React, { useState } from 'react';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { CurriculumUnit, UserProgressState } from '../../types/chess';
import { NavView } from '../layout/Header';
import { Compass, CheckCircle2, Circle, ArrowRight, Lock, BookOpen } from 'lucide-react';

interface MapViewProps {
  progress: UserProgressState;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onNavigate: (view: NavView) => void;
}

export const MapView: React.FC<MapViewProps> = ({ progress, onSelectUnit, onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

  // Count total units
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const totalUnits = allUnits.length;
  const completedUnitsCount = progress.completedUnitIds.length;
  const progressPct = Math.round((completedUnitsCount / totalUnits) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Journey Banner */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            The Map
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans max-w-2xl">
            Prerequisite and Chapters 1 to 8 leading to the Mastery Check.
          </p>
        </div>

        {/* Global Progress Indicator */}
        <div className="bg-[#EDE6D8] p-4 rounded-xl border border-[#D9CFC0] text-right shrink-0">
          <div className="text-xs font-mono text-[#595959]">Journey Progress</div>
          <div className="font-display text-2xl text-[#1E3A2F] font-semibold">
            {completedUnitsCount} / {totalUnits} Units
          </div>
          <div className="w-36 h-2 bg-[#D9CFC0] rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-[#1E3A2F] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
        <div className="flex items-center gap-2">
          {(['all', 'completed', 'in_progress'] as const).map((filterKey) => {
            const labels = {
              all: 'All Regions',
              completed: 'Completed Units',
              in_progress: 'Active & Unlocked'
            };
            return (
              <button
                key={filterKey}
                type="button"
                onClick={() => setSelectedFilter(filterKey)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedFilter === filterKey
                    ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                    : 'bg-[#EDE6D8] text-[#262626] hover:bg-[#FAF7F2]'
                }`}
              >
                {labels[filterKey]}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('mastery')}
          className="text-xs text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
        >
          <span>See The Mastery Check Capstone</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chapters as Continuous Regions */}
      <div className="space-y-8">
        {CURRICULUM_CHAPTERS.map((chapter, idx) => {
          // Filter units if needed
          const filteredUnits = chapter.units.filter((unit) => {
            const isCompleted = progress.completedUnitIds.includes(unit.id);
            if (selectedFilter === 'completed') return isCompleted;
            if (selectedFilter === 'in_progress') return !isCompleted;
            return true;
          });

          if (filteredUnits.length === 0) return null;

          return (
            <div
              key={chapter.id}
              className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm relative overflow-hidden"
            >
              {/* Region Landmark Header */}
              <div className="border-b border-[#D9CFC0]/60 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C6A664]">
                    Region {chapter.number === 'P' ? '0 · Prerequisite' : `0${chapter.number}`}
                  </span>
                  <span className="text-xs text-[#595959] font-sans">
                    {chapter.units.filter((u) => progress.completedUnitIds.includes(u.id)).length} of {chapter.units.length} Finished
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl text-[#1E3A2F] mt-1">
                  {chapter.title}
                </h2>
                <p className="text-xs text-[#595959] mt-0.5 font-sans">
                  {chapter.subtitle}
                </p>
                <p className="text-xs text-[#262626] mt-2 italic font-sans max-w-3xl">
                  {chapter.description}
                </p>
              </div>

              {/* Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUnits.map((unit) => {
                  const isCompleted = progress.completedUnitIds.includes(unit.id);

                  return (
                    <div
                      key={unit.id}
                      onClick={() => {
                        onSelectUnit(unit);
                        onNavigate('lesson');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isCompleted
                          ? 'bg-[#EDE6D8]/40 border-[#D9CFC0] hover:border-[#1E3A2F]'
                          : 'bg-white border-[#D9CFC0] hover:border-[#1E3A2F] shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-mono text-[#1E3A2F] font-semibold">
                            Unit {unit.unitCode}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {unit.isNew && (
                              <span className="text-[10px] font-sans text-[#A8553F] font-semibold">
                                [New Addition]
                              </span>
                            )}
                            {unit.isRevised && (
                              <span className="text-[10px] font-sans text-[#C6A664] font-semibold">
                                [Revised]
                              </span>
                            )}
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#D9CFC0]" />
                            )}
                          </div>
                        </div>

                        <h3 className="font-display text-base font-semibold text-[#1E3A2F] leading-snug">
                          {unit.title}
                        </h3>

                        {unit.subtitle && (
                          <p className="text-xs text-[#595959] mt-0.5 line-clamp-1">
                            {unit.subtitle}
                          </p>
                        )}

                        <p className="text-xs text-[#262626] mt-2 line-clamp-2 leading-relaxed">
                          {unit.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#D9CFC0]/40 flex items-center justify-end text-[11px] text-[#595959]">
                        <span className="text-[#1E3A2F] font-medium flex items-center gap-1">
                          <span>Enter Lesson</span>
                          <ArrowRight className="w-3 h-3 text-[#C6A664]" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
