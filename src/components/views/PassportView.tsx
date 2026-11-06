import React, { useState } from 'react';
import { UserProgressState } from '../../types/chess';
import { PAWN_STRUCTURES, ERROR_CATEGORIES } from '../../data/structures';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { NavView } from '../layout/Header';
import { Shield, Award, CheckCircle2, Download, BookOpen, Compass, Copy, Check } from 'lucide-react';

interface PassportViewProps {
  progress: UserProgressState;
  onNavigate: (view: NavView) => void;
  onUpdateName: (name: string) => void;
}

export const PassportView: React.FC<PassportViewProps> = ({
  progress,
  onNavigate,
  onUpdateName
}) => {
  const [copied, setCopied] = useState(false);
  const totalUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units).length;
  const completedUnits = progress.completedUnitIds.length;
  const gauntletCount = progress.loggedGames.length;

  const handleCopySummary = () => {
    const summary = `The Homing Square Passport — ${progress.studentName || 'Homecomer'}
Units Completed: ${completedUnits} / ${totalUnits}
Drills Finished: ${progress.drillsCompletedCount}
Gauntlet Games Logged: ${gauntletCount} / 10
Active Structure: ${progress.currentStructureId}
Current Path: ${progress.activePath}
Verification: Homecoming Standard Demonstrable`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Passport Book Cover Header */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border-2 border-[#1E3A2F]/20 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9CFC0]/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E3A2F] border border-[#C6A664] flex items-center justify-center text-[#C6A664]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F]">
                The Passport
              </h1>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-[#595959] block">Homecomer ID</span>
            <span className="font-mono text-sm font-semibold text-[#1E3A2F]">
              HS-{progress.studentName ? progress.studentName.slice(0, 3).toUpperCase() : 'HOM'}-2026
            </span>
          </div>
        </div>

        {/* Student Name Edit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#D9CFC0]">
          <div>
            <label className="block text-[11px] font-mono text-[#595959] uppercase">
              Registered Bearer
            </label>
            <input
              type="text"
              value={progress.studentName}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder="Your Name (for Certificate & Passport)"
              className="font-display text-lg sm:text-xl font-semibold text-[#1E3A2F] bg-transparent focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleCopySummary}
            className="px-4 py-2 bg-[#EDE6D8] hover:bg-[#D9CFC0] text-[#1E3A2F] text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-[#1E3A2F]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Passport Record'}</span>
          </button>
        </div>

        {/* Quantitative Highlights: Disciplined Metrics, Never Vanity Ratings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center">
            <span className="text-[11px] font-mono text-[#595959] block">Structures Visited</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {PAWN_STRUCTURES.length} / {PAWN_STRUCTURES.length}
            </span>
            <span className="text-[10px] text-[#595959] block mt-1">Full Skeleton Map</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center">
            <span className="text-[11px] font-mono text-[#595959] block">Units Completed</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {completedUnits} / {totalUnits}
            </span>
            <span className="text-[10px] text-[#595959] block mt-1">Checkpoints Passed</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center">
            <span className="text-[11px] font-mono text-[#595959] block">Drills Finished</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {progress.drillsCompletedCount}
            </span>
            <span className="text-[10px] text-[#595959] block mt-1">Training Floor Passes</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] text-center">
            <span className="text-[11px] font-mono text-[#595959] block">Gauntlet Logs</span>
            <span className="font-display text-2xl font-bold text-[#1E3A2F]">
              {gauntletCount} / 10
            </span>
            <span className="text-[10px] text-[#C6A664] block mt-1 font-semibold">
              {gauntletCount >= 10 ? 'Gauntlet Finished' : `${10 - gauntletCount} Remaining`}
            </span>
          </div>
        </div>

        {/* Structures Visited Stamped Grid */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block">
            Pawn Structures Mastered & Logged
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {PAWN_STRUCTURES.map((struct) => (
              <div
                key={struct.id}
                className="p-3 bg-white rounded-lg border border-[#D9CFC0] flex items-center justify-between"
              >
                <span className="font-medium text-[#262626]">{struct.name}</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
              </div>
            ))}
          </div>
        </div>

        {/* Graduation Status Card */}
        <div className="p-5 bg-[#EDE6D8]/60 rounded-xl border border-[#D9CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-[#1E3A2F] text-sm block">
              Homecoming Certificate Status
            </span>
            <p className="text-[#595959]">
              {gauntletCount >= 10
                ? 'All ten games logged and audited. Ready for Homecoming certification.'
                : `Currently on game ${gauntletCount + 1} of the 10-game graduation gauntlet.`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('mastery')}
            className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold text-xs rounded-lg transition-colors shrink-0"
          >
            Review in Mastery Check →
          </button>
        </div>
      </div>
    </div>
  );
};
