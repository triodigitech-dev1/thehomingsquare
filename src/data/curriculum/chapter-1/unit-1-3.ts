/**
 * Official Curriculum Unit: 1.3 — Geometry and Spatial Intelligence
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unit1_3: CurriculumUnit = {
  "id": "unit_1_3",
  "chapterId": "ch_1",
  "chapterNumber": 1,
  "unitCode": "1.3",
  "title": "Geometry and Spatial Intelligence",
  "subtitle": "Geometry and Spatial Intelligence — Textbook Curriculum Unit 1.3",
  "whatToLearn": "Geometry and Spatial Intelligence — core principles, structural mechanics, and theoretical foundations as codified in the master curriculum.",
  "whatToExpect": "A rigorous, empirically grounded examination of the board as a geometric system and the spatial-cognitive mechanisms that distinguish expert perception. The unit progresses from the formal geometry of files, ranks, diagonals, and colour complexes, to the empirical data on how experts and novices differ in their spatial representation of the board, to the specific role of visuo-spatial working memory and the chessboard display, to the practical techniques of mental visualisation, re-anchoring, and layered perception.",
  "expectedOutcome": "The student can explicitly describe the board's geometric structure (files, ranks, diagonals, colour complexes, outposts) and understand its strategic implications. They can state the empirical finding that expert spatial representation is less anchored by physical proximity and more by functional relationships, and that the chessboard display itself is necessary for the expert memory effect. They have been introduced to the techniques of re-anchoring during calculation and the layered perception (pawn skeleton → piece geometry → dynamic lines) that characterizes expert board vision.",
  "summary": "The practical consequence is the necessity of re-anchoring. During calculation, the mental image of the board degrades. The disciplined calculator periodically stops, re-counts mat...",
  "contentParagraphs": [
    "The practical consequence is the necessity of re-anchoring. During calculation, the mental image of the board degrades. The disciplined calculator periodically stops, re-counts material, and re-states the precise location of the pieces before continuing. This is not a sign of weakness; it is a technique used by experts to maintain the fidelity of the mental image. 5. Seeing the Board in Layers The mature expert does not see a single, undifferentiated mass of pieces. They see the board in distinct, hierarchically organized layers: Layer 1: The Pawn Skeleton. The fixed or semi-fixed structure of the pawns, which defines the strategic geography of the position. The pawns are the most stable element; they change slowly and determine the long- term plans. Layer 2: The Piece Geometry. The placement of the pieces relative to the pawn skeleton and to each other. This layer includes the identification of outposts, open files, and the coordination (or lack thereof) between the pieces. Layer 3: The Dynamic Lines. The tactical possibilities that arise from the interaction between the piece geometry and the pawn skeleton. This layer includes the calculation of concrete lines, the identification of tactical motifs, and the evaluation of forcing moves. The expert can consciously shift between these layers, asking: What does the pawn structure demand? How are the pieces placed to serve that demand? What are the immediate tactical consequences? What to Expect: A rigorous, empirically grounded examination of the board as a geometric system and the spatial-cognitive mechanisms that distinguish expert perception. The unit progresses from the formal geometry of files, ranks, diagonals, and colour complexes, to the empirical data on how experts and novices differ in their spatial representation of the board, to the specific role of visuo-spatial working memory and the chessboard display, to the practical techniques of mental isation, re-anchoring, and layered perception. Expected Outcome: The student can explicitly describe the board's geometric structure (files, ranks, diagonals, colour complexes, outposts) and understand its strategic implications. They can state the empirical finding that expert spatial representation is less anchored by physical proximity and more by functional relationships, and that the chessboard display itself is necessary for the expert memory effect. They have been introduced to the techniques of re-anchoring during calculation and the layered perception (pawn skeleton → piece geometry → dynamic lines) that characterizes expert board vision."
  ],
  "initialFen": "r1bq1rk1/pp3ppp/2n1pn2/2pp4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 8",
  "checkpoint": {
    "question": "What is the primary cognitive mechanism behind board geometry and spatial visualization in calculation?",
    "options": [
      "Static memorisation of coordinate numbers without visualizing lines",
      "Visuo-spatial working memory maintaining and transforming dynamic candidate trajectories across geometric lines and color complexes",
      "Calculating all pawn moves before considering minor pieces",
      "Counting the total number of squares controlled by each side on every move"
    ],
    "correctIndex": 1,
    "explanation": "Spatial intelligence in chess requires visuo-spatial working memory to manipulate dynamic piece trajectories, identify intersecting attack lines, and maintain visual board integrity several moves ahead.",
    "takeaway": "Visualisation is mental clarity: re-anchor your board image after every branch in your calculation tree."
  },
  "visualPlacement": {
    "concept": "Geometry and Spatial Intelligence",
    "description": "An overhead board diagram displaying geometric vectors, ray intersections, knight trajectory rings, and visuo-spatial memory coordinates.",
    "plannedAsset": "Downloaded open board-geometry illustration.",
    "assetStatus": "PLACEHOLDER"
  }
};
