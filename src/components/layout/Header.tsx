import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, GraduationCap, Compass, Lock, CheckCircle2 } from 'lucide-react';
import { StudentAccount } from '../../types/chess';

export type NavView =
  | 'dashboard'
  | 'door'
  | 'cockpit'
  | 'map'
  | 'lesson'
  | 'drills'
  | 'log'
  | 'mastery'
  | 'commons'
  | 'passport'
  | 'workshop'
  | 'resources';

interface HeaderProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  studentAccount?: StudentAccount;
  onOpenAuthModal: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  soundEnabled,
  onToggleSound,
  studentAccount,
  onOpenAuthModal,
  onToggleSidebar,
  isSidebarOpen = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = Boolean(studentAccount?.isAuthenticated);
  const isAdmin = studentAccount?.role === 'admin';

  // Primary LMS navigation links
  const primaryNavLinks: { view: NavView; label: string; badge?: string }[] = [
    { view: 'dashboard', label: 'Dashboard' },
    { view: 'map', label: 'Curriculum Map', badge: '10 Ch' },
    { view: 'lesson', label: 'Classroom' },
    { view: 'drills', label: 'Drills' },
    { view: 'log', label: 'Diagnostic Log' },
    { view: 'resources', label: 'Textbook & Library' }
  ];

  // Protected academic views moved to the sidebar
  const isAcademicView = [
    'dashboard',
    'cockpit',
    'lesson',
    'map',
    'drills',
    'log',
    'mastery',
    'passport'
  ].includes(currentView);

  const getAcademicViewName = (view: NavView) => {
    switch (view) {
      case 'dashboard':
        return 'Dashboard';
      case 'cockpit':
        return 'The Cockpit';
      case 'lesson':
        return 'Classroom';
      case 'map':
        return 'Curriculum Map';
      case 'drills':
        return 'Drill Hall';
      case 'log':
        return 'The Log';
      case 'mastery':
        return 'Mastery Check';
      case 'passport':
        return 'The Passport';
      default:
        return 'Course Modules';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1E3A2F] text-[#F6F1E7] border-b border-[#C6A664]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Official Crest Emblem (Golden Chess) & Academy Name */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            {/* Golden Chess Academy Emblem */}
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#152921] border border-[#C6A664]/40 flex items-center justify-center p-0.5 group-hover:border-[#C6A664] transition-colors shadow-xs">
              <img
                src="/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png"
                alt="Golden Chess Academy Emblem"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-lg tracking-tight text-[#F6F1E7] group-hover:text-[#C6A664] transition-colors whitespace-nowrap leading-none">
                <span className="font-light italic text-[11px] tracking-wider uppercase block text-[#D9CFC0]">The</span>
                <span className="font-medium">Homing Square</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Primary LMS Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-sans tracking-wide">
          {primaryNavLinks.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center ${
                  isActive
                    ? 'text-[#C6A664] font-medium'
                    : 'text-[#D9CFC0] hover:text-[#F6F1E7]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#C6A664]/20 text-[#DFCA95] border border-[#C6A664]/30">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A664] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Academic Sidebar Portal Trigger & Actions */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Academic Quarters Sidebar Trigger Button */}
          <button
            type="button"
            onClick={onToggleSidebar}
            title={
              isAuthenticated
                ? 'Open Academic Study Quarters (Cockpit, Lessons, Drills, Log, Mastery)'
                : 'Open Student Desk & Protected Study Quarters'
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isAcademicView || isSidebarOpen
                ? 'bg-[#C6A664] text-[#1E3A2F] shadow-sm font-semibold'
                : 'bg-[#152921] text-[#F6F1E7] hover:bg-[#2A5141] border border-[#C6A664]/30'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-current shrink-0" />
            <span className="hidden sm:inline">
              {isAcademicView ? getAcademicViewName(currentView) : 'Study Quarters'}
            </span>
            <span className="sm:hidden">Quarters</span>

            {isAuthenticated ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Enrolled Scholar" />
            ) : (
              <span title="Enrolment Gated" className="flex items-center">
                <Lock className="w-3 h-3 text-[#DFCA95] shrink-0" />
              </span>
            )}
          </button>
          
          {/* Subtle Wood Click Audio Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute wood piece clicks' : 'Enable wood piece clicks'}
            title={soundEnabled ? 'Sound: Wooden click on' : 'Sound: Off'}
            className="p-1.5 text-[#D9CFC0] hover:text-[#C6A664] transition-colors rounded hover:bg-[#152921]"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Student Status Badge / Sign In */}
          {isAuthenticated && studentAccount ? (
            <button
              type="button"
              onClick={onToggleSidebar || onOpenAuthModal}
              title="Open Student Profile & Desk"
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#152921] border border-[#C6A664]/30 text-xs text-[#D9CFC0] hover:border-[#C6A664] transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#C6A664]" />
              <span className="font-medium text-[#F6F1E7] truncate max-w-[110px]">
                {studentAccount.fullName}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-[#DFCA95]">
                {studentAccount.role === 'admin' ? 'Admin' : studentAccount.role === 'instructor' ? 'Coach' : 'Scholar'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="text-xs text-[#D9CFC0] hover:text-[#F6F1E7] hidden sm:inline-block font-medium"
            >
              Sign In
            </button>
          )}

          {/* Primary Action Button */}
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#1E3A2F] bg-[#C6A664] hover:bg-[#DFCA95] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Get Started
            </button>
          ) : null}

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D9CFC0] hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#152921] border-b border-[#C6A664]/20 px-4 py-3 space-y-2">
          {/* Quick trigger to open full Academic Sidebar */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onToggleSidebar) onToggleSidebar();
            }}
            className="w-full p-2.5 bg-[#1E3A2F] rounded-lg border border-[#C6A664]/40 flex items-center justify-between text-xs text-[#F6F1E7] mb-2 font-medium"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C6A664]" />
              <span>Open Academic Quarters</span>
            </div>
            {isAuthenticated ? (
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Scholar Access
              </span>
            ) : (
              <span className="text-[10px] text-[#DFCA95] font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Gated
              </span>
            )}
          </button>

          {primaryNavLinks.map((item) => (
            <button
              key={item.view}
              type="button"
              onClick={() => {
                onNavigate(item.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded ${
                currentView === item.view
                  ? 'bg-[#1E3A2F] text-[#C6A664] font-medium'
                  : 'text-[#D9CFC0] hover:bg-[#1E3A2F] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
