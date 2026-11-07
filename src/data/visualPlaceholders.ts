export interface VisualPlaceholder {
  title: string;
  description: string;
  plannedAsset: string;
}

export const VISUAL_PLACEHOLDERS: Record<string, VisualPlaceholder> = {
  P1: {
    title: 'Planned visual: What is chess?',
    description: 'A clear, colour photograph of a complete chessboard with both players facing the starting position, showing the board as a shared space for decisions.',
    plannedAsset: 'Downloaded board photograph or public-domain introductory chess illustration.'
  },
  P2: {
    title: 'Planned visual: Board, pieces, and movement',
    description: 'A labelled colour board image showing files, ranks, diagonals, and each piece beside a small movement example.',
    plannedAsset: 'Downloaded licensed board-and-piece reference sheet.'
  },
  P3: {
    title: 'Planned visual: The aim of the game',
    description: 'A colour position showing the king in checkmate, with the checking piece and every escape square clearly visible.',
    plannedAsset: 'Downloaded licensed checkmate position diagram.'
  },
  P4: {
    title: 'Planned visual: What chess can teach',
    description: 'A documentary colour photograph of a learner studying a real board, connecting chess practice with attention, patience, and decision-making.',
    plannedAsset: 'Downloaded public-domain or Creative Commons learning photograph.'
  },
  P5: {
    title: 'Planned visual: Core tactical motifs',
    description: 'A colour tactical-position plate with separate examples of a fork, pin, skewer, and discovered attack, each labelled on the board.',
    plannedAsset: 'Downloaded open tactical diagram set.'
  },
  P6: {
    title: 'Planned visual: Basic mating patterns',
    description: 'A colour diagram plate showing back-rank, smothered, and corridor-mate patterns with the attacking route highlighted.',
    plannedAsset: 'Downloaded open mating-pattern diagram set.'
  },
  P7: {
    title: 'Planned visual: Competition rules and etiquette',
    description: 'A colour tournament photograph showing the board, clock, scoresheet, and respectful player conduct at a serious game.',
    plannedAsset: 'Downloaded Creative Commons tournament photograph.'
  },
  '1.1': {
    title: 'Planned visual: Expertise and pattern recognition',
    description: 'A comparative colour board study showing how a novice sees individual pieces while an expert recognises a meaningful position pattern.',
    plannedAsset: 'Downloaded research figure or licensed educational chess photograph.'
  },
  '1.2': {
    title: 'Planned visual: The chess brain',
    description: 'A sourced scientific illustration of attention, memory, and visual processing, paired with a chess position used in expertise research.',
    plannedAsset: 'Downloaded figure with verified scholarly reuse terms.'
  },
  '1.3': {
    title: 'Planned visual: Geometry and spatial intelligence',
    description: 'A colour board viewed from above with files, ranks, diagonals, knight jumps, and geometric attack lines visibly marked.',
    plannedAsset: 'Downloaded open board-geometry illustration.'
  },
  '1.4': {
    title: 'Planned visual: Biology, chemistry, and performance',
    description: 'A restrained editorial illustration connecting concentration, stress, sleep, and physical state to a player seated at the board.',
    plannedAsset: 'Downloaded public-domain concentration or research photograph.'
  },
  '1.5': {
    title: 'Planned visual: High-level decision making',
    description: 'A colour tournament image of a player calculating under time pressure, with the board and clock both readable.',
    plannedAsset: 'Downloaded Creative Commons tournament photograph.'
  },
  '1.6': {
    title: 'Planned visual: Super-GM performance',
    description: 'A licensed photograph of elite players at a title event, showing the setting, clock, board, and concentration that frame super-GM decisions.',
    plannedAsset: 'Downloaded permission-cleared championship photograph.'
  },
  '2.1': {
    title: 'Planned visual: Pawn structures',
    description: 'A colour diagram plate comparing the Carlsbad, isolated-queen-pawn, hanging-pawn, and pawn-chain structures.',
    plannedAsset: 'Downloaded open pawn-structure diagram set.'
  },
  '2.2': {
    title: 'Planned visual: Imbalances',
    description: 'A colour position comparing bishop versus knight, space versus activity, and pawn majority versus king safety.',
    plannedAsset: 'Downloaded open annotated position diagram.'
  },
  '2.3': {
    title: 'Planned visual: Static weaknesses',
    description: 'A colour position with isolated pawns, weak squares, backward pawns, and exposed targets clearly identified.',
    plannedAsset: 'Downloaded open positional diagram.'
  },
  '2.4': {
    title: 'Planned visual: Placement, king safety, and space',
    description: 'A colour middlegame position showing good and bad piece placement, king shelters, open files, and space advantage.',
    plannedAsset: 'Downloaded open annotated middlegame diagram.'
  },
  '2.5': {
    title: 'Planned visual: Visual scanning',
    description: 'A colour board with a numbered scan path: checks, captures, threats, loose pieces, king safety, and candidate moves.',
    plannedAsset: 'Downloaded open board-scanning teaching illustration.'
  },
  '3.1': {
    title: 'Planned visual: Opening decision framework',
    description: 'A colour opening position with the centre, development priorities, king safety, and structural commitment marked.',
    plannedAsset: 'Downloaded open opening-position diagram.'
  },
  '3.2': {
    title: 'Planned visual: The seven opening approaches',
    description: 'A colour comparison sheet showing representative opening families and the pawn structures they create.',
    plannedAsset: 'Downloaded open opening-family diagram set.'
  },
  '4.1': {
    title: 'Planned visual: Middlegame principles',
    description: 'A colour middlegame position with structural breaks, piece coordination, and the continuous evaluation checkpoint annotated.',
    plannedAsset: 'Downloaded open annotated middlegame diagram.'
  },
  '4.3': {
    title: 'Planned visual: Defensive technique',
    description: 'A colour defensive position showing a blockade, perpetual-check resource, exchange into a draw, or fortress.',
    plannedAsset: 'Downloaded open defensive-technique diagram.'
  },
  '4.4': {
    title: 'Planned visual: Prophylaxis and zugzwang',
    description: 'A colour position showing restriction, overprotection, blockade, and a zugzwang move where waiting changes the result.',
    plannedAsset: 'Downloaded open positional-technique diagram.'
  },
  '4.5': {
    title: 'Planned visual: Unified evaluation checklist',
    description: 'A colour board annotated with the checklist sequence: king safety, material, structure, activity, threats, and candidate moves.',
    plannedAsset: 'Downloaded open evaluation-checklist diagram.'
  },
  '5.1': {
    title: 'Planned visual: Three conversion paths',
    description: 'A colour position showing tactical, positional, and technical routes to converting an advantage.',
    plannedAsset: 'Downloaded open annotated conversion position.'
  },
  '5.2': {
    title: 'Planned visual: Essential endgames',
    description: 'A colour endgame plate comparing king-and-pawn opposition, rook activity, and minor-piece ending principles.',
    plannedAsset: 'Downloaded open endgame diagram set.'
  },
  '6.2': {
    title: 'Planned visual: Error logging',
    description: 'A colour calculation position beside a clean error-log example categorising perception, visualisation, knowledge, and decision errors.',
    plannedAsset: 'Downloaded open training-position diagram.'
  },
  '7.1': {
    title: 'Planned visual: Title-match psychology',
    description: 'A historical colour photograph of a championship match, with the board, clock, audience, and ceremonial setting visible.',
    plannedAsset: 'Downloaded public-domain or permission-cleared historical photograph.'
  },
  '7.2': {
    title: 'Planned visual: Chess and the Cold War',
    description: 'A verified historical photograph or archival match image placing a major chess encounter in its political and cultural context.',
    plannedAsset: 'Downloaded public-domain archival photograph.'
  },
  '7.3': {
    title: 'Planned visual: Romantic sacrifices',
    description: 'A colour annotated position illustrating an attacking sacrifice, the exposed king, and the forcing continuation.',
    plannedAsset: 'Downloaded open historical game diagram.'
  },
  '7.4': {
    title: 'Planned visual: Rivalries and narratives',
    description: 'A colour archival image of two celebrated players or a decisive game setting, paired with the position that made the rivalry memorable.',
    plannedAsset: 'Downloaded public-domain or permission-cleared historical image.'
  },
  '7.5': {
    title: 'Planned visual: Sacrifice classification',
    description: 'A colour comparison plate showing king attack, material, positional, and clearance sacrifices.',
    plannedAsset: 'Downloaded open annotated sacrifice diagrams.'
  },
  '7.6': {
    title: 'Planned visual: Elo and FIDE',
    description: 'A clean colour timeline or archival ratings graphic showing rating bands, titles, and the development of organised chess.',
    plannedAsset: 'Downloaded official or openly licensed ratings graphic.'
  },
  '7.7': {
    title: 'Planned visual: Historical greats',
    description: 'A verified collage of historical champions with dates, peak rating context, and the era in which each played.',
    plannedAsset: 'Downloaded public-domain or permission-cleared champion photographs.'
  },
  '8.1': {
    title: 'Planned visual: Positional versus structure-first chess',
    description: 'A colour comparison of two plans from the same position, showing how the pawn skeleton changes the correct piece placement.',
    plannedAsset: 'Downloaded open comparative position diagram.'
  },
  '8.2': {
    title: 'Planned visual: Unified method end to end',
    description: 'A full-colour annotated position combining structure, candidate moves, calculation, conversion, and the final verification checkpoint.',
    plannedAsset: 'Downloaded open capstone teaching diagram.'
  }
};

export const getVisualPlaceholder = (unitCode: string, title: string): VisualPlaceholder => {
  return VISUAL_PLACEHOLDERS[unitCode] || {
    title: `Planned visual: ${title}`,
    description: `A colour instructional image showing the central idea of Unit ${unitCode}, with the relevant board position, players, or historical context clearly labelled.`,
    plannedAsset: 'Downloaded image with verified public-domain or Creative Commons licensing.'
  };
};
