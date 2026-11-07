/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Master Curriculum Aggregator
 * Structured modularly: Chapter directories -> Unit concept files -> Chapter index
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumChapter } from '../../types/chess';
import { prerequisiteChapter } from './prerequisite';
import { chapter1 } from './chapter-1';
import { chapter2 } from './chapter-2';
import { chapter3 } from './chapter-3';
import { chapter4 } from './chapter-4';
import { chapter5 } from './chapter-5';
import { chapter6 } from './chapter-6';
import { chapter7 } from './chapter-7';
import { chapter8 } from './chapter-8';
import { appendixChapter } from './appendix';

export const CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  prerequisiteChapter,
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  appendixChapter
];

export {
  prerequisiteChapter,
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  appendixChapter
};
