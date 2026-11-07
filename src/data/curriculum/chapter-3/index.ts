/**
 * Chapter Index: Chapter 3 — Opening Philosophies, Approaches & Resulting Structures
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit3_1 } from './unit-3-1';
import { unit3_2 } from './unit-3-2';

export const chapter3: CurriculumChapter = {
  id: "ch_3",
  number: 3,
  code: "Chapter 3",
  title: "Opening Philosophies, Approaches & Resulting Structures",
  subtitle: "Foundational Framework & The Seven Strategic Approaches",
  description: "Connects opening moves directly to resulting pawn structures, repertoire architecture, ECO taxonomy, and opening statistics from master databases.",
  units: [
    unit3_1,
    unit3_2
  ]
};
