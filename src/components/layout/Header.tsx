import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, BookOpen, Compass, Award, GraduationCap, UserCheck } from 'lucide-react';
import { StudentAccount } from '../../types/chess';

export type NavView =
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
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  soundEnabled,
  onToggleSound,
  studentAccount,
  onOpenAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { view: NavView; label: string }[] = [
    { view: 'door', label: 'The Door' },
    { view: 'cockpit', label: 'The Cockpit' },
    { view: 'map', label: 'The Map' },
    { view: 'lesson', label: 'Classroom' },
    { view: 'drills', label: 'Drill Hall' },
    { view: 'log', label: 'The Log' },
    { view: 'mastery', label: 'Mastery Check' },
    { view: 'commons', label: 'The Commons' },
    { view: 'passport', label: 'The Passport' },
    { view: 'workshop', label: 'The Workshop' },
    { view: 'resources', label: 'The Library' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1E3A2F] text-[#F6F1E7] border-b border-[#C6A664]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Official Crest Emblem & Academy Name */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('door')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            {/* The Authentic Emblem from Uploaded Assets */}
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#152921] border border-[#C6A664]/40 flex items-center justify-center p-0.5 group-hover:border-[#C6A664] transition-colors shadow-xs">
              <img
                src="/assets/aistudio/The_Homing_Square_Chess_Emblem_dbf19a72.png"
                alt="The Homing Square Emblem"
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

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden xl:flex items-center gap-4 text-sm font-sans tracking-wide">
          {navLinks.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#C6A664] font-medium'
                    : 'text-[#D9CFC0] hover:text-[#F6F1E7]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A664] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Compact Navigation for Medium Screens (lg) */}
        <nav className="hidden md:flex xl:hidden items-center gap-3 text-xs font-sans">
          {[
            { view: 'cockpit' as NavView, label: 'Cockpit' },
            { view: 'map' as NavView, label: 'Map' },
            { view: 'lesson' as NavView, label: 'Classroom' },
            { view: 'drills' as NavView, label: 'Drills' },
            { view: 'log' as NavView, label: 'Log' },
            { view: 'mastery' as NavView, label: 'Mastery' },
            { view: 'workshop' as NavView, label: 'Workshop' }
          ].map((item) => (
            <button
              key={item.view}
              type="button"
              onClick={() => onNavigate(item.view)}
              className={`whitespace-nowrap transition-colors ${
                currentView === item.view
                  ? 'text-[#C6A664] font-medium'
                  : 'text-[#D9CFC0] hover:text-[#F6F1E7]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Student Enrolment State, Sound Toggle & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Subtle Sound Toggle */}
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
          {studentAccount?.isAuthenticated ? (
            <button
              type="button"
              onClick={onOpenAuthModal}
              title="View Student Desk / Switch Enrolment"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#152921] border border-[#C6A664]/30 text-xs text-[#D9CFC0] hover:border-[#C6A664] transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#C6A664]" />
              <span className="font-medium text-[#F6F1E7] truncate max-w-[120px]">
                {studentAccount.fullName}
              </span>
              <span className="text-[10px] font-mono text-[#C6A664] hidden md:inline">
                {studentAccount.studentId.split('-').pop()}
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

          {/* Primary Action Button: "Get Started" or "Enter Class" */}
          {!studentAccount?.isAuthenticated ? (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-4 py-2 text-xs font-semibold text-[#1E3A2F] bg-[#C6A664] hover:bg-[#DFCA95] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Get Started
            </button>
          ) : currentView !== 'lesson' ? (
            <button
              type="button"
              onClick={() => onNavigate('lesson')}
              className="px-4 py-2 text-xs font-semibold text-[#1E3A2F] bg-[#C6A664] hover:bg-[#DFCA95] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Enter Classroom
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('cockpit')}
              className="px-4 py-2 text-xs font-semibold text-[#1E3A2F] bg-[#C6A664] hover:bg-[#DFCA95] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              State Board
            </button>
          )}

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
          {studentAccount?.isAuthenticated ? (
            <div className="p-2.5 bg-[#1E3A2F] rounded-lg border border-[#C6A664]/30 flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#C6A664]" />
                <span className="font-semibold text-[#F6F1E7]">{studentAccount.fullName}</span>
              </div>
              <span className="text-[10px] font-mono text-[#C6A664]">{studentAccount.cohort}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onOpenAuthModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-[#C6A664] text-[#1E3A2F] font-semibold text-xs rounded-md mb-2 text-center"
            >
              Get Started · Enrol as Student
            </button>
          )}

          {navLinks.map((item) => (
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
