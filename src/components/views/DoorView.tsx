import React, { useState, useEffect } from 'react';
import { ChessBoard, playWoodenClick } from '../board/ChessBoard';
import { PAWN_STRUCTURES } from '../../data/structures';
import { NavView } from '../layout/Header';
import { BoardToolbar } from '../common/BoardToolbar';
import { ArrowRight, CheckCircle2, RotateCcw, Compass, Sparkles } from 'lucide-react';

interface DoorViewProps {
  onNavigate: (view: NavView) => void;
  onSelectStructure?: (structureId: string) => void;
  onOpenAuthModal?: () => void;
  isAuthenticated?: boolean;
}

export const DoorView: React.FC<DoorViewProps> = ({
  onNavigate,
  onSelectStructure,
  onOpenAuthModal,
  isAuthenticated
}) => {
  // 4 curated entrance structures to test perception
  const challengeStructures = [
    {
      id: 'carlsbad',
      label: 'Carlsbad Formation',
      homingSquare: 'c5',
      highlights: ['c6', 'b5', 'd5']
    },
    {
      id: 'iqp',
      label: 'Isolated Queen’s Pawn (IQP)',
      homingSquare: 'd5',
      highlights: ['d4', 'e4', 'c4']
    },
    {
      id: 'hedgehog',
      label: 'The Hedgehog',
      homingSquare: 'e5',
      highlights: ['a6', 'b6', 'd6', 'e6']
    },
    {
      id: 'french_chain',
      label: 'French Advance Chain',
      homingSquare: 'c4',
      highlights: ['e5', 'd4', 'e6', 'd5']
    }
  ];

  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const currentTarget = challengeStructures[activeChallengeIdx];
  const doorStructure = PAWN_STRUCTURES.find((s) => s.id === currentTarget.id) || PAWN_STRUCTURES[0];

  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [pawnSkeletonFilter, setPawnSkeletonFilter] = useState(false);
  const [boardFlipped, setBoardFlipped] = useState(false);

  // Keyboard shortcut support (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= challengeStructures.length) {
        handleSelect(challengeStructures[num - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [challengeStructures, hasRevealed]);

  const handleSelect = (id: string) => {
    if (hasRevealed && selectedGuess === currentTarget.id) return;
    setSelectedGuess(id);
    setHasRevealed(true);
    const isCorrect = id === currentTarget.id;
    playWoodenClick(true, isCorrect);
    if (onSelectStructure) {
      onSelectStructure(currentTarget.id);
    }
  };

  const handleNextChallenge = () => {
    setSelectedGuess(null);
    setHasRevealed(false);
    setActiveChallengeIdx((prev) => (prev + 1) % challengeStructures.length);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F1E7] text-[#262626] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full space-y-7 text-center">
        
        {/* Official Academy Emblem */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-[#C6A664]/30 bg-[#152921] p-1 flex items-center justify-center">
            <img
              src="/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png"
              alt="Golden Chess Academy Crest"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* The One Question */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C7A6B]">
            Entrance Perception Check · Position {activeChallengeIdx + 1} of {challengeStructures.length}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1E3A2F] tracking-tight">
            What structure is this?
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] max-w-md mx-auto font-sans">
            Strip the pieces away to read the terrain. Press 1–4 to answer or use the controls below.
          </p>
        </div>

        {/* The One Chessboard at the Centre */}
        <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full">
          <ChessBoard
            initialFen={doorStructure.sampleFen}
            interactive={false}
            pawnSkeletonOnly={pawnSkeletonFilter}
            homingSquare={currentTarget.homingSquare}
            highlightSquares={currentTarget.highlights}
            flipped={boardFlipped}
            size="lg"
          />

          {/* Interactive Board Toolbar */}
          <BoardToolbar
            fen={doorStructure.sampleFen}
            flipped={boardFlipped}
            onToggleFlip={() => setBoardFlipped(!boardFlipped)}
            pawnSkeletonOnly={pawnSkeletonFilter}
            onTogglePawnSkeleton={() => setPawnSkeletonFilter(!pawnSkeletonFilter)}
            className="mt-2 max-w-sm"
          />
        </div>

        {/* Options (No sign-up required to try) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
          {challengeStructures.map((opt, idx) => {
            const isSelected = selectedGuess === opt.id;
            const isTargetCorrect = opt.id === currentTarget.id;

            let btnStyle =
              'bg-[#FAF7F2] border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/60 hover:bg-white';

            if (hasRevealed) {
              if (isTargetCorrect) {
                btnStyle = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7] ring-1 ring-[#C6A664] shadow-xs';
              } else if (isSelected && !isTargetCorrect) {
                btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
              } else {
                btnStyle = 'bg-[#FAF7F2] border-[#D9CFC0]/40 text-[#595959] opacity-50';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[11px] font-semibold ${
                      hasRevealed && isTargetCorrect
                        ? 'bg-[#C6A664] text-[#1E3A2F]'
                        : 'bg-[#EDE6D8] text-[#595959]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{opt.label}</span>
                </div>
                {hasRevealed && isTargetCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-[#C6A664] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Revealed Structure Summary & Next Challenge */}
        {hasRevealed && (
          <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#D9CFC0] text-sm text-left max-w-lg mx-auto space-y-3 shadow-xs animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#D9CFC0]/50 pb-2">
              <span className="font-display font-semibold text-base text-[#1E3A2F]">
                {doorStructure.name}
              </span>
              <button
                type="button"
                onClick={handleNextChallenge}
                className="flex items-center gap-1.5 text-xs text-[#1E3A2F] hover:text-[#C6A664] font-semibold underline transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Next Structure</span>
              </button>
            </div>

            <p className="text-xs text-[#262626] leading-relaxed font-sans">
              {doorStructure.oneSentencePlan}
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[11px] font-mono text-[#595959]">
                Model: {doorStructure.historicalModel}
              </span>
              <button
                type="button"
                onClick={() => onNavigate('cockpit')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-md font-semibold text-xs hover:bg-[#152921] transition-colors ml-auto shadow-xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#C6A664]" />
                <span>Open in Cockpit</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Ethos & Links */}
        <div className="pt-4 space-y-5">
          <p className="font-display italic text-lg sm:text-xl text-[#1E3A2F]">
            Come back to the board. The board will teach you to come back to life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm font-sans">
            <button
              type="button"
              onClick={() => {
                if (!isAuthenticated && onOpenAuthModal) {
                  onOpenAuthModal();
                } else {
                  onNavigate('cockpit');
                }
              }}
              className="text-[#1E3A2F] font-semibold hover:text-[#C6A664] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A664]" />
              <span>{isAuthenticated ? 'Enter Study Quarters' : 'Enrol as Student'}</span>
            </button>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="text-[#595959] hover:text-[#1E3A2F] transition-colors"
            >
              Curriculum Map
            </button>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('commons')}
              className="text-[#595959] hover:text-[#1E3A2F] transition-colors"
            >
              Study Together & Commons
            </button>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <a
              href="https://discord.gg/PaPmZDUDn"
              target="_blank"
              rel="noreferrer"
              className="text-[#595959] hover:text-[#1E3A2F] transition-colors"
            >
              Discord
            </a>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <a
              href="https://chat.whatsapp.com/LsbsOdGasocLiBFIxM4ZoK"
              target="_blank"
              rel="noreferrer"
              className="text-[#595959] hover:text-[#1E3A2F] transition-colors"
            >
              WhatsApp
            </a>
            <span className="text-[#D9CFC0]" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('workshop')}
              className="text-[#595959] hover:text-[#1E3A2F] transition-colors"
            >
              Instructor Workshop
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
