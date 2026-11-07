/**
 * Chapter Index: Chapter 1 — The Science of Chess Intelligence
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit1_1 } from './unit-1-1';
import { unit1_2 } from './unit-1-2';
import { unit1_3 } from './unit-1-3';
import { unit1_4 } from './unit-1-4';
import { unit1_5 } from './unit-1-5';
import { unit1_6 } from './unit-1-6';

export const chapter1: CurriculumChapter = {
  id: "ch_1",
  number: 1,
  code: "Chapter 1",
  title: "The Science of Chess Intelligence",
  subtitle: "Cognitive Architecture, Neuroscience, Spatial Intelligence & Super-GM Mind",
  description: "Explores the psychological and cognitive mechanics of expert play: chunking, pattern memory, saccadic eye movements, neuroanatomy, and super-GM performance.",
  units: [
    unit1_1,
    unit1_2,
    unit1_3,
    unit1_4,
    unit1_5,
    unit1_6
  ]
};
