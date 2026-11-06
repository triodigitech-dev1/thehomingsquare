/**
 * Core types for The Homing Square platform
 * Grounded in Structure-First Chess Mastery
 */

export type ConversionPath = 'A' | 'B' | 'C';
// Path A: Tactical / Forcing (The Hunt)
// Path B: Positional / Build-up (The Build)
// Path C: Technical / Endgame (The Convert)

export type ErrorLeakCategory = 'Perception' | 'Visualisation' | 'Knowledge' | 'Decision';

export interface PawnStructureProfile {
  id: string;
  name: string;
  category: 'Classical' | 'Indian' | 'Sicilian' | 'French/Caro' | 'Flank' | 'Practical';
  whitePawnSkeleton: string[]; // e.g. ["c4", "d4", "e3"]
  blackPawnSkeleton: string[]; // e.g. ["c6", "d5", "e6"]
  oneSentencePlan: string;
  whiteBreaks: string[];
  blackBreaks: string[];
  keyOutposts: string[];
  weaknesses: string[];
  sampleFen: string;
  historicalModel: string;
  notes: string;
}

export interface UnitCheckpoint {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  takeaway: string;
}

export interface CurriculumUnit {
  id: string;
  chapterId: string;
  chapterNumber: number | 'P';
  unitCode: string; // e.g. "P1", "1.1", "4.3", "8.2"
  title: string;
  subtitle?: string;
  isNew?: boolean;
  isRevised?: boolean;
  isExpanded?: boolean;
  whatToLearn: string;
  whatToExpect: string;
  expectedOutcome: string;
  summary: string;
  contentParagraphs: string[];
  structureId?: string;
  initialFen: string;
  modelMoves?: string[];
  checkpoint: UnitCheckpoint;
}

export interface CurriculumChapter {
  id: string;
  number: number | 'P';
  code: string;
  title: string;
  subtitle: string;
  description: string;
  units: CurriculumUnit[];
}

export interface LoggedGame {
  id: string;
  title: string;
  event: string;
  date: string;
  whitePlayer: string;
  blackPlayer: string;
  result: string;
  fenInitial?: string;
  fenKeyPosition?: string;
  pgn: string;
  // The 5 Mandatory Diagnostic Questions:
  structure: string;
  oneSentencePlan: string;
  pathSwitch: {
    occurred: boolean;
    fromPath?: ConversionPath;
    toPath?: ConversionPath;
    triggerMove?: string;
    description: string;
  };
  defensiveResource: {
    identified: boolean;
    type: 'Fortress' | 'Perpetual Check' | 'Stalemate Trick' | 'Desperado' | 'Drawn Ending' | 'None';
    description: string;
    wasUsedOrMissed: 'used' | 'missed' | 'n/a';
  };
  errorLeaks: {
    category: ErrorLeakCategory;
    moveNumber: number;
    description: string;
    lesson: string;
  }[];
  endgameReached?: string;
  isGauntletGame?: boolean;
  notes: string;
}

export interface Flashcard {
  id: string;
  type: 'structure' | 'mating_pattern' | 'v1_scan' | 'path_choice' | 'defense' | 'custom_leak';
  prompt: string;
  fen: string;
  options?: string[];
  solution: string;
  explanation: string;
  category: string;
  intervalDays?: number;
  nextReviewDate?: string;
  timesReviewed?: number;
}

export interface MasteryRubricPhase {
  id: string;
  name: string;
  criterion: string;
  score: 'Yes' | 'Partly' | 'No';
  notes: string;
}

export interface UserProgressState {
  currentStructureId: string;
  activePath: ConversionPath;
  oneSentencePlan: string;
  completedUnitIds: string[];
  dailyTasks: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  loggedGames: LoggedGame[];
  gauntletGamesCount: number;
  drillsCompletedCount: number;
  soundEnabled: boolean;
  rubricScores: Record<string, 'Yes' | 'Partly' | 'No'>;
  studentName: string;
  completionDate?: string;
}
