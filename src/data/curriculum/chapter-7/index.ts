/**
 * Chapter Index: Chapter 7 — Chess Narratives, Psychological Warfare, Historical Context, Elo & FIDE
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit7_1 } from './unit-7-1';
import { unit7_2 } from './unit-7-2';
import { unit7_3 } from './unit-7-3';
import { unit7_4 } from './unit-7-4';
import { unit7_5 } from './unit-7-5';
import { unit7_6 } from './unit-7-6';
import { unit7_7 } from './unit-7-7';

export const chapter7: CurriculumChapter = {
  id: "ch_7",
  number: 7,
  code: "Chapter 7",
  title: "Chess Narratives, Psychological Warfare, Historical Context, Elo & FIDE",
  subtitle: "Title-Match Dynamics, Cold War Battles, Romantic Sacrifices, Elo & FIDE",
  description: "Historical champions, psychological warfare from Lasker to Carlsen, Cold War geopolitics, Spielmann's sacrifice taxonomy, Elo statistics, and FIDE regulations.",
  units: [
    unit7_1,
    unit7_2,
    unit7_3,
    unit7_4,
    unit7_5,
    unit7_6,
    unit7_7
  ]
};
