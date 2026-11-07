/**
 * Chapter Index: Chapter 2 — Perception Engine & Static Board Vision
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit2_1 } from './unit-2-1';
import { unit2_2 } from './unit-2-2';
import { unit2_3 } from './unit-2-3';
import { unit2_4 } from './unit-2-4';
import { unit2_5 } from './unit-2-5';

export const chapter2: CurriculumChapter = {
  id: "ch_2",
  number: 2,
  code: "Chapter 2",
  title: "Perception Engine & Static Board Vision",
  subtitle: "Pawn Structures, Imbalances, Weaknesses, Outposts & Scanning Protocols",
  description: "The structural skeleton of chess: the Carlsbad, IQP, hanging pawns, imbalances, static targets, piece placement, and the V1/V2 scanning protocols.",
  units: [
    unit2_1,
    unit2_2,
    unit2_3,
    unit2_4,
    unit2_5
  ]
};
