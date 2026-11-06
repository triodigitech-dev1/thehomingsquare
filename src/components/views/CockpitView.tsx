import React from 'react';
import { UserProgressState, ConversionPath } from '../../types/chess';
import { PAWN_STRUCTURES, CONVERSION_PATHS, ERROR_CATEGORIES } from '../../data/structures';
import { ChessBoard } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { CheckCircle2, Circle, ArrowUpRight, Compass, Target, Shield, BookOpen } from 'lucide-react';

interface CockpitViewProps {
  progress: UserProgressState;
  onUpdateTasks: (taskId: string) => void;
  onSetPath: (path: ConversionPath) => void;
  onNavigate: (view: NavView) => void;
  onSelectStructure: (structId: string) => void;
}

export const CockpitView: React.FC<CockpitViewProps> = ({
  progress,
  onUpdateTasks,
  onSetPath,
  onNavigate,
  onSelectStructure
}) => {
  const currentStructure =
    PAWN_STRUCTURES.find((s) => s.id === progress.currentStructureId) || PAWN_STRUCTURES[0];
  const activePathObj =
    CONVERSION_PATHS.find((p) => p.path === progress.activePath) || CONVERSION_PATHS[1];

  // Calculate error category distribution from logged games
  const errorStats: Record<string, number> = {
    Perception: 0,
    Visualisation: 0,
    Knowledge: 0,
    Decision: 0
  };

  progress.loggedGames.forEach((game) => {
    game.errorLeaks.forEach((leak) => {
      if (errorStats[leak.category] !== undefined) {
        errorStats[leak.category] += 1;
      }
    });
  });

  const totalErrors = Object.values(errorStats).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* State Board Top Header */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#595959] tracking-wider mb-1">
            <span>The Cockpit · Active State Board</span>
            <span aria-hidden="true">·</span>
            <span>{progress.studentName || 'Homecomer'}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            Where am I, and what is the next move?
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans">
            A quiet state board of your current work. No vanity ratings, no flashing coins. Only clarity.
          </p>
        </div>

        {/* Live Path Indicator Button Group */}
        <div className="bg-[#EDE6D8] p-1.5 rounded-xl flex items-center gap-1 border border-[#D9CFC0]">
          {(['B', 'A', 'C'] as ConversionPath[]).map((pCode) => {
            const isActive = progress.activePath === pCode;
            const labels = {
              B: 'Build (Path B)',
              A: 'Hunt (Path A)',
              C: 'Convert (Path C)'
            };
            return (
              <button
                key={pCode}
                type="button"
                onClick={() => onSetPath(pCode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-sm font-semibold'
                    : 'text-[#262626] hover:bg-[#FAF7F2]'
                }`}
              >
                {labels[pCode]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Structure + Plan on Left, Live Path + Tasks on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): The Structure & Plan */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-4">
            <div>
              <span className="text-xs font-mono text-[#C6A664] uppercase tracking-wider block">
                Current Structural Assignment
              </span>
              <h2 className="font-display text-xl sm:text-2xl text-[#1E3A2F]">
                {currentStructure.name}
              </h2>
            </div>
            {/* Quick structure switcher */}
            <select
              value={currentStructure.id}
              onChange={(e) => onSelectStructure(e.target.value)}
              className="text-xs bg-white border border-[#D9CFC0] rounded-md px-3 py-1.5 text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
            >
              {PAWN_STRUCTURES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Board Center with Sample Position */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <ChessBoard
              initialFen={currentStructure.sampleFen}
              interactive={false}
              size="sm"
              homingSquare="c5"
              highlightSquares={['c6', 'b5', 'd5']}
            />

            <div className="space-y-4 text-xs font-sans max-w-xs">
              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">Pawn Skeleton:</span>
                <span className="font-mono text-[#595959] block">
                  White: {currentStructure.whitePawnSkeleton.slice(0, 4).join(', ')}...
                </span>
                <span className="font-mono text-[#595959] block">
                  Black: {currentStructure.blackPawnSkeleton.slice(0, 4).join(', ')}...
                </span>
              </div>

              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">Key Breaks:</span>
                <span className="text-[#595959] block">White: {currentStructure.whiteBreaks.join(' · ')}</span>
                <span className="text-[#595959] block">Black: {currentStructure.blackBreaks.join(' · ')}</span>
              </div>

              <div>
                <span className="font-semibold text-[#1E3A2F] block mb-1">Historical Model:</span>
                <span className="text-[#595959] italic block">{currentStructure.historicalModel}</span>
              </div>
            </div>
          </div>

          {/* Persistent One-Sentence Plan Box */}
          <div className="p-4 bg-[#EDE6D8]/70 rounded-xl border border-[#D9CFC0] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-[#595959]">
              <span>M1 Checkpoint · One-Sentence Plan</span>
              <span className="text-[#1E3A2F] font-semibold">Active Directive</span>
            </div>
            <p className="font-display italic text-base sm:text-lg text-[#1E3A2F] leading-snug">
              “{currentStructure.oneSentencePlan}”
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#595959]">
            <span>Universal Loop: After every major trade or break, re-run M1.</span>
            <button
              type="button"
              onClick={() => onNavigate('lesson')}
              className="text-[#1E3A2F] font-medium hover:underline flex items-center gap-1"
            >
              <span>Go to Lesson Room</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Live Path Details, 3 Bounded Tasks & Error Heat Map */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Active Conversion Path Details */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C6A664]">
                Active Operational Gear
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#1E3A2F] text-[#F6F1E7] font-mono">
                Path {activePathObj.path}
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg text-[#1E3A2F] font-semibold">
                {activePathObj.name}
              </h3>
              <p className="text-xs text-[#595959] mt-1 leading-relaxed font-sans">
                {activePathObj.condition}
              </p>
            </div>

            <div className="pt-2 border-t border-[#D9CFC0]/60 space-y-1.5">
              <span className="text-[11px] font-semibold text-[#1E3A2F] uppercase tracking-wide block">
                Operational Rules:
              </span>
              <ul className="text-xs text-[#595959] space-y-1 font-sans">
                {activePathObj.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#C6A664] font-bold">›</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Today's Three Bounded Tasks */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-[#1E3A2F]">
                Today’s 3 Bounded Tasks
              </h3>
              <span className="text-xs font-mono text-[#595959]">
                {progress.dailyTasks.filter((t) => t.completed).length} / 3 Finished
              </span>
            </div>

            <div className="space-y-2.5">
              {progress.dailyTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => onUpdateTasks(task.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    task.completed
                      ? 'bg-[#EDE6D8]/50 border-[#D9CFC0] text-[#595959]'
                      : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#D9CFC0]" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-sans leading-snug ${
                      task.completed ? 'line-through text-[#595959]' : 'font-medium'
                    }`}
                  >
                    {task.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#595959]">
              <span>Small sessions. No marathon burnout.</span>
              <button
                type="button"
                onClick={() => onNavigate('drills')}
                className="text-[#1E3A2F] font-medium hover:underline"
              >
                Open Drill Hall →
              </button>
            </div>
          </div>

          {/* Error Leaks Heat Map */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-[#1E3A2F]">
                Diagnostic Leaks (From The Log)
              </h3>
              <span className="text-xs font-mono text-[#595959]">{totalErrors} Logged Leaks</span>
            </div>

            <div className="space-y-3">
              {ERROR_CATEGORIES.map((cat) => {
                const count = errorStats[cat.category] || 0;
                const pct = totalErrors > 0 ? Math.round((count / totalErrors) * 100) : 0;
                return (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#262626]">{cat.label}</span>
                      <span className="font-mono text-[#595959]">{count} ({pct}%)</span>
                    </div>
                    {/* Quiet progress bar */}
                    <div className="w-full h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#A8553F] rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between text-xs text-[#595959]">
              <span>Every leak converts to a flashcard.</span>
              <button
                type="button"
                onClick={() => onNavigate('log')}
                className="text-[#1E3A2F] font-semibold hover:underline"
              >
                View Full Log →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Pre-Game Protocol & Scan Engine Strip */}
      <div className="p-6 bg-[#1E3A2F] text-[#F6F1E7] rounded-2xl border border-[#C6A664]/30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C6A664] uppercase tracking-wider">
              <span>Appendix · In-Game Scan Execution</span>
            </div>
            <h4 className="font-display text-lg text-[#F6F1E7]">
              The V1 Scan Order: Checks → Captures → Threats → Loose Pieces → King Safety
            </h4>
            <p className="text-xs text-[#D9CFC0] max-w-2xl font-sans">
              Before calculating your attacking candidate moves, enforce the V1 perimeter scan on both sides.
              Then re-run M1 after every trade or break.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('drills')}
            className="px-4 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] font-semibold text-xs rounded-lg transition-colors shrink-0"
          >
            Launch 15-Min Scan Drill
          </button>
        </div>
      </div>
    </div>
  );
};
