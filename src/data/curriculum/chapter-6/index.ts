/**
 * Chapter Index: Chapter 6 — Deep Calculation, Error Logging & Elite Performance
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit6_1 } from './unit-6-1';
import { unit6_2 } from './unit-6-2';
import { unit6_3 } from './unit-6-3';

export const chapter6: CurriculumChapter = {
  id: "ch_6",
  number: 6,
  code: "Chapter 6",
  title: "Deep Calculation, Error Logging & Elite Performance",
  subtitle: "Calculation Trees, Visualisation, The Seven Deadly Sins & Engine Management",
  description: "Candidate move generation, forcing reply falsification, the 7 deadly thinking sins, diagnostic error classification, and disciplined engine usage.",
  units: [
    unit6_1,
    unit6_2,
    unit6_3
  ]
};
