import React, { useState } from 'react';
import { UserProgressState } from '../../types/chess';
import { MODEL_WALKTHROUGH_GAME } from '../../data/modelGame';
import { ChessBoard, playWoodenClick } from '../board/ChessBoard';
import { BoardToolbar } from '../common/BoardToolbar';
import { NavView } from '../layout/Header';
import { Award, CheckCircle2, AlertCircle, Printer, Share2, ArrowRight, Shield, Download } from 'lucide-react';

interface MasteryCheckProps {
  progress: UserProgressState;
  onUpdateRubric: (phaseId: string, score: 'Yes' | 'Partly' | 'No') => void;
  onUpdateStudentName: (name: string) => void;
  onNavigate: (view: NavView) => void;
}

export const MasteryCheckView: React.FC<MasteryCheckProps> = ({
  progress,
  onUpdateRubric,
  onUpdateStudentName,
  onNavigate
}) => {
  const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);

  const step = MODEL_WALKTHROUGH_GAME.steps[activeWalkthroughStep];

  // Keyboard navigation for stepping through model game moves
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        setActiveWalkthroughStep((prev) => {
          const next = Math.min(MODEL_WALKTHROUGH_GAME.steps.length - 1, prev + 1);
          if (next !== prev) playWoodenClick(progress.soundEnabled);
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        setActiveWalkthroughStep((prev) => {
          const next = Math.max(0, prev - 1);
          if (next !== prev) playWoodenClick(progress.soundEnabled);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [progress.soundEnabled]);

  // The 5 Rubric Phases
  const rubricPhases = [
    {
      id: 'rubric_opening',
      phase: 'Opening',
      criterion:
        'I can state which structure I committed to and which P1–P7 principles drove the choice. I prepared one body of theory rather than many unrelated lines.'
    },
    {
      id: 'rubric_middlegame',
      phase: 'Middlegame',
      criterion:
        'I named the structure and wrote a one-sentence plan by move 12 in most games. I identified both sides’ breaks before choosing my own plan. I stopped the opponent’s break before executing mine.'
    },
    {
      id: 'rubric_conversion',
      phase: 'Conversion',
      criterion:
        'On most moves I could state which of A/B/C was live. I switched paths only when the conditions changed, not on impulse. I checked drawing mechanisms before trading into an ending.'
    },
    {
      id: 'rubric_endgame',
      phase: 'Endgame',
      criterion:
        'I activated my king and rooks before advancing pawns. I created a second weakness rather than grinding one. I recognised at least one must-know theoretical position in my own games and converted or drew it correctly.'
    },
    {
      id: 'rubric_discipline',
      phase: 'Perception & Discipline',
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title & Introduction */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1E3A2F] tracking-tight">
            The Mastery Check
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-2 font-sans max-w-2xl">
            The full method assembled: one-page map, walkthrough, five-phase rubric, and ten-game gauntlet.
          </p>
        </div>

        {isGraduated ? (
          <button
            type="button"
            onClick={() => setShowCertificateModal(true)}
            className="px-5 py-3 bg-[#1E3A2F] text-[#F6F1E7] border border-[#C6A664] rounded-xl font-display font-medium text-sm hover:bg-[#152921] transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <Award className="w-5 h-5 text-[#C6A664]" />
            <span>Open Homecoming Certificate</span>
          </button>
        ) : (
          <div className="bg-[#EDE6D8] p-4 rounded-xl border border-[#D9CFC0] text-xs font-mono text-[#595959] space-y-1 shrink-0 text-right">
            <div>Gauntlet: {progress.loggedGames.length} / 10 Games</div>
            <div>Rubric: {yesCount}/5 Yes ({noCount === 0 ? 'No Disqualifiers' : `${noCount} at No`})</div>
          </div>
        )}
      </div>

      {/* 1. The One-Page Map */}
      <section className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-4">
        <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#595959]">
              Section 1
            </span>
            <h2 className="font-display text-xl text-[#1E3A2F]">
              The One-Page Map
            </h2>
          </div>
          <span className="text-xs font-mono text-[#C6A664]">Unified Reference</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-[#D9CFC0] bg-[#EDE6D8]/50 text-[#1E3A2F] font-semibold">
                <th className="py-2.5 px-3">Stage</th>
                <th className="py-2.5 px-3">Tool</th>
                <th className="py-2.5 px-3">What It Does</th>
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
              <tr className="bg-[#EDE6D8]/30">
                <td className="py-3 px-3 font-semibold text-[#1E3A2F]">The Loop</td>
                <td className="py-3 px-3 font-mono font-medium">M1 Checkpoint</td>
                <td className="py-3 px-3">After every trade or break, re-ask: has the structure changed, and which path now applies?</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#595959] italic pt-1">
          The unity lives in the continuous structural question and the M1 checkpoint running through all phases; the paths are the conversion arm of that unity, not its entirety.
        </p>
      </section>

      {/* 2. The Fully Annotated Walkthrough */}
      <section className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
        <div className="border-b border-[#D9CFC0]/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#595959]">
              Section 2
            </span>
            <h2 className="font-display text-xl text-[#1E3A2F]">
              The Fully Annotated Walkthrough
            </h2>
            <p className="text-xs text-[#595959] mt-0.5">
              Annotated using only the course vocabulary, layer by layer.
            </p>
          </div>
          <div className="text-xs font-mono text-[#595959]">
            Step {activeWalkthroughStep + 1} of {MODEL_WALKTHROUGH_GAME.steps.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <ChessBoard
              initialFen={step.fen}
              interactive={false}
              size="md"
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
              className="mt-2 max-w-sm"
            />
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs font-sans">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#1E3A2F] text-[#F6F1E7] font-mono text-[11px] font-medium">
                {step.stage}
              </span>
              <span className="text-[#C6A664] font-mono font-semibold">
                Move {step.moveNumber}: {step.whiteMove} {step.blackMove}
              </span>
            </div>

            <h3 className="font-display text-xl text-[#1E3A2F]">
              {step.title}
            </h3>

            <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2">
              <span className="font-mono text-[11px] text-[#595959] block uppercase">
                System Layer: {step.systemTool}
              </span>
              <p className="text-sm text-[#262626] leading-relaxed">
                {step.annotation}
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveWalkthroughStep((prev) => Math.max(0, prev - 1))}
                disabled={activeWalkthroughStep === 0}
                className="px-3.5 py-1.5 bg-white border border-[#D9CFC0] rounded-md text-[#262626] hover:bg-[#FAF7F2] disabled:opacity-40 transition-colors"
              >
                ← Previous Step
              </button>

              <div className="flex items-center gap-1.5">
                {MODEL_WALKTHROUGH_GAME.steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveWalkthroughStep(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeWalkthroughStep
                        ? 'bg-[#1E3A2F] scale-125'
                        : 'bg-[#D9CFC0] hover:bg-[#595959]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveWalkthroughStep((prev) =>
                    Math.min(MODEL_WALKTHROUGH_GAME.steps.length - 1, prev + 1)
                  )
                }
                disabled={activeWalkthroughStep === MODEL_WALKTHROUGH_GAME.steps.length - 1}
                className="px-3.5 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-md hover:bg-[#152921] disabled:opacity-40 transition-colors"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5-Phase Mastery Rubric */}
      <section className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
        <div className="border-b border-[#D9CFC0]/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#595959]">
              Section 3
            </span>
            <h2 className="font-display text-xl text-[#1E3A2F]">
              The Mastery Rubric
            </h2>
            <p className="text-xs text-[#595959] mt-0.5">
              Score Yes / Partly / No against concrete behavioural criteria. A score of “Yes” requires the behaviour to be observed in at least 3 of your last 5 serious games.
            </p>
          </div>
          <div className="text-xs font-mono text-[#1E3A2F] font-semibold">
            Status: {isRubricPassed ? 'Rubric Passed ✓' : 'Under Review'}
          </div>
        </div>

        <div className="space-y-4">
          {rubricPhases.map((phase) => {
            const currentScore = progress.rubricScores[phase.id] || 'Yes';
            return (
              <div
                key={phase.id}
                className="p-4 bg-white rounded-xl border border-[#D9CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <span className="font-semibold text-sm text-[#1E3A2F] block">
                    {phase.phase}
                  </span>
                  <p className="text-[#595959] leading-relaxed font-sans">
                    {phase.criterion}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  {(['Yes', 'Partly', 'No'] as const).map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => onUpdateRubric(phase.id, choice)}
                      className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors ${
                        currentScore === choice
                          ? choice === 'Yes'
                            ? 'bg-[#1E3A2F] text-[#F6F1E7] font-semibold'
                            : choice === 'Partly'
                            ? 'bg-[#C6A664] text-[#1E3A2F] font-semibold'
                            : 'bg-[#A8553F] text-white font-semibold'
                          : 'bg-[#EDE6D8] text-[#595959] hover:bg-[#D9CFC0]'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#EDE6D8]/50 rounded-xl border border-[#D9CFC0] text-xs space-y-1">
          <strong className="text-[#1E3A2F]">Pass Standard:</strong>
          <span className="text-[#595959] block">
            The rubric is scored “Yes” or “Partly” in all five phases, with no phase at “No”, and at least three phases at “Yes”.
            A phase at “No” is not a failure of the student — it is a diagnosis of which layer to re-study before re-taking the gauntlet.
          </span>
        </div>
      </section>

      {/* 4. The Graduation Gauntlet Tracker */}
      <section className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
        <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#595959]">
              Section 4
            </span>
            <h2 className="font-display text-xl text-[#1E3A2F]">
              The Graduation Gauntlet
            </h2>
          </div>
          <span className="text-xs font-mono text-[#1E3A2F] font-semibold">
            {progress.loggedGames.length} / 10 Games Verified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, idx) => {
            const game = progress.loggedGames[idx];
            const isCompleted = !!game;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isCompleted
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]'
                    : 'bg-white border-[#D9CFC0] text-[#595959]'
                }`}
              >
                <div className="text-[10px] font-mono uppercase mb-1">
                  Game {idx + 1}
                </div>
                <div className="font-semibold text-xs truncate">
                  {game ? game.title : 'Pending Log'}
                </div>
                <div className="text-[10px] mt-1 text-[#C6A664]">
                  {game ? game.result : 'Unrecorded'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-[#595959]">
          <span>Logged in rated OTB or long-form games with 5-question audit.</span>
          <button
            type="button"
            onClick={() => onNavigate('log')}
            className="text-[#1E3A2F] font-semibold hover:underline"
          >
            Add More Games in The Log →
          </button>
        </div>
      </section>

      {/* 5. The Honest Limits */}
      <section className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-4">
        <div className="border-b border-[#D9CFC0]/60 pb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#595959]">
            Section 5
          </span>
          <h2 className="font-display text-xl text-[#1E3A2F]">
            System Limits & Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#595959] leading-relaxed">
          <div className="space-y-1">
            <strong className="text-[#1E3A2F] block">• Errors can be reduced, not eliminated:</strong>
            The scan order, blunder check, and error log shrink them; nobody removes them entirely.
          </div>
          <div className="space-y-1">
            <strong className="text-[#1E3A2F] block">• Evidence is uneven:</strong>
            Pattern and practice findings are well established; sleep results are correlational; timing numbers are heuristics.
          </div>
          <div className="space-y-1">
            <strong className="text-[#1E3A2F] block">• Path B has no guaranteed end:</strong>
            In balanced positions it may never produce a win — that is what W4 (“know when to stop”) is for.
          </div>
          <div className="space-y-1">
            <strong className="text-[#1E3A2F] block">• Biased toward commitment:</strong>
            The system favors commitment and predictability. Players valuing maximum flexibility will weight principles differently.
          </div>
        </div>
      </section>

      {/* 6. Homecoming Certificate Trigger */}
      <div className="p-8 bg-[#1E3A2F] text-[#F6F1E7] rounded-2xl border border-[#C6A664]/30 shadow-lg text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#152921] border border-[#C6A664] mx-auto flex items-center justify-center">
          <Award className="w-6 h-6 text-[#C6A664]" />
        </div>
        <h3 className="font-display text-2xl text-[#F6F1E7]">
          Homecoming: The Graduation Certificate
        </h3>
        <p className="text-xs sm:text-sm text-[#D9CFC0] max-w-xl mx-auto font-sans">
          This certifies completion of the Structure-First Chess Mastery Check:
          ten games logged, five phases reviewed, proof of commitment.
        </p>

        <button
          type="button"
          onClick={() => setShowCertificateModal(true)}
          className="px-6 py-2.5 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] font-semibold text-xs rounded-lg transition-colors shadow-sm"
        >
          View & Print Certificate
        </button>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-[#1E3A2F]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F6F1E7] max-w-3xl w-full rounded-2xl p-8 sm:p-12 border-4 border-[#C6A664] shadow-2xl relative text-[#262626] space-y-8 animate-fadeIn">
            
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-xs text-[#595959] hover:text-[#1E3A2F] font-mono"
            >
              Close [ESC]
            </button>

            {/* Certificate Header */}
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-md bg-[#1E3A2F] border border-[#C6A664] flex items-center justify-center">
                <div className="w-4 h-4 bg-[#C6A664] rounded-xs" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#595959] block">
                The Homing Square
              </span>
              <h1 className="font-display text-3xl sm:text-4xl text-[#1E3A2F] tracking-tight">
                Homecoming
              </h1>
              <p className="text-xs font-sans text-[#595959] italic">
                Certificate of Structure-First Chess Mastery
              </p>
            </div>

            {/* Recipient Name Input */}
            <div className="text-center space-y-2 max-w-md mx-auto">
              <span className="text-xs font-sans text-[#595959] block">This certifies that</span>
              <input
                type="text"
                value={progress.studentName}
                onChange={(e) => onUpdateStudentName(e.target.value)}
                placeholder="Enter Your Full Name"
                className="w-full text-center font-display text-2xl sm:text-3xl font-semibold text-[#1E3A2F] border-b-2 border-[#C6A664] bg-transparent focus:outline-none pb-1"
              />
            </div>

            {/* Certificate Body Text */}
            <div className="text-center text-xs sm:text-sm text-[#262626] font-sans max-w-xl mx-auto leading-relaxed">
              has completed the <strong>Structure-First Chess Mastery Check</strong>:
              ten games logged, five phases reviewed, proof of commitment, and mastery demonstrated.
              Every piece has a home square.
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 border-t border-[#D9CFC0] flex items-center justify-between text-xs font-mono text-[#595959]">
              <div className="space-y-1 text-left">
                <span className="block font-semibold text-[#1E3A2F]">The Homing Square</span>
                <span>Curriculum Council</span>
              </div>

              {/* The Gold Seal */}
              <div className="w-16 h-16 rounded-full border-2 border-[#C6A664] bg-[#FAF7F2] flex flex-col items-center justify-center shadow-inner">
                <span className="text-[9px] font-mono uppercase text-[#C6A664] font-bold">SEAL</span>
                <span className="text-[8px] text-[#1E3A2F]">VERIFIED</span>
              </div>

              <div className="space-y-1 text-right">
                <span className="block font-semibold text-[#1E3A2F]">{new Date().toLocaleDateString()}</span>
                <span>Graduation Date</span>
              </div>
            </div>

            {/* Print Action */}
            <div className="pt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] rounded-lg text-xs font-semibold flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#C6A664]" />
                <span>Print Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
