import React, { useState } from 'react';
import { UserProgressState, ConversionPath } from '../../types/chess';
import { PAWN_STRUCTURES, CONVERSION_PATHS, ERROR_CATEGORIES } from '../../data/structures';
import { ChessBoard, playWoodenClick, playChimeSound } from '../board/ChessBoard';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { BoardToolbar } from '../common/BoardToolbar';
import { ScholarGamificationCard } from '../common/ScholarGamificationCard';
import {
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Plus,
  Sparkles,
  Compass,
  Layers,
  FileText,
  Shield,
  Edit3,
  Check,
  TrendingDown,
  Wrench,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface CockpitViewProps {
  progress: UserProgressState;
  onUpdateTasks: (taskId: string) => void;
  onSetPath: (path: ConversionPath) => void;
  onNavigate: (view: NavView) => void;
  onSelectStructure: (structId: string) => void;
  onToggleSound?: () => void;
  onUpdatePlan?: (newPlan: string) => void;
}

export const CockpitView: React.FC<CockpitViewProps> = ({
  progress,
  onUpdateTasks,
  onSetPath,
  onNavigate,
  onSelectStructure,
  onToggleSound,
  onUpdatePlan
}) => {
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeRightTab, setActiveRightTab] = useState<'tasks' | 'paths' | 'leaks'>('tasks');
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [planDraft, setPlanDraft] = useState(progress.oneSentencePlan);
  const [customTaskText, setCustomTaskText] = useState('');

  const currentStructure =
    PAWN_STRUCTURES.find((s) => s.id === progress.currentStructureId) || PAWN_STRUCTURES[0];
  const activePathObj =
    CONVERSION_PATHS.find((p) => p.path === progress.activePath) || CONVERSION_PATHS[1];

  const categories = ['All', 'Classical', 'Indian', 'Sicilian', 'French/Caro', 'Flank'];

  const filteredStructures = PAWN_STRUCTURES.filter((s) => {
    if (categoryFilter === 'All') return true;
    return s.category === categoryFilter;
  });

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
  const completedTasksCount = progress.dailyTasks.filter((t) => t.completed).length;
  const tasksPercent = Math.round((completedTasksCount / Math.max(1, progress.dailyTasks.length)) * 100);

  const handleTaskClick = (taskId: string) => {
    playWoodenClick(progress.soundEnabled);
    onUpdateTasks(taskId);
  };

  const handlePathSwitch = (pCode: ConversionPath) => {
    playWoodenClick(progress.soundEnabled);
    onSetPath(pCode);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planDraft.trim()) return;
    if (onUpdatePlan) {
      onUpdatePlan(planDraft.trim());
    } else {
      progress.oneSentencePlan = planDraft.trim();
    }
    setIsEditingPlan(false);
    playChimeSound(progress.soundEnabled);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Top Banner: Dual-Persona Switcher & Mode Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-[#D9CFC0] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] text-[#C6A664] flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                Scholar State Board
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Student View
              </span>
            </div>
            <h1 className="font-display text-lg font-semibold text-[#1E3A2F] leading-tight">
              The Cockpit — Personal Regimen & Board State
            </h1>
          </div>
        </div>

        {/* Quick Link to Instructor Workshop */}
        <button
          type="button"
          onClick={() => onNavigate('workshop')}
          className="px-3.5 py-1.5 rounded-lg border border-[#D9CFC0] bg-[#FAF7F2] hover:bg-[#EDE6D8] text-xs font-semibold text-[#1E3A2F] transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <Wrench className="w-3.5 h-3.5 text-[#C6A664]" />
          <span>Switch to Instructor Console</span>
          <ArrowRight className="w-3 h-3 text-[#595959]" />
        </button>
      </div>

      {/* Scholar Gamification & Standing Banner */}
      <ScholarGamificationCard
        progress={progress}
        onToggleSound={onToggleSound}
        onOpenPassport={() => onNavigate('passport')}
      />

      {/* Main Screen Partition: Left (Board & Structure Console) vs Right (Operations Desk) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PARTITION (7 cols): Board, Pawn Skeleton & Structural Levers */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#D9CFC0]/70 shadow-sm space-y-5">
            
            {/* Structure Category Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9CFC0]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-[#C6A664] font-semibold">
                  Structure:
                </span>
                <select
                  value={currentStructure.id}
                  onChange={(e) => {
                    onSelectStructure(e.target.value);
                    setPlanDraft(PAWN_STRUCTURES.find((s) => s.id === e.target.value)?.oneSentencePlan || '');
                    playWoodenClick(progress.soundEnabled);
                  }}
                  className="text-xs font-semibold bg-white border border-[#D9CFC0] rounded-lg px-2.5 py-1 text-[#1E3A2F] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] shadow-xs cursor-pointer"
                >
                  {filteredStructures.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(cat);
                      playWoodenClick(progress.soundEnabled);
                    }}
                    className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                      categoryFilter === cat
                        ? 'bg-[#1E3A2F] text-[#F6F1E7] font-semibold'
                        : 'bg-[#EDE6D8] text-[#595959] hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Chess Board with Homing Square and Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <ChessBoard
                  initialFen={currentStructure.sampleFen}
                  interactive={false}
                  size="sm"
                  homingSquare="c5"
                  highlightSquares={['c6', 'b5', 'd5']}
                  flipped={boardFlipped}
                  pawnSkeletonOnly={pawnSkeletonMode}
                />

                <BoardToolbar
                  fen={currentStructure.sampleFen}
                  flipped={boardFlipped}
                  onToggleFlip={() => setBoardFlipped(!boardFlipped)}
                  pawnSkeletonOnly={pawnSkeletonMode}
                  onTogglePawnSkeleton={() => setPawnSkeletonMode(!pawnSkeletonMode)}
                  className="mt-2 max-w-[280px]"
                />
              </div>

              {/* Structure Spec Card */}
              <div className="space-y-3 text-xs font-sans max-w-xs w-full">
                <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-1 shadow-xs">
                  <span className="font-semibold text-[#1E3A2F] block font-display">
                    Skeleton Coordinates
                  </span>
                  <div className="font-mono text-[11px] text-[#595959]">
                    <span className="font-semibold text-[#1E3A2F]">White:</span> {currentStructure.whitePawnSkeleton.slice(0, 4).join(', ')}...
                  </div>
                  <div className="font-mono text-[11px] text-[#595959]">
                    <span className="font-semibold text-[#1E3A2F]">Black:</span> {currentStructure.blackPawnSkeleton.slice(0, 4).join(', ')}...
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-1 shadow-xs">
                  <span className="font-semibold text-[#1E3A2F] block font-display">
                    Pawn Levers & Breaks
                  </span>
                  <div className="text-[11px] text-[#595959]">
                    <strong>White:</strong> {currentStructure.whiteBreaks.join(' · ')}
                  </div>
                  <div className="text-[11px] text-[#595959]">
                    <strong>Black:</strong> {currentStructure.blackBreaks.join(' · ')}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-1 shadow-xs">
                  <span className="font-semibold text-[#1E3A2F] block font-display">
                    Key Outposts
                  </span>
                  <div className="text-[11px] font-mono text-[#C6A664] font-semibold">
                    {currentStructure.keyOutposts.join(' · ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Editable One-Sentence Plan Box */}
            <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                  Move 12 Structural Plan
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingPlan(!isEditingPlan)}
                  className="text-xs text-[#1E3A2F] hover:text-[#C6A664] font-medium flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingPlan ? 'Cancel' : 'Edit Plan'}</span>
                </button>
              </div>

              {isEditingPlan ? (
                <form onSubmit={handleSavePlan} className="space-y-2">
                  <textarea
                    value={planDraft}
                    onChange={(e) => setPlanDraft(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#1E3A2F] rounded-lg text-[#1E3A2F] font-sans focus:outline-none"
                    placeholder="Enter your one-sentence plan for this structure..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#1E3A2F] text-[#F6F1E7] rounded-md text-xs font-semibold hover:bg-[#152921] flex items-center gap-1 shadow-xs"
                    >
                      <Check className="w-3 h-3 text-[#C6A664]" />
                      <span>Commit Plan</span>
                    </button>
                  </div>
                </form>
              ) : (
                <p className="font-display italic text-sm sm:text-base text-[#1E3A2F] leading-snug">
                  “{progress.oneSentencePlan || currentStructure.oneSentencePlan}”
                </p>
              )}
            </div>

            {/* Historical Model Game Link */}
            <div className="flex items-center justify-between pt-2 border-t border-[#D9CFC0]/60 text-xs">
              <span className="font-mono text-[11px] text-[#595959]">
                Model Game: <strong>{currentStructure.historicalModel}</strong>
              </span>

              <button
                type="button"
                onClick={() => onNavigate('lesson')}
                className="text-[#1E3A2F] hover:text-[#C6A664] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Open in Classroom</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT PARTITION (5 cols): Tabbed Bounded Operations Desk */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/70 shadow-sm space-y-4">
            
            {/* Desk Tabs Switcher */}
            <div className="flex bg-[#EDE6D8] p-1 rounded-xl border border-[#D9CFC0]">
              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('tasks');
                  playWoodenClick(progress.soundEnabled);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeRightTab === 'tasks'
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                    : 'text-[#595959] hover:text-[#1E3A2F]'
                }`}
              >
                Daily Regimen ({completedTasksCount}/{progress.dailyTasks.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('paths');
                  playWoodenClick(progress.soundEnabled);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeRightTab === 'paths'
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                    : 'text-[#595959] hover:text-[#1E3A2F]'
                }`}
              >
                Conversion Path
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveRightTab('leaks');
                  playWoodenClick(progress.soundEnabled);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeRightTab === 'leaks'
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                    : 'text-[#595959] hover:text-[#1E3A2F]'
                }`}
              >
                Leak Radar
              </button>
            </div>

            {/* TAB 1: Daily Regimen & Checklist */}
            {activeRightTab === 'tasks' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-display font-semibold text-sm text-[#1E3A2F] block">
                      Daily Deliberate Practice
                    </span>
                    <span className="text-[11px] text-[#595959]">
                      Three bounded disciplines for today's session
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#1E3A2F]">
                    {tasksPercent}% Complete
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#EDE6D8] overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${tasksPercent}%` }}
                  />
                </div>

                {/* Task Checklist */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {progress.dailyTasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => handleTaskClick(task.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        task.completed
                          ? 'bg-[#EDE6D8]/50 border-[#D9CFC0] text-[#595959]'
                          : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#D9CFC0]" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-sans leading-snug ${
                          task.completed ? 'line-through text-[#8C7A6B]' : 'font-medium'
                        }`}
                      >
                        {task.text}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Fast Action Buttons */}
                <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate('drills')}
                    className="text-xs text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#C6A664]" />
                    <span>Launch 15-Min V1 Drill</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('log')}
                    className="text-xs text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C6A664]" />
                    <span>Audit New Game</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: The 3 Conversion Paths */}
            {activeRightTab === 'paths' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block">
                    Conversion Track Selection
                  </span>
                  <div className="flex items-center gap-1 bg-[#EDE6D8] p-1 rounded-xl border border-[#D9CFC0]">
                    {(['B', 'A', 'C'] as ConversionPath[]).map((pCode) => {
                      const isActive = progress.activePath === pCode;
                      const labels = {
                        B: 'Path B (The Build)',
                        A: 'Path A (The Hunt)',
                        C: 'Path C (The Convert)'
                      };
                      return (
                        <button
                          key={pCode}
                          type="button"
                          onClick={() => handlePathSwitch(pCode)}
                          className={`flex-1 py-1.5 text-xs rounded-lg transition-all font-semibold ${
                            isActive
                              ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                              : 'text-[#262626] hover:bg-white'
                          }`}
                        >
                          {labels[pCode]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Path Dossier */}
                <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-[#1E3A2F]">
                      {activePathObj.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E3A2F] text-[#F6F1E7] font-semibold">
                      Path {activePathObj.path}
                    </span>
                  </div>

                  <p className="text-xs text-[#595959] leading-relaxed">
                    {activePathObj.condition}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#D9CFC0]/60">
                    <span className="text-[10px] font-mono uppercase text-[#8C7A6B] block">
                      Discipline Rules
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
              </div>
            )}

            {/* TAB 3: Error Leak Radar */}
            {activeRightTab === 'leaks' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display font-semibold text-sm text-[#1E3A2F] block">
                      Diagnostic Error Radar
                    </span>
                    <span className="text-[11px] text-[#595959]">
                      Cumulative leaks across {progress.loggedGames.length} audited games
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#1E3A2F]">
                    {totalErrors} Leaks Logged
                  </span>
                </div>

                <div className="space-y-2.5">
                  {ERROR_CATEGORIES.map((cat) => {
                    const count = errorStats[cat.category] || 0;
                    const pct = totalErrors > 0 ? Math.round((count / totalErrors) * 100) : 0;
                    return (
                      <div key={cat.category} className="p-2.5 bg-white rounded-xl border border-[#D9CFC0] space-y-1 shadow-xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#1E3A2F]">{cat.label}</span>
                          <span className="font-mono text-[#595959]">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#A8553F] rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(pct, count > 0 ? 12 : 0)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* V1 Scan Sentinel Strip */}
          <div className="p-4 bg-[#1E3A2F] text-[#F6F1E7] rounded-2xl border border-[#C6A664]/30 shadow-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                Pre-Move Scan Sentinel
              </span>
              <span className="text-xs font-semibold text-[#F6F1E7] block">
                Checks → Captures → Threats → Loose Pieces
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('drills')}
              className="px-3 py-1.5 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] text-xs font-semibold rounded-lg transition-colors shadow-xs shrink-0"
            >
              Scan Drill
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
