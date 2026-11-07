/**
 * Official Curriculum Unit: P1 — What Is Chess?
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unitP1: CurriculumUnit = {
  "id": "unit_p1",
  "chapterId": "ch_p",
  "chapterNumber": "P",
  "unitCode": "P1",
  "title": "What Is Chess?",
  "subtitle": "What Is Chess? — Textbook Curriculum Unit P1",
  "whatToLearn": "The definition of chess as a two-player perfect-information strategy game played on an 8x8 chequered board, including its brief history and cultural significance. The theoretical and factual foundations to be covered in this unit include: Game Classification: Chess is a deterministic, finite, zero-sum game of perfect information. (Fact: There are no hidden cards, dice, or simultaneous moves. Both players have access to 100% of the game state at all times). The Shannon Number: The game-tree complexity of chess is estimated at approximately 10¹²⁰. (Fact: This number, calculated by Claude Shannon in 1950, vastly exceeds the estimated number of atoms in the observable universe, approximately 10⁸⁰, demonstrating the infinite variety within finite rules). State-Space Complexity: The number of legal chess positions is estimated to be between 10⁴³ and 10⁵⁰. (Fact: This defines the theoretical bounds of all possible board states).",
  "whatToExpect": "A clear, non-technical, and factual introduction that removes intimidation and frames chess as accessible and enjoyable. The student will be presented with the mathematical reality of the game (perfect information, no chance) and its historical context, establishing that chess is an honest system where outcomes are strictly the result of human decision-making rather than external variables.",
  "expectedOutcome": "The student can explain what chess is, citing its classification as a perfect-information game, its mathematical complexity, and its historical endurance, thereby understanding why it has survived for centuries as a tool for both competition and personal development.",
  "summary": "Historical Lineage: The modern rules of chess crystallized in 15th-century Europe (Spain and Italy). (Fact: The modern game is a direct descendant of chaturanga from 6th-century In...",
  "contentParagraphs": [
    "Historical Lineage: The modern rules of chess crystallized in 15th-century Europe (Spain and Italy). (Fact: The modern game is a direct descendant of chaturanga from 6th-century India, which migrated through Persia—where the term \"checkmate\" originates from the Persian shāh māt, meaning \"the king is helpless\"—and into the Islamic world before reaching Europe). Cultural Endurance: Chess is recognized as a global sport by the International Olympic Committee (IOC). (Fact: FIDE, the International Chess Federation, was founded in Paris on July 20, 1924, and currently governs the game across 200 national federations). What to Expect: A clear, non-technical, and factual introduction that removes intimidation and frames chess as accessible and enjoyable. The student will be presented with the mathematical reality of the game (perfect information, no chance) and its historical context, establishing that chess is an honest system where outcomes are strictly the result of human decision-making rather than external variables. Expected Outcome: The student can explain what chess is, citing its classification as a perfect-information game, its mathematical complexity, and its historical endurance, thereby understanding why it has survived for centuries as a tool for both competition and personal development."
  ],
  "initialFen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "checkpoint": {
    "question": "What makes chess fundamentally distinct from games of chance or games with hidden information?",
    "options": [
      "It is played exclusively with digital clocks and certified scoresheets",
      "Both players have complete, identical visibility over all 64 squares with zero element of luck",
      "White always has a mathematically proven win from move one",
      "Pieces can only move diagonally across the board"
    ],
    "correctIndex": 1,
    "explanation": "Chess is classified as a deterministic, finite, zero-sum game of perfect information. There are no hidden cards, fog of war, or dice rolls. Both players see 100% of the game state at all times.",
    "takeaway": "Total clarity: you are responsible for your position, and every consequence flows from chosen decisions."
  },
  "visualPlacement": {
    "concept": "What Is Chess?",
    "description": "A colour instructional image explaining “What Is Chess?” at a glance: show the relevant board position, movement, pattern, player, object, or historical context with labels readable in print. Downloaded board photograph or public-domain introductory chess illustration.",
    "plannedAsset": "Downloaded board photograph or public-domain introductory chess illustration.",
    "assetStatus": "PLACEHOLDER"
  }
};
