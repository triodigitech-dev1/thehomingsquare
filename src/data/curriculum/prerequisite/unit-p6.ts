/**
 * Official Curriculum Unit: P6 — Basic Mating Patterns and King-Attack Themes
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unitP6: CurriculumUnit = {
  "id": "unit_p6",
  "chapterId": "ch_p",
  "chapterNumber": "P",
  "unitCode": "P6",
  "title": "Basic Mating Patterns and King-Attack Themes",
  "subtitle": "Basic Mating Patterns and King-Attack Themes — Textbook Curriculum Unit P6",
  "whatToLearn": "Basic Mating Patterns and King-Attack Themes — core principles, structural mechanics, and theoretical foundations as codified in the master curriculum.",
  "whatToExpect": "A rigorous, data-grounded study of the most common ways games actually end. The unit progresses from the statistical landscape of checkmate (where kings are mated, which pieces deliver the blow, at what move) to the precise geometry of each named pattern, to the specific prerequisites and empirical success rates of the Greek Gift, and finally to the structural logic of opposite-side castling and pawn storms. The student will encounter labelled mate-in-1, mate- in-2, and mate-in-3 puzzles organized by pattern, and will be required to name the pattern before solving it— enforcing recognition, not calculation.",
  "expectedOutcome": "The student demonstrates complete conceptual mastery of Basic Mating Patterns and King-Attack Themes, recognizing the patterns and executing the decisions with accuracy.",
  "summary": "3. The Greek Gift Sacrifice (Bxh7+ / Bxh2+): Prerequisites and Empirical Data The Greek Gift is a bishop sacrifice designed to rip open the enemy king's castled position, followed ...",
  "contentParagraphs": [
    "3. The Greek Gift Sacrifice (Bxh7+ / Bxh2+): Prerequisites and Empirical Data The Greek Gift is a bishop sacrifice designed to rip open the enemy king's castled position, followed by rapid infiltration of the knight and queen. It is not a pattern to play on instinct. Masters use chunking heuristics to verify strict prerequisites before committing: The Defender is Missing: The knight on f6 must be absent or driven away. If it is present, the sacrifice fails immediately. The Escape is Blocked: The defender must not be able to retreat to g8 and survive. White must be able to generate a mating net or win material. Pathways are Open: White needs a bishop targeting h7, a knight ready to jump to g5, and an open diagonal for the queen to swing to h5 or g4. The empirical data reveals a stark skill gap. In one dataset, the Bxh7+ sacrifice exhibits one of the highest standard deviations in success rate across rating bands. Sub-1500 players launch unsound Greek Gifts in 41% of attempts, confusing aggression with validated calculation. The sacrifice occurs relatively frequently in play, especially at amateur and club level, but frequency is not the same as soundness. 4. Opposite-Side Castling and Pawn Storms: The Empirical Data When kings castle on opposite sides, the game becomes sharper and more imbalanced. The data from 2,098,823,120 Lichess games (2023–2025) shows that opposite-side castling gives White a 49.3% win rate, compared to 48.7% when both players castle kingside. The overall boost to White's win rate is +0.6% compared to same-side castling. The theoretical explanation is structural. When kings are on opposite wings, each player's pawns are free to advance against the opponent's castled position without exposing their own king. A pawn storm—pushing a group of usually three pawns aggressively forward—is the natural attacking method in these positions. The pawns aim to open files and diagonals for the rooks and queen, while the attacker's own king remains safely behind its own pawns. The historical literature on opposite-side castling is explicit about the required mindset: \"speed plays a most significant role in the pawn storm... success in a pawn attack goes to whoever is the first to be able to seize the initiative\". The attacking player must accept that \"one has burnt one's boats\"—the position demands concrete calculation and exact judgment, not general principles. 5. Defensive Awareness: The Antidotes Every mating pattern has a defensive antidote, and the student must learn both sides of the coin: Against the back-rank mate: create luft (an escape square) before the position becomes critical. Against the Greek Gift: keep a knight on f6, or ensure the queen can cover the mating squares. Against opposite-side castling attacks: count tempi, consider counter-play in the center, and do not allow the attacker to open files without cost. What to Expect: A rigorous, data-grounded study of the most common ways games actually end. The unit progresses from the statistical landscape of checkmate (where kings are mated, which pieces deliver the blow, at what move) to the precise geometry of each named pattern, to the specific prerequisites and empirical success rates of the Greek Gift, and finally to the structural logic of opposite-side castling and pawn storms. The student will encounter labelled mate-in-1, mate- in-2, and mate-in-3 puzzles organized by pattern, and will be required to name the pattern before solving it— enforcing recognition, not calculation. Expected Outcome:",
    "The student can name and execute the standard mating patterns, understands their relative frequency in practical play, and can apply the prerequisite checklist for the Greek Gift before committing to the sacrifice. They can explain the structural logic of opposite-side castling and pawn storms, and they can recognise the defensive resources that refute each pattern. They approach mating patterns as empirically validated configurations, not as isolated tricks."
  ],
  "initialFen": "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1",
  "checkpoint": {
    "question": "What is the defining structural characteristic of a Smothered Mate?",
    "options": [
      "Two connected bishops cross-fire diagonally against an open king",
      "A knight delivers checkmate to an enemy king whose flight squares are entirely blocked by its own friendly pieces",
      "A rook cuts off the back rank while pawns push forward",
      "A queen and pawn execute an unstoppable corridor battery"
    ],
    "correctIndex": 1,
    "explanation": "Smothered mate occurs when a king is imprisoned by its own pieces (often trapped in a corner or back rank after a sacrifice), allowing an enemy knight to deliver inescapable checkmate.",
    "takeaway": "Friendly pieces can become fatal obstacles when space around the king is completely constricted."
  },
  "visualPlacement": {
    "concept": "Basic Mating Patterns and King-Attack Themes",
    "description": "A colour diagram plate illustrating back-rank, smothered, Arabian, Anastasia, Boden’s, and corridor mating patterns with attack vectors highlighted.",
    "plannedAsset": "Downloaded open mating-pattern diagram set.",
    "assetStatus": "PLACEHOLDER"
  }
};
