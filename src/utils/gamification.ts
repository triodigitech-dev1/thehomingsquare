import { UserProgressState } from '../types/chess';
import { CURRICULUM_CHAPTERS } from '../data/curriculum';
import { PAWN_STRUCTURES } from '../data/structures';

export interface ScholarBadge {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  progressPercent: number;
}

export interface ScholarRankInfo {
  tierName: string;
  tierSubtitle: string;
  currentXP: number;
  minXP: number;
  nextTierXP: number;
  progressPercent: number;
  level: number;
}

export function calculateScholarXP(progress: UserProgressState): number {
  const unitPoints = (progress.completedUnitIds?.length || 0) * 75;
  const drillPoints = (progress.drillsCompletedCount || 0) * 20;
  const gamePoints = (progress.loggedGames?.length || 0) * 100;
  const tasksCompleted = (progress.dailyTasks || []).filter((t) => t.completed).length;
  const taskPoints = tasksCompleted * 25;
  
  const rubricYesCount = Object.values(progress.rubricScores || {}).filter((v) => v === 'Yes').length;
  const rubricPoints = rubricYesCount * 40;

  return unitPoints + drillPoints + gamePoints + taskPoints + rubricPoints;
}

export function getScholarRank(xp: number): ScholarRankInfo {
  if (xp < 250) {
    return {
      tierName: 'Apprentice Reader',
      tierSubtitle: 'Threshold & Pawn Skeleton Foundation',
      currentXP: xp,
      minXP: 0,
      nextTierXP: 250,
      progressPercent: Math.min(100, Math.round((xp / 250) * 100)),
      level: 1
    };
  }
  if (xp < 600) {
    return {
      tierName: 'Journeyman Tactician',
      tierSubtitle: 'Active Scanning & Minority Maneuvers',
      currentXP: xp,
      minXP: 250,
      nextTierXP: 600,
      progressPercent: Math.min(100, Math.round(((xp - 250) / 350) * 100)),
      level: 2
    };
  }
  if (xp < 1200) {
    return {
      tierName: 'Master of Structure',
      tierSubtitle: 'Technical Conversion & 3-Path Mastery',
      currentXP: xp,
      minXP: 600,
      nextTierXP: 1200,
      progressPercent: Math.min(100, Math.round(((xp - 600) / 600) * 100)),
      level: 3
    };
  }
  return {
    tierName: 'Grandmaster Candidate',
    tierSubtitle: 'Highest Academic Honor · Certified Homecomer',
    currentXP: xp,
    minXP: 1200,
    nextTierXP: 2000,
    progressPercent: Math.min(100, Math.round(((xp - 1200) / 800) * 100)),
    level: 4
  };
}

export function getScholarBadges(progress: UserProgressState): ScholarBadge[] {
  const completedUnits = progress.completedUnitIds || [];
  const drillCount = progress.drillsCompletedCount || 0;
  const loggedGamesCount = progress.loggedGames?.length || 0;
  const hasCarlsbad = completedUnits.includes('unit_2_1') || completedUnits.includes('unit_p1');
  const isEnrolled = Boolean(progress.studentAccount?.isAuthenticated);
  const rubricEvaluatedCount = Object.keys(progress.rubricScores || {}).length;

  return [
    {
      id: 'badge_enrolment',
      name: 'Academy Oath',
      title: 'Golden Scholar',
      description: 'Officially enrolled in the Golden Chess Academy active term roster.',
      icon: '🏛️',
      isUnlocked: isEnrolled,
      progressPercent: isEnrolled ? 100 : 0
    },
    {
      id: 'badge_carlsbad',
      name: 'Minority Attack',
      title: 'Carlsbad Master',
      description: 'Mastered the Carlsbad structure, minority attack timing, and b4-b5 pawn levers.',
      icon: '🛡️',
      isUnlocked: hasCarlsbad,
      progressPercent: hasCarlsbad ? 100 : 40
    },
    {
      id: 'badge_v1_reflex',
      name: 'V1 Perception Scan',
      title: 'Tactile Sentinel',
      description: 'Finished 5 or more 15-minute diagnostic drill sessions in the Drill Hall.',
      icon: '⚡',
      isUnlocked: drillCount >= 5,
      progressPercent: Math.min(100, Math.round((drillCount / 5) * 100))
    },
    {
      id: 'badge_game_scribe',
      name: 'Diagnostic Scribe',
      title: 'Audited Scribe',
      description: 'Logged 3 or more serious games audited with the 5 diagnostic questions.',
      icon: '📜',
      isUnlocked: loggedGamesCount >= 3,
      progressPercent: Math.min(100, Math.round((loggedGamesCount / 3) * 100))
    },
    {
      id: 'badge_gauntlet',
      name: 'Homecoming Gauntlet',
      title: 'Gauntlet Challenger',
      description: 'Logged games in the final 10-game graduation gauntlet towards official diploma.',
      icon: '⚔️',
      isUnlocked: loggedGamesCount >= 5,
      progressPercent: Math.min(100, Math.round((loggedGamesCount / 10) * 100))
    },
    {
      id: 'badge_rubric_master',
      name: 'Five-Phase Standard',
      title: 'Rubric Inquisitor',
      description: 'Completed audit evaluations across Opening, Middlegame, Conversion, Endgame, and Discipline.',
      icon: '⚖️',
      isUnlocked: rubricEvaluatedCount >= 5,
      progressPercent: Math.min(100, Math.round((rubricEvaluatedCount / 5) * 100))
    }
  ];
}
