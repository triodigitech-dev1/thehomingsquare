/**
 * Official Curriculum Unit: App.4 — 4. In-Game Execution
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unitApp_4: CurriculumUnit = {
  "id": "unit_app_4",
  "chapterId": "ch_app",
  "chapterNumber": "App",
  "unitCode": "App.4",
  "title": "4. In-Game Execution",
  "subtitle": "4. In-Game Execution — Textbook Curriculum Unit App.4",
  "whatToLearn": "4. In-Game Execution — core principles, structural mechanics, and theoretical foundations as codified in the master curriculum.",
  "whatToExpect": "Rigorous, structured breakdown of the concepts with clear pedagogical explanations and objective evaluation principles.",
  "expectedOutcome": "The student demonstrates complete conceptual mastery of 4. In-Game Execution, recognizing the patterns and executing the decisions with accuracy.",
  "summary": "4. IN-GAME EXECUTION E X P L A N AT I O N TO S O U R C E 4. IN-GAME EXECUTION A colour instructional image should appear here to explain “4. IN-GAME EXECUTION” at a glance: show th...",
  "contentParagraphs": [
    "4. IN-GAME EXECUTION E X P L A N AT I O N TO S O U R C E 4. IN-GAME EXECUTION A colour instructional image should appear here to explain “4. IN-GAME EXECUTION” at a glance: show the relevant board position, movement, pattern, player, object, or historical context with labels readable in print. Asset status: not inserted yet. Source a downloaded public-domain or Creative Commons file, verify the file-level licence, and add attribution before publication. During the game, the system is the discipline. The clock is a resource. A. The V1 Scan. Run the fixed scan order on every move: Checks → Captures → Threats for both sides → Loose Pieces → King Safety → Candidates. Do this before you generate your own moves. The scan is opponent-inclusive. B. The G1 Blunder Check. Before every move, ask: What does their last move threaten, and does my move leave anything hanging? This is not optional. It is the last line of defence. C. The M1 Checkpoint. After every trade or pawn break, re-run M1: Has the structure changed, and is the plan still correct? The player who does not re-run M1 is executing a plan for a position that no longer exists.",
    "D. The Time Sort. Before you spend time on a move, classify the decision: Automatic (play immediately), Simple (use the three questions), Critical (spend the big time), Strategic (use judgment and pattern recognition). Do not spend twenty minutes on an automatic move. Do not spend two minutes on a critical one. E. The Conversion Path Check. On every move after the middlegame has clarified, ask: Which path is live? Path A (Tactical), Path B (Positional), or Path C (Technical)? If the conditions change, switch. The paths are not commitments."
  ],
  "initialFen": "r1b2rk1/pp1nqppp/2p1pn2/3p4/2PP4/1PNBPN2/P2Q1PPP/R4RK1 w - - 3 11",
  "checkpoint": {
    "question": "What are the two mandatory safety checks that must be executed on every turn during In-Game Execution?",
    "options": [
      "Checking the arbiter’s badge and looking at spectator faces",
      "The V1 Scan (opponent-inclusive threats) and the G1 Blunder Check (what does their move threaten, and does my move leave anything hanging?)",
      "Checking opening notes on your phone and offering a draw",
      "Pushing pawns immediately to save clock time"
    ],
    "correctIndex": 1,
    "explanation": "The V1 Scan and G1 Blunder Check form the non-negotiable safety net of serious play. Verifying opponent threats and ensuring no piece is left hanging stops game-ending blunders before they happen.",
    "takeaway": "The G1 blunder check is your last line of defence: never release a piece without asking what is hanging."
  },
  "visualPlacement": {
    "concept": "4. In-Game Execution",
    "description": "An in-game decision checklist graphic showing the V1 scan, G1 blunder check, M1 structural checkpoint, and time management allocation.",
    "plannedAsset": "Downloaded open in-game execution checklist diagram.",
    "assetStatus": "PLACEHOLDER"
  }
};
