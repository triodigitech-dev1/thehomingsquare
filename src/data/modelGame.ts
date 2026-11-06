export interface WalkthroughStep {
  moveNumber: number;
  whiteMove: string;
  blackMove: string;
  fen: string;
  stage: 'Opening (P1-P7)' | 'Middlegame (M1-M7)' | 'Path Switch (A/B/C)' | 'Prophylaxis & Restriction' | 'Endgame (E1-E8)' | 'Universal Loop (M1 Re-run)';
  title: string;
  systemTool: string;
  annotation: string;
  highlightSquares?: string[];
}

export const MODEL_WALKTHROUGH_GAME: {
  title: string;
  event: string;
  players: string;
  summary: string;
  steps: WalkthroughStep[];
} = {
  title: 'Unit 8.2 Fully Annotated Capstone Walkthrough',
  event: 'Model Master Examination — Carlsbad Structure Mastery',
  players: 'White: System Practitioner vs. Black: Master Opponent',
  summary: 'Every single decision in this 42-move game is strictly traceable to a named layer of the Structure-First curriculum: P1-P7 in the opening, M1-M7 in the middlegame, a clean B->C path switch, and E1-E8 technical endgame conversion.',
  steps: [
    {
      moveNumber: 1,
      whiteMove: 'd4',
      blackMove: 'd5',
      fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2',
      stage: 'Opening (P1-P7)',
      title: 'P1: Dictate the Structure',
      systemTool: 'P1 (Dictate) & P4 (Minimise Branching)',
      annotation: 'White commits to 1.d4, aiming for a defined classical pawn skeleton. By avoiding multiple sharp sidelines, White directs the game toward familiar structural terrain.',
      highlightSquares: ['d4', 'd5']
    },
    {
      moveNumber: 3,
      whiteMove: 'cxd5',
      blackMove: 'exd5',
      fen: 'rnbqkbnr/ppp2ppp/8/3p4/3P4/2N5/PP2PPPP/R1BQKBNR b KQkq - 0 3',
      stage: 'Opening (P1-P7)',
      title: 'Structural Commitment: The Carlsbad Pawn Skeleton',
      systemTool: 'P1 (Structure Fixed) & P6 (No Weakness)',
      annotation: 'The exchange establishes the Carlsbad pawn skeleton: White has pawns on c2, d4, e3, while Black has pawns on c6, d5, e6. The terrain is now set for both armies.',
      highlightSquares: ['d5', 'c6']
    },
    {
      moveNumber: 11,
      whiteMove: 'Rab1',
      blackMove: 'Re8',
      fen: 'r2qr1k1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP1BBPPP/1R1Q1RK1 w - - 4 12',
      stage: 'Middlegame (M1-M7)',
      title: 'M1 Checkpoint: Name the Structure & One-Sentence Plan',
      systemTool: 'M1 Checkpoint & M3 (Pieces Follow Pawns)',
      annotation: 'By move 11, White pauses and writes the M1 label: Structure: Carlsbad Formation. One-sentence plan: "Execute the queenside minority attack with b4-b5 to soften Black\'s c6 pawn and establish an outpost on c5, while preventing ...e5." Rab1 prepares the b4 push.',
      highlightSquares: ['b1', 'b4']
    },
    {
      moveNumber: 14,
      whiteMove: 'h3',
      blackMove: 'Nf8',
      fen: 'r2qr1k1/pp2bppp/2p1pnn1/3p4/1PPP4/2N1PN1P/P2BBPP1/1R1Q1RK1 b - - 0 14',
      stage: 'Prophylaxis & Restriction',
      title: 'Prophylactic Move: Preventing Bg4 & Setting Safe Haven',
      systemTool: 'Unit 4.4 Prophylaxis ("What would they play?")',
      annotation: 'White asks: "What would Black play?" Black wishes to pin the f3 knight with ...Bg4 and loosen White\'s central grip. The prophylactic 14.h3 permanently denies the g4 square and provides luft for the king.',
      highlightSquares: ['h3', 'g4']
    },
    {
      moveNumber: 18,
      whiteMove: 'b5',
      blackMove: 'cxb5',
      fen: 'r2q1rk1/1p2bppp/4pnn1/1p1p4/2PP4/2N1PN1P/3BBPP1/1R1Q1RK1 w - - 0 19',
      stage: 'Middlegame (M1-M7)',
      title: 'M2 & M4: Executing the Minority Break',
      systemTool: 'M2 (Structure Dictates Break) & M6 (Release Tension)',
      annotation: 'White executes the break b4-b5. Black captures with ...cxb5. Now Black’s c6 pawn is gone, leaving d5 isolated and b7 a backward target on the open b-file.',
      highlightSquares: ['b5', 'd5', 'b7']
    },
    {
      moveNumber: 24,
      whiteMove: 'Qc2',
      blackMove: 'Rc8',
      fen: '2r2rk1/1p2bppp/4pnn1/1N1p4/3P4/4PN1P/2QBBPP1/1R4K1 w - - 4 25',
      stage: 'Prophylaxis & Restriction',
      title: 'Restrictive Move: Stopping Black’s ...e5 Break',
      systemTool: 'Unit 4.4 Restriction & Outpost Domination',
      annotation: 'White’s knight cements itself on c5 while the queen exerts pressure along the c-file. Black is denied the liberating ...e6-e5 break because the d5 pawn would collapse.',
      highlightSquares: ['c5', 'e5']
    },
    {
      moveNumber: 29,
      whiteMove: 'Qxc8',
      blackMove: 'Qxc8',
      fen: '2q3k1/1p2bppp/4pnn1/1N1p4/3P4/4PN1P/3BBPP1/1R4K1 w - - 0 30',
      stage: 'Path Switch (A/B/C)',
      title: 'Path Switch: Path B -> Path C (The Convert)',
      systemTool: 'Unit 5.1 Switching Table (Trade into Favourable Ending)',
      annotation: 'Condition trigger: Queens and heavy pieces are exchanged. White has a permanent structural weakness to target on b7 and superior knight vs bishop. White switches from Path B (Positional build) into Path C (Technical Endgame conversion).',
      highlightSquares: ['c8', 'b7']
    },
    {
      moveNumber: 34,
      whiteMove: 'Kf1',
      blackMove: 'Kf8',
      fen: '5k2/1p2bppp/4pnn1/1N1p4/3P4/4PN1P/3B1PP1/1R3K2 w - - 2 35',
      stage: 'Endgame (E1-E8)',
      title: 'Endgame Principle E1: Activate the King',
      systemTool: 'E1 (Activate King before Pawns) & E5 (Trade by Need)',
      annotation: 'Instead of rushing pawn pushes, White centralizes the king toward d3 and e2. In the endgame, the king is an active fighting piece.',
      highlightSquares: ['f1', 'e2', 'd3']
    },
    {
      moveNumber: 42,
      whiteMove: 'Rxb7',
      blackMove: 'Resigns',
      fen: '8/1R3ppp/4k3/1N1p4/3P4/3KPN1P/5PP1/8 b - - 0 42',
      stage: 'Universal Loop (M1 Re-run)',
      title: 'Clean Conversion: Structural Target Harvested',
      systemTool: 'Winning Rule W4 & Clean Handshake',
      annotation: 'The b7 pawn falls. White has a clear outside passed pawn and dominant king. Black resigns. Notice how every move derived from the initial Carlsbad pawn skeleton.',
      highlightSquares: ['b7']
    }
  ]
};
