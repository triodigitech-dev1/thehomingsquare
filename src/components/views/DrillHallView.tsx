import React, { useState } from 'react';
import { Flashcard, UserProgressState } from '../../types/chess';
import { DRILL_FLASHCARDS } from '../../data/drills';
import { ChessBoard, playWoodenClick } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

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

  progress.loggedGames.forEach((game) => {
    game.errorLeaks.forEach((leak, idx) => {
      allDrills.push({
        id: `custom_leak_${game.id}_${idx}`,
        type: 'custom_leak',
        category: `Logged Leak: ${leak.category}`,
        prompt: `Game: "${game.title}" (Move ${leak.moveNumber}). ${leak.category} leak. What is the correction?`,
        fen: game.fenKeyPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        options: [
          leak.lesson,
          'Ignore the opponent threat and advance a flank pawn',
          'Offer a draw immediately',
          'Play without running the V1 scan'
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

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'structure', label: 'Structures' },
    { id: 'mating_pattern', label: 'Mating Patterns' },
    { id: 'v1_scan', label: 'V1 Scan' },
    { id: 'path_choice', label: 'Path Switching' },
    { id: 'defense', label: 'Defensive Fortresses' },
    { id: 'custom_leak', label: 'Error Queue' }
  ];

  const filteredDrills = allDrills.filter((d) => {
    if (activeCategory === 'all') return true;
    return d.type === activeCategory;
  });

  const activeDrill = filteredDrills[currentIndex % filteredDrills.length] || allDrills[0];

  const handleSelectOption = (opt: string) => {
    if (hasEvaluated && isCorrect) return;
    setSelectedOption(opt);
    setHasEvaluated(true);
    const correct = opt === activeDrill.solution;
    setIsCorrect(correct);
    if (correct) {
      playWoodenClick(progress.soundEnabled);
      setSessionCompletedCount((c) => c + 1);
      onIncrementDrills();
    }
  };

  const handleNextDrill = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
    setIsCorrect(false);
    setCurrentIndex((prev) => (prev + 1) % filteredDrills.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            The Drill Hall
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans">
            Mating patterns, scan drills, structure flashcards, path choices, and error review.
          </p>
        </div>

        {/* Drill Stats Counter */}
        <div className="bg-[#EDE6D8] p-4 rounded-xl border border-[#D9CFC0] text-right shrink-0">
          <div className="text-xs font-mono text-[#595959]">Completed</div>
          <div className="font-display text-2xl text-[#1E3A2F] font-semibold">
            {progress.drillsCompletedCount + sessionCompletedCount}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#D9CFC0]/60 pb-3">
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
                ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                : 'bg-[#EDE6D8] text-[#262626] hover:bg-[#FAF7F2]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Drill Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Board View (6 cols) */}
        <div className="lg:col-span-6 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[#595959] mb-4">
            <span className="uppercase text-[#C6A664] font-semibold">{activeDrill.category}</span>
            <span>
              {(currentIndex % filteredDrills.length) + 1} of {filteredDrills.length}
            </span>
          </div>

          <ChessBoard
            initialFen={activeDrill.fen}
            interactive={false}
            size="md"
            homingSquare="c5"
          />
        </div>

        {/* Challenge & Response (6 cols) */}
        <div className="lg:col-span-6 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
          <h2 className="font-display text-xl sm:text-2xl text-[#1E3A2F] leading-snug">
            {activeDrill.prompt}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {activeDrill.options?.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              let btnStyle = 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]';

              if (hasEvaluated) {
                if (opt === activeDrill.solution) {
                  btnStyle = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7] ring-1 ring-[#C6A664]';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-[#A8553F]/15 border-[#A8553F] text-[#A8553F]';
                } else {
                  btnStyle = 'bg-[#FAF7F2] border-[#D9CFC0]/40 text-[#595959] opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-[#EDE6D8] border-[#1E3A2F] text-[#1E3A2F]';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="font-mono text-xs font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Solution & Explanation */}
          {hasEvaluated && (
            <div
              className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
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
                    <span>Incorrect</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed font-sans">{activeDrill.explanation}</p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-end border-t border-[#D9CFC0]/60">
            <button
              type="button"
              onClick={handleNextDrill}
              className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
