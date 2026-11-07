/**
 * Chapter Index: Chapter 5 — The 3-Path Conversion Engine & Essential Endgames
 */

import { CurriculumChapter } from '../../../types/chess';
import { unit5_1 } from './unit-5-1';
import { unit5_2 } from './unit-5-2';

export const chapter5: CurriculumChapter = {
  id: "ch_5",
  number: 5,
  code: "Chapter 5",
  title: "The 3-Path Conversion Engine & Essential Endgames",
  subtitle: "Tactical, Positional & Technical Conversion Paths + Endgame Fundamentals",
  description: "Converting won positions into wins via Path A (Tactical), Path B (Positional), and Path C (Technical), plus King-and-Pawn, Rook, and Minor-Piece endgames.",
  units: [
    unit5_1,
    unit5_2
  ]
};
