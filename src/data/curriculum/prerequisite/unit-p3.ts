/**
 * Official Curriculum Unit: P3 — The Aim of the Game
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unitP3: CurriculumUnit = {
  "id": "unit_p3",
  "chapterId": "ch_p",
  "chapterNumber": "P",
  "unitCode": "P3",
  "title": "The Aim of the Game",
  "subtitle": "The Aim of the Game — Textbook Curriculum Unit P3",
  "whatToLearn": "The precise definitions of the game’s terminal states and the FIDE Laws of Chess governing how a game ends. The factual and theoretical foundations to be covered include:",
  "whatToExpect": "A rigorous, technical breakdown of the terminal states of chess, relying strictly on the FIDE Laws of Chess. The structural fact-base establishes the precise definitions of checkmate, stalemate, and the five types of draws, defining exactly how and when a game concludes.",
  "expectedOutcome": "The student possesses absolute factual certainty regarding the game's conclusion. They can define checkmate, identify all five draw conditions, understand the strict parameters of the fifty-move rule and threefold repetition, and accurately distinguish between a win, a draw, and a loss based on FIDE protocol.",
  "summary": "6. The Draw: The Fifty-Move Rule Definition: A player can claim a draw if the last 50 moves by each side (100 half-moves) have been made without the movement of any pawn and withou...",
  "contentParagraphs": [
    "6. The Draw: The Fifty-Move Rule Definition: A player can claim a draw if the last 50 moves by each side (100 half-moves) have been made without the movement of any pawn and without any capture. The Rule: Like threefold repetition, this must be claimed. Fact: The automatic threshold is 75 moves (150 half- moves) without a pawn move or capture, at which point the arbiter must declare a draw. 7. The Draw: Mutual Agreement Definition: Both players agree to a draw. Protocol: A draw offer is made after making a move and before pressing the clock. The opponent may accept or decline (verbally or by making a move). 8. Scoring and Outcomes The Point System: A win is worth 1 point, a draw is worth 0.5 points, and a loss is worth 0 points. The Strategic Distinction: The difference between winning, drawing, and losing is not merely statistical; it is theoretical. Fact: Converting a won position is a technical skill, while securing a draw in a lost position is a defensive skill. The ability to accurately evaluate whether a position is winnable, drawable, or lost is a fundamental metric of chess mastery. What to Expect: A rigorous, technical breakdown of the terminal states of chess, relying strictly on the FIDE Laws of Chess. The structural fact-base establishes the precise definitions of checkmate, stalemate, and the five types of draws, defining exactly how and when a game concludes. Expected Outcome: The student possesses absolute factual certainty regarding the game's conclusion. They can define checkmate, identify all five draw conditions, understand the strict parameters of the fifty-move rule and threefold repetition, and accurately distinguish between a win, a draw, and a loss based on FIDE protocol."
  ],
  "initialFen": "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
  "checkpoint": {
    "question": "What is the crucial legal distinction between Checkmate and Stalemate under FIDE laws?",
    "options": [
      "In Stalemate the king is in check, but in Checkmate the king is not in check",
      "In Checkmate the king is under attack with no legal escape; in Stalemate the king is NOT in check but has zero legal moves",
      "Checkmate scores 0.5 points for both players, while Stalemate awards a full point",
      "Stalemate can only occur if fewer than three pieces remain on the board"
    ],
    "correctIndex": 1,
    "explanation": "Checkmate immediately terminates the game with a win because the king is under attack and has no legal resolution. Stalemate results in an immediate draw because the player to move has no legal move and is NOT in check.",
    "takeaway": "Never confuse no legal moves with checkmate: king safety must be evaluated precisely to avoid throwing away winning games."
  },
  "visualPlacement": {
    "concept": "The Aim of the Game",
    "description": "A colour position showing checkmate, check escape options, and stalemate conditions, with checking lines and escape squares clearly annotated.",
    "plannedAsset": "Downloaded licensed checkmate and stalemate position diagram.",
    "assetStatus": "PLACEHOLDER"
  }
};
