/**
 * Official Curriculum Unit: P2 — The Board, the Pieces and How They Move
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unitP2: CurriculumUnit = {
  "id": "unit_p2",
  "chapterId": "ch_p",
  "chapterNumber": "P",
  "unitCode": "P2",
  "title": "The Board, the Pieces and How They Move",
  "subtitle": "The Board, the Pieces and How They Move — Textbook Curriculum Unit P2",
  "whatToLearn": "The complete rules of piece movement and special moves, grounded in the objective geometry and FIDE Laws of Chess. The factual depth to be covered includes:",
  "whatToExpect": "A rigorous, technical breakdown of board geometry, movement physics, and FIDE-legal special moves. The factual structure establishes the unyielding rules of the system, clarifying the exact mathematical parameters of how every piece operates on the grid.",
  "expectedOutcome": "The student possesses absolute, factual certainty of the board's coordinate system and the legal movement parameters of all six piece types. They can identify any square's color complex, understand the physical limitations of each piece, and accurately define the legal conditions for castling, en passant, and promotion.",
  "summary": "The King: The central piece. Moves exactly one square in any direction (orthogonally or diagonally). The game ends if the King is checkmated. Fact: The King is the only piece that ...",
  "contentParagraphs": [
    "The King: The central piece. Moves exactly one square in any direction (orthogonally or diagonally). The game ends if the King is checkmated. Fact: The King is the only piece that cannot be captured, and it is the only piece that cannot move into a square attacked by an opponent. The Queen: The most powerful piece. Combines the movement of the Rook and Bishop; it can move any number of unobstructed squares in a straight line orthogonally or diagonally. Fact: From the center of an empty board, the Queen has a maximum mobility of 27 squares. The Rook: Moves any number of unobstructed squares orthogonally (along ranks and files). Maximum mobility: 14 squares. The Bishop: Moves any number of unobstructed squares diagonally. Fact: A Bishop can only ever traverse the 32 squares of the color it started on. Maximum mobility: 13 squares. The Knight: The only piece that jumps over other pieces. Moves in an \"L-shape\" (two squares in one orthogonal direction, then one square perpendicular). Maximum mobility: 8 squares. The Pawn: Moves strictly forward (toward the opponent's side) one square at a time. Fact: The Pawn is the only piece that captures differently than it moves; it captures one square diagonally forward. On its first move, a pawn may advance two squares simultaneously. Point Values (Heuristic Data): Material value is mathematically approximated based on mobility and control: Pawn = 1, Knight = 3, Bishop = 3, Rook = 5, Queen = 9. The King has infinite value (game termination). 3. Special Moves and Historical Codification: Castling: A compound move involving the King and a Rook. The King moves two squares horizontally toward the Rook, and the Rook jumps to the square the King crossed. Fact: Castling was standardized in 1620 and requires four strict conditions: neither piece has moved previously; no pieces stand between them; the King is not currently in check; and the King does not pass through or land on a square attacked by the opponent. En Passant: A highly specific capture rule introduced in the 15th century to prevent a pawn from bypassing an enemy pawn. If a pawn moves two squares forward from its starting position and lands beside an enemy pawn, the enemy pawn can capture it as if it had only moved one square. Fact: This option is legally available only on the immediately following move; if not executed, the right is permanently lost. Promotion: The FIDE Law of Chess states that when a pawn reaches the eighth rank, it must be exchanged for a Queen, Rook, Bishop, or Knight of the same color. Fact: There is no limit to how many promoted pieces can exist on the board (a player could theoretically have nine Queens). Promoting to a piece other than a Queen is called underpromotion, which occurs in approximately 1.5% of all promotions in master-level play. What to Expect: A rigorous, technical breakdown of board geometry, movement physics, and FIDE-legal special moves. The factual structure establishes the unyielding rules of the system, clarifying the exact mathematical parameters of how every piece operates on the grid. Expected Outcome: The student possesses absolute, factual certainty of the board's coordinate system and the legal movement parameters of all six piece types. They can identify any square's color complex, understand the physical limitations of each piece, and accurately define the legal conditions for castling, en passant, and promotion."
  ],
  "initialFen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
  "checkpoint": {
    "question": "Under what specific condition is the En Passant capture legally available?",
    "options": [
      "Whenever any enemy pawn reaches the fifth rank",
      "Only immediately on the turn after an opponent pawn advances two squares past your fifth-rank pawn",
      "Only after both players have castled their kings",
      "Any time a knight and pawn coordinate on the same file"
    ],
    "correctIndex": 1,
    "explanation": "En passant must be executed immediately on the turn after the opponent’s two-square pawn advance; otherwise the legal right to capture en passant is permanently forfeited.",
    "takeaway": "Rules of chess reward alertness: timing matters as much as geometry."
  },
  "visualPlacement": {
    "concept": "The Board, the Pieces and How They Move",
    "description": "A high-resolution labelled reference showing 8x8 chessboard geometry, coordinates (files a-h, ranks 1-8), color complexes, and starting piece placement.",
    "plannedAsset": "Downloaded licensed board-and-piece reference sheet from Lichess Chessground.",
    "assetStatus": "INSERTED",
    "assetPath": "/assets/chessbook/images/chessground-2d.png",
    "sourceUrl": "https://github.com/lichess-org/chessground",
    "license": "GPL-3.0",
    "attribution": "Lichess / Chessground (GPL-3.0) — Board Geometry and Piece Identification"
  }
};
