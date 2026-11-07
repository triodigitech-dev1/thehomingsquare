/**
 * Chapter Index: Appendix — Operational Schedules & Daily/Weekly Drills
 */

import { CurriculumChapter } from '../../../types/chess';
import { unitApp_1 } from './unit-app-1';
import { unitApp_2 } from './unit-app-2';
import { unitApp_3 } from './unit-app-3';
import { unitApp_4 } from './unit-app-4';
import { unitApp_5 } from './unit-app-5';
import { unitApp_6 } from './unit-app-6';
import { unitApp_7 } from './unit-app-7';

export const appendixChapter: CurriculumChapter = {
  id: "ch_app",
  number: "App",
  code: "Appendix",
  title: "Operational Schedules & Daily/Weekly Drills",
  subtitle: "Daily Routine, Weekly Training, Pre-Game, In-Game, Post-Game & Trackers",
  description: "The scholar's daily and weekly operating manual: tactical scan routines, master game prediction, pre-game protocols, blunder checks, and post-game diagnostic audits.",
  units: [
    unitApp_1,
    unitApp_2,
    unitApp_3,
    unitApp_4,
    unitApp_5,
    unitApp_6,
    unitApp_7
  ]
};
