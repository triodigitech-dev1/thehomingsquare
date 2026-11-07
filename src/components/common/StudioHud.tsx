import React from 'react';
import { NavView } from '../layout/Header';
import { UserProgressState, ConversionPath } from '../../types/chess';
import { PAWN_STRUCTURES, CONVERSION_PATHS } from '../../data/structures';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import { playWoodenClick } from '../board/ChessBoard';
import { useToast } from './Toast';
import {
  Compass,
  Layers,
  Award,
  CheckCircle2,
  Shield,
  Volume2,
  VolumeX,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';

interface StudioHudProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  progress: UserProgressState;
  onSelectStructure: (structId: string) => void;
  onSetPath: (path: ConversionPath) => void;
  onToggleSound: () => void;
  onOpenAuthModal: () => void;
}

export const StudioHud: React.FC<StudioHudProps> = ({
  currentView,
  onNavigate,
  progress,
  onSelectStructure,
  onSetPath,
  onToggleSound,
  onOpenAuthModal
}) => {
  const { toast } = useToast();

  // If in door view, keep it minimal or hide HUD to preserve atmospheric threshold
  if (currentView === 'door') return null;

  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const completedCount = progress.completedUnitIds.length;
  const progressPct = Math.round((completedCount / allUnits.length) * 100);

  const currentStruct =
    PAWN_STRUCTURES.find((s) => s.id === progress.currentStructureId) || PAWN_STRUCTURES[0];

  const handleStructureChange = (newId: string) => {
    onSelectStructure(newId);
    const struct = PAWN_STRUCTURES.find((s) => s.id === newId);
    if (struct) {
      toast.info('Active Pawn Structure', struct.name);
    }
  };

  const handleCyclePath = () => {
    const paths: ConversionPath[] = ['B', 'A', 'C'];
    const nextIdx = (paths.indexOf(progress.activePath) + 1) % paths.length;
    const nextPath = paths[nextIdx];
    onSetPath(nextPath);
    const pathObj = CONVERSION_PATHS.find((p) => p.path === nextPath);
    toast.info(`Switched to Path ${nextPath}`, pathObj?.name || 'Conversion track updated');
  };

  return (
    <div className="bg-[#FAF7F2] border-b border-[#D9CFC0] px-4 sm:px-6 lg:px-8 py-2.5 shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Section: Active Structure & Conversion Path Switcher */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#D9CFC0] shadow-2xs">
            <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold">
              Structure:
            </span>
            <select
              value={currentStruct.id}
              onChange={(e) => handleStructureChange(e.target.value)}
              className="font-medium text-xs text-[#1E3A2F] bg-transparent focus:outline-none cursor-pointer"
            >
              {PAWN_STRUCTURES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Conversion Path Pill */}
          <button
            type="button"
            onClick={handleCyclePath}
            title="Click to cycle active conversion path (B → A → C)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#D9CFC0] hover:border-[#1E3A2F] text-xs transition-colors shadow-2xs"
          >
            <span className="text-[10px] font-mono uppercase text-[#C6A664] font-semibold">
              Conversion:
            </span>
            <span className="font-mono font-bold text-[#1E3A2F]">Path {progress.activePath}</span>
            <span className="text-[10px] text-[#8C7A6B]">
              ({progress.activePath === 'B' ? 'Build' : progress.activePath === 'A' ? 'Hunt' : 'Endgame'})
            </span>
          </button>

          {/* Homing Square Spotlight */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-[#EDE6D8]/60 text-[11px] font-mono text-[#595959] border border-[#D9CFC0]/60">
            <span className="font-semibold text-[#1E3A2F]">Homing:</span>
            <span>c5 Square</span>
          </div>
        </div>

        {/* Right Section: Progress Gauge, Drills Streak, Audio & Role */}
        <div className="flex items-center gap-3">
          
          {/* Checkpoint Progress */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-[#D9CFC0] shadow-2xs">
            <span className="text-[10px] font-mono text-[#595959] hidden sm:inline">
              Curriculum:
            </span>
            <div className="w-16 h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="font-mono text-xs font-semibold text-[#1E3A2F]">
              {completedCount}/{allUnits.length}
            </span>
          </div>

          {/* 15-Min Drill Shortcut */}
          <button
            type="button"
            onClick={() => {
              playWoodenClick(progress.soundEnabled);
              onNavigate('drills');
            }}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EDE6D8] hover:bg-[#FAF7F2] text-[#1E3A2F] border border-[#D9CFC0] text-xs transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>15-Min V1 Drills ({progress.drillsCompletedCount})</span>
          </button>

          {/* Audio Clicker Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleSound();
              toast.info(
                progress.soundEnabled ? 'Board Audio Muted' : 'Board Audio Enabled',
                'Wooden clicks and chimes'
              );
            }}
            className="p-1.5 rounded-lg bg-white border border-[#D9CFC0] text-[#1E3A2F] hover:bg-[#FAF7F2] transition-colors"
            title={progress.soundEnabled ? 'Mute wood clicks' : 'Enable wood clicks'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#1E3A2F]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#8C7A6B]" />
            )}
          </button>

          {/* Active Role Indicator */}
          <div
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#1E3A2F] text-[#F6F1E7] text-[11px] font-mono cursor-pointer hover:bg-[#152921] transition-colors shadow-2xs"
            title="Click to view or switch student/instructor role"
          >
            <Shield className="w-3 h-3 text-[#C6A664]" />
            <span className="capitalize">{progress.studentAccount?.role || 'Scholar'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
