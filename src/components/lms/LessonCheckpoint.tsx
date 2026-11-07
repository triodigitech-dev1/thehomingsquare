import React, { useState } from 'react';
import { UnitCheckpoint } from '../../types/chess';
import { CheckCircle2, XCircle, HelpCircle, Award, Sparkles, ArrowRight } from 'lucide-react';
import { playChimeSound, playFailureSound } from '../board/ChessBoard';

interface LessonCheckpointProps {
  checkpoint: UnitCheckpoint;
  unitCode: string;
  isCompleted: boolean;
  onPassCheckpoint: () => void;
  onNextLesson?: () => void;
  soundEnabled?: boolean;
  className?: string;
}

export const LessonCheckpoint: React.FC<LessonCheckpointProps> = ({
  checkpoint,
  unitCode,
  isCompleted,
  onPassCheckpoint,
  onNextLesson,
  soundEnabled = true,
  className = ''
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isCorrect = selectedOption === checkpoint.correctIndex;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setSubmitted(true);
    if (index === checkpoint.correctIndex) {
      playChimeSound(soundEnabled);
      onPassCheckpoint();
    } else {
      playFailureSound(soundEnabled);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#D9CFC0] shadow-sm space-y-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D9CFC0]/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#C6A664] flex items-center justify-center text-[#C6A664]">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-bold block">
              End-of-Lesson Checkpoint
            </span>
            <h3 className="font-display text-base font-semibold text-[#1E3A2F]">
              Unit {unitCode} Mastery Verification
            </h3>
          </div>
        </div>

        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Passed & Recorded</span>
          </span>
        )}
      </div>

      {/* The Question */}
      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D9CFC0]/80">
        <p className="text-sm sm:text-base text-[#1E3A2F] font-semibold font-sans leading-snug">
          {checkpoint.question}
        </p>
      </div>

      {/* The 4 Options */}
      <div className="space-y-2.5">
        {checkpoint.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isThisCorrect = idx === checkpoint.correctIndex;

          let btnStyles =
            'border-[#D9CFC0] bg-white text-[#262626] hover:border-[#1E3A2F] hover:bg-[#FAF7F2]';

          if (submitted) {
            if (isThisCorrect) {
              btnStyles = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-400';
            } else if (isSelected && !isThisCorrect) {
              btnStyles = 'border-rose-400 bg-rose-50/70 text-rose-950';
            } else {
              btnStyles = 'border-[#D9CFC0]/60 bg-white/60 text-[#595959] opacity-70';
            }
          } else if (isSelected) {
            btnStyles = 'border-[#1E3A2F] bg-[#FAF7F2] ring-1 ring-[#1E3A2F]';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 cursor-pointer ${btnStyles}`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-semibold border ${
                  submitted && isThisCorrect
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : submitted && isSelected && !isThisCorrect
                    ? 'bg-rose-500 text-white border-rose-500'
                    : isSelected
                    ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                    : 'bg-[#EDE6D8] text-[#1E3A2F] border-[#D9CFC0]'
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-relaxed flex-1 pt-0.5">{opt}</span>
              {submitted && isThisCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {submitted && isSelected && !isThisCorrect && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {submitted && (
        <div
          className={`p-4 rounded-xl border space-y-2 animate-fadeIn text-xs sm:text-sm ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/80 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Correct! Checkpoint Passed.</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-amber-800" />
                <span>Not quite. Review the explanation below:</span>
              </>
            )}
          </div>

          <p className="leading-relaxed font-sans text-xs">
            {checkpoint.explanation}
          </p>

          <div className="pt-2 border-t border-black/10 text-xs font-mono space-y-1">
            <strong className="text-[#1E3A2F]">Key Takeaway:</strong> {checkpoint.takeaway}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
            {!isCorrect && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono font-semibold text-[#1E3A2F] hover:underline"
              >
                Try again ↺
              </button>
            )}

            {isCorrect && onNextLesson && (
              <button
                type="button"
                onClick={onNextLesson}
                className="ml-auto px-4 py-2 bg-[#1E3A2F] text-[#F6F1E7] text-xs font-semibold rounded-lg hover:bg-[#152921] transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>Continue to Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A664]" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
