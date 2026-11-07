import React from 'react';
import { NavView } from './Header';
import { StudentAccount, UserProgressState } from '../../types/chess';
import { ScholarGamificationCard } from '../common/ScholarGamificationCard';
import {
  Compass,
  BookOpen,
  Map,
  Layers,
  FileText,
  Award,
  GraduationCap,
  DoorOpen,
  Users,
  Wrench,
  Library,
  Lock,
  CheckCircle,
  X,
  ChevronRight,
  Shield,
  UserCheck,
  Sparkles,
  LogOut
} from 'lucide-react';

interface AcademySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  studentAccount?: StudentAccount;
  onOpenAuthModal: () => void;
  onSignOut?: () => void;
  progress?: UserProgressState;
  onToggleSound?: () => void;
}

interface NavItemConfig {
  view: NavView;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  minRole: 'public' | 'scholar' | 'candidate' | 'admin';
  badge?: string;
}

export const AcademySidebar: React.FC<AcademySidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  studentAccount,
  onOpenAuthModal,
  onSignOut,
  progress,
  onToggleSound
}) => {
  const isAuthenticated = Boolean(studentAccount?.isAuthenticated);
  const isAdmin = studentAccount?.role === 'admin';

  const academicItems: NavItemConfig[] = [
    {
      view: 'cockpit',
      label: 'The Cockpit',
      sublabel: 'Student State Board & Daily Regimen',
      icon: Compass,
      minRole: 'scholar',
      badge: 'State Board'
    },
    {
      view: 'lesson',
      label: 'Classroom',
      sublabel: 'Interactive Curriculum & Checkpoints',
      icon: BookOpen,
      minRole: 'scholar',
      badge: 'Units P–8'
    },
    {
      view: 'map',
      label: 'The Map',
      sublabel: 'Mastery Tree & Prerequisites',
      icon: Map,
      minRole: 'scholar',
      badge: 'Curriculum'
    },
    {
      view: 'drills',
      label: 'Drill Hall',
      sublabel: '15-Min V1 Scan & Spaced Repetition',
      icon: Layers,
      minRole: 'scholar',
      badge: 'Drills'
    },
    {
      view: 'log',
      label: 'The Log',
      sublabel: '5-Question Diagnostics & Error Leaks',
      icon: FileText,
      minRole: 'scholar',
      badge: 'Diagnostics'
    },
    {
      view: 'mastery',
      label: 'Mastery Check',
      sublabel: 'Model Walkthrough & Conversion Rubric',
      icon: Award,
      minRole: 'scholar',
      badge: 'Graduation'
    },
    {
      view: 'passport',
      label: 'The Passport',
      sublabel: 'Verified Credentials & Academy Seal',
      icon: GraduationCap,
      minRole: 'scholar',
      badge: 'Diploma'
    }
  ];

  const publicItems: NavItemConfig[] = [
    {
      view: 'door',
      label: 'The Door',
      sublabel: 'Academy Entrance & Structure Diagnostic',
      icon: DoorOpen,
      minRole: 'public'
    },
    {
      view: 'commons',
      label: 'Study Together & Commons',
      sublabel: 'Discord, WhatsApp, Focus Tables & Partner Matching',
      icon: Users,
      minRole: 'public'
    },
    {
      view: 'workshop',
      label: 'Instructor Workshop',
      sublabel: 'Cohort Roster, Rubric Audits & Outcomes',
      icon: Wrench,
      minRole: 'public'
    }
  ];

  const adminItems: NavItemConfig[] = [
    {
      view: 'resources',
      label: 'The Library',
      sublabel: 'Classified Markdown Archives & Source Assets',
      icon: Library,
      minRole: 'admin',
      badge: 'Maintainers Only'
    }
  ];

  const handleSelect = (item: NavItemConfig) => {
    if (item.minRole === 'admin' && !isAdmin) {
      onNavigate('resources');
      onClose();
      return;
    }
    if (item.minRole === 'scholar' && !isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    onNavigate(item.view);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay for mobile & sliding drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity backdrop-blur-xs"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#152921] text-[#F6F1E7] z-50 shadow-2xl border-l border-[#C6A664]/30 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Academy Quarters & Permissions Sidebar"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#C6A664]/20 flex items-center justify-between bg-[#1E3A2F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#152921] border border-[#C6A664]/40 p-0.5 shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png"
                alt="Golden Chess Academy Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-[#F6F1E7] leading-tight">
                Academic Quarters
              </h2>
              <span className="text-[11px] font-mono text-[#C6A664] tracking-wide block">
                Structure-First Chess Mastery
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#D9CFC0] hover:text-[#F6F1E7] hover:bg-[#152921] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Section: Student Identity & Permission Status */}
          <div className="bg-[#1E3A2F] rounded-xl p-4 border border-[#C6A664]/30 space-y-3">
            {isAuthenticated && studentAccount ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] flex items-center gap-1.5 font-semibold">
                    <UserCheck className="w-3.5 h-3.5" />
                    Enrolled Scholar
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C6A664]/20 text-[#DFCA95] border border-[#C6A664]/40">
                    {studentAccount.studentId}
                  </span>
                </div>
                <h3 className="font-display text-lg font-medium text-[#F6F1E7]">
                  {studentAccount.fullName}
                </h3>
                <p className="text-xs text-[#D9CFC0] font-sans mt-0.5">
                  {studentAccount.cohort} · {studentAccount.tier}
                </p>
                <div className="pt-3 mt-3 border-t border-[#C6A664]/20 flex items-center justify-between">
                  <span className="text-[11px] text-[#C6A664] font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    All Quarters Unlocked
                  </span>
                  <button
                    type="button"
                    onClick={onOpenAuthModal}
                    className="text-xs text-[#D9CFC0] hover:text-white underline"
                  >
                    Manage Desk
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9CFC0] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#C6A664]" />
                    Visitor / Guest Status
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-[#D9CFC0]">
                    Public Tier
                  </span>
                </div>
                <h3 className="font-display text-base font-medium text-[#F6F1E7]">
                  Enrolment Required for Private Study
                </h3>
                <p className="text-xs text-[#D9CFC0] font-sans mt-1 leading-relaxed">
                  Join the academy cohort to record diagnostic logs, unlock personal error radar, and earn the official mastery diploma.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuthModal();
                  }}
                  className="mt-3 w-full py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] text-xs font-semibold rounded-md transition-colors shadow-sm text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enrol as Student / Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Scholar Standing & Gamification */}
          {progress && (
            <ScholarGamificationCard
              progress={progress}
              onToggleSound={onToggleSound}
              onOpenPassport={() => {
                onNavigate('passport');
                onClose();
              }}
              compact
            />
          )}

          {/* Section: Academic Quarters (Protected by Permissions) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                Protected Academic Quarters
              </span>
              <span className="text-[10px] text-[#D9CFC0] font-mono">
                {isAuthenticated ? '7 of 7 Available' : 'Enrolment Required'}
              </span>
            </div>

            <div className="space-y-1.5">
              {academicItems.map((item) => {
                const isActive = currentView === item.view;
                const Icon = item.icon;
                const isLocked = !isAuthenticated;

                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-center justify-between group ${
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

                    <div className="shrink-0 ml-2">
                      {isLocked ? (
                        <span
                          title="Requires Student Enrolment"
                          className="flex items-center gap-1 text-[10px] font-mono text-[#C6A664] bg-[#152921] px-2 py-1 rounded border border-[#C6A664]/30"
                        >
                          <Lock className="w-3 h-3 text-[#C6A664]" />
                          <span>Locked</span>
                        </span>
                      ) : (
                        <ChevronRight
                          className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'text-[#1E3A2F]' : 'text-[#D9CFC0]'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Public Academy Grounds */}
          <div className="space-y-2 pt-2 border-t border-[#C6A664]/20">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D9CFC0] font-medium">
                Public Academy Grounds
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Open Access
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {publicItems.map((item) => {
                const isActive = currentView === item.view;
                const Icon = item.icon;

                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#1E3A2F] text-[#C6A664] font-medium border border-[#C6A664]/40'
                        : 'text-[#D9CFC0] hover:text-[#F6F1E7] hover:bg-[#1E3A2F]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 text-[#C6A664] shrink-0" />
                      <div className="truncate">
                        <span className="text-xs font-medium block truncate">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-[#D9CFC0]/70 block truncate font-sans">
                          {item.sublabel}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D9CFC0]/60 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Faculty & Maintainer Archives (Restricted) */}
          <div className="space-y-2 pt-2 border-t border-[#C6A664]/20">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Maintainer & Admin Archives</span>
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isAdmin ? 'bg-emerald-400/20 text-emerald-300' : 'bg-black/40 text-[#DFCA95]'}`}>
                {isAdmin ? 'Clearance Active' : 'Admins Only'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {adminItems.map((item) => {
                const isActive = currentView === item.view;
                const Icon = item.icon;

                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between border ${
                      isActive
                        ? 'bg-[#1E3A2F] text-[#C6A664] font-medium border-[#C6A664]/40'
                        : 'bg-black/20 text-[#D9CFC0] hover:text-[#F6F1E7] hover:bg-[#1E3A2F]/60 border-[#C6A664]/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 text-[#C6A664] shrink-0" />
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium block truncate">
                            {item.label}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C6A664]/20 text-[#DFCA95]">
                            {item.badge}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#D9CFC0]/70 block truncate font-sans">
                          {item.sublabel}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 ml-2">
                      {isAdmin ? (
                        <ChevronRight className="w-3.5 h-3.5 text-[#D9CFC0]/60 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#DFCA95]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#C6A664]/20 bg-[#1E3A2F] flex items-center justify-between text-xs text-[#D9CFC0]">
          <span className="font-mono text-[11px]">
            {isAuthenticated ? 'Term 2026 · Active' : 'Public Visitor Mode'}
          </span>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                if (onSignOut) onSignOut();
                else onOpenAuthModal();
              }}
              className="flex items-center gap-1.5 text-xs text-[#DFCA95] hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Account</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="text-xs text-[#C6A664] hover:text-white font-medium underline"
            >
              Sign In
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
