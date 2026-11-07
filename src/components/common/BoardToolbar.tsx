import React, { useState } from 'react';
import { RotateCcw, RefreshCw, Eye, EyeOff, Copy, Check, Volume2, VolumeX } from 'lucide-react';
import { playWoodenClick } from '../board/ChessBoard';
import { useToast } from './Toast';

export interface BoardToolbarProps {
  fen: string;
  flipped: boolean;
  onToggleFlip: () => void;
  pawnSkeletonOnly: boolean;
  onTogglePawnSkeleton: () => void;
  onReset?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  lastMoveSan?: string;
  moveHistory?: string[];
  className?: string;
}

export const BoardToolbar: React.FC<BoardToolbarProps> = ({
  fen,
  flipped,
  onToggleFlip,
  pawnSkeletonOnly,
  onTogglePawnSkeleton,
  onReset,
  soundEnabled = true,
  onToggleSound,
  lastMoveSan,
  moveHistory = [],
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyFen = async () => {
    try {
      await navigator.clipboard.writeText(fen);
      setCopied(true);
      playWoodenClick(soundEnabled);
      toast.success('FEN Copied to Clipboard', 'Position ready for engine or study analysis');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-2.5 pt-2 w-full text-xs font-sans ${className}`}>
      {/* Left controls: Flip, Reset, Skeleton Filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={onToggleFlip}
          title={flipped ? 'View from White side' : 'View from Black side'}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#EDE6D8] hover:bg-[#FAF7F2] border border-[#D9CFC0] text-[#262626] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#1E3A2F]" />
          <span>{flipped ? 'Black' : 'White'}</span>
        </button>

        <button
          type="button"
          onClick={onTogglePawnSkeleton}
          title={pawnSkeletonOnly ? 'Show all army pieces' : 'Strip pieces to show only pawn skeleton'}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-colors ${
            pawnSkeletonOnly
              ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]'
              : 'bg-[#EDE6D8] hover:bg-[#FAF7F2] border-[#D9CFC0] text-[#262626]'
          }`}
        >
          {pawnSkeletonOnly ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-[#C6A664]" />
              <span className="font-medium">Skeleton</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-[#595959]" />
              <span>Skeleton</span>
            </>
          )}
        </button>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title="Reset to initial position"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#EDE6D8] hover:bg-[#FAF7F2] border border-[#D9CFC0] text-[#262626] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#595959]" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Right controls: Last move chip, Copy FEN, Sound toggle */}
      <div className="flex items-center gap-2">
        {lastMoveSan && (
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#1E3A2F] text-[#F6F1E7] border border-[#C6A664]/40">
            {lastMoveSan}
          </span>
        )}

        <button
          type="button"
          onClick={handleCopyFen}
          title="Copy FEN string to clipboard"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#EDE6D8] hover:bg-[#FAF7F2] border border-[#D9CFC0] text-[#262626] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#595959]" />
              <span>FEN</span>
            </>
          )}
        </button>

        {onToggleSound && (
          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Wood clicks enabled' : 'Wood clicks muted'}
            className="p-1 rounded-md bg-[#EDE6D8] hover:bg-[#FAF7F2] border border-[#D9CFC0] text-[#262626] transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#1E3A2F]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#8C7A6B]" />
            )}
          </button>
        )}
      </div>

      {/* Move History Strip if moves exist */}
      {moveHistory.length > 0 && (
        <div className="w-full flex items-center gap-1 overflow-x-auto pt-1 pb-0.5 text-[11px] font-mono text-[#595959] border-t border-[#D9CFC0]/40">
          <span className="shrink-0 font-sans text-[10px] uppercase text-[#8C7A6B] mr-1">Moves:</span>
          {moveHistory.map((m, idx) => (
            <span
              key={`${m}-${idx}`}
              className="px-1.5 py-0.2 bg-[#FAF7F2] rounded border border-[#D9CFC0] shrink-0"
            >
              {idx % 2 === 0 ? `${Math.floor(idx / 2) + 1}. ` : ''}
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
