import { Flashcard } from '../types/chess';

export const DRILL_FLASHCARDS: Flashcard[] = [
  // 1. Structure Flashcards
  {
    id: 'drill_struct_carlsbad',
    type: 'structure',
    category: 'Structure Flashcard',
    prompt: 'Name this pawn structure (c4-d4-e3 vs c6-d5-e6) and specify White’s primary strategic break.',
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
    options: [
      'Carlsbad Structure — Minority attack with b4-b5',
      'Hedgehog Structure — Break with d4-d5',
      'French Advance — Attack base with f4-f5',
      'Benoni Formation — Queenside pawn majority advance'
    ],
    solution: 'Carlsbad Structure — Minority attack with b4-b5',
    explanation: 'The Carlsbad pawn formation features White pawns on a2-b2-d4-e3 and Black on a7-b7-c6-d5-e6. White’s standard plan is the minority attack b4-b5 to soften the backward c6 pawn and establish an outpost on c5.'
  },
  {
    id: 'drill_struct_iqp',
    type: 'structure',
    category: 'Structure Flashcard',
    prompt: 'What is the dominant pawn structure here, and what is White’s critical breakthrough move?',
    fen: 'r1bq1rk1/pp1nbppp/4pn2/3p4/3P4/2N1PN2/PP1BBPPP/R2Q1RK1 w - - 0 9',
    options: [
      'Isolated Queen’s Pawn (IQP) — Breakthrough d4-d5',
      'Carlsbad Formation — Break b4-b5',
      'Stonewall — Break f4-f5',
      'King’s Indian — Break c4-c5'
    ],
    solution: 'Isolated Queen’s Pawn (IQP) — Breakthrough d4-d5',
    explanation: 'White possesses an isolated pawn on d4 with no friendly c- or e-pawns. The central dynamiting break d4-d5 opens lines for pieces before Black blockades on d5.'
  },
  {
    id: 'drill_struct_hedgehog',
    type: 'structure',
    category: 'Structure Flashcard',
    prompt: 'Identify this flexible defensive setup with pawns on a6, b6, d6, e6 and name Black’s two liberating breaks.',
    fen: 'r1bq1rk1/1p1nbppp/p2ppn2/8/2PNP3/2N1B3/PP2BPPP/R2Q1RK1 w - - 0 10',
    options: [
      'The Hedgehog — Breaks with ...b5 or ...d5',
      'Sicilian Dragon — Breaks with ...h5 or ...f5',
      'French Defence — Breaks with ...c5 or ...f6',
      'Stonewall — Breaks with ...e5'
    ],
    solution: 'The Hedgehog — Breaks with ...b5 or ...d5',
    explanation: 'The Hedgehog is characterized by pawns tucked quietly on the 6th rank behind spines. Black absorbs pressure and strikes with ...b6-b5 or ...d6-d5.'
  },

  // 2. Named Mating Patterns (P6)
  {
    id: 'drill_mate_smothered',
    type: 'mating_pattern',
    category: 'Mating Patterns (P6)',
    prompt: 'Black’s king on h8 is surrounded by friendly pawns on g7, h7 and rook on f8. White has a knight on f7. What is this classic pattern?',
    fen: '6rk/5Npp/8/8/8/8/8/7K b - - 0 1',
    options: [
      'Smothered Mate (Philidor’s Legacy)',
      'Arabian Mate',
      'Boden’s Mate',
      'Back-Rank Mate'
    ],
    solution: 'Smothered Mate (Philidor’s Legacy)',
    explanation: 'Smothered Mate occurs when a knight delivers checkmate to a king trapped entirely by its own surrounding pieces.'
  },
  {
    id: 'drill_mate_arabian',
    type: 'mating_pattern',
    category: 'Mating Patterns (P6)',
    prompt: 'A rook delivers checkmate on h7 or g8 while supported by a knight on f6. What is this named pattern?',
    fen: '5rk1/5ppp/5N2/8/8/8/8/4R1K1 w - - 0 1',
    options: [
      'Arabian Mate',
      'Anastasia’s Mate',
      'Legal’s Mate',
      'Greco’s Mate'
    ],
    solution: 'Arabian Mate',
    explanation: 'The Arabian Mate is one of the oldest recorded patterns: the knight guards the rook and covers flight squares (like g8/h7) while the rook delivers the fatal blow.'
  },
  {
    id: 'drill_mate_anastasia',
    type: 'mating_pattern',
    category: 'Mating Patterns (P6)',
    prompt: 'A knight on e7 cuts off the g6 and g8 escape squares while a rook delivers mate on the open h-file. Name this pattern.',
    fen: '5r2/4N1pk/8/8/8/8/8/R6K w - - 0 1',
    options: [
      'Anastasia’s Mate',
      'Boden’s Mate',
      'Epaulette Mate',
      'Greek Gift'
    ],
    solution: 'Anastasia’s Mate',
    explanation: 'Anastasia’s Mate traps the enemy king on the edge of the board between friendly pawns and an aggressive knight on e7/e2, finalized by a rook or queen down the h-file.'
  },
  {
    id: 'drill_mate_bodens',
    type: 'mating_pattern',
    category: 'Mating Patterns (P6)',
    prompt: 'Two bishops deliver checkmate along criss-crossing diagonals against a king whose flight squares are blocked by friendly pieces. Name this pattern.',
    fen: '2kr4/3b1p2/8/8/8/8/2B5/3B1K2 w - - 0 1',
    options: [
      'Boden’s Mate',
      'Smothered Mate',
      'Legal’s Mate',
      'Arabian Mate'
    ],
    solution: 'Boden’s Mate',
    explanation: 'Boden’s Mate features two intersecting bishop diagonals cutting down a king castled queenside or trapped on d8/c8.'
  },

  // 3. V1 Scan Drills
  {
    id: 'drill_scan_v1_order',
    type: 'v1_scan',
    category: 'V1 Scan Order',
    prompt: 'Before considering candidate attacking moves, what is the strict order of elements in the V1 Scan Protocol?',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    options: [
      'Checks → Captures → Threats → Loose Pieces → King Safety',
      'Loose Pieces → Checks → Captures → Candidates',
      'Candidate Generation → King Safety → Checks → Threats',
      'Pawn Breaks → Outposts → Material Balance'
    ],
    solution: 'Checks → Captures → Threats → Loose Pieces → King Safety',
    explanation: 'The V1 Scan Order is an unvarying perceptual checklist to eliminate blind-spots: Checks, Captures, Threats, Loose Pieces, and King Safety.'
  },

  // 4. Path Switching (A/B/C)
  {
    id: 'drill_path_switch_1',
    type: 'path_choice',
    category: '3-Path Conversion Filter',
    prompt: 'You have a structural plus in a Carlsbad position with active knights. Your opponent just offered a queen exchange. Trading queens enters a rook endgame with an outside passed pawn. Which path transition should you execute?',
    fen: 'r4rk1/pp1nbppp/2p1pn2/3p4/2PP4/1PN1PN2/PB2BPPP/R2Q1RK1 w - - 0 10',
    options: [
      'Path B → Path C (Transition from Positional Build to Technical Endgame)',
      'Path B → Path A (Force an immediate speculative king attack)',
      'Decline the queen trade and keep all pieces on the board at all costs',
      'Offer a draw immediately'
    ],
    solution: 'Path B → Path C (Transition from Positional Build to Technical Endgame)',
    explanation: 'When a favourable trade arises that leads to an easily converted endgame without counterplay, the switching table dictates Path B → Path C.'
  },

  // 5. Defensive Technique (4.3)
  {
    id: 'drill_defense_fortress',
    type: 'defense',
    category: 'Defensive Resources (Unit 4.3)',
    prompt: 'You are down two pawns, but each side has a single bishop on opposite colors. What is the key to holding a fortress draw?',
    fen: '8/8/4k3/4b3/8/4B3/4P3/4K3 w - - 0 1',
    options: [
      'Blockade the opponent’s pawns on the color complex of your own bishop, rendering them permanently immobile',
      'Sacrifice your bishop for a knight',
      'Advance all your pawns to the 7th rank',
      'Attack the opponent’s king from behind'
    ],
    solution: 'Blockade the opponent’s pawns on the color complex of your own bishop, rendering them permanently immobile',
    explanation: 'In opposite-coloured bishop endings, a blockade on the squares controlled by your bishop cannot be broken because the opponent’s bishop can never influence those squares.'
  }
];
