import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, BookOpen, Compass, Award } from 'lucide-react';

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
  | 'workshop';

interface HeaderProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  unlockedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  soundEnabled,
  onToggleSound,
  unlockedCount = 3
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { view: NavView; label: string }[] = [
    { view: 'door', label: 'The Door' },
    { view: 'cockpit', label: 'The Cockpit' },
    { view: 'map', label: 'The Map' },
    { view: 'lesson', label: 'Lesson Room' },
    { view: 'drills', label: 'Drill Hall' },
    { view: 'log', label: 'The Log' },
    { view: 'mastery', label: 'Mastery Check' },
    { view: 'commons', label: 'The Commons' },
    { view: 'passport', label: 'The Passport' },
    { view: 'workshop', label: 'The Workshop' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1E3A2F] text-[#F6F1E7] border-b border-[#C6A664]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Mark / Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('door')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            {/* The Mark: Lit Square with returning arc */}
            <div className="w-8 h-8 rounded-md bg-[#152921] border border-[#C6A664]/40 flex items-center justify-center relative overflow-hidden group-hover:border-[#C6A664] transition-colors">
              <div className="w-3.5 h-3.5 bg-[#C6A664] rounded-xs relative">
                {/* Returning arc */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#1E3A2F] rounded-tr-full" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-lg tracking-tight text-[#F6F1E7] group-hover:text-[#C6A664] transition-colors whitespace-nowrap leading-none">
                <span className="font-light italic text-xs tracking-wider uppercase block text-[#D9CFC0]">The</span>
                <span className="font-medium">Homing Square</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-sans tracking-wide">
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
        <nav className="hidden md:flex xl:hidden items-center gap-4 text-xs font-sans">
          {[
            { view: 'cockpit' as NavView, label: 'Cockpit' },
            { view: 'map' as NavView, label: 'Map' },
            { view: 'lesson' as NavView, label: 'Lessons' },
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

        {/* Zone 3: Primary Action & Sound Toggle */}
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

          {/* Primary Action Button */}
          {currentView !== 'cockpit' ? (
            <button
              type="button"
              onClick={() => onNavigate('cockpit')}
              className="px-4 py-2 text-xs font-medium text-[#1E3A2F] bg-[#C6A664] hover:bg-[#DFCA95] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Enter Cockpit
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('lesson')}
              className="px-4 py-2 text-xs font-medium text-[#1E3A2F] bg-[#C6A664] hover:bg-[#DFCA95] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Resume Study
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
        <div className="md:hidden bg-[#152921] border-b border-[#C6A664]/20 px-4 py-3 space-y-1">
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
