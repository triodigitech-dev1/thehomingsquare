import React, { useState } from 'react';
import { PAWN_STRUCTURES } from '../../data/structures';
import { NavView } from '../layout/Header';
import { MessageSquare, Users, Sparkles, ExternalLink, Hash, ArrowRight } from 'lucide-react';

interface CommonsViewProps {
  onNavigate: (view: NavView) => void;
  onSelectStructure: (structId: string) => void;
}

export const CommonsView: React.FC<CommonsViewProps> = ({ onNavigate, onSelectStructure }) => {
  const [selectedCircle, setSelectedCircle] = useState<string>('carlsbad');

  const circles = [
    {
      id: 'carlsbad',
      title: 'Carlsbad Study Circle',
      members: 142,
      lastPost: '2 hours ago',
      activeTopic: 'Minority attack timing: when is a4-b4-b5 better than Rab1-b4?',
      excerpt: 'Homecomers discussing the difference between Botvinnik’s setup with Nge2 and Kasparov’s active f3 push.'
    },
    {
      id: 'iqp',
      title: 'IQP & Dynamic Centre Hub',
      members: 98,
      lastPost: '4 hours ago',
      activeTopic: 'Holding the d5 blockade vs. allowing d5 breakthrough',
      excerpt: 'Focus on Nimzowitsch blockading technique with knights on d5.'
    },
    {
      id: 'hedgehog',
      title: 'The Hedgehog Collective',
      members: 86,
      lastPost: 'Yesterday',
      activeTopic: 'Patience behind the 6th-rank spines',
      excerpt: 'Review of Ljubojevic vs. Miles model game: waiting for White to overextend.'
    },
    {
      id: 'kid_locked',
      title: 'King’s Indian Den',
      members: 115,
      lastPost: '3 hours ago',
      activeTopic: 'Surviving White’s queenside breach while rolling ...f4-...g5',
      excerpt: 'Evaluating whether the king should stay on g8 or tuck into h8.'
    },
    {
      id: 'french_chain',
      title: 'French & Caro-Kann Chain Forum',
      members: 74,
      lastPost: '1 day ago',
      activeTopic: 'Attacking the base at d4 vs. chipping the head at e5',
      excerpt: 'Practical examples from Nimzowitsch vs. Salwe.'
    },
    {
      id: 'endgames',
      title: 'Endgame Sanctuary (Unit 4.3 & 5.2)',
      members: 160,
      lastPost: '30 mins ago',
      activeTopic: 'Philidor 6th-rank cutoff vs. Lucena bridge building',
      excerpt: 'Why students rush king moves instead of setting the horizontal barrier.'
    }
  ];

  const currentCircle = circles.find((c) => c.id === selectedCircle) || circles[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Commons Hero Header */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            The Commons
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans max-w-2xl">
            Study circles organized by pawn structure, and cohort discussion on Discord.
          </p>
        </div>

        {/* Discord Link */}
        <div className="bg-[#1E3A2F] text-[#F6F1E7] p-5 rounded-2xl border border-[#C6A664]/30 shadow-md flex flex-col items-start gap-2 shrink-0">
          <span className="text-[11px] font-mono text-[#C6A664] uppercase tracking-wider">
            Open Campfire
          </span>
          <span className="font-display text-base font-semibold">
            Join The Homing Discord
          </span>
          <span className="text-xs text-[#D9CFC0] max-w-xs">
            Free and open. Quiet voice channels, structure rooms, and cohort study circles.
          </span>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="mt-2 px-4 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Enter Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Structure Circles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Circles Directory (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/60 shadow-sm space-y-3">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider">
              Structure Study Circles
            </span>
            <span className="text-xs text-[#595959] font-mono">6 Active</span>
          </div>

          <div className="space-y-2">
            {circles.map((circle) => {
              const isSelected = circle.id === selectedCircle;
              return (
                <button
                  key={circle.id}
                  type="button"
                  onClick={() => setSelectedCircle(circle.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]'
                      : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isSelected ? 'text-[#C6A664]' : 'text-[#595959]'}>
                      {circle.members} Homecomers
                    </span>
                    <span className={isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'}>
                      {circle.lastPost}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold leading-snug">
                    {circle.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 truncate ${
                      isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'
                    }`}
                  >
                    {circle.activeTopic}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Circle Active Discussion Thread (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
          <div className="border-b border-[#D9CFC0]/60 pb-4">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block mb-1">
              Live Structure Room
            </span>
            <h2 className="font-display text-2xl text-[#1E3A2F]">
              {currentCircle.title}
            </h2>
            <p className="text-xs text-[#595959] mt-1 font-sans">
              Pinned discussion topic: <strong className="text-[#262626]">{currentCircle.activeTopic}</strong>
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#595959]">
              <span className="font-semibold text-[#1E3A2F]">Cohort 01 Moderator Note</span>
              <span className="font-mono">Yesterday at 19:40</span>
            </div>
            <p className="text-xs sm:text-sm text-[#262626] leading-relaxed font-sans">
              {currentCircle.excerpt}
            </p>
            <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between text-xs text-[#595959]">
              <span>Grounded in Chapter 4.2 Structural Packages</span>
              <button
                type="button"
                onClick={() => {
                  onSelectStructure(currentCircle.id);
                  onNavigate('lesson');
                }}
                className="text-[#1E3A2F] font-semibold hover:underline"
              >
                Open in Lesson Room →
              </button>
            </div>
          </div>


          {/* Study Partner Matchmaker Strip */}
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5">
              <span className="font-semibold text-[#1E3A2F] block">Need a Study Partner for the Gauntlet?</span>
              <span className="text-[#595959]">Review each other’s 10 game logs against the 5-phase rubric.</span>
            </div>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg text-xs font-semibold hover:bg-[#152921] transition-colors shrink-0"
            >
              Find a Partner
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
