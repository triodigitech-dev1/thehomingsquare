import React, { useState } from 'react';
import { UserProgressState } from '../../types/chess';
import { PAWN_STRUCTURES } from '../../data/structures';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { calculateScholarXP, getScholarRank, getScholarBadges } from '../../utils/gamification';
import { playWoodenClick, playChimeSound, playMilestoneFanfare } from '../board/ChessBoard';
import {
  Shield,
  Award,
  CheckCircle2,
  Download,
  BookOpen,
  Compass,
  Copy,
  Check,
  Zap,
  Lock,
  Printer,
  Sparkles
} from 'lucide-react';

interface PassportViewProps {
  progress: UserProgressState;
  onNavigate: (view: NavView) => void;
  onUpdateName: (name: string) => void;
  soundEnabled?: boolean;
}

export const PassportView: React.FC<PassportViewProps> = ({
  progress,
  onNavigate,
  onUpdateName,
  soundEnabled = true
}) => {
  const [copied, setCopied] = useState(false);
  const totalUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units).length;
  const completedUnits = progress.completedUnitIds.length;
  const gauntletCount = progress.loggedGames.length;

  const xp = calculateScholarXP(progress);
  const rank = getScholarRank(xp);
  const badges = getScholarBadges(progress);

  const handleCopySummary = () => {
    const summary = `THE HOMING SQUARE — ACADEMIC PASSPORT
Scholar: ${progress.studentName || 'Homecomer'}
Rank: Level ${rank.level} · ${rank.tierName} (${xp} Scholar XP)
Curriculum Checkpoints: ${completedUnits} / ${totalUnits}
Drill Sessions Finished: ${progress.drillsCompletedCount}
Gauntlet Games Audited: ${gauntletCount} / 10
Active Structure: ${progress.currentStructureId}
Conversion Track: Path ${progress.activePath}
Verification: Homecoming Standard Demonstrable`;

    navigator.clipboard.writeText(summary);
    playChimeSound(soundEnabled);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    playMilestoneFanfare(soundEnabled);
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Passport Book Cover Header */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border-2 border-[#1E3A2F]/20 shadow-md space-y-6">
        
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9CFC0]/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1E3A2F] border-2 border-[#C6A664] flex items-center justify-center text-[#C6A664] shadow-sm">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                  Official Academic Record
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E3A2F] text-[#F6F1E7]">
                  Term 2026
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F]">
                The Academic Passport
              </h1>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-[#595959] block">Bearer Credential ID</span>
            <span className="font-mono text-sm font-semibold text-[#1E3A2F]">
              HS-{progress.studentName ? progress.studentName.slice(0, 3).toUpperCase() : 'HOM'}-2026
            </span>
          </div>
        </div>

        {/* Student Name & Bearer Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-xl border border-[#D9CFC0] shadow-xs">
          <div className="flex-1">
            <label className="block text-[11px] font-mono text-[#595959] uppercase">
              Registered Scholar
            </label>
            <input
              type="text"
              value={progress.studentName}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder="Your Name (for Certificate & Diploma)"
              className="font-display text-xl sm:text-2xl font-semibold text-[#1E3A2F] bg-transparent focus:outline-none w-full"
            />
            <span className="text-xs text-[#8C7A6B] font-sans mt-0.5 block">
              {progress.studentAccount?.cohort || 'Cohort 01'} · {progress.studentAccount?.tier || 'Mastery Tier'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white border border-[#D9CFC0] hover:bg-[#FAF7F2] text-[#1E3A2F] text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Diploma</span>
            </button>
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-[#C6A664]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Record'}</span>
            </button>
          </div>
        </div>

        {/* Scholar Rank & Level Gauge */}
        <div className="p-5 bg-white rounded-xl border border-[#D9CFC0] space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] border border-[#C6A664] flex items-center justify-center text-[#C6A664] font-display font-bold text-sm">
                L{rank.level}
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider font-semibold block">
                  Current Rank: Level {rank.level}
                </span>
                <h3 className="font-display text-lg text-[#1E3A2F] font-semibold">
                  {rank.tierName}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-mono font-bold text-[#1E3A2F] flex items-center gap-1 justify-end">
                <Zap className="w-4 h-4 text-[#C6A664]" />
                <span>{xp} Scholar XP</span>
              </span>
              <span className="text-xs text-[#595959] font-sans">
                {rank.nextTierXP - xp > 0 ? `${rank.nextTierXP - xp} XP to Level ${rank.level + 1}` : 'Highest Honor Achieved'}
              </span>
            </div>
          </div>

          {/* Rank Bar */}
          <div className="w-full h-3 rounded-full bg-[#EDE6D8] overflow-hidden p-0.5 border border-[#D9CFC0]/60">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#1E3A2F] to-[#C6A664] transition-all duration-500"
              style={{ width: `${rank.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Quantitative Highlights: Disciplined Metrics, Never Vanity Ratings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center shadow-xs">
            <span className="text-[11px] font-mono text-[#595959] block">Structures Visited</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {PAWN_STRUCTURES.length} / {PAWN_STRUCTURES.length}
            </span>
            <span className="text-[10px] text-[#595959] block mt-1">Full Skeleton Map</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center shadow-xs">
            <span className="text-[11px] font-mono text-[#595959] block">Units Completed</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {completedUnits} / {totalUnits}
            </span>
            <span className="text-[10px] text-[#595959] block mt-1">Checkpoints Passed</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center shadow-xs">
            <span className="text-[11px] font-mono text-[#595959] block">Drills Finished</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {progress.drillsCompletedCount}
            </span>
            <span className="text-[10px] text-[#595959] block mt-1">Training Floor Passes</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center shadow-xs">
            <span className="text-[11px] font-mono text-[#595959] block">Gauntlet Logs</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {gauntletCount} / 10
            </span>
            <span className="text-[10px] text-[#C6A664] block mt-1 font-semibold">
              {gauntletCount >= 10 ? 'Gauntlet Finished' : `${10 - gauntletCount} Remaining`}
            </span>
          </div>
        </div>

        {/* Academic Badges Ribbon */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider font-semibold">
              Conferred Medals & Endorsements
            </span>
            <span className="text-xs font-mono text-[#595959]">
              {badges.filter((b) => b.isUnlocked).length} of {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  b.isUnlocked
                    ? 'bg-white border-[#C6A664] shadow-xs'
                    : 'bg-[#EDE6D8]/50 border-[#D9CFC0] opacity-50'
                }`}
              >
                <div className="text-3xl shrink-0 p-1 bg-[#FAF7F2] rounded-lg border border-[#D9CFC0]/40">
                  {b.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-semibold text-xs text-[#1E3A2F] truncate">
                      {b.title}
                    </span>
                    {b.isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#595959] mt-0.5 line-clamp-2 leading-tight font-sans">
                    {b.description}
                  </p>
                  <span className="text-[10px] font-mono text-[#8C7A6B] block mt-1">
                    {b.isUnlocked ? 'Conferred · Active' : `${b.progressPercent}% to Unlock`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Structures Visited Stamped Grid */}
        <div className="space-y-3 pt-2 border-t border-[#D9CFC0]/60">
          <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block font-semibold">
            Pawn Structures Mastered & Logged
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {PAWN_STRUCTURES.map((struct) => (
              <div
                key={struct.id}
                className="p-3 bg-white rounded-lg border border-[#D9CFC0] flex items-center justify-between shadow-xs"
              >
                <span className="font-medium text-[#262626] truncate">{struct.name}</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E3A2F] shrink-0 ml-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Graduation Status Card */}
        <div className="p-5 bg-white rounded-xl border border-[#D9CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs">
          <div className="space-y-1">
            <span className="font-semibold text-[#1E3A2F] text-sm block font-display">
              Homecoming Certificate Status
            </span>
            <p className="text-[#595959] font-sans">
              {gauntletCount >= 10
                ? 'All ten serious games logged and audited against the 5-phase rubric. Ready for Homecoming certification.'
                : `Currently on game ${gauntletCount + 1} of the 10-game graduation gauntlet.`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playWoodenClick(soundEnabled);
              onNavigate('mastery');
            }}
            className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold text-xs rounded-lg transition-colors shrink-0 shadow-xs"
          >
            Review in Mastery Check →
          </button>
        </div>
      </div>
    </div>
  );
};
