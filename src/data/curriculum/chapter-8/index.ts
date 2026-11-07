/**
 * Chapter Index: Chapter 8 — The Closing Chapter — Philosophy and Mastery
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit8_1 } from './unit-8-1';
import { unit8_2 } from './unit-8-2';

export const chapter8: CurriculumChapter = {
  id: "ch_8",
  number: 8,
  code: "Chapter 8",
  title: "The Closing Chapter — Philosophy and Mastery",
  subtitle: "Positional Chess versus Structure-First Chess & The Unified Method",
  description: "The synthesis of structure-first mastery: Steinitz to modern engine synthesis, and the 5-phase rubric for graduation.",
  units: [
    unit8_1,
    unit8_2
  ]
};
