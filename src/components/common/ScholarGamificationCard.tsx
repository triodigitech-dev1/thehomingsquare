import React from 'react';
import { UserProgressState } from '../../types/chess';
import { calculateScholarXP, getScholarRank, getScholarBadges } from '../../utils/gamification';
import { Award, Zap, Shield, Sparkles, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { playWoodenClick, playMilestoneFanfare } from '../board/ChessBoard';

interface ScholarGamificationCardProps {
  progress: UserProgressState;
  onToggleSound?: () => void;
  onOpenPassport?: () => void;
  compact?: boolean;
}

export const ScholarGamificationCard: React.FC<ScholarGamificationCardProps> = ({
  progress,
  onToggleSound,
  onOpenPassport,
  compact = false
}) => {
  const xp = calculateScholarXP(progress);
  const rank = getScholarRank(xp);
  const badges = getScholarBadges(progress);
  const unlockedBadges = badges.filter((b) => b.isUnlocked);

  const handleSoundToggle = () => {
    if (onToggleSound) {
      onToggleSound();
      playWoodenClick(!progress.soundEnabled);
    }
  };

  if (compact) {
    return (
      <div className="bg-[#1E3A2F] text-[#F6F1E7] rounded-xl p-3 border border-[#C6A664]/30 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#152921] border border-[#C6A664]/40 flex items-center justify-center text-[#C6A664] font-display text-xs font-bold shrink-0">
            L{rank.level}
          </div>
          <div className="truncate">
            <span className="text-xs font-semibold text-[#F6F1E7] block truncate">
              {rank.tierName}
            </span>
            <span className="text-[10px] font-mono text-[#DFCA95]">
              {xp} XP · {rank.progressPercent}% to next rank
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onToggleSound && (
            <button
              type="button"
              onClick={handleSoundToggle}
              className="p-1 rounded text-[#D9CFC0] hover:text-[#C6A664] transition-colors"
              title={progress.soundEnabled ? 'Mute Academic Sounds' : 'Enable Academic Sounds'}
            >
              {progress.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          )}
          {onOpenPassport && (
            <button
              type="button"
              onClick={onOpenPassport}
              className="px-2 py-1 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] text-[10px] font-semibold rounded transition-colors flex items-center gap-1"
            >
              <span>Passport</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#D9CFC0]/70 shadow-sm space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9CFC0]/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1E3A2F] border border-[#C6A664] flex items-center justify-center text-[#C6A664] font-display text-base font-bold shadow-xs">
            L{rank.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                Scholar Standing
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1E3A2F]/10 text-[#1E3A2F] font-semibold">
                Level {rank.level}
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-xl text-[#1E3A2F] font-semibold">
              {rank.tierName}
            </h3>
            <span className="text-xs text-[#595959] font-sans">
              {rank.tierSubtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {onToggleSound && (
            <button
              type="button"
              onClick={handleSoundToggle}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                progress.soundEnabled
                  ? 'bg-white border-[#D9CFC0] text-[#1E3A2F]'
                  : 'bg-[#EDE6D8] border-[#D9CFC0] text-[#595959]'
              }`}
              title={progress.soundEnabled ? 'Mute Academic Audio' : 'Enable Academic Audio'}
            >
              {progress.soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#1E3A2F]" />
                  <span className="text-[11px] font-mono">Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#595959]" />
                  <span className="text-[11px] font-mono">Muted</span>
                </>
              )}
            </button>
          )}

          {onOpenPassport && (
            <button
              type="button"
              onClick={onOpenPassport}
              className="px-3.5 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-[#C6A664]" />
              <span>Academic Passport</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar & XP breakdown */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#1E3A2F] font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>{xp} Scholar XP</span>
          </span>
          <span className="text-[#595959]">
            {rank.nextTierXP - xp > 0 ? `${rank.nextTierXP - xp} XP to next rank` : 'Max Rank Reached'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#EDE6D8] overflow-hidden p-0.5 border border-[#D9CFC0]/60">
          <div
            className="h-full rounded-full bg-linear-to-r from-[#1E3A2F] to-[#C6A664] transition-all duration-500"
            style={{ width: `${rank.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Badges Ribbon */}
      <div className="pt-2 border-t border-[#D9CFC0]/50 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-mono text-[#595959] uppercase tracking-wider">
            Academic Badges ({unlockedBadges.length} of {badges.length} Unlocked)
          </span>
          <span className="text-[11px] text-[#1E3A2F] font-mono font-medium">
            Standard Verification
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-2 rounded-xl border text-center transition-all ${
                b.isUnlocked
                  ? 'bg-white border-[#C6A664]/50 shadow-xs'
                  : 'bg-[#EDE6D8]/40 border-[#D9CFC0]/50 opacity-60'
              }`}
              title={`${b.title}: ${b.description}`}
            >
              <span className="text-xl block mb-0.5">{b.icon}</span>
              <span className="font-display text-[11px] font-semibold text-[#1E3A2F] block leading-tight truncate">
                {b.title}
              </span>
              <span className="text-[9px] font-mono text-[#595959] block mt-0.5">
                {b.isUnlocked ? 'Unlocked' : `${b.progressPercent}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
