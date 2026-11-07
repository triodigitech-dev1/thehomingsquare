import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { UnitCheckpoint } from '../../types/chess';
import { playWoodenClick, playChimeSound, playFailureSound } from '../board/ChessBoard';

export interface InteractiveCheckpointProps {
  checkpoint: UnitCheckpoint;
  onSuccess?: () => void;
  isAlreadyCompleted?: boolean;
  soundEnabled?: boolean;
  onNext?: () => void;
  nextLabel?: string;
  className?: string;
}

export const InteractiveCheckpoint: React.FC<InteractiveCheckpointProps> = ({
  checkpoint,
  onSuccess,
  isAlreadyCompleted = false,
  soundEnabled = true,
  onNext,
  nextLabel = 'Proceed to Next Unit',
  className = ''
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  }, [checkpoint.question]);

  // Keyboard navigation for options (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= checkpoint.options.length) {
        handleSelect(num - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [checkpoint.options.length, hasSubmitted, isCorrect]);

  const handleSelect = (idx: number) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOption(idx);
    setHasSubmitted(true);
    const correct = idx === checkpoint.correctIndex;
    setIsCorrect(correct);
    if (correct) {
      playChimeSound(soundEnabled);
      if (onSuccess) onSuccess();
    } else {
      playFailureSound(soundEnabled);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Header and question */}
      <div className="space-y-1.5 border-b border-[#D9CFC0]/60 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#1E3A2F] font-semibold">
            Checkpoint Evaluation
          </span>
          {isAlreadyCompleted && (
            <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Checkpoint</span>
            </span>
          )}
        </div>
        <h3 className="font-display text-lg sm:text-xl text-[#1E3A2F] leading-snug">
          {checkpoint.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {checkpoint.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isTargetCorrect = idx === checkpoint.correctIndex;

          let optionStyle =
            'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/60 hover:bg-[#FAF7F2]';

          if (hasSubmitted) {
            if (isTargetCorrect) {
              optionStyle = 'bg-[#1E3A2F] border-[#1E3A2F] text-[#F6F1E7] ring-1 ring-[#C6A664] shadow-xs';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
            } else {
              optionStyle = 'bg-[#FAF7F2]/60 border-[#D9CFC0]/50 text-[#8C7A6B] opacity-60';
            }
          }

          return (
            <button
              key={`${option}-${idx}`}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 text-xs sm:text-sm font-sans relative ${optionStyle}`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5 ${
                  hasSubmitted && isTargetCorrect
                    ? 'bg-[#C6A664] text-[#1E3A2F]'
                    : isSelected && hasSubmitted && !isCorrect
                    ? 'bg-rose-200 text-rose-800'
                    : 'bg-[#EDE6D8] text-[#595959]'
                }`}
              >
                {idx + 1}
              </span>
              <span className="flex-1 leading-relaxed pt-0.5">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Evaluation Feedback and Explanation */}
      {hasSubmitted && (
        <div
          className={`p-4 rounded-xl border space-y-3 transition-all ${
            isCorrect
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center justify-between font-display font-semibold text-sm">
            {isCorrect ? (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Exact Perception · Verified</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-600 text-white font-semibold flex items-center gap-1 shadow-xs">
                  <span>+75 XP</span>
                </span>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Structural Inaccuracy</span>
              </div>
            )}
          </div>

          <p className="text-xs leading-relaxed font-sans opacity-90">{checkpoint.explanation}</p>

          <div className="p-2.5 rounded-lg bg-white/70 border border-current/10 text-xs">
            <span className="font-semibold block mb-0.5 font-display">Core Takeaway</span>
            <span className="font-sans italic">{checkpoint.takeaway}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            {!isCorrect ? (
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-1.5 text-xs text-amber-900 hover:text-amber-950 font-semibold underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            ) : (
              <span className="text-xs text-emerald-800 font-medium font-sans">
                Mastery criterion logged to your academic passport.
              </span>
            )}

            {isCorrect && onNext && (
              <button
                type="button"
                onClick={onNext}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] text-xs font-semibold rounded-md hover:bg-[#152921] transition-colors ml-auto shadow-xs"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
