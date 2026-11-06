import React, { useState, useEffect } from 'react';
import { CurriculumUnit, UserProgressState } from '../../types/chess';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { PAWN_STRUCTURES } from '../../data/structures';
import { ChessBoard, playWoodenClick } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react';

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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);

  const isAlreadyCompleted = progress.completedUnitIds.includes(currentUnit.id);

  // Reset answer states when unit changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  }, [currentUnit.id]);

  // Find structure associated with unit if any, or default to Carlsbad
  const associatedStructure =
    PAWN_STRUCTURES.find((s) => s.id === currentUnit.structureId) || PAWN_STRUCTURES[0];

  // Flatten units for Prev/Next navigation
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const currentIndex = allUnits.findIndex((u) => u.id === currentUnit.id);
  const prevUnit = currentIndex > 0 ? allUnits[currentIndex - 1] : null;
  const nextUnit = currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : null;

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setHasSubmitted(true);
    const correct = selectedAnswer === currentUnit.checkpoint.correctIndex;
    setIsCorrect(correct);
    if (correct) {
      playWoodenClick(progress.soundEnabled);
      onCompleteUnit(currentUnit.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D9CFC0]/60 pb-4">
        <div className="flex items-center gap-3 text-xs font-mono text-[#595959]">
          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="hover:text-[#1E3A2F] flex items-center gap-1 font-sans"
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
        
        {/* Left Sidebar (3 cols): Course Outline */}
        <div className="lg:col-span-3 bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/60 shadow-sm space-y-4 hidden lg:block">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block">
                Classroom Syllabus
              </span>
              <span className="font-display text-sm font-semibold text-[#1E3A2F]">
                Study Outline
              </span>
            </div>
            {progress.studentAccount?.cohort && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EDE6D8] text-[#1E3A2F] border border-[#D9CFC0]">
                {progress.studentAccount.cohort.split(' ')[0]}
              </span>
            )}
          </div>

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
                        className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1E3A2F] text-[#F6F1E7] font-medium'
                            : 'text-[#595959] hover:bg-[#EDE6D8] hover:text-[#262626]'
                        }`}
                      >
                        <span className="truncate">{u.unitCode}. {u.title}</span>
                        {isDone && <CheckCircle2 className="w-3 h-3 text-[#C6A664] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Main Stage (6 cols): Unit Text, Board & Interactive Checkpoint */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Unit Header Card */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C6A664]">
                Unit {currentUnit.unitCode}
              </span>
              {isAlreadyCompleted && (
                <div className="flex items-center gap-1.5 text-xs text-[#1E3A2F] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Checkpoint Verified</span>
                </div>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
              {currentUnit.title}
            </h1>

            {currentUnit.subtitle && (
              <p className="text-sm font-sans text-[#595959] italic">
                {currentUnit.subtitle}
              </p>
            )}

            <div className="p-4 bg-[#EDE6D8]/50 rounded-xl border border-[#D9CFC0]/80 text-xs space-y-2">
              <div>
                <strong className="text-[#1E3A2F]">What to Learn:</strong> {currentUnit.whatToLearn}
              </div>
              <div>
                <strong className="text-[#1E3A2F]">Expected Outcome:</strong> {currentUnit.expectedOutcome}
              </div>
            </div>

            {/* Reading Content Paragraphs */}
            <div className="space-y-4 text-sm text-[#262626] leading-relaxed pt-2">
              {currentUnit.contentParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Interactive Chess Stage for this Unit */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-[#1E3A2F]">
                Model Position
              </h3>
              <button
                type="button"
                onClick={() => setPawnSkeletonMode(!pawnSkeletonMode)}
                className="text-xs px-3 py-1.5 bg-[#EDE6D8] border border-[#D9CFC0] rounded-md text-[#262626] hover:bg-[#FAF7F2] transition-colors"
              >
                {pawnSkeletonMode ? 'Show Full Army' : 'Pawn Skeleton Only'}
              </button>
            </div>

            <div className="flex justify-center py-2">
              <ChessBoard
                initialFen={currentUnit.initialFen}
                interactive={true}
                pawnSkeletonOnly={pawnSkeletonMode}
                homingSquare="c5"
                size="md"
              />
            </div>
          </div>

          {/* Checkpoint */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-5">
            <div className="border-b border-[#D9CFC0]/60 pb-3">
              <span className="text-xs font-mono uppercase text-[#1E3A2F] tracking-wider block mb-1">
                Checkpoint
              </span>
              <h3 className="font-display text-lg text-[#1E3A2F]">
                {currentUnit.checkpoint.question}
              </h3>
            </div>

            {/* Radio-like options */}
            <div className="space-y-2.5">
              {currentUnit.checkpoint.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                let optClass = 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]';

                if (hasSubmitted) {
                  if (idx === currentUnit.checkpoint.correctIndex) {
                    optClass = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7]';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-[#A8553F]/15 border-[#A8553F] text-[#A8553F]';
                  } else {
                    optClass = 'bg-[#FAF7F2] border-[#D9CFC0]/40 text-[#595959] opacity-60';
                  }
                } else if (isSelected) {
                  optClass = 'bg-[#EDE6D8] border-[#1E3A2F] text-[#1E3A2F] ring-1 ring-[#1E3A2F]';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!hasSubmitted || !isCorrect) {
                        setSelectedAnswer(idx);
                        setHasSubmitted(false);
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-start gap-3 ${optClass}`}
                  >
                    <span className="font-mono text-xs font-bold mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1 leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Checkpoint Submit / Retry */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#595959]">
                Select an answer to complete the checkpoint.
              </span>

              {!hasSubmitted || !isCorrect ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#1E3A2F] text-[#F6F1E7] hover:bg-[#152921] disabled:opacity-40 transition-colors"
                >
                  Confirm Checkpoint
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#1E3A2F] font-semibold">Completed</span>
                  {nextUnit && (
                    <button
                      type="button"
                      onClick={() => onSelectUnit(nextUnit)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C6A664] text-[#1E3A2F] hover:bg-[#DFCA95] transition-colors"
                    >
                      Advance to Next Unit →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Feedback Box */}
            {hasSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                  isCorrect
                    ? 'bg-[#1E3A2F]/10 border-[#1E3A2F] text-[#1E3A2F]'
                    : 'bg-[#A8553F]/10 border-[#A8553F] text-[#A8553F]'
                }`}
              >
                <div className="font-semibold flex items-center gap-1.5">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                      <span>Correct</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-[#A8553F]" />
                      <span>Incorrect — Try again</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{currentUnit.checkpoint.explanation}</p>
                {isCorrect && (
                  <p className="font-medium pt-1 border-t border-[#1E3A2F]/20">
                    Takeaway: {currentUnit.checkpoint.takeaway}
                  </p>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Right Sidebar (3 cols): Persistent Structural Card */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/60 shadow-sm space-y-4 sticky top-24">
            <div className="border-b border-[#D9CFC0]/60 pb-3">
              <span className="text-xs font-mono text-[#C6A664] uppercase tracking-wider block">
                Structure
              </span>
              <h3 className="font-display text-lg text-[#1E3A2F]">
                {associatedStructure.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">One-Sentence Plan:</span>
                <p className="italic text-[#262626] bg-[#EDE6D8]/60 p-2.5 rounded-lg border border-[#D9CFC0]">
                  “{associatedStructure.oneSentencePlan}”
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">Key Breaks:</span>
                <div className="space-y-1 text-[#595959]">
                  <div>White: {associatedStructure.whiteBreaks.join(', ')}</div>
                  <div>Black: {associatedStructure.blackBreaks.join(', ')}</div>
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">Key Outposts:</span>
                <p className="text-[#595959]">{associatedStructure.keyOutposts.join(', ')}</p>
              </div>

              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">Static Weaknesses:</span>
                <p className="text-[#595959]">{associatedStructure.weaknesses.join(', ')}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D9CFC0]/60 text-[11px] text-[#595959] space-y-1">
              <span className="font-semibold text-[#1E3A2F] block">Core Question:</span>
              <p className="italic text-[#262626]">
                What is the structure, what plan belongs to it, and has anything just changed?
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
