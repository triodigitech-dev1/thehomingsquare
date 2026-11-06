import React, { useState } from 'react';
import { ChessBoard } from '../board/ChessBoard';
import { PAWN_STRUCTURES } from '../../data/structures';
import { NavView } from '../layout/Header';
import { ArrowRight, BookOpen, Compass, Shield, CheckCircle, Download } from 'lucide-react';

interface DoorViewProps {
  onNavigate: (view: NavView) => void;
  onSelectStructure?: (structureId: string) => void;
}

export const DoorView: React.FC<DoorViewProps> = ({ onNavigate, onSelectStructure }) => {
  // Landing interactive puzzle: "What structure is this?"
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
    <div className="min-h-screen bg-[#F6F1E7] text-[#262626]">
      {/* Editorial Hero Strip */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Subtle Brand Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#595959] uppercase tracking-widest font-sans mb-3">
          <span>A Youngprofessir Project</span>
          <span aria-hidden="true">·</span>
          <span>Structure-First Chess Mastery</span>
        </div>

        {/* Brand Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1E3A2F] tracking-tight leading-tight max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
          Every piece has a home square.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#595959] max-w-2xl mx-auto leading-relaxed font-sans">
          A free chess community and training platform for anyone coming back to the board.
          Name the structure. Write the plan. Log the error. Finish something hard.
        </p>
      </section>

      {/* The Central Table & Board: The Quiet Reading Room */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-16">
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-[#D9CFC0]/60 shadow-lg relative">
          
          {/* Section Kicker */}
          <div className="text-center mb-6">
            <span className="font-display italic text-2xl text-[#1E3A2F] block">
              “What structure is this?”
            </span>
            <span className="text-xs text-[#595959] font-sans mt-1 block">
              No sign-up required. Look at the pawn skeleton and make your read.
            </span>
          </div>

          {/* Chessboard at Center */}
          <div className="flex flex-col items-center justify-center">
            <ChessBoard
              initialFen={doorStructure.sampleFen}
              interactive={false}
              pawnSkeletonOnly={pawnSkeletonFilter}
              homingSquare="c5"
              highlightSquares={['c6', 'b5', 'd5']}
              size="lg"
            />

            {/* Toggle Pawn Skeleton View */}
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPawnSkeletonFilter(!pawnSkeletonFilter)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                  pawnSkeletonFilter
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]'
                    : 'bg-[#EDE6D8] text-[#262626] border-[#D9CFC0] hover:bg-[#E2DACB]'
                }`}
              >
                {pawnSkeletonFilter ? 'Show Full Army' : 'Mentally Strip Pieces (Pawn Skeleton Only)'}
              </button>
            </div>
          </div>

          {/* Multiple Choice Guess Options */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guessOptions.map((opt) => {
                const isSelected = selectedGuess === opt.id;
                let btnStyle = 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50';
                if (hasRevealed) {
                  if (opt.correct) {
                    btnStyle = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7] ring-2 ring-[#C6A664]';
                  } else if (isSelected && !opt.correct) {
                    btnStyle = 'bg-[#A8553F]/10 border-[#A8553F] text-[#A8553F]';
                  } else {
                    btnStyle = 'bg-[#FAF7F2] border-[#D9CFC0]/50 text-[#595959] opacity-60';
                  }
                }
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className={`p-3.5 rounded-lg border text-sm font-medium text-left transition-all ${btnStyle}`}
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

            {/* Revealed Insight Box */}
            {hasRevealed && (
              <div className="mt-6 p-5 bg-[#EDE6D8]/60 rounded-xl border border-[#D9CFC0] text-sm space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-[#1E3A2F] text-base">
                    Carlsbad Formation (White minority attack)
                  </span>
                  <span className="text-xs font-mono text-[#595959]">Chapter 2.1 & 4.2</span>
                </div>
                <p className="text-[#262626] leading-relaxed font-sans">
                  <strong>The One-Sentence Plan:</strong> {doorStructure.oneSentencePlan}
                </p>
                <div className="text-xs text-[#595959] pt-1 border-t border-[#D9CFC0]/60 flex items-center justify-between">
                  <span>White Break: b4-b5 · Black Break: ...e5 / ...c5</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('lesson')}
                    className="text-[#1E3A2F] font-semibold hover:underline"
                  >
                    Study this in Lesson Room →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* The Single Line Beneath */}
          <div className="mt-10 pt-8 border-t border-[#D9CFC0]/60 text-center">
            <p className="font-display italic text-lg sm:text-xl text-[#1E3A2F] max-w-xl mx-auto">
              “Come back to the board. The board will teach you to come back to life.”
            </p>

            {/* The Three Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-sans">
              <button
                type="button"
                onClick={() => onNavigate('cockpit')}
                className="px-5 py-2.5 rounded-lg bg-[#1E3A2F] text-[#F6F1E7] hover:bg-[#152921] font-medium transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4 text-[#C6A664]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('map')}
                className="px-5 py-2.5 rounded-lg bg-white border border-[#D9CFC0] text-[#1E3A2F] hover:bg-[#EDE6D8] font-medium transition-colors"
              >
                See the Journey
              </button>

              <button
                type="button"
                onClick={() => onNavigate('workshop')}
                className="px-5 py-2.5 rounded-lg text-[#595959] hover:text-[#1E3A2F] font-medium transition-colors"
              >
                For Coaches & Institutions
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* The 5 Non-Negotiables & Methodology Strip */}
      <section className="py-14 bg-[#1E3A2F] text-[#F6F1E7] border-t border-[#C6A664]/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C6A664] block mb-2">
              The Code of The Homing Square
            </span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[#F6F1E7]">
              The Non-Negotiables (Printed on the Wall)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
            {[
              {
                num: '01',
                title: 'Free for the learner, forever.',
                desc: 'Revenue comes from institutions and coaches. The door never charges the individual.'
              },
              {
                num: '02',
                title: 'Mastery demonstrated, not declared.',
                desc: 'Graduation demands 10 serious logged games, 5 audited phases, and peer review.'
              },
              {
                num: '03',
                title: 'No data monetisation or borrowed labels.',
                desc: 'The platform invites; it does not diagnose or sell your attention.'
              },
              {
                num: '04',
                title: 'No leaderboards of wins.',
                desc: 'Rewards are for discipline — structures named, errors logged, checkpoints finished.'
              },
              {
                num: '05',
                title: 'The door is open to everyone.',
                desc: 'Universal eligibility, specific design. Every piece has a home square.'
              }
            ].map((item) => (
              <div key={item.num} className="border border-[#C6A664]/20 rounded-xl p-5 bg-[#152921]/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#C6A664] block mb-2">{item.num}</span>
                  <h3 className="font-display text-base font-semibold text-[#F6F1E7] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#D9CFC0] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Curriculum Guide Download CTA */}
          <div className="mt-12 pt-8 border-t border-[#C6A664]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9CFC0]">
            <div>
              <span className="text-[#F6F1E7] font-semibold text-sm block">Complete Course Work Contents Guide (Final Enriched Edition)</span>
              <span>Elo 1000–2700+ lifespan curriculum with Prerequisite + 8 Main Chapters + Capstone.</span>
            </div>
            <a
              href="/assets/aistudio/Structure_First_Chess_Mastery_31a83b4c.pdf"
              download="Structure_First_Chess_Mastery_Guide.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] font-semibold transition-colors flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Curriculum PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* The Founding Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center font-sans text-sm text-[#595959] leading-relaxed">
        <div className="w-12 h-0.5 bg-[#C6A664] mx-auto mb-6" />
        <p className="font-display text-xl sm:text-2xl text-[#1E3A2F] italic mb-4 leading-normal">
          “Youngprofessir builds free chess communities for people coming back — because all of us are runaways at some point, and the way home is already in us.”
        </p>
        <p className="max-w-xl mx-auto text-xs text-[#595959]">
          Paper and lamplight, a lit square, and a quiet invitation home.
          If Chess.com is a stadium and Lichess is a library, The Homing Square is a well-kept reading room with a board on the table.
        </p>
      </section>
    </div>
  );
};
