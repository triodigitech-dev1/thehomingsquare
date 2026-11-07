/**
 * Chapter Index: Prerequisite — Welcome to Chess
 */

import { CurriculumChapter } from '../../../types/chess';
import { unitP1 } from './unit-p1';
import { unitP2 } from './unit-p2';
import { unitP3 } from './unit-p3';
import { unitP4 } from './unit-p4';
import { unitP5 } from './unit-p5';
import { unitP6 } from './unit-p6';
import { unitP7 } from './unit-p7';

export const prerequisiteChapter: CurriculumChapter = {
  id: "ch_p",
  number: "P",
  code: "Prerequisite",
  title: "Welcome to Chess",
  subtitle: "The Fun Foundation — Rules, Geometry, Literacy & First Joy",
  description: "Establishes basic literacy, tactical fluency, competitive awareness, and a positive relationship with chess as both a game and a tool for personal comeback.",
  units: [
    unitP1,
    unitP2,
    unitP3,
    unitP4,
    unitP5,
    unitP6,
    unitP7
  ]
};
