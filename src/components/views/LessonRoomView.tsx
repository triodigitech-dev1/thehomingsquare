import React, { useState, useEffect } from 'react';
import { CurriculumUnit, UserProgressState } from '../../types/chess';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { PAWN_STRUCTURES } from '../../data/structures';
import { ChessBoard, playWoodenClick, Square } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { BoardToolbar } from '../common/BoardToolbar';
import { InteractiveCheckpoint } from '../common/InteractiveCheckpoint';
import { StructurePreviewCard } from '../common/StructurePreviewCard';
import { CheckCircle2, ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react';

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

  const isAlreadyCompleted = progress.completedUnitIds.includes(currentUnit.id);

  // Reset board states when unit changes
  useEffect(() => {
    setCurrentFen(currentUnit.initialFen);
    setLastMoveSan(undefined);
    setMoveHistory([]);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Top Breadcrumb & Next/Prev Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D9CFC0]/60 pb-4">
        <div className="flex items-center gap-3 text-xs font-mono text-[#595959]">
          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="hover:text-[#1E3A2F] flex items-center gap-1 font-sans transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>The Map</span>
          </button>
          <span>/</span>
          <span className="text-[#1E3A2F] font-semibold">Unit {currentUnit.unitCode}</span>
          <span>/</span>
          <span className="truncate max-w-xs">{currentUnit.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {prevUnit && (
            <button
              type="button"
              onClick={() => onSelectUnit(prevUnit)}
              className="px-3 py-1.5 text-xs bg-white border border-[#D9CFC0] rounded-md text-[#262626] hover:bg-[#FAF7F2] transition-colors"
            >
              ← Previous Unit
            </button>
          )}
          {nextUnit && (
            <button
              type="button"
              onClick={() => onSelectUnit(nextUnit)}
              className="px-3 py-1.5 text-xs bg-[#1E3A2F] text-[#F6F1E7] rounded-md hover:bg-[#152921] transition-colors"
            >
              Next Unit →
            </button>
          )}
        </div>
      </div>

      {/* 3-Column Studio Layout: Left (Outline), Center (Study & Board), Right (Structure Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (3 cols): Course Outline Syllabus */}
        <div className="lg:col-span-3 hidden lg:block">
          <StudyCard
            kicker="Classroom Syllabus"
            title="Study Outline"
            subtitle="Curriculum units across Chapters P through 8."
          >
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1 text-xs">
              {CURRICULUM_CHAPTERS.map((ch) => (
                <div key={ch.id} className="space-y-1">
                  <span className="font-semibold text-[#1E3A2F] block">
                    {ch.code}: {ch.title}
                  </span>
                  <div className="space-y-1 pl-2 border-l border-[#D9CFC0]/60">
                    {ch.units.map((u) => {
                      const isSelected = u.id === currentUnit.id;
                      const isDone = progress.completedUnitIds.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => onSelectUnit(u)}
                          className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-[#1E3A2F] text-[#F6F1E7] font-medium'
                              : 'text-[#595959] hover:bg-[#EDE6D8] hover:text-[#262626]'
                          }`}
                        >
                          <span className="truncate">{u.unitCode}. {u.title}</span>
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A664] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </StudyCard>
        </div>

        {/* Center Main Stage (6 cols): Unit Text, Board & Interactive Checkpoint */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Unit Study Content Card */}
          <StudyCard
            kicker={`Unit ${currentUnit.unitCode}`}
            title={currentUnit.title}
            subtitle={currentUnit.subtitle}
            badge={
              isAlreadyCompleted ? (
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </span>
              ) : undefined
            }
          >
            <div className="space-y-4 text-xs sm:text-sm font-sans">
              <div className="p-4 bg-[#EDE6D8]/50 rounded-xl border border-[#D9CFC0]/80 text-xs space-y-1.5">
                <div>
                  <strong className="text-[#1E3A2F]">What to Learn:</strong> {currentUnit.whatToLearn}
                </div>
                <div>
                  <strong className="text-[#1E3A2F]">Expected Outcome:</strong> {currentUnit.expectedOutcome}
                </div>
              </div>

              {/* Reading Content Paragraphs */}
              <div className="space-y-3.5 text-[#262626] leading-relaxed pt-1">
                {currentUnit.contentParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </StudyCard>

          {/* Interactive Chess Stage for this Unit */}
          <StudyCard
            kicker="Interactive Analysis Board"
            title="Model Position"
            subtitle="Explore moves on the board. Use the toolbar to view skeletons or flip coordinates."
          >
            <div className="flex flex-col items-center justify-center">
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
                className="mt-3 max-w-sm"
              />
            </div>
          </StudyCard>

          {/* Checkpoint using Reusable InteractiveCheckpoint Component */}
          <StudyCard>
            <InteractiveCheckpoint
              checkpoint={currentUnit.checkpoint}
              onSuccess={() => onCompleteUnit(currentUnit.id)}
              isAlreadyCompleted={isAlreadyCompleted}
              soundEnabled={progress.soundEnabled}
              onNext={nextUnit ? () => onSelectUnit(nextUnit) : undefined}
              nextLabel="Proceed to Next Unit →"
            />
          </StudyCard>

        </div>

        {/* Right Column (3 cols): Persistent Structure Preview Card */}
        <div className="lg:col-span-3 space-y-6">
          <div className="sticky top-20 space-y-4">
            <StructurePreviewCard
              structure={associatedStructure}
              isActive={true}
            />

            <StudyCard variant="inset" kicker="Perception Rule" title="The Three Questions">
              <div className="space-y-2 text-xs font-sans text-[#595959]">
                <p className="italic text-[#262626] leading-relaxed">
                  Before calculating piece moves:
                </p>
                <ol className="list-decimal list-inside space-y-1 font-mono text-[11px] text-[#1E3A2F]">
                  <li>What is the pawn structure?</li>
                  <li>What one-sentence plan belongs to it?</li>
                  <li>Has anything just changed?</li>
                </ol>
              </div>
            </StudyCard>
          </div>
        </div>

      </div>
    </div>
  );
};
