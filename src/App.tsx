/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
// Strip @vercel/analytics per AI Studio platform requirements
const Analytics = () => null;
import { Header, NavView } from './components/layout/Header';
import { AcademySidebar } from './components/layout/AcademySidebar';
import { DoorView } from './components/views/DoorView';
import { CockpitView } from './components/views/CockpitView';
import { MapView } from './components/views/MapView';
import { LessonRoomView } from './components/views/LessonRoomView';
import { DrillHallView } from './components/views/DrillHallView';
import { LogView } from './components/views/LogView';
import { MasteryCheckView } from './components/views/MasteryCheckView';
import { CommonsView } from './components/views/CommonsView';
import { PassportView } from './components/views/PassportView';
import { WorkshopView } from './components/views/WorkshopView';
import { ResourcesView } from './components/views/ResourcesView';
import { StudentAuthModal } from './components/auth/StudentAuthModal';
import { UserProgressState, CurriculumUnit, LoggedGame, ConversionPath, StudentAccount } from './types/chess';
import { CURRICULUM_CHAPTERS } from './data/curriculum';
import { PAWN_STRUCTURES } from './data/structures';
import { INITIAL_LOGGED_GAMES } from './data/loggedGames';
import { Download, Compass, Lock } from 'lucide-react';

const STORAGE_KEY = 'homing_square_progress_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('door');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<CurriculumUnit>(() => {
    return CURRICULUM_CHAPTERS[2].units[0]; // Unit 2.1: Pawn Structures
  });

  // Load progress from localStorage or default
  const [progress, setProgress] = useState<UserProgressState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return {
      currentStructureId: 'carlsbad',
      activePath: 'B',
      oneSentencePlan: 'Conduct the queenside minority attack with b4-b5 to soften c6 and create an outpost on c5, while preventing ...e5.',
      completedUnitIds: ['unit_p1', 'unit_p2', 'unit_2_1'],
      dailyTasks: [
        { id: 'task_1', text: 'Study Carlsbad pawn breaks & complete Unit 2.1 checkpoint', completed: true },
        { id: 'task_2', text: '15-min V1 scan drill (Checks → Captures → Threats → Loose Pieces)', completed: false },
        { id: 'task_3', text: 'Review 2 diagnostic error leaks in The Log', completed: false }
      ],
      loggedGames: INITIAL_LOGGED_GAMES,
      gauntletGamesCount: 3,
      drillsCompletedCount: 14,
      soundEnabled: true,
      rubricScores: {
        rubric_opening: 'Yes',
        rubric_middlegame: 'Yes',
        rubric_conversion: 'Partly',
        rubric_endgame: 'Yes',
        rubric_discipline: 'Yes'
      },
      studentName: 'Rex Viscot',
      studentAccount: {
        isAuthenticated: false,
        studentId: 'HS-2026-8841',
        fullName: 'Rex Viscot',
        email: 'rexviscot44@gmail.com',
        cohort: 'Cohort 01 (Active Term)',
        tier: 'Mastery (Elo 1600–2200)',
        enrolledDate: '2026-03-01',
        status: 'Active Scholar'
      }
    };
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage failed silently
    }
  }, [progress]);

  const handleStudentAuthenticate = (account: StudentAccount) => {
    setProgress((prev) => ({
      ...prev,
      studentAccount: account,
      studentName: account.fullName
    }));
    // Once enrolled or signed in, welcome them into the classroom
    setCurrentView('lesson');
  };

  const handleSelectStructure = (structureId: string) => {
    const struct = PAWN_STRUCTURES.find((s) => s.id === structureId);
    if (!struct) return;
    setProgress((prev) => ({
      ...prev,
      currentStructureId: struct.id,
      oneSentencePlan: struct.oneSentencePlan
    }));
  };

  const handleToggleTask = (taskId: string) => {
    setProgress((prev) => ({
      ...prev,
      dailyTasks: prev.dailyTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const handleSetPath = (path: ConversionPath) => {
    setProgress((prev) => ({
      ...prev,
      activePath: path
    }));
  };

  const handleCompleteUnit = (unitId: string) => {
    setProgress((prev) => {
      if (prev.completedUnitIds.includes(unitId)) return prev;
      return {
        ...prev,
        completedUnitIds: [...prev.completedUnitIds, unitId]
      };
    });
  };

  const handleIncrementDrills = () => {
    setProgress((prev) => ({
      ...prev,
      drillsCompletedCount: prev.drillsCompletedCount + 1
    }));
  };

  const handleAddGame = (game: LoggedGame) => {
    setProgress((prev) => ({
      ...prev,
      loggedGames: [game, ...prev.loggedGames]
    }));
  };

  const handleUpdateRubric = (phaseId: string, score: 'Yes' | 'Partly' | 'No') => {
    setProgress((prev) => ({
      ...prev,
      rubricScores: {
        ...prev.rubricScores,
        [phaseId]: score
      }
    }));
  };

  const handleUpdateStudentName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name,
      studentAccount: prev.studentAccount
        ? { ...prev.studentAccount, fullName: name }
        : undefined
    }));
  };

  const handleToggleSound = () => {
    setProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#262626] flex flex-col font-sans">
      {/* Top Bar with emblem, navigation, and student desk access */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        studentAccount={progress.studentAccount}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Permissions-Based Academy Sidebar Drawer */}
      <AcademySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
        studentAccount={progress.studentAccount}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        progress={progress}
        onToggleSound={handleToggleSound}
        onSignOut={() => {
          setProgress((prev) => ({
            ...prev,
            studentAccount: prev.studentAccount
              ? { ...prev.studentAccount, isAuthenticated: false }
              : undefined
          }));
          setIsSidebarOpen(false);
          setCurrentView('door');
        }}
      />

      {/* Guest Notice for Academic Quarters */}
      {!progress.studentAccount?.isAuthenticated &&
        ['cockpit', 'lesson', 'drills', 'log', 'mastery', 'passport'].includes(currentView) && (
          <div className="bg-[#1E3A2F] text-[#F6F1E7] border-b border-[#C6A664]/30 px-4 py-2.5 shadow-xs">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <span className="px-2 py-0.5 rounded bg-[#C6A664]/20 text-[#DFCA95] font-mono text-[10px] uppercase font-semibold border border-[#C6A664]/40">
                  Guest Preview
                </span>
                <span className="text-[#D9CFC0]">
                  You are previewing this study quarter. Enrol as an active scholar to record diagnostic logs and save your progress.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] font-semibold text-xs rounded transition-colors whitespace-nowrap shadow-xs"
              >
                Enrol as Scholar
              </button>
            </div>
          </div>
        )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'door' && (
          <DoorView
            onNavigate={setCurrentView}
            onSelectStructure={handleSelectStructure}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            isAuthenticated={progress.studentAccount?.isAuthenticated}
          />
        )}

        {currentView === 'cockpit' && (
          <CockpitView
            progress={progress}
            onUpdateTasks={handleToggleTask}
            onSetPath={handleSetPath}
            onNavigate={setCurrentView}
            onSelectStructure={handleSelectStructure}
            onToggleSound={handleToggleSound}
          />
        )}

        {currentView === 'map' && (
          <MapView
            progress={progress}
            onSelectUnit={setCurrentUnit}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'lesson' && (
          <LessonRoomView
            currentUnit={currentUnit}
            progress={progress}
            onCompleteUnit={handleCompleteUnit}
            onSelectUnit={setCurrentUnit}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'drills' && (
          <DrillHallView
            progress={progress}
            onIncrementDrills={handleIncrementDrills}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'log' && (
          <LogView
            loggedGames={progress.loggedGames}
            onAddGame={handleAddGame}
            onNavigate={setCurrentView}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentView === 'mastery' && (
          <MasteryCheckView
            progress={progress}
            onUpdateRubric={handleUpdateRubric}
            onUpdateStudentName={handleUpdateStudentName}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'commons' && (
          <CommonsView
            onNavigate={setCurrentView}
            onSelectStructure={handleSelectStructure}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentView === 'passport' && (
          <PassportView
            progress={progress}
            onNavigate={setCurrentView}
            onUpdateName={handleUpdateStudentName}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentView === 'workshop' && (
          <WorkshopView
            onNavigate={setCurrentView}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentView === 'resources' && (
          <ResourcesView
            onNavigate={setCurrentView}
            soundEnabled={progress.soundEnabled}
            studentAccount={progress.studentAccount}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSwitchToAdmin={() => {
              setProgress((prev) => ({
                ...prev,
                studentAccount: prev.studentAccount
                  ? { ...prev.studentAccount, role: 'admin', isAuthenticated: true }
                  : {
                      isAuthenticated: true,
                      studentId: 'HS-ADM-1001',
                      fullName: 'Archivist Thorne (Admin)',
                      email: 'admin@homingsquare.org',
                      cohort: 'Faculty Curators',
                      tier: 'Candidate (Elo 2200+)',
                      enrolledDate: '2026-01-01',
                      status: 'Alumnus',
                      role: 'admin'
                    }
              }));
            }}
          />
        )}
      </main>

      {/* Student Enrolment / Sign In Modal */}
      <StudentAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleStudentAuthenticate}
        currentAccount={progress.studentAccount}
        soundEnabled={progress.soundEnabled}
      />

      {/* Quiet, Dignified Academy Footer */}
      <footer className="bg-[#1E3A2F] text-[#D9CFC0] border-t border-[#C6A664]/20 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand mark & Ethos */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#152921] border border-[#C6A664]/50 flex items-center justify-center p-0.5">
                <img
                  src="/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png"
                  alt="Golden Chess Academy Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-medium text-lg text-[#F6F1E7]">
                The Homing Square
              </span>
            </div>
            <p className="font-display italic text-sm text-[#C6A664]">
              “Every piece has a home square.”
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#D9CFC0]">
            <button
              type="button"
              onClick={() => setCurrentView('door')}
              className="hover:text-[#F6F1E7] transition-colors"
            >
              The Door
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('commons')}
              className="hover:text-[#F6F1E7] transition-colors"
            >
              The Commons
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('workshop')}
              className="hover:text-[#F6F1E7] transition-colors"
            >
              The Workshop
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('resources')}
              className="hover:text-[#F6F1E7] transition-colors"
            >
              The Library
            </button>
            <span className="text-[#C6A664]/40 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="text-[#C6A664] hover:text-[#DFCA95] transition-colors flex items-center gap-1 font-medium"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Academic Quarters</span>
            </button>
          </div>

          {/* PDF Download Link */}
          <div className="shrink-0">
            <a
              href="/assets/aistudio/Structure_First_Chess_Mastery_31a83b4c.pdf"
              download="Structure_First_Chess_Mastery.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#C6A664] hover:text-[#DFCA95] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Curriculum Guide PDF</span>
            </a>
          </div>

        </div>
      </footer>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
