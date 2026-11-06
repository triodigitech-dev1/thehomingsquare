import React, { useState } from 'react';
import { ChessBoard } from '../board/ChessBoard';
import { PAWN_STRUCTURES } from '../../data/structures';
import { NavView } from '../layout/Header';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface DoorViewProps {
  onNavigate: (view: NavView) => void;
  onSelectStructure?: (structureId: string) => void;
}

export const DoorView: React.FC<DoorViewProps> = ({ onNavigate, onSelectStructure }) => {
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [pawnSkeletonFilter, setPawnSkeletonFilter] = useState(false);

  // The door position: Carlsbad Formation
  const doorStructure = PAWN_STRUCTURES.find((s) => s.id === 'carlsbad')!;
  const guessOptions = [
    { id: 'carlsbad', label: 'Carlsbad Formation', correct: true },
    { id: 'iqp', label: 'Isolated Queen’s Pawn (IQP)', correct: false },
    { id: 'hedgehog', label: 'The Hedgehog', correct: false },
    { id: 'french_chain', label: 'French Advance Chain', correct: false }
  ];

  const handleSelect = (id: string) => {
    setSelectedGuess(id);
    setHasRevealed(true);
    if (onSelectStructure) {
      onSelectStructure('carlsbad');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F1E7] text-[#262626] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full space-y-8 text-center">
        
        {/* The One Question */}
        <div className="space-y-1">
          <h1 className="font-display text-3xl sm:text-4xl text-[#1E3A2F]">
            What structure is this?
          </h1>
        </div>

        {/* The One Chessboard at the Centre */}
        <div className="flex flex-col items-center justify-center">
          <ChessBoard
            initialFen={doorStructure.sampleFen}
            interactive={false}
            pawnSkeletonOnly={pawnSkeletonFilter}
            homingSquare="c5"
            highlightSquares={['c6', 'b5', 'd5']}
            size="lg"
          />

          <div className="mt-3">
            <button
              type="button"
              onClick={() => setPawnSkeletonFilter(!pawnSkeletonFilter)}
              className="text-xs text-[#595959] hover:text-[#1E3A2F] underline transition-colors"
            >
              {pawnSkeletonFilter ? 'Show all pieces' : 'Pawn skeleton only'}
            </button>
          </div>
        </div>

        {/* Options (No sign-up required to try) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
          {guessOptions.map((opt) => {
            const isSelected = selectedGuess === opt.id;
            let btnStyle = 'bg-[#FAF7F2] border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50';
            if (hasRevealed) {
              if (opt.correct) {
                btnStyle = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7] ring-1 ring-[#C6A664]';
              } else if (isSelected && !opt.correct) {
                btnStyle = 'bg-[#A8553F]/10 border-[#A8553F] text-[#A8553F]';
              } else {
                btnStyle = 'bg-[#FAF7F2] border-[#D9CFC0]/40 text-[#595959] opacity-50';
              }
            }
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${btnStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  {hasRevealed && opt.correct && (
                    <CheckCircle className="w-4 h-4 text-[#C6A664]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Revealed Structure Summary */}
        {hasRevealed && (
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D9CFC0] text-sm text-left max-w-lg mx-auto space-y-1.5 animate-fadeIn">
            <div className="font-semibold text-[#1E3A2F]">Carlsbad Formation</div>
            <p className="text-xs text-[#262626] leading-relaxed">
              {doorStructure.oneSentencePlan}
            </p>
          </div>
        )}

        {/* The Single Line Beneath */}
        <div className="pt-4 space-y-6">
          <p className="font-display italic text-lg sm:text-xl text-[#1E3A2F]">
            Come back to the board. The board will teach you to come back to life.
          </p>

          {/* Three Links */}
          <div className="flex items-center justify-center gap-6 text-sm font-sans">
            <button
              type="button"
              onClick={() => onNavigate('cockpit')}
              className="text-[#1E3A2F] font-semibold hover:underline"
            >
              Start free
            </button>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="text-[#595959] hover:text-[#1E3A2F] hover:underline"
            >
              See the journey
            </button>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('workshop')}
              className="text-[#595959] hover:text-[#1E3A2F] hover:underline"
            >
              For coaches and institutions
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
