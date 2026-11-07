import React, { useState, useEffect } from 'react';
import { CurriculumUnit, UserProgressState } from '../../types/chess';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { PAWN_STRUCTURES } from '../../data/structures';
import { ChessBoard, playWoodenClick, Square } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { BoardToolbar } from '../common/BoardToolbar';
import { LessonHeader } from '../lms/LessonHeader';
import { VisualPlacement } from '../lms/VisualPlacement';
import { LessonCheckpoint } from '../lms/LessonCheckpoint';
import { getVisualPlaceholder } from '../../data/visualPlaceholders';
import {
  BookOpen,
  Target,
  CheckCircle2,
  HelpCircle,
  Dna,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  FileText,
  ChevronDown,
  ChevronUp
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
  const [activeBoardTab, setActiveBoardTab] = useState<'board' | 'structure'>('board');
  const [showChapterOutline, setShowChapterOutline] = useState(false);

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

  // Visual placement info from registry or unit
  const rawPlaceholder = getVisualPlaceholder(currentUnit.unitCode, currentUnit.title);
  const visualInfo = currentUnit.visualPlacement || {
    concept: rawPlaceholder.title,
    description: rawPlaceholder.description,
    plannedAsset: rawPlaceholder.plannedAsset,
    assetStatus: rawPlaceholder.assetStatus || rawPlaceholder.status || 'PLACEHOLDER',
    assetPath: rawPlaceholder.assetPath,
    sourceUrl: rawPlaceholder.sourceUrl,
    license: rawPlaceholder.license,
    attribution: rawPlaceholder.attribution
  };

  // Find parent chapter
  const currentChapter = CURRICULUM_CHAPTERS.find((ch) =>
    ch.units.some((u) => u.id === currentUnit.id)
  );

  // Flatten all units for Prev/Next navigation
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
      
      {/* 1. Header with Breadcrumb, Title, Completion Toggle, and Navigation */}
      <LessonHeader
        currentUnit={currentUnit}
        chapter={currentChapter}
        isCompleted={isAlreadyCompleted}
        onToggleComplete={() => onCompleteUnit(currentUnit.id)}
        prevUnit={prevUnit}
        nextUnit={nextUnit}
        onSelectUnit={onSelectUnit}
        onNavigate={onNavigate}
      />

      {/* 2. Main Two-Column LMS Classroom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Deep Textbook Content & Pedagogical Sequence (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Learning Objectives & Expected Outcome */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9CFC0] shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#D9CFC0]/60 pb-3">
              <Target className="w-4 h-4 text-[#C6A664]" />
              <h2 className="font-display text-sm font-semibold text-[#1E3A2F] uppercase tracking-wide">
                Pedagogical Objectives
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-[#C6A664] block">
                  What You Will Learn
                </span>
                <p className="text-[#262626] font-medium leading-relaxed">
                  {currentUnit.whatToLearn}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 block">
                  Expected Outcome
                </span>
                <p className="text-[#262626] font-medium leading-relaxed">
                  {currentUnit.expectedOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* Card: Core Textbook Doctrine & Concept Explanations */}
          <article className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D9CFC0] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C6A664]" />
                <h2 className="font-display text-base font-semibold text-[#1E3A2F]">
                  Textbook Doctrine & Theory
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#8C7A6B]">
                {currentChapter ? currentChapter.code : 'Unit'} · Lesson {currentUnit.unitCode}
              </span>
            </div>

            {/* Paragraphs from Source of Truth */}
            <div className="space-y-4 text-sm text-[#262626] leading-relaxed font-sans">
              {currentUnit.contentParagraphs && currentUnit.contentParagraphs.length > 0 ? (
                currentUnit.contentParagraphs.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p className="leading-relaxed">
                  {currentUnit.summary}
                </p>
              )}
            </div>

            {/* Visual Placement Area: Required to be placed beside or after concept */}
            <div className="pt-2">
              <VisualPlacement
                placement={visualInfo}
                defaultTitle={currentUnit.title}
              />
            </div>

            {/* Worked Example or Worked Board Position */}
            {currentUnit.workedExample && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#C6A664]/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6D28] font-bold block">
                  Worked Master Example: {currentUnit.workedExample.title}
                </span>
                <p className="text-xs text-[#262626] leading-relaxed font-sans">
                  {currentUnit.workedExample.explanation}
                </p>
              </div>
            )}

            {/* Practical Exercise */}
            {currentUnit.practicalExercise && (
              <div className="p-4 rounded-xl bg-white border border-[#D9CFC0] space-y-2 shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1E3A2F] font-bold block">
                  Practical Board Exercise: {currentUnit.practicalExercise.title}
                </span>
                <p className="text-xs text-[#595959] leading-relaxed font-sans">
                  {currentUnit.practicalExercise.task}
                </p>
                {currentUnit.practicalExercise.solution && (
                  <p className="text-[11px] text-[#8C6D28] font-mono pt-1 border-t border-[#D9CFC0]">
                    Solution: {currentUnit.practicalExercise.solution}
                  </p>
                )}
              </div>
            )}

            {/* Reflection / Diagnostic Error Prompt */}
            {currentUnit.reflectionPrompt && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold block">
                  Cognitive Reflection & Error Radar
                </span>
                <p className="text-xs text-amber-950 leading-relaxed font-sans italic">
                  “{currentUnit.reflectionPrompt}”
                </p>
              </div>
            )}
          </article>

          {/* Card: End-of-Unit Checkpoint */}
          <LessonCheckpoint
            checkpoint={currentUnit.checkpoint}
            unitCode={currentUnit.unitCode}
            isCompleted={isAlreadyCompleted}
            onPassCheckpoint={() => onCompleteUnit(currentUnit.id)}
            onNextLesson={nextUnit ? () => onSelectUnit(nextUnit) : undefined}
            soundEnabled={progress.soundEnabled}
          />

          {/* Quick Chapter Syllabus Collapsible */}
          {currentChapter && (
            <div className="bg-white rounded-2xl p-5 border border-[#D9CFC0] shadow-xs space-y-3">
              <button
                type="button"
                onClick={() => setShowChapterOutline(!showChapterOutline)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C6A664]" />
                  <span className="font-display text-sm font-semibold text-[#1E3A2F]">
                    {currentChapter.code}: {currentChapter.title} ({currentChapter.units.length} Lessons)
                  </span>
                </div>
                {showChapterOutline ? (
                  <ChevronUp className="w-4 h-4 text-[#595959]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#595959]" />
                )}
              </button>

              {showChapterOutline && (
                <div className="pt-2 border-t border-[#D9CFC0]/60 space-y-1">
                  {currentChapter.units.map((u) => {
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
                        className={`w-full text-left p-2.5 rounded-xl transition-all text-xs flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1E3A2F] text-[#F6F1E7] font-semibold'
                            : 'text-[#595959] hover:bg-[#FAF7F2] hover:text-[#262626]'
                        }`}
                      >
                        <span className="truncate pr-2">
                          {u.unitCode}. {u.title}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A664] shrink-0" />
                        ) : (
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isSelected ? 'bg-[#C6A664]' : 'bg-[#D9CFC0]'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Interactive Analysis Chessboard & Structure DNA (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
          
          <div className="bg-white rounded-2xl p-5 border border-[#D9CFC0] shadow-sm space-y-4">
            
            {/* Stage Header & Tabs */}
            <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-bold block">
                  Interactive Board Lab
                </span>
                <h3 className="font-display text-sm font-semibold text-[#1E3A2F]">
                  Analysis & Calculation Stage
                </h3>
              </div>

              <div className="flex bg-[#EDE6D8] p-0.5 rounded-lg border border-[#D9CFC0]">
                <button
                  type="button"
                  onClick={() => setActiveBoardTab('board')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    activeBoardTab === 'board'
                      ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                      : 'text-[#595959] hover:text-[#1E3A2F]'
                  }`}
                >
                  Board
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBoardTab('structure')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    activeBoardTab === 'structure'
                      ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                      : 'text-[#595959] hover:text-[#1E3A2F]'
                  }`}
                >
                  Structure
                </button>
              </div>
            </div>

            {activeBoardTab === 'board' ? (
              <div className="space-y-3">
                {/* Board Component */}
                <div className="flex justify-center">
                  <ChessBoard
                    initialFen={currentFen}
                    interactive={true}
                    onMove={handleBoardMove}
                    pawnSkeletonOnly={pawnSkeletonMode}
                    homingSquare={associatedStructure.keyOutposts[0] || 'c5'}
                    flipped={boardFlipped}
                    size="md"
                  />
                </div>

                {/* Toolbar */}
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
                />

                {/* Annotation help */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0] text-[11px] text-[#595959] space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1E3A2F]">
                    <span>Interactive Features</span>
                    <span className="font-mono text-[10px] text-[#C6A664]">Lichess / Chess.com feel</span>
                  </div>
                  <p>
                    • <strong>Drag & Drop</strong> or click to move pieces.
                  </p>
                  <p>
                    • <strong>Right-click</strong> square to highlight; <strong>right-click drag</strong> to draw arrow.
                  </p>
                  <p>
                    • Automatic pawn promotion modal with Queen, Knight, Rook, Bishop.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-sm text-[#1E3A2F]">
                      {associatedStructure.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#C6A664] border border-[#D9CFC0] font-bold">
                      {associatedStructure.category}
                    </span>
                  </div>
                  <p className="text-[#595959] leading-relaxed">
                    {associatedStructure.notes || associatedStructure.oneSentencePlan}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#D9CFC0] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#C6A664] font-bold block">
                    Pawn Levers & Breaks
                  </span>
                  <div>
                    <strong className="text-[#1E3A2F]">White:</strong>{' '}
                    <span className="text-[#595959]">{associatedStructure.whiteBreaks.join(' · ')}</span>
                  </div>
                  <div>
                    <strong className="text-[#1E3A2F]">Black:</strong>{' '}
                    <span className="text-[#595959]">{associatedStructure.blackBreaks.join(' · ')}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#D9CFC0] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#C6A664] font-bold block">
                    One-Sentence Plan
                  </span>
                  <p className="text-[#1E3A2F] italic font-medium">
                    “{associatedStructure.oneSentencePlan}”
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Next Lesson Fast CTA */}
            {nextUnit && (
              <button
                type="button"
                onClick={() => {
                  onSelectUnit(nextUnit);
                  playWoodenClick(progress.soundEnabled);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Next Lesson: Unit {nextUnit.unitCode}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
