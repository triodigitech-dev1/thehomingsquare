import React, { useState, useEffect } from 'react';
import { CurriculumUnit, UserProgressState } from '../../types/chess';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { PAWN_STRUCTURES } from '../../data/structures';
import { ChessBoard, playWoodenClick, Square } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { BoardToolbar } from '../common/BoardToolbar';
import { InteractiveCheckpoint } from '../common/InteractiveCheckpoint';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers,
  HelpCircle,
  Dna,
  Compass,
  Sparkles,
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface LessonRoomProps {
  currentUnit: CurriculumUnit;
  progress: UserProgressState;
  onCompleteUnit: (unitId: string) => void;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onNavigate: (view: NavView) => void;
}

export const LessonRoomView: React.FC<LessonRoomProps> = ({
  currentUnit,
  progress,
  onCompleteUnit,
  onSelectUnit,
  onNavigate
}) => {
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);
  const [currentFen, setCurrentFen] = useState(currentUnit.initialFen);
  const [lastMoveSan, setLastMoveSan] = useState<string | undefined>(undefined);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [activeRightTab, setActiveRightTab] = useState<'theory' | 'checkpoint' | 'structure'>('theory');

  const isAlreadyCompleted = progress.completedUnitIds.includes(currentUnit.id);

  // Reset board states when unit changes
  useEffect(() => {
    setCurrentFen(currentUnit.initialFen);
    setLastMoveSan(undefined);
    setMoveHistory([]);
    // If unit is not completed, start on theory; if completed, stay on current tab
  }, [currentUnit.id, currentUnit.initialFen]);

  // Find structure associated with unit if any, or default to Carlsbad
  const associatedStructure =
    PAWN_STRUCTURES.find((s) => s.id === currentUnit.structureId) || PAWN_STRUCTURES[0];

  // Flatten units for Prev/Next navigation
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const currentIndex = allUnits.findIndex((u) => u.id === currentUnit.id);
  const prevUnit = currentIndex > 0 ? allUnits[currentIndex - 1] : null;
  const nextUnit = currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : null;

  const handleBoardMove = (from: Square, to: Square, san: string, newFen: string) => {
    setCurrentFen(newFen);
    setLastMoveSan(san);
    setMoveHistory((prev) => [...prev, san]);
  };

  const handleResetBoard = () => {
    setCurrentFen(currentUnit.initialFen);
    setLastMoveSan(undefined);
    setMoveHistory([]);
    playWoodenClick(progress.soundEnabled);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      
      {/* Top Breadcrumb & Next/Prev Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-[#D9CFC0] shadow-xs">
        <div className="flex items-center gap-2.5 text-xs font-mono text-[#595959]">
          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="hover:text-[#1E3A2F] flex items-center gap-1 font-sans transition-colors font-medium text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>The Map</span>
          </button>
          <span>/</span>
          <span className="text-[#1E3A2F] font-bold">Unit {currentUnit.unitCode}</span>
          <span>/</span>
          <span className="truncate max-w-xs sm:max-w-sm text-[#262626] font-medium">{currentUnit.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {prevUnit && (
            <button
              type="button"
              onClick={() => {
                onSelectUnit(prevUnit);
                playWoodenClick(progress.soundEnabled);
              }}
              className="px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded-lg text-[#262626] hover:bg-[#EDE6D8] transition-colors"
            >
              ← Prev Unit
            </button>
          )}

          {isAlreadyCompleted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Checkpoint</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Checkpoint Active</span>
            </span>
          )}

          {nextUnit && (
            <button
              type="button"
              onClick={() => {
                onSelectUnit(nextUnit);
                playWoodenClick(progress.soundEnabled);
              }}
              className="px-3 py-1.5 text-xs bg-[#1E3A2F] text-[#F6F1E7] rounded-lg hover:bg-[#152921] transition-colors font-semibold shadow-xs"
            >
              Next Unit →
            </button>
          )}
        </div>
      </div>

      {/* Unified Studio Workstation Frame (Dashboard within Dashboard) */}
      <div className="bg-[#FAF7F2] rounded-2xl border border-[#D9CFC0] shadow-sm overflow-hidden">
        
        {/* Studio Shell Top Ribbon */}
        <div className="px-5 py-3.5 bg-linear-to-r from-[#1E3A2F] via-[#244336] to-[#1E3A2F] text-[#F6F1E7] flex flex-wrap items-center justify-between gap-3 border-b border-[#C6A664]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/20 border border-[#C6A664]/40 flex items-center justify-center text-[#C6A664]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                  Classroom Studio Workstation
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/30 text-[#DFCA95]">
                  Unit {currentUnit.unitCode}
                </span>
              </div>
              <h1 className="font-display text-sm sm:text-base font-semibold text-[#F6F1E7] truncate max-w-md">
                {currentUnit.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#DFCA95] hidden sm:inline">Progress:</span>
            <span className="bg-black/30 px-2.5 py-1 rounded-md text-[#F6F1E7] border border-white/10">
              {progress.completedUnitIds.length} / {allUnits.length} Units Finished
            </span>
          </div>
        </div>

        {/* 3-Partition Studio Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D9CFC0]">
          
          {/* COLUMN 1: Syllabus Rail (3 cols on lg, collapsed/compact) */}
          <div className="lg:col-span-3 p-4 bg-[#F5EFE6]/60 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-[#D9CFC0] pb-2.5">
              <span className="text-xs font-mono uppercase text-[#C6A664] font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Syllabus Rail</span>
              </span>
              <span className="text-[11px] font-mono text-[#595959]">
                {Math.round((progress.completedUnitIds.length / allUnits.length) * 100)}% Complete
              </span>
            </div>

            {/* Scrollable Course Syllabus Tree */}
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1 text-xs">
              {CURRICULUM_CHAPTERS.map((ch) => (
                <div key={ch.id} className="space-y-1">
                  <div className="font-mono text-[11px] font-semibold text-[#1E3A2F] uppercase tracking-wide flex items-center justify-between py-0.5">
                    <span className="truncate">{ch.code}: {ch.title}</span>
                  </div>
                  <div className="space-y-1 pl-2 border-l-2 border-[#D9CFC0]">
                    {ch.units.map((u) => {
                      const isSelected = u.id === currentUnit.id;
                      const isDone = progress.completedUnitIds.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            onSelectUnit(u);
                            playWoodenClick(progress.soundEnabled);
                          }}
                          className={`w-full text-left py-1 px-2 rounded-lg transition-all text-xs flex items-center justify-between group ${
                            isSelected
                              ? 'bg-[#1E3A2F] text-[#F6F1E7] font-semibold shadow-xs'
                              : 'text-[#595959] hover:bg-white hover:text-[#262626]'
                          }`}
                        >
                          <span className="truncate pr-1">
                            {u.unitCode}. {u.title}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A664] shrink-0" />
                          ) : (
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-[#C6A664]' : 'bg-[#D9CFC0] group-hover:bg-[#1E3A2F]'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Syllabus Tip */}
            <div className="pt-2 border-t border-[#D9CFC0] text-[11px] text-[#8C7A6B] font-mono flex items-center justify-between">
              <span>9 Regions Cartography</span>
              <button
                type="button"
                onClick={() => onNavigate('map')}
                className="text-[#1E3A2F] font-semibold hover:underline"
              >
                Open Map →
              </button>
            </div>
          </div>

          {/* COLUMN 2: Analysis Board Stage (5 cols on lg) */}
          <div className="lg:col-span-5 p-5 flex flex-col items-center justify-between space-y-4 bg-white/40">
            
            {/* Board Sub-Header */}
            <div className="w-full flex items-center justify-between border-b border-[#D9CFC0] pb-2.5">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block">
                  Interactive Model Stage
                </span>
                <h3 className="font-display text-sm font-semibold text-[#1E3A2F]">
                  {associatedStructure.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#D9CFC0] text-[#1E3A2F] font-semibold">
                  Homing: c5
                </span>
              </div>
            </div>

            {/* Pinned Chessboard Arena */}
            <div className="flex flex-col items-center w-full py-1">
              <ChessBoard
                initialFen={currentFen}
                interactive={true}
                onMove={handleBoardMove}
                pawnSkeletonOnly={pawnSkeletonMode}
                homingSquare="c5"
                flipped={boardFlipped}
                size="md"
              />

              <BoardToolbar
                fen={currentFen}
                flipped={boardFlipped}
                onToggleFlip={() => setBoardFlipped(!boardFlipped)}
                pawnSkeletonOnly={pawnSkeletonMode}
                onTogglePawnSkeleton={() => setPawnSkeletonMode(!pawnSkeletonMode)}
                onReset={handleResetBoard}
                soundEnabled={progress.soundEnabled}
                lastMoveSan={lastMoveSan}
                moveHistory={moveHistory}
                className="mt-3 max-w-[320px]"
              />
            </div>

            {/* Quick Levers Strip */}
            <div className="w-full p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-1 text-xs shadow-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#1E3A2F] font-display">
                  Pawn Levers & Breaks:
                </span>
                <span className="font-mono text-[10px] text-[#C6A664] font-semibold">
                  {associatedStructure.category}
                </span>
              </div>
              <p className="text-[11px] text-[#595959] font-sans">
                <strong>White:</strong> {associatedStructure.whiteBreaks.join(' · ')} | <strong>Black:</strong> {associatedStructure.blackBreaks.join(' · ')}
              </p>
            </div>

            {/* Quick Fast-Action Switch to Checkpoint */}
            <div className="w-full pt-1 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#595959]">
                Model: <strong>{associatedStructure.historicalModel}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('checkpoint');
                  playWoodenClick(progress.soundEnabled);
                }}
                className="text-[#1E3A2F] font-semibold hover:text-[#C6A664] transition-colors flex items-center gap-1"
              >
                <span>Answer Checkpoint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* COLUMN 3: Workstation Desk (4 cols on lg) */}
          <div className="lg:col-span-4 p-5 flex flex-col justify-between space-y-4 bg-white/70">
            
            {/* Workstation Tabs */}
            <div className="flex bg-[#EDE6D8] p-1 rounded-xl border border-[#D9CFC0]">
              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('theory');
                  playWoodenClick(progress.soundEnabled);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeRightTab === 'theory'
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                    : 'text-[#595959] hover:text-[#1E3A2F]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C6A664]" />
                <span>Theory</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('checkpoint');
                  playWoodenClick(progress.soundEnabled);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeRightTab === 'checkpoint'
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                    : 'text-[#595959] hover:text-[#1E3A2F]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#C6A664]" />
                <span>Checkpoint</span>
                {isAlreadyCompleted ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('structure');
                  playWoodenClick(progress.soundEnabled);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeRightTab === 'structure'
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                    : 'text-[#595959] hover:text-[#1E3A2F]'
                }`}
              >
                <Dna className="w-3.5 h-3.5 text-[#C6A664]" />
                <span>DNA</span>
              </button>
            </div>

            {/* TAB 1: Theory Content (Internal Scrollable Container) */}
            {activeRightTab === 'theory' && (
              <div className="space-y-3.5 animate-fadeIn flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-[#D9CFC0] pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                      Core Syllabus Doctrine
                    </span>
                    <h2 className="font-display text-base sm:text-lg text-[#1E3A2F] font-semibold leading-snug">
                      {currentUnit.title}
                    </h2>
                    {currentUnit.subtitle && (
                      <p className="text-xs text-[#595959] mt-0.5 font-sans">
                        {currentUnit.subtitle}
                      </p>
                    )}
                  </div>

                  {/* What to Learn & Outcome */}
                  <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-1.5 text-xs shadow-xs">
                    <div>
                      <strong className="text-[#1E3A2F]">What to Learn:</strong>{' '}
                      <span className="text-[#595959]">{currentUnit.whatToLearn}</span>
                    </div>
                    <div className="pt-1 border-t border-[#D9CFC0]/50">
                      <strong className="text-[#1E3A2F]">Expected Outcome:</strong>{' '}
                      <span className="text-[#595959]">{currentUnit.expectedOutcome}</span>
                    </div>
                  </div>

                  {/* Reading Paragraphs with Bounded Scroll */}
                  <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1 text-xs text-[#262626] leading-relaxed font-sans">
                    {currentUnit.contentParagraphs.map((para, i) => (
                      <p key={i} className="p-2.5 bg-white rounded-lg border border-[#D9CFC0]/60 shadow-2xs">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer Switcher */}
                <div className="pt-2 border-t border-[#D9CFC0] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C7A6B] font-mono">
                    {isAlreadyCompleted ? 'Checkpoint Verified ✓' : 'Ready to verify?'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRightTab('checkpoint');
                      playWoodenClick(progress.soundEnabled);
                    }}
                    className="px-3.5 py-1.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Proceed to Checkpoint</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Interactive Checkpoint (Side-by-side with the board) */}
            {activeRightTab === 'checkpoint' && (
              <div className="space-y-3 animate-fadeIn flex-1 flex flex-col justify-between">
                <div>
                  <div className="border-b border-[#D9CFC0] pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                      Interactive Evaluation
                    </span>
                    <h3 className="font-display text-base font-semibold text-[#1E3A2F]">
                      Unit {currentUnit.unitCode} Verification
                    </h3>
                    <span className="text-[11px] text-[#595959]">
                      Consult the analysis board to calculate your answer.
                    </span>
                  </div>

                  {/* Checkpoint Component in Bounded Scrollable Container */}
                  <div className="bg-white rounded-xl p-4 border border-[#D9CFC0] shadow-xs max-h-[420px] overflow-y-auto pr-1 mt-3">
                    <InteractiveCheckpoint
                      checkpoint={currentUnit.checkpoint}
                      onSuccess={() => onCompleteUnit(currentUnit.id)}
                      isAlreadyCompleted={isAlreadyCompleted}
                      soundEnabled={progress.soundEnabled}
                      onNext={nextUnit ? () => onSelectUnit(nextUnit) : undefined}
                      nextLabel="Proceed to Next Unit →"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D9CFC0] flex items-center justify-between text-[11px] text-[#595959] font-mono">
                  <span>Homecoming Standard</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRightTab('theory');
                      playWoodenClick(progress.soundEnabled);
                    }}
                    className="text-[#1E3A2F] hover:underline"
                  >
                    ← Review Theory
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Structural DNA & Specs */}
            {activeRightTab === 'structure' && (
              <div className="space-y-3 animate-fadeIn flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-[#D9CFC0] pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                      Structural Blueprint
                    </span>
                    <h3 className="font-display text-base font-semibold text-[#1E3A2F]">
                      {associatedStructure.name}
                    </h3>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#D9CFC0] space-y-2 text-xs shadow-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#C6A664] block font-semibold">
                        Move 12 One-Sentence Plan
                      </span>
                      <p className="font-display italic text-xs text-[#1E3A2F] mt-0.5 leading-snug">
                        “{associatedStructure.oneSentencePlan}”
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#D9CFC0]/50 space-y-1">
                      <div className="text-[11px] font-mono text-[#595959]">
                        <strong className="text-[#1E3A2F]">White Skeleton:</strong> {associatedStructure.whitePawnSkeleton.join(', ')}
                      </div>
                      <div className="text-[11px] font-mono text-[#595959]">
                        <strong className="text-[#1E3A2F]">Black Skeleton:</strong> {associatedStructure.blackPawnSkeleton.join(', ')}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#D9CFC0]/50 space-y-1">
                      <div className="text-[11px] text-[#595959]">
                        <strong>Break Levers:</strong> {associatedStructure.whiteBreaks.join(' · ')}
                      </div>
                      <div className="text-[11px] text-[#595959]">
                        <strong>Key Outposts:</strong> {associatedStructure.keyOutposts.join(' · ')}
                      </div>
                      <div className="text-[11px] text-[#595959]">
                        <strong>Historical Model:</strong> {associatedStructure.historicalModel}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#EDE6D8]/50 rounded-xl border border-[#D9CFC0] text-xs space-y-1">
                    <span className="font-semibold text-[#1E3A2F] block font-display">
                      The Three Cognitive Questions
                    </span>
                    <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-[#262626]">
                      <li>What is the pawn structure?</li>
                      <li>What one-sentence plan belongs to it?</li>
                      <li>Has anything just changed?</li>
                    </ol>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D9CFC0] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#8C7A6B]">
                    Homing Square c5
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('cockpit')}
                    className="text-[#1E3A2F] font-semibold hover:underline"
                  >
                    Open in Cockpit →
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
