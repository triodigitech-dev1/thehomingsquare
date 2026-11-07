/**
 * Official Curriculum Unit: 1.1 — Cognitive Architecture of Chess Expertise
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unit1_1: CurriculumUnit = {
  "id": "unit_1_1",
  "chapterId": "ch_1",
  "chapterNumber": 1,
  "unitCode": "1.1",
  "title": "Cognitive Architecture of Chess Expertise",
  "subtitle": "Cognitive Architecture of Chess Expertise — Textbook Curriculum Unit 1.1",
  "whatToLearn": "Cognitive Architecture of Chess Expertise — core principles, structural mechanics, and theoretical foundations as codified in the master curriculum.",
  "whatToExpect": "A rigorous, data-grounded examination of the original experiments that established the cognitive architecture of chess expertise. The unit progresses from de Groot's foundational recall figures through Chase and Simon's quantitative chunking data to the 50,000-chunk estimate and the working-memory constraints that make chunking necessary. The student will encounter the exact percentages, piece-recall counts, and experimental conditions that define the scientific consensus on how experts perceive the board.",
  "expectedOutcome": "The student can cite the key experimental findings (de Groot's recall percentages, Chase and Simon's piece-recall data, the 50,000-chunk estimate) and explain the empirical distinction between recognition and calculation. They understand that expertise is built through the acquisition of stored structural patterns, not through superior general memory or search depth, and that this understanding has direct implications for how they should train.",
  "summary": "Their experimental data provided the quantitative baseline for the expertise gap. In a five-second exposure to a real game position, a chess master correctly placed 16 out of 24 pi...",
  "contentParagraphs": [
    "Their experimental data provided the quantitative baseline for the expertise gap. In a five-second exposure to a real game position, a chess master correctly placed 16 out of 24 pieces on the first attempt. A Class A player placed 8 out of 24. A beginner placed only 4 out of 24. The master's chunks contained three to six pieces, compared with essentially single pieces in the novice's chunks. The master's superiority vanished entirely when the pieces were placed randomly, confirming that the chunks are not raw features but learned structural patterns stored in long- term memory (LTM). 3. The Size of the Database: Gobet & Simon (1996) The question of how many chunks a master possesses was addressed through computer simulation matched against human experimental data. The widely cited estimate, supported by this comparison, is that chess Masters store approximately 50,000 chunks in long-term memory. Subsequent work by Simon and Gilmartin estimated that a master's \"vocabulary\" could extend to over 50,000 acquired chunks, comparable to the number of words used in many languages. This figure represents the scale of the pattern database required for master-level play. 4. Working Memory Constraints The chunking mechanism operates within fixed cognitive limits. The bottleneck is not memory span but the size and organization of the chunks stored in long-term memory. The master does not hold more raw information in short-term memory than a novice; they hold the same limited number of chunks (4 to 7), but each chunk contains vastly more structured information. Chase and Simon concluded that masters need only hold in short-term memory a set of identifying labels, each representing a chunk, while the full structural detail resides in long-term memory. 5. Recognition vs. Calculation: The Empirical Distinction De Groot's analysis of verbal protocols from his subjects found that none of the statistics characterizing search processes—number of moves examined, depth of search, speed of search—distinguished the grandmasters from ordinary players. He could separate them only by the quality of their chosen move. The explanation lay in perception, not calculation. The expert's advantage is in the Orientation phase (the initial assessment of the position), where stored patterns are recognized and candidate moves are generated rapidly. Calculation is then applied selectively to the critical branches that recognition has identified. The empirical record supports the conclusion that expert chess play is characterized by rapid recognition of stored patterns, followed by selective calculation, not by a generally superior search process. What to Expect: A rigorous, data-grounded examination of the original experiments that established the cognitive architecture of chess expertise. The unit progresses from de Groot's foundational recall figures through Chase and Simon's quantitative chunking data to the 50,000-chunk estimate and the working-memory constraints that make chunking necessary. The student will encounter the exact percentages, piece-recall counts, and experimental conditions that define the scientific consensus on how experts perceive the board. Expected Outcome: The student can cite the key experimental findings (de Groot's recall percentages, Chase and Simon's piece-recall data, the 50,000-chunk estimate) and explain the empirical distinction between recognition and calculation. They understand that expertise is built through the acquisition of stored structural patterns, not through superior general memory or search depth, and that this understanding has direct implications for how they should train."
  ],
  "initialFen": "r1b2rk1/pp1nqppp/2pbpn2/3p4/2PP4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 4 9",
  "checkpoint": {
    "question": "How do chess grandmasters demonstrate superior memory compared to novices in cognitive research?",
    "options": [
      "Grandmasters have a higher general IQ and superior photographic memory for any visual stimuli",
      "Grandmasters recall meaningful chess positions through structural chunking, but perform no better than novices on random piece placements",
      "Grandmasters calculate every legal move tree up to 30 plies deep from move one",
      "Grandmasters rely entirely on subconscious instinct without structural knowledge"
    ],
    "correctIndex": 1,
    "explanation": "De Groot and Chase & Simon showed that grandmaster memory superiority is domain-specific, relying on learned \"chunks\" of structural relationships. When pieces are placed randomly, grandmaster recall drops to novice levels.",
    "takeaway": "Chess expertise is built on structured pattern vocabulary, not genetic photographic memory."
  },
  "visualPlacement": {
    "concept": "Cognitive Architecture of Chess Expertise",
    "description": "A comparative cognitive study diagram showing de Groot & Chase-Simon chunking, comparing master pattern recognition with novice piece-by-piece perception.",
    "plannedAsset": "Downloaded research figure or licensed educational chess cognitive graphic.",
    "assetStatus": "PLACEHOLDER"
  }
};
