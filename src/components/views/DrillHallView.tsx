import React, { useState, useEffect } from 'react';
import { Flashcard, UserProgressState } from '../../types/chess';
import { DRILL_FLASHCARDS } from '../../data/drills';
import { ChessBoard, playWoodenClick } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { BoardToolbar } from '../common/BoardToolbar';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Timer,
  Flame,
  RotateCcw,
  Play,
  Pause,
  Award
} from 'lucide-react';

interface DrillHallProps {
  progress: UserProgressState;
  onIncrementDrills: () => void;
  onNavigate: (view: NavView) => void;
}

export const DrillHallView: React.FC<DrillHallProps> = ({
  progress,
  onIncrementDrills,
  onNavigate
}) => {
  const allDrills: Flashcard[] = [...DRILL_FLASHCARDS];

  // Dynamically incorporate student's logged error leaks into personal drill review
  progress.loggedGames.forEach((game) => {
    game.errorLeaks.forEach((leak, idx) => {
      allDrills.push({
        id: `custom_leak_${game.id}_${idx}`,
        type: 'custom_leak',
        category: `Diagnostic Leak: ${leak.category}`,
        prompt: `From game "${game.title}" (Move ${leak.moveNumber}): ${leak.category} leak. What is the disciplined correction?`,
        fen: game.fenKeyPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        options: [
          leak.lesson,
          'Ignore the opponent threat and advance a flank pawn',
          'Offer a draw immediately without calculation',
          'Play instinctively without running the V1 scan protocol'
        ],
        solution: leak.lesson,
        explanation: leak.description
      });
    });
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionCompletedCount, setSessionCompletedCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Board toolbar states
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);

  // 15-Minute Training Session Timer (900 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(900);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const categories = [
    { id: 'all', label: 'All Drills' },
    { id: 'structure', label: 'Structures' },
    { id: 'mating_pattern', label: 'Mating Patterns' },
    { id: 'v1_scan', label: 'V1 Scan Protocol' },
    { id: 'path_choice', label: 'Path Switching' },
    { id: 'defense', label: 'Defensive Fortresses' },
    { id: 'custom_leak', label: 'Personal Leaks' }
  ];

  const filteredDrills = allDrills.filter((d) => {
    if (activeCategory === 'all') return true;
    return d.type === activeCategory;
  });

  const activeDrill = filteredDrills[currentIndex % filteredDrills.length] || allDrills[0];

  // Keyboard navigation: 1-4 for options, Space/Enter for Next, Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && activeDrill.options && num <= activeDrill.options.length) {
        handleSelectOption(activeDrill.options[num - 1]);
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (hasEvaluated) {
          e.preventDefault();
          handleNextDrill();
        }
      } else if (e.key === 'ArrowRight') {
        handleNextDrill();
      } else if (e.key === 'ArrowLeft') {
        handlePrevDrill();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDrill, hasEvaluated]);

  const handleSelectOption = (opt: string) => {
    if (hasEvaluated && isCorrect) return;
    setSelectedOption(opt);
    setHasEvaluated(true);
    const correct = opt === activeDrill.solution;
    setIsCorrect(correct);
    playWoodenClick(progress.soundEnabled, correct);

    if (correct) {
      setSessionCompletedCount((c) => c + 1);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      onIncrementDrills();
    } else {
      setCurrentStreak(0);
    }
  };

  const handleNextDrill = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
    setIsCorrect(false);
    setCurrentIndex((prev) => (prev + 1) % filteredDrills.length);
  };

  const handlePrevDrill = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
    setIsCorrect(false);
    setCurrentIndex((prev) => (prev === 0 ? filteredDrills.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      
      {/* Header Banner with Session Stats & Timer */}
      <StudyCard
        kicker="Deliberate Practice · 15-Minute Protocol"
        title="The Drill Hall"
        subtitle="Mating patterns, scanning protocols, structure recognition, path choices, and personal diagnostic error leaks."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* 15-Minute Training Session Timer */}
            <div className="flex items-center gap-2 bg-[#EDE6D8] px-3 py-1.5 rounded-xl border border-[#D9CFC0]">
              <Timer className="w-4 h-4 text-[#1E3A2F]" />
              <span className="font-mono text-xs font-semibold text-[#1E3A2F]">
                {formatTimer(secondsRemaining)}
              </span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 text-[#1E3A2F] hover:text-[#C6A664] transition-colors"
                title={isTimerRunning ? 'Pause timer' : 'Start 15-min drill session'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Streak Counter */}
            {currentStreak > 0 && (
              <div className="flex items-center gap-1.5 bg-[#C6A664]/20 border border-[#C6A664] px-3 py-1.5 rounded-xl text-xs font-mono text-[#1E3A2F] font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>{currentStreak} Streak</span>
              </div>
            )}

            {/* Total Drills Counter */}
            <div className="bg-[#EDE6D8] px-3 py-1.5 rounded-xl border border-[#D9CFC0] text-right">
              <span className="text-[10px] font-mono text-[#595959] uppercase block leading-none">
                Completed
              </span>
              <span className="font-display text-base font-semibold text-[#1E3A2F]">
                {progress.drillsCompletedCount + sessionCompletedCount}
              </span>
            </div>
          </div>
        }
      >
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentIndex(0);
                setSelectedOption(null);
                setHasEvaluated(false);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                  : 'bg-[#EDE6D8] text-[#262626] hover:bg-white border border-[#D9CFC0]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </StudyCard>

      {/* Unified Studio Workstation Frame (Dashboard within Dashboard) */}
      <div className="bg-[#FAF7F2] rounded-2xl border border-[#D9CFC0] shadow-sm overflow-hidden">
        
        {/* Workstation Header Ribbon */}
        <div className="px-5 py-3.5 bg-linear-to-r from-[#1E3A2F] via-[#244336] to-[#1E3A2F] text-[#F6F1E7] flex flex-wrap items-center justify-between gap-3 border-b border-[#C6A664]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/20 border border-[#C6A664]/40 flex items-center justify-center text-[#C6A664]">
              <Flame className="w-4 h-4 text-[#C6A664]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                  Tactile Perception Console
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/30 text-[#DFCA95]">
                  {activeDrill.category}
                </span>
              </div>
              <h2 className="font-display text-sm sm:text-base font-semibold text-[#F6F1E7]">
                Drill Card {(currentIndex % filteredDrills.length) + 1} of {filteredDrills.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#DFCA95]">Shortcuts:</span>
            <span className="bg-black/30 px-2 py-0.5 rounded text-[#F6F1E7] border border-white/10 text-[11px]">
              Keys 1–4 to Answer · Space for Next
            </span>
          </div>
        </div>

        {/* 2-Partition Studio Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D9CFC0]">
          
          {/* Left Partition (5 cols): Analysis Board Stage */}
          <div className="lg:col-span-5 p-5 flex flex-col items-center justify-between space-y-4 bg-white/40">
            <div className="w-full flex items-center justify-between border-b border-[#D9CFC0] pb-2.5">
              <span className="text-xs font-mono uppercase text-[#C6A664] font-semibold">
                Perception Position
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevDrill}
                  title="Previous drill (Left Arrow)"
                  className="p-1 rounded bg-[#EDE6D8] hover:bg-white text-[#1E3A2F] border border-[#D9CFC0]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDrill}
                  title="Next drill (Right Arrow)"
                  className="p-1 rounded bg-[#EDE6D8] hover:bg-white text-[#1E3A2F] border border-[#D9CFC0]"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center py-1">
              <ChessBoard
                initialFen={activeDrill.fen}
                interactive={false}
                size="md"
                homingSquare="c5"
                flipped={boardFlipped}
                pawnSkeletonOnly={pawnSkeletonMode}
              />
            </div>

            <BoardToolbar
              fen={activeDrill.fen}
              flipped={boardFlipped}
              onToggleFlip={() => setBoardFlipped(!boardFlipped)}
              pawnSkeletonOnly={pawnSkeletonMode}
              onTogglePawnSkeleton={() => setPawnSkeletonMode(!pawnSkeletonMode)}
              className="mt-2 max-w-sm"
            />

            <div className="w-full pt-1 flex items-center justify-between text-xs font-mono text-[#595959]">
              <span>Homing Square: c5</span>
              <span>Category: {activeDrill.type}</span>
            </div>
          </div>

          {/* Right Partition (7 cols): Challenge & Response Desk */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4 bg-white/70">
            <div className="space-y-4">
              <div className="border-b border-[#D9CFC0] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block">
                  Perception Challenge
                </span>
                <h3 className="font-display text-base sm:text-lg text-[#1E3A2F] font-semibold leading-snug">
                  {activeDrill.prompt}
                </h3>
              </div>

              {/* Options list with internal scroll */}
              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {activeDrill.options?.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  let btnStyle =
                    'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/60 hover:bg-[#FAF7F2]';

                  if (hasEvaluated) {
                    if (opt === activeDrill.solution) {
                      btnStyle = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7] ring-1 ring-[#C6A664] shadow-xs';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                    } else {
                      btnStyle = 'bg-[#FAF7F2]/60 border-[#D9CFC0]/40 text-[#595959] opacity-50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-[#EDE6D8] border-[#1E3A2F] text-[#1E3A2F]';
                  }

                  return (
                    <button
                      key={`${opt}-${idx}`}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-start gap-3 shadow-xs ${btnStyle}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5 ${
                          hasEvaluated && opt === activeDrill.solution
                            ? 'bg-[#C6A664] text-[#1E3A2F]'
                            : 'bg-[#EDE6D8] text-[#595959]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Feedback */}
              {hasEvaluated && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/80 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1.5 font-display text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Verified Precision</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-700" />
                        <span>Perception Error</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed font-sans">{activeDrill.explanation}</p>
                </div>
              )}
            </div>

            {/* Next Drill Footer */}
            <div className="pt-3 flex items-center justify-between border-t border-[#D9CFC0]">
              <span className="text-[11px] font-mono text-[#595959]">
                Tip: Press <kbd className="px-1.5 py-0.5 bg-[#EDE6D8] rounded border border-[#D9CFC0]">Space</kbd> or <kbd className="px-1.5 py-0.5 bg-[#EDE6D8] rounded border border-[#D9CFC0]">→</kbd> for next
              </span>

              <button
                type="button"
                onClick={handleNextDrill}
                className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Next Drill</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
