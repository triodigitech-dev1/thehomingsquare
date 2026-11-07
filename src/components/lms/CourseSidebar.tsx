import React from 'react';
import { NavView } from '../layout/Header';
import { CurriculumUnit, UserProgressState } from '../../types/chess';
import { CURRICULUM_CHAPTERS } from '../../data/curriculum';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Layers,
  FileText,
  Award,
  GraduationCap,
  Library,
  FileDown,
  X,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CourseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  currentUnit: CurriculumUnit;
  onSelectUnit: (unit: CurriculumUnit) => void;
  progress: UserProgressState;
  onOpenAuthModal?: () => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  currentUnit,
  onSelectUnit,
  progress,
  onOpenAuthModal
}) => {
  const allUnits = CURRICULUM_CHAPTERS.flatMap((c) => c.units);
  const totalUnits = allUnits.length;
  const completedCount = progress.completedUnitIds.filter((id) =>
    allUnits.some((u) => u.id === id)
  ).length;
  const completionPct = Math.round((completedCount / totalUnits) * 100);

  const mainNavItems: {
    view: NavView;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    {
      view: 'dashboard',
      label: 'Course Dashboard',
      sublabel: 'Overview & recommended pace',
      icon: LayoutDashboard,
      badge: 'Hub'
    },
    {
      view: 'map',
      label: 'Curriculum Map',
      sublabel: 'All 10 chapters & 46 units',
      icon: Map,
      badge: '46 Units'
    },
    {
      view: 'lesson',
      label: 'Active Classroom',
      sublabel: `Studying: ${currentUnit.title}`,
      icon: BookOpen,
      badge: `Unit ${currentUnit.unitCode}`
    },
    {
      view: 'drills',
      label: 'Tactical Drill Hall',
      sublabel: 'Candidate moves & pattern scans',
      icon: Layers
    },
    {
      view: 'log',
      label: 'Diagnostic Error Log',
      sublabel: '5-question review protocol',
      icon: FileText
    },
    {
      view: 'mastery',
      label: 'Mastery Check',
      sublabel: 'Conversion rubric & Capablanca model',
      icon: Award
    },
    {
      view: 'passport',
      label: 'Scholar Passport',
      sublabel: 'Verified milestones & diploma',
      icon: GraduationCap
    },
    {
      view: 'resources',
      label: 'Textbook & Research',
      sublabel: 'PDF & visual asset registry',
      icon: Library,
      badge: 'GPL / ODbL'
    }
  ];

  const handleSelectNav = (view: NavView) => {
    onNavigate(view);
    onClose();
  };

  return (
    <>
      {/* Dimmed backdrop on mobile / drawer mode */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity backdrop-blur-xs"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#152921] text-[#F6F1E7] z-50 shadow-2xl border-l border-[#C6A664]/30 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Course Learning Management System Navigation"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#C6A664]/20 flex items-center justify-between bg-[#1E3A2F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#152921] border border-[#C6A664]/40 p-1 shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png"
                alt="The Homing Square Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-[#F6F1E7] leading-tight">
                Structure-First Chess
              </h2>
              <span className="text-[11px] font-mono text-[#C6A664] block">
                Visual Placement LMS Edition
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#D9CFC0] hover:text-[#F6F1E7] hover:bg-[#152921] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Progress Card */}
          <div className="bg-[#1E3A2F] rounded-xl p-4 border border-[#C6A664]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#C6A664] uppercase font-semibold">
                Textbook Progress
              </span>
              <span className="text-xs font-mono font-bold text-[#F6F1E7]">
                {completedCount} / {totalUnits} Units
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#C6A664] to-[#DFCA95] transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#D9CFC0]">
              <span>{completionPct}% Complete</span>
              <span>10 Chapters Total</span>
            </div>

            {/* Resume Current Lesson CTA */}
            <button
              type="button"
              onClick={() => {
                onSelectUnit(currentUnit);
                handleSelectNav('lesson');
              }}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-[#C6A664]/15 hover:bg-[#C6A664]/25 border border-[#C6A664]/40 text-[#DFCA95] hover:text-[#F6F1E7] text-xs font-medium flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <BookOpen className="w-3.5 h-3.5 text-[#C6A664] shrink-0" />
                <span className="truncate">Resume: Unit {currentUnit.unitCode}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold px-1 block mb-2">
              LMS Learning Modules
            </span>
            {mainNavItems.map((item) => {
              const isActive = currentView === item.view;
              const Icon = item.icon;

              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleSelectNav(item.view)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#C6A664] text-[#1E3A2F] font-semibold shadow-md'
                      : 'bg-[#1E3A2F]/60 hover:bg-[#1E3A2F] text-[#F6F1E7] border border-[#C6A664]/10 hover:border-[#C6A664]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[#1E3A2F] text-[#C6A664]'
                          : 'bg-[#152921] text-[#C6A664] border border-[#C6A664]/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                              isActive
                                ? 'bg-[#1E3A2F]/20 text-[#1E3A2F]'
                                : 'bg-[#C6A664]/20 text-[#DFCA95]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[11px] block truncate font-sans ${
                          isActive ? 'text-[#1E3A2F]/80' : 'text-[#D9CFC0]'
                        }`}
                      >
                        {item.sublabel}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      isActive ? 'text-[#1E3A2F]' : 'text-[#D9CFC0]/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Textbook PDF Link */}
          <div className="pt-3 border-t border-[#C6A664]/20">
            <a
              href="/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 rounded-xl bg-[#1E3A2F] hover:bg-[#254639] border border-[#C6A664]/30 text-[#DFCA95] hover:text-[#F6F1E7] flex items-center justify-between text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5 truncate">
                <FileDown className="w-4 h-4 text-[#C6A664] shrink-0" />
                <div className="truncate">
                  <span className="block font-semibold">Open Source Textbook PDF</span>
                  <span className="text-[10px] text-[#D9CFC0] block font-sans">
                    Visual Placement Edition (500+ pp.)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-[#C6A664]">
                PDF
              </span>
            </a>
          </div>

          {/* Student Status info */}
          <div className="p-3 rounded-xl bg-black/20 border border-[#C6A664]/15 flex items-center justify-between text-xs">
            <div className="truncate">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] block">
                Learner Profile
              </span>
              <span className="text-xs text-[#F6F1E7] font-medium block truncate">
                {progress.studentAccount?.fullName || progress.studentName || 'Chess Scholar'}
              </span>
            </div>
            {onOpenAuthModal && (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="text-[11px] text-[#C6A664] hover:text-white underline shrink-0 ml-2"
              >
                {progress.studentAccount?.isAuthenticated ? 'Profile' : 'Enrol'}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#C6A664]/20 bg-[#1E3A2F] text-xs text-[#D9CFC0] flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#C6A664]">
            The Homing Square LMS
          </span>
          <span className="text-[11px] text-[#D9CFC0]">
            Autonomous Study Active
          </span>
        </div>
      </aside>
    </>
  );
};
