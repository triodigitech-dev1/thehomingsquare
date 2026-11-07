import React, { useState } from 'react';
import { UserProgressState, LoggedGame } from '../../types/chess';
import { MODEL_WALKTHROUGH_GAME } from '../../data/modelGame';
import { ChessBoard, playWoodenClick, playChimeSound, playMilestoneFanfare } from '../board/ChessBoard';
import { BoardToolbar } from '../common/BoardToolbar';
import { StudyCard } from '../common/StudyCard';
import { NavView } from '../layout/Header';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Printer,
  Share2,
  ArrowRight,
  Shield,
  Download,
  BookOpen,
  Layers,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';

interface MasteryCheckProps {
  progress: UserProgressState;
  onUpdateRubric: (phaseId: string, score: 'Yes' | 'Partly' | 'No') => void;
  onUpdateStudentName: (name: string) => void;
  onNavigate: (view: NavView) => void;
  soundEnabled?: boolean;
}

export const MasteryCheckView: React.FC<MasteryCheckProps> = ({
  progress,
  onUpdateRubric,
  onUpdateStudentName,
  onNavigate,
  soundEnabled = true
}) => {
  const [activeSection, setActiveSection] = useState<'walkthrough' | 'rubric' | 'gauntlet' | 'map'>('walkthrough');
  const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);
  const [selectedGauntletId, setSelectedGauntletId] = useState<string>(progress.loggedGames[0]?.id || '');

  const step = MODEL_WALKTHROUGH_GAME.steps[activeWalkthroughStep];

  // Keyboard navigation for stepping through model game moves
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (activeSection === 'walkthrough') {
        if (e.key === 'ArrowRight') {
          setActiveWalkthroughStep((prev) => {
            const next = Math.min(MODEL_WALKTHROUGH_GAME.steps.length - 1, prev + 1);
            if (next !== prev) playWoodenClick(soundEnabled);
            return next;
          });
        } else if (e.key === 'ArrowLeft') {
          setActiveWalkthroughStep((prev) => {
            const next = Math.max(0, prev - 1);
            if (next !== prev) playWoodenClick(soundEnabled);
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, soundEnabled]);

  // The 5 Rubric Phases
  const rubricPhases = [
    {
      id: 'rubric_opening',
      phase: 'Phase 1: Opening Discipline',
      criterion:
        'I can state which structure I committed to and which P1–P7 principles drove the choice. I prepared one body of theory rather than many unrelated lines.'
    },
    {
      id: 'rubric_middlegame',
      phase: 'Phase 2: Middlegame Execution',
      criterion:
        'I named the structure and wrote a one-sentence plan by move 12 in most games. I identified both sides’ breaks before choosing my own plan. I stopped the opponent’s break before executing mine.'
    },
    {
      id: 'rubric_conversion',
      phase: 'Phase 3: Conversion Technique',
      criterion:
        'On most moves I could state which of A/B/C was live. I switched paths only when the conditions changed, not on impulse. I checked drawing mechanisms before trading into an ending.'
    },
    {
      id: 'rubric_endgame',
      phase: 'Phase 4: Theoretical Endgame',
      criterion:
        'I activated my king and rooks before advancing pawns. I created a second weakness rather than grinding one. I recognised at least one must-know theoretical position in my own games and converted or drew it correctly.'
    },
    {
      id: 'rubric_discipline',
      phase: 'Phase 5: Perception & Discipline',
      criterion:
        'I ran the V1 scan order automatically. I logged every serious error by category and reviewed the log. I kept the M1 checkpoint alive after every break and trade.'
    }
  ];

  // Audit pass standard: Yes or Partly in all 5, no phase at "No", at least 3 "Yes"
  const currentScores = rubricPhases.map(
    (p) => progress.rubricScores[p.id] || ('Yes' as const)
  );
  const noCount = currentScores.filter((s) => s === 'No').length;
  const yesCount = currentScores.filter((s) => s === 'Yes').length;
  const isRubricPassed = noCount === 0 && yesCount >= 3;

  const gauntletCompleted = progress.loggedGames.length >= 10;
  const isGraduated = isRubricPassed && gauntletCompleted;

  const activeGauntletGame =
    progress.loggedGames.find((g) => g.id === selectedGauntletId) || progress.loggedGames[0];

  const handleSelectSection = (sec: 'walkthrough' | 'rubric' | 'gauntlet' | 'map') => {
    setActiveSection(sec);
    playWoodenClick(soundEnabled);
  };

  const handleStepClick = (index: number) => {
    setActiveWalkthroughStep(index);
    playWoodenClick(soundEnabled);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      
      {/* Title & Introduction Banner */}
      <StudyCard
        badge="Capstone Verification"
        badgeVariant="gold"
        title="The Mastery Check"
        subtitle="The complete method assembled: model game walkthrough, five-phase rubric audit, and ten-game graduation gauntlet."
        headerAction={
          <div className="flex items-center gap-3 shrink-0">
            {isGraduated ? (
              <button
                type="button"
                onClick={() => {
                  playMilestoneFanfare(soundEnabled);
                  setShowCertificateModal(true);
                }}
                className="px-4 py-2.5 bg-[#1E3A2F] text-[#F6F1E7] border border-[#C6A664] rounded-xl font-display font-medium text-xs hover:bg-[#152921] transition-all flex items-center gap-2 shadow-sm"
              >
                <Award className="w-4 h-4 text-[#C6A664]" />
                <span>Open Homecoming Certificate</span>
              </button>
            ) : (
              <div className="bg-[#1E3A2F] text-[#F6F1E7] px-3.5 py-2 rounded-xl border border-[#C6A664]/30 text-xs font-mono text-right">
                <div className="text-[10px] text-[#C6A664]">Gauntlet: {progress.loggedGames.length} / 10 Games</div>
                <div className="text-emerald-300 font-semibold">Rubric: {yesCount}/5 Yes ({noCount === 0 ? 'Verified' : `${noCount} at No`})</div>
              </div>
            )}
          </div>
        }
      >
        {/* Section Navigation Tabs (Dashboard within another) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#D9CFC0]/60">
          {[
            { id: 'walkthrough' as const, label: '1. Model Game Walkthrough' },
            { id: 'rubric' as const, label: '2. Five-Phase Rubric Audit' },
            { id: 'gauntlet' as const, label: `3. 10-Game Gauntlet (${progress.loggedGames.length}/10)` },
            { id: 'map' as const, label: '4. One-Page Reference Map' }
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleSelectSection(sec.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === sec.id
                  ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                  : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </StudyCard>

      {/* SECTION 1: Model Game Walkthrough (Dual-Pane Flex Dashboard) */}
      {activeSection === 'walkthrough' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          
          {/* Left Partition (5 cols): Board & Step Navigator */}
          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/70 shadow-sm space-y-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
              <span className="text-xs font-mono uppercase text-[#C6A664] font-semibold">
                Step {activeWalkthroughStep + 1} of {MODEL_WALKTHROUGH_GAME.steps.length}
              </span>
              <span className="text-xs font-mono text-[#595959]">
                Move {step.moveNumber}
              </span>
            </div>

            <ChessBoard
              initialFen={step.fen}
              interactive={false}
              size="sm"
              homingSquare="c5"
              highlightSquares={step.highlightSquares}
              flipped={boardFlipped}
              pawnSkeletonOnly={pawnSkeletonMode}
            />

            <BoardToolbar
              fen={step.fen}
              flipped={boardFlipped}
              onToggleFlip={() => setBoardFlipped(!boardFlipped)}
              pawnSkeletonOnly={pawnSkeletonMode}
              onTogglePawnSkeleton={() => setPawnSkeletonMode(!pawnSkeletonMode)}
              className="mt-2 max-w-[280px]"
            />

            {/* Stepper Controls */}
            <div className="w-full flex items-center justify-between pt-2 border-t border-[#D9CFC0]/60 text-xs">
              <button
                type="button"
                onClick={() => handleStepClick(Math.max(0, activeWalkthroughStep - 1))}
                disabled={activeWalkthroughStep === 0}
                className="px-3 py-1.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] hover:bg-[#EDE6D8] disabled:opacity-40 transition-colors"
              >
                ← Prev Move
              </button>

              <span className="font-mono text-[11px] text-[#595959]">
                Use ← / → keys
              </span>

              <button
                type="button"
                onClick={() => handleStepClick(Math.min(MODEL_WALKTHROUGH_GAME.steps.length - 1, activeWalkthroughStep + 1))}
                disabled={activeWalkthroughStep === MODEL_WALKTHROUGH_GAME.steps.length - 1}
                className="px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg hover:bg-[#152921] disabled:opacity-40 transition-colors font-semibold shadow-xs"
              >
                Next Move →
              </button>
            </div>
          </div>

          {/* Right Partition (7 cols): Scrollable Commentary & Move Step Timeline */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-4">
            
            <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#1E3A2F] text-[#F6F1E7] font-mono text-[10px] font-semibold">
                  {step.stage}
                </span>
                <span className="text-xs font-mono font-semibold text-[#1E3A2F]">
                  Move {step.moveNumber}: {step.whiteMove} {step.blackMove}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#C6A664] font-semibold">
                {step.systemTool}
              </span>
            </div>

            <h3 className="font-display text-xl text-[#1E3A2F]">
              {step.title}
            </h3>

            {/* Active Annotation Box */}
            <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-[#8C7A6B] block">
                System Layer: {step.systemTool}
              </span>
              <p className="text-xs sm:text-sm text-[#262626] leading-relaxed font-sans">
                {step.annotation}
              </p>
            </div>

            {/* Scrollable Move Timeline (Flex partition: browse all steps without page scroll) */}
            <div className="space-y-2 pt-2 border-t border-[#D9CFC0]/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#595959] block font-semibold">
                Model Walkthrough Timeline ({MODEL_WALKTHROUGH_GAME.steps.length} Steps)
              </span>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {MODEL_WALKTHROUGH_GAME.steps.map((st, i) => {
                  const isSelected = i === activeWalkthroughStep;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleStepClick(i)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-xs'
                          : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-semibold shrink-0 ${
                          isSelected ? 'bg-[#C6A664] text-[#1E3A2F]' : 'bg-[#EDE6D8] text-[#595959]'
                        }`}>
                          {i + 1}
                        </span>
                        <span className="truncate font-medium">{st.title}</span>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ml-2 ${isSelected ? 'text-[#DFCA95]' : 'text-[#8C7A6B]'}`}>
                        M{st.moveNumber}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: Five-Phase Rubric Audit (Dual-Pane Flex Dashboard) */}
      {activeSection === 'rubric' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          
          {/* Left Partition (7 cols): Rubric Criteria & Live Scoring */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-4">
            <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block">
                  Graduation Standard Audit
                </span>
                <h3 className="font-display text-lg text-[#1E3A2F]">
                  5-Phase Behavioural Rubric
                </h3>
              </div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded font-semibold ${
                isRubricPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isRubricPassed ? 'Rubric Passed ✓' : 'Under Evaluation'}
              </span>
            </div>

            {/* Scrollable Rubric Phases */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {rubricPhases.map((phase) => {
                const currentScore = progress.rubricScores[phase.id] || 'Yes';
                return (
                  <div
                    key={phase.id}
                    className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-xs text-[#1E3A2F]">
                        {phase.phase}
                      </span>
                      <span className="font-mono text-[11px] text-[#595959]">
                        Score: <strong>{currentScore}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-[#595959] leading-relaxed font-sans">
                      {phase.criterion}
                    </p>

                    <div className="flex items-center justify-end gap-1.5 pt-1">
                      {(['Yes', 'Partly', 'No'] as const).map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => {
                            onUpdateRubric(phase.id, sc);
                            playWoodenClick(soundEnabled);
                          }}
                          className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-colors ${
                            currentScore === sc
                              ? sc === 'Yes'
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : sc === 'Partly'
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-rose-700 text-white shadow-xs'
                              : 'bg-[#EDE6D8] text-[#595959] hover:bg-[#D9CFC0]'
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Partition (5 cols): Audit Clearance & Diploma Station */}
          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-5">
            <div className="border-b border-[#D9CFC0]/60 pb-3">
              <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block mb-0.5">
                Accreditation Status
              </span>
              <h3 className="font-display text-lg text-[#1E3A2F]">
                Homecoming Diploma Clearance
              </h3>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-3 shadow-xs text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#595959]">5-Phase Rubric:</span>
                <span className="font-mono font-semibold text-[#1E3A2F]">
                  {yesCount}/5 Yes ({noCount === 0 ? 'No Disqualifiers' : `${noCount} at No`})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#595959]">Gauntlet Games Logged:</span>
                <span className="font-mono font-semibold text-[#1E3A2F]">
                  {progress.loggedGames.length} / 10 Games
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#595959]">Drill Floor Passes:</span>
                <span className="font-mono font-semibold text-[#1E3A2F]">
                  {progress.drillsCompletedCount} Sessions
                </span>
              </div>
            </div>

            {/* Bearer Identity Input */}
            <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-1.5 shadow-xs">
              <label className="text-[10px] font-mono uppercase text-[#595959] block">
                Certificate Bearer Name
              </label>
              <input
                type="text"
                value={progress.studentName}
                onChange={(e) => onUpdateStudentName(e.target.value)}
                placeholder="Enter full name for diploma..."
                className="w-full p-2 bg-[#FAF7F2] border border-[#D9CFC0] rounded-lg text-xs font-semibold text-[#1E3A2F] focus:outline-none focus:border-[#1E3A2F]"
              />
            </div>

            {/* Certificate Action */}
            <button
              type="button"
              onClick={() => {
                playMilestoneFanfare(soundEnabled);
                setShowCertificateModal(true);
              }}
              className="w-full py-3 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Award className="w-4 h-4 text-[#C6A664]" />
              <span>Preview & Print Diploma</span>
            </button>
          </div>

        </div>
      )}

      {/* SECTION 3: 10-Game Gauntlet Tracker (Dual-Pane Flex Dashboard) */}
      {activeSection === 'gauntlet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          
          {/* Left Partition (5 cols): Scrollable Gauntlet Games List */}
          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/70 shadow-sm space-y-3">
            <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block">
                  Audited Logs
                </span>
                <h3 className="font-display text-base font-semibold text-[#1E3A2F]">
                  10-Game Gauntlet Records
                </h3>
              </div>
              <span className="text-xs font-mono text-[#595959]">
                {progress.loggedGames.length}/10 Complete
              </span>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {progress.loggedGames.map((game, idx) => {
                const isSelected = game.id === activeGauntletGame.id;
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => {
                      setSelectedGauntletId(game.id);
                      playWoodenClick(soundEnabled);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-sm'
                        : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                      <span className={isSelected ? 'text-[#C6A664]' : 'text-[#8C7A6B]'}>
                        Game {idx + 1} of 10
                      </span>
                      <span className="font-semibold">{game.result}</span>
                    </div>

                    <h4 className="font-display font-semibold text-sm leading-tight truncate">
                      {game.title}
                    </h4>

                    <span className={`text-[11px] block mt-1 truncate ${isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'}`}>
                      {game.structure}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Partition (7 cols): Selected Game 5-Question Audit Inspector */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-4">
            <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold block">
                  Post-Game 5-Question Audit
                </span>
                <h3 className="font-display text-xl text-[#1E3A2F]">
                  {activeGauntletGame.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-[#D9CFC0] font-semibold text-[#1E3A2F]">
                {activeGauntletGame.result}
              </span>
            </div>

            {/* Scrollable Audit Answers */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#C6A664] block font-semibold">
                  1. Pawn Structure
                </span>
                <span className="font-semibold text-sm text-[#1E3A2F] block">
                  {activeGauntletGame.structure}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#C6A664] block font-semibold">
                  2. One-Sentence Plan
                </span>
                <p className="font-display italic text-xs sm:text-sm text-[#1E3A2F]">
                  “{activeGauntletGame.oneSentencePlan}”
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#C6A664] block font-semibold">
                  3. Conversion Path Switch
                </span>
                <span className="text-[#595959] block">
                  {activeGauntletGame.pathSwitch?.description || 'Maintained planned conversion track without emergency switch.'}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#C6A664] block font-semibold">
                  4. Defensive Resource Identified
                </span>
                <span className="text-[#595959] block">
                  {activeGauntletGame.defensiveResource?.description || 'Opponent counterplay neutralised before liquidation.'}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#C6A664] block font-semibold">
                  5. Error Leaks Audited
                </span>
                {activeGauntletGame.errorLeaks.length === 0 ? (
                  <span className="text-emerald-800 font-semibold block">
                    Zero error leaks recorded in this game.
                  </span>
                ) : (
                  <div className="space-y-1">
                    {activeGauntletGame.errorLeaks.map((l, i) => (
                      <div key={i} className="text-[#595959]">
                        <strong>Move {l.moveNumber} ({l.category}):</strong> {l.description}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-[#8C7A6B]">
                Recorded via The Log Protocol
              </span>
              <button
                type="button"
                onClick={() => onNavigate('log')}
                className="text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Open in The Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 4: The One-Page Reference Map */}
      {activeSection === 'map' && (
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/70 shadow-sm space-y-4 animate-fadeIn">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                Theoretical Reference Matrix
              </span>
              <h3 className="font-display text-xl text-[#1E3A2F]">
                The One-Page Master Synthesis
              </h3>
            </div>
            <span className="text-xs font-mono text-[#595959]">Unified Protocol</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-[#D9CFC0] bg-[#EDE6D8]/50 text-[#1E3A2F] font-semibold">
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3">Tool</th>
                  <th className="py-2.5 px-3">Operational Execution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9CFC0]/60 text-[#262626]">
                <tr>
                  <td className="py-3 px-3 font-semibold text-[#1E3A2F]">Opening</td>
                  <td className="py-3 px-3 font-mono font-medium">P1–P7</td>
                  <td className="py-3 px-3">Chooses and commits to a structure; builds a low-branching repertoire.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-[#1E3A2F]">Middlegame</td>
                  <td className="py-3 px-3 font-mono font-medium">M1–M7</td>
                  <td className="py-3 px-3">Names the structure, executes its plan, stops the opponent’s break first.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-[#1E3A2F]">Conversion</td>
                  <td className="py-3 px-3 font-mono font-medium">A / B / C Paths</td>
                  <td className="py-3 px-3">Asks the highest-percentage route to a won position on every move.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-[#1E3A2F]">Endgame</td>
                  <td className="py-3 px-3 font-mono font-medium">E1–E8 + W1–W4</td>
                  <td className="py-3 px-3">Activates king and rooks, creates weaknesses, trades correctly, converts.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-[#1E3A2F]">Throughout</td>
                  <td className="py-3 px-3 font-mono font-medium">V / Z / C / D / T / R</td>
                  <td className="py-3 px-3">Perception, visualisation, error logging, database, time, recovery.</td>
                </tr>
                <tr className="bg-[#EDE6D8]/40">
                  <td className="py-3 px-3 font-semibold text-[#1E3A2F]">The Continuous Loop</td>
                  <td className="py-3 px-3 font-mono font-medium">M1 Checkpoint</td>
                  <td className="py-3 px-3">After every trade or break, re-ask: has the structure changed, and which path now applies?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Graduation Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-2xl w-full rounded-2xl border-2 border-[#1E3A2F] shadow-2xl p-8 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#D9CFC0] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A2F] text-[#C6A664] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                    The Golden Chess Academy
                  </span>
                  <h3 className="font-display text-xl text-[#1E3A2F]">
                    Certificate of Structure-First Chess Mastery
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="p-1 rounded-lg text-[#595959] hover:text-[#1E3A2F]"
              >
                ✕
              </button>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#D9CFC0] text-center space-y-3">
              <span className="text-xs font-mono text-[#595959] uppercase tracking-wider">
                This is to officially certify that
              </span>
              <div className="font-display text-2xl font-bold text-[#1E3A2F]">
                {progress.studentName || 'Scholar Rex Viscot'}
              </div>
              <p className="text-xs text-[#595959] max-w-md mx-auto leading-relaxed">
                has demonstrated demonstrable mastery across the 5-Phase Behavioural Rubric and completed the 10-Game Gauntlet in accordance with the Homecoming Standard.
              </p>
              <div className="pt-2 font-mono text-[11px] text-[#8C7A6B]">
                Conferred at Term 2026 · Credential ID: HS-{progress.studentName ? progress.studentName.slice(0, 3).toUpperCase() : 'HOM'}-2026
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-white border border-[#D9CFC0] text-[#1E3A2F] text-xs font-semibold rounded-lg hover:bg-[#FAF7F2] flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Diploma</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 bg-[#1E3A2F] text-[#F6F1E7] text-xs font-semibold rounded-lg hover:bg-[#152921]"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
