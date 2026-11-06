import { PawnStructureProfile } from '../types/chess';

export const PAWN_STRUCTURES: PawnStructureProfile[] = [
  {
    id: 'carlsbad',
    name: 'Carlsbad Formation',
    category: 'Classical',
    whitePawnSkeleton: ['a2', 'b2', 'd4', 'e3', 'f2', 'g2', 'h2'],
    blackPawnSkeleton: ['a7', 'b7', 'c6', 'd5', 'e6', 'f7', 'g7', 'h7'],
    oneSentencePlan: 'Conduct the queenside minority attack with b4-b5 to soften c6 and create an outpost on c5, while preventing ...e5.',
    whiteBreaks: ['b4-b5 (Minority Attack)', 'e3-e4 (Central Break)'],
    blackBreaks: ['...c6-c5', '...e6-e5'],
    keyOutposts: ['c5 for White knight', 'e4 for Black knight', 'e5 for White'],
    weaknesses: ['c6 backward pawn once b-file opens', 'd5 backward pawn if c-file traded'],
    sampleFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
    historicalModel: 'Botvinnik vs. Keres (1952), Petrosian vs. Spassky (1966)',
    notes: 'Arises primarily from Queen’s Gambit Declined Exchange Variation. The masterclass of structural clarity.'
  },
  {
    id: 'iqp',
    name: 'Isolated Queen’s Pawn (IQP)',
    category: 'Classical',
    whitePawnSkeleton: ['a2', 'b2', 'd4', 'f2', 'g2', 'h2'],
    blackPawnSkeleton: ['a7', 'b7', 'c6', 'e6', 'f7', 'g7', 'h7'],
    oneSentencePlan: 'Use superior space and outposts on e5/c5 for dynamic kingside attack, before Black stabilizes the d5 blockading square.',
    whiteBreaks: ['d4-d5 (The Breakthrough)'],
    blackBreaks: ['...e6-e5', '...b7-b5'],
    keyOutposts: ['e5 and c5 for White', 'd5 blockading square for Black knight'],
    weaknesses: ['d4 isolated pawn in the endgame', 'd5 square in front of the pawn'],
    sampleFen: 'r1bq1rk1/pp1nbppp/4pn2/3p4/3P4/2N1PN2/PP1BBPPP/R2Q1RK1 w - - 0 9',
    historicalModel: 'Karpov vs. Spassky (1974), Kasparov vs. Anand (1995)',
    notes: 'The great teacher of the dynamic vs. static tension. The side with the IQP must attack; the defender must trade into an endgame.'
  },
  {
    id: 'hanging_pawns',
    name: 'Hanging Pawns',
    category: 'Classical',
    whitePawnSkeleton: ['a2', 'c4', 'd4', 'f2', 'g2', 'h2'],
    blackPawnSkeleton: ['a7', 'b7', 'e6', 'f7', 'g7', 'h7'],
    oneSentencePlan: 'Maintain mobile tension with c4-d4, preparing a timed c5 or d5 break when tactical lines open the king.',
    whiteBreaks: ['d4-d5', 'c4-c5'],
    blackBreaks: ['...e6-e5', '...b7-b5'],
    keyOutposts: ['d5 and c5 squares for pieces'],
    weaknesses: ['c4 and d4 can become static targets if blockaded side-by-side'],
    sampleFen: 'r1bq1rk1/1p1nbppp/p3pn2/3p4/2PP4/1PN2N2/PB2BPPP/R2Q1RK1 w - - 0 11',
    historicalModel: 'Fischer vs. Spassky (1972, Game 6), Rubinstein vs. Salwe',
    notes: 'Mobile hanging pawns represent controlled force; immobile hanging pawns become grave positional liabilities.'
  },
  {
    id: 'hedgehog',
    name: 'The Hedgehog',
    category: 'Flank',
    whitePawnSkeleton: ['a2', 'b2', 'c4', 'e4', 'f2', 'g2', 'h2'],
    blackPawnSkeleton: ['a6', 'b6', 'd6', 'e6', 'f7', 'g7', 'h7'],
    oneSentencePlan: 'Absorb the spatial squeeze behind the 6th-rank spines, waiting patiently to strike with ...b5 or ...d5 when White overextends.',
    whiteBreaks: ['d4-d5', 'c4-c5', 'f2-f4-f5'],
    blackBreaks: ['...b6-b5', '...d6-d5'],
    keyOutposts: ['d5/c5 for White pieces', 'e5/c5 outposts for Black counterplay'],
    weaknesses: ['d6 backward pawn', 'spatial deficit if passive'],
    sampleFen: 'r1bq1rk1/1p1nbppp/p2ppn2/8/2PNP3/2N1B3/PP2BPPP/R2Q1RK1 w - - 0 10',
    historicalModel: 'Ljubojevic vs. Miles (1979), Andersson vs. Karpov',
    notes: 'The archetype of elastic counter-punching. The spines defend all entry squares.'
  },
  {
    id: 'kid_locked',
    name: 'King’s Indian Locked Centre',
    category: 'Indian',
    whitePawnSkeleton: ['c4', 'd5', 'e4', 'f3', 'g2', 'h2'],
    blackPawnSkeleton: ['c5', 'd6', 'e5', 'f5', 'g6', 'h7'],
    oneSentencePlan: 'Black launches an all-out kingside storm with ...f4, ...g5, ...h5; White must crash through on the queenside with c5.',
    whiteBreaks: ['c4-c5 (Queenside breach)'],
    blackBreaks: ['...f7-f5', '...f5-f4 followed by ...g5-g4'],
    keyOutposts: ['c6 for White knight', 'd4 for Black pieces (temporarily)'],
    weaknesses: ['d6 backward pawn', 'c7 vulnerable pawn', 'White king safety under storm'],
    sampleFen: 'r1bq1rk1/ppp1n1bp/3p2p1/3Ppp2/2P1P3/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 11',
    historicalModel: 'Gligoric vs. Fischer (1970), Kasparov vs. Piket (1995)',
    notes: 'A race between White’s positional destruction on the queenside and Black’s checkmating net on the kingside.'
  },
  {
    id: 'french_chain',
    name: 'French Advance Chain',
    category: 'French/Caro',
    whitePawnSkeleton: ['a2', 'b2', 'c3', 'd4', 'e5', 'f2', 'g2', 'h2'],
    blackPawnSkeleton: ['a7', 'b7', 'c5', 'd5', 'e6', 'f7', 'g7', 'h7'],
    oneSentencePlan: 'White defends the pawn chain base on d4 while angling toward kingside play; Black assaults the base with ...c5, ...Qb6, ...Nc6, and ...f6.',
    whiteBreaks: ['f2-f4-f5', 'c3-c4 (rare)'],
    blackBreaks: ['...c7-c5 (immediate base pressure)', '...f7-f6 (severing the head)'],
    keyOutposts: ['d4 and f4 for White', 'c4 and f5 for Black'],
    weaknesses: ['c8 light-squared French Bishop', 'd4 base for White'],
    sampleFen: 'r1bqk1nr/pp3ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 0 6',
    historicalModel: 'Nimzowitsch vs. Salwe (1911), Sveshnikov vs. Lputian',
    notes: 'Demonstrates Nimzowitsch’s core rule: attack a pawn chain at its base (d4), not its head (e5).'
  },
  {
    id: 'sicilian_dragon',
    name: 'Sicilian Dragon Structure',
    category: 'Sicilian',
    whitePawnSkeleton: ['a2', 'b2', 'c2', 'e4', 'f3', 'g2', 'h2'],
    blackPawnSkeleton: ['a7', 'b7', 'd6', 'e7', 'f7', 'g6', 'h7'],
    oneSentencePlan: 'Sharp opposite-wing warfare: White advances h4-h5 and castles queenside; Black uses the semi-open c-file and Bg7 laser diagonal.',
    whiteBreaks: ['h4-h5', 'd4-d5 (if possible)', 'f4-f5'],
    blackBreaks: ['...d6-d5', '...b7-b5'],
    keyOutposts: ['d5 for White', 'c4 for Black knight'],
    weaknesses: ['d6 backward pawn', 'h-file opening for White attack'],
    sampleFen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R w KQ - 0 8',
    historicalModel: 'Karpov vs. Korchnoi (1974), Fischer vs. Larsen (1958)',
    notes: 'One of the most concrete and razor-sharp structures in chess theory.'
  },
  {
    id: 'stonewall',
    name: 'Stonewall Formation',
    category: 'Practical',
    whitePawnSkeleton: ['a2', 'b2', 'c3', 'd4', 'e3', 'f4', 'g2', 'h2'],
    blackPawnSkeleton: ['a7', 'b7', 'c6', 'd5', 'e6', 'f5', 'g7', 'h7'],
    oneSentencePlan: 'Lock down the central e5/e4 square with knights and rooks, swinging the queen to h4/h5 for kingside assault.',
    whiteBreaks: ['e3-e4 (eventual breakout)', 'c3-c4'],
    blackBreaks: ['...c6-c5', '...e6-e5'],
    keyOutposts: ['e5 square for knight'],
    weaknesses: ['e4 hole in White camp', 'c1 bad bishop behind pawns'],
    sampleFen: 'rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP1P2/2N1PN2/PP4PP/R1BQKB1R w KQ - 0 7',
    historicalModel: 'Botvinnik vs. Vidmar (1936), Carlsen vs. Caruana',
    notes: 'Rock-solid structural clamp. Gives up central flexibility in exchange for concrete, repeatable attacking paths.'
  }
];

export const PRINCIPLES_OPENING = [
  { code: 'P1', title: 'Dictate the structure', rule: 'Commit on move one to a pawn formation that defines the game. If you don’t commit, your opponent does.', test: 'After Black’s most natural reply, is the pawn skeleton still the one I chose?', caveat: 'Committing also gives Black information.' },
  { code: 'P2', title: 'Force the opponent', rule: 'Your move should pose a concrete question Black must answer, not merely develop.', test: 'Can I state, in one sentence, the question my first move asks?', caveat: 'Solid answers exist for every first move.' },
  { code: 'P3', title: 'Prefer pawns to pieces for central control', rule: 'Use pawns to hold the centre and pieces to support them.', test: 'Would my control of this square survive a trade of minor pieces?', caveat: 'A strong tendency, not a law; hypermodern setups control the centre with pieces.' },
  { code: 'P4', title: 'Minimise the opponent’s branching', rule: 'Prefer a first move whose replies fall into few structural families, so one body of preparation covers most games.', test: 'How many unrelated defences must I prepare against this move?', caveat: 'Does not eliminate deep concrete lines.' },
  { code: 'P5', title: 'Have a repeatable plan', rule: 'Know your next three to five moves as defaults, before seeing Black’s reply.', test: 'Can I write my moves 2 to 4 right now?', caveat: 'Must remain alert to tactical disruptions.' },
  { code: 'P6', title: 'Do not weaken your own position', rule: 'Avoid pawn moves that create permanent holes or open diagonals without compensation.', test: 'What square or diagonal can no longer be defended by a pawn after this move?', caveat: 'Calculated tactical weaknesses can be justified.' },
  { code: 'P7', title: 'The initiative is a trade, not a free lunch', rule: 'Treat the initiative as borrowed. Ask what structural concession pays for it.', test: 'What do I give up for each tempo of initiative?', caveat: 'Sometimes the attack wins before the debt comes due.' }
];

export const PRINCIPLES_MIDDLEGAME = [
  { code: 'M1', title: 'Name the structure', rule: 'By move 10–12 write type + one-sentence plan. Universal loop: after every break or trade, re-run M1.' },
  { code: 'M2', title: 'Structure dictates the break', rule: 'Identify both sides’ breaks before choosing your own move. Your pawns point to where you play.' },
  { code: 'M3', title: 'Pieces follow pawns', rule: 'Pawn skeleton is the terrain; place pieces where pawn chains provide outposts and files.' },
  { code: 'M4', title: 'Stop their break first', rule: 'Prophylaxis precedes execution: restrict the opponent’s liberating pawn breaks before advancing your own.' },
  { code: 'M5', title: 'Trade by structure', rule: 'Exchange pieces that favor the opponent’s pawn structure or alleviate their cramped territory.' },
  { code: 'M6', title: 'Keep tension until release pays', rule: 'Premature pawn captures release central tension and clarify the opponent’s problems.' },
  { code: 'M7', title: 'Calculate before irreversible moves', rule: 'Pawn advances and piece sacrifices can never be taken back. Run Kotov tree falsification.' }
];

export const CONVERSION_PATHS = [
  {
    path: 'A' as const,
    name: 'The Hunt (Tactical / Forcing)',
    condition: 'A forcing calculation tree reaches a clear won position, king mating net, or overwhelming material gain.',
    rules: ['A1. Verify all checks and captures first', 'A2. Falsify your own winning candidate line', 'A3. Watch for desperado checks and stalemate traps', 'A4. If the forcing line fizzles, drop immediately back into Path B']
  },
  {
    path: 'B' as const,
    name: 'The Build (Positional / Accumulation)',
    condition: 'No immediate tactical finish exists. You have a structural plus, space edge, or the initiative.',
    rules: ['B1. Improve your worst-placed piece', 'B2. Create a second weakness before opening lines', 'B3. Prophylactically restrict counterplay', 'B4. Know when to stop: do not press beyond what the position warrants (W4)']
  },
  {
    path: 'C' as const,
    name: 'The Convert (Technical / Endgame)',
    condition: 'Material or structural edge allows trading down into an elementary won ending.',
    rules: ['C1. Check drawing mechanisms before trading (opposite-colored bishops, fortresses, wrong rook pawn)', 'C2. Activate king and rooks before advancing pawns (E1)', 'C3. Two weaknesses principle', 'C4. Accurate tablebase execution']
  }
];

export const ERROR_CATEGORIES: { category: 'Perception' | 'Visualisation' | 'Knowledge' | 'Decision'; label: string; description: string; remedy: string }[] = [
  {
    category: 'Perception',
    label: 'Perception (Missed Threat)',
    description: 'Failing to see a candidate move, opponent threat, or loose piece that was visible on the board right now.',
    remedy: 'Enforce strict V1 scan order: Checks → Captures → Threats → Loose Pieces → King Safety before candidate generation.'
  },
  {
    category: 'Visualisation',
    label: 'Visualisation (Calculation Error)',
    description: 'Miscalculating 2+ moves ahead, missing a quiet intermediate move (zwischenzug), or losing board coordinates in memory.',
    remedy: 'Practice single-branch calculation to completion with Kotov tree drills and coordinate re-anchoring.'
  },
  {
    category: 'Knowledge',
    label: 'Knowledge (Unfamiliar Pattern)',
    description: 'Not knowing a standard theoretical structure, must-know endgame (Lucena, Philidor), or tactical mating theme.',
    remedy: 'Turn the mistake directly into a Drill Hall flashcard; review the corresponding unit in Chapters 2, 4, or 5.'
  },
  {
    category: 'Decision',
    label: 'Decision (Time / Emotion / Impatience)',
    description: 'Playing on impulse, rushing under time pressure, tilting from previous mistakes, or prematurely forcing a draw/win.',
    remedy: 'Breathe, re-run M1 structural checkpoint, enforce the 3-path filter, and protect pre-game sleep/recovery.'
  }
];
