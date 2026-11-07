/**
 * Chapter Index: Chapter 4 — Middlegame Structural Management & Plan Execution
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit4_1 } from './unit-4-1';
import { unit4_2 } from './unit-4-2';
import { unit4_3 } from './unit-4-3';
import { unit4_4 } from './unit-4-4';
import { unit4_5 } from './unit-4-5';

export const chapter4: CurriculumChapter = {
  id: "ch_4",
  number: 4,
  code: "Chapter 4",
  title: "Middlegame Structural Management & Plan Execution",
  subtitle: "The 7 Principles (M1–M7), Structural Packages, Defensive Technique & Evaluation",
  description: "Action-oriented execution: pawn breaks, coordination, prophylaxis, overprotection, blockade, fortress defense, and the unified evaluation checklist.",
  units: [
    unit4_1,
    unit4_2,
    unit4_3,
    unit4_4,
    unit4_5
  ]
};
