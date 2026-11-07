/**
 * Authoritative Visual Placement Registry
 * Directly synchronized with: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 * Source register: assets/concepts/source-register.json
 */

export interface VisualPlaceholder {
  title: string;
  description: string;
  plannedAsset: string;
  assetStatus: 'INSERTED' | 'PLACEHOLDER' | 'BLOCKED';
  status?: 'INSERTED' | 'PLACEHOLDER' | 'BLOCKED';
  assetPath?: string;
  sourceUrl?: string;
  license?: string;
  attribution?: string;
}

export const VISUAL_PLACEHOLDERS: Record<string, VisualPlaceholder> = {
  "P1": {
    "title": "Planned visual: What is chess?",
    "description": "A colour instructional image explaining “What Is Chess?” at a glance: show the relevant board position, movement, pattern, player, object, or historical context with labels readable in print. Downloaded board photograph or public-domain introductory chess illustration.",
    "plannedAsset": "Downloaded board photograph or public-domain introductory chess illustration.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "P2": {
    "title": "Verified visual: The Board, the Pieces and How They Move",
    "description": "A high-resolution labelled reference showing 8x8 chessboard geometry, coordinates (files a-h, ranks 1-8), color complexes, and starting piece placement.",
    "plannedAsset": "Downloaded licensed board-and-piece reference sheet from Lichess Chessground.",
    "status": "INSERTED",
    "assetPath": "/assets/chessbook/images/chessground-2d.png",
    "sourceUrl": "https://github.com/lichess-org/chessground",
    "license": "GPL-3.0",
    "attribution": "Lichess / Chessground (GPL-3.0) — Board Geometry and Piece Identification",
    "assetStatus": "INSERTED"
  },
  "P3": {
    "title": "Planned visual: The aim of the game",
    "description": "A colour position showing checkmate, check escape options, and stalemate conditions, with checking lines and escape squares clearly annotated.",
    "plannedAsset": "Downloaded licensed checkmate and stalemate position diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "P4": {
    "title": "Planned visual: Chess as a Tool & What You Can Learn",
    "description": "A colour documentary image connecting chess practice with attention, emotional resilience, error diagnostic loops, and cognitive recovery.",
    "plannedAsset": "Downloaded public-domain or Creative Commons learning photograph.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "P5": {
    "title": "Planned visual: Core tactical motifs",
    "description": "A colour tactical plate with labelled examples of fork, pin (absolute vs relative), skewer, discovered attack, deflection, and overload.",
    "plannedAsset": "Downloaded open tactical diagram set.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "P6": {
    "title": "Planned visual: Basic mating patterns",
    "description": "A colour diagram plate illustrating back-rank, smothered, Arabian, Anastasia, Boden’s, and corridor mating patterns with attack vectors highlighted.",
    "plannedAsset": "Downloaded open mating-pattern diagram set.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "P7": {
    "title": "Planned visual: Competitive rules, clock, and etiquette",
    "description": "A colour tournament image showing mechanical/digital clock operation, touch-move protocol, scoresheet notation, and FIDE competition etiquette.",
    "plannedAsset": "Downloaded Creative Commons tournament photograph.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "1.1": {
    "title": "Planned visual: Cognitive Architecture of Chess Expertise",
    "description": "A comparative cognitive study diagram showing de Groot & Chase-Simon chunking, comparing master pattern recognition with novice piece-by-piece perception.",
    "plannedAsset": "Downloaded research figure or licensed educational chess cognitive graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "1.2": {
    "title": "Planned visual: Neuroscience of the Chess Brain",
    "description": "A sourced neuroscience illustration mapping bilateral occipitotemporal activation, fusiform face area processing, and parietal spatial networks during chess perception.",
    "plannedAsset": "Downloaded figure with verified scholarly open reuse terms.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "1.3": {
    "title": "Planned visual: Geometry and Spatial Intelligence",
    "description": "An overhead board diagram displaying geometric vectors, ray intersections, knight trajectory rings, and visuo-spatial memory coordinates.",
    "plannedAsset": "Downloaded open board-geometry illustration.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "1.4": {
    "title": "Planned visual: Biology, Chemistry & Hormonal Influences",
    "description": "A restrained scientific diagram linking heart-rate variability, cortisol stress response, glucose metabolism, sleep architecture, and late-round decision decay.",
    "plannedAsset": "Downloaded public-domain or CC concentration and sports physiology figure.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "1.5": {
    "title": "Planned visual: Psychology of High-Level Decision Making",
    "description": "A tournament scene capturing decision-making under time pressure, paired with the decision classification matrix (Automatic, Simple, Critical, Strategic).",
    "plannedAsset": "Downloaded Creative Commons tournament photograph with readable clock and board.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "1.6": {
    "title": "Planned visual: What Changes at Super-GM Level",
    "description": "A licensed high-level match photograph documenting super-GM deep focus, minute structural conversion, and psychological resilience.",
    "plannedAsset": "Downloaded permission-cleared championship photograph.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "2.1": {
    "title": "Planned visual: Pawn structures (The Structural Skeleton)",
    "description": "A comparative pawn skeleton diagram plate highlighting the Carlsbad, Isolated Queen’s Pawn (IQP), Hanging Pawns, and locked pawn chains.",
    "plannedAsset": "Downloaded open pawn-structure diagram set.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "2.2": {
    "title": "Planned visual: Imbalances (The Comparative Lens)",
    "description": "An annotated board comparing classic imbalances: Bishop vs Knight, space vs active piece counterplay, and wing pawn majority vs king safety.",
    "plannedAsset": "Downloaded open annotated position diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "2.3": {
    "title": "Planned visual: Weaknesses (Static Targets)",
    "description": "A diagnostic position diagram highlighting backward pawns, isolated pawns, outpost holes, and open file infiltration avenues.",
    "plannedAsset": "Downloaded open positional weakness diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "2.4": {
    "title": "Planned visual: Piece Placement, King Position & Space",
    "description": "A middlegame board demonstrating worst-placed piece rehabilitation, king shelter durability, and space advantages behind pawn chains.",
    "plannedAsset": "Downloaded open annotated middlegame diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "2.5": {
    "title": "Planned visual: Visual Scanning Protocols & Cognitive Database",
    "description": "A visual scanning diagram illustrating the V1 scan path (Checks → Captures → Threats → Loose Pieces → King Safety → Candidates) and D1-D5 database growth.",
    "plannedAsset": "Downloaded open visual scanning teaching illustration.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "3.1": {
    "title": "Planned visual: Foundational Decision Framework",
    "description": "An opening framework diagram linking central pawn commitments, piece mobility vectors, and king safety directly to resulting middlegame plans.",
    "plannedAsset": "Downloaded open opening decision framework diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "3.2": {
    "title": "Planned visual: The Seven Approaches (Full Opening Map)",
    "description": "A comprehensive opening family matrix mapping 1.e4 Open/Semi-Open, 1.d4 Closed/Semi-Closed, Flank systems, and their structural consequences with ECO references.",
    "plannedAsset": "Downloaded open opening-family diagram and ECO database chart.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "4.1": {
    "title": "Planned visual: The 7 Middlegame Principles (M1–M7)",
    "description": "An annotated middlegame position showing pawn breaks, piece harmony, and the continuous M1 structural evaluation checkpoint.",
    "plannedAsset": "Downloaded open annotated middlegame principle diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "4.2": {
    "title": "Planned visual: Recurring Middlegame Structural Packages",
    "description": "A structural package reference sheet comparing Carlsbad minority attack, IQP breakthrough, Hedgehog hedgehogging, and French blockade positions.",
    "plannedAsset": "Downloaded open structural package comparative board plate.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "4.3": {
    "title": "Planned visual: Defensive Technique and Drawing Resources",
    "description": "A technical defensive plate showing fortress barriers, perpetual check escape routes, and desperado piece sacrifices saving half points.",
    "plannedAsset": "Downloaded open defensive-technique diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "4.4": {
    "title": "Planned visual: Prophylaxis, Restriction, Overprotection, Blockade, and Zugzwang",
    "description": "A masterclass positional diagram illustrating Nimzowitsch overprotection, piece restriction, file blockade, and mutual zugzwang.",
    "plannedAsset": "Downloaded open positional technique diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "4.5": {
    "title": "Planned visual: The Unified Evaluation Checklist",
    "description": "An evaluation checklist graphic ordering King Safety, Material, Pawn Structure, Piece Activity, and Candidate Moves on a live position.",
    "plannedAsset": "Downloaded open evaluation-checklist diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "5.1": {
    "title": "Planned visual: The 3-Path Conversion Model",
    "description": "A strategic flowchart diagram illustrating Path A (Tactical), Path B (Positional), and Path C (Technical) conversion decision trees.",
    "plannedAsset": "Downloaded open annotated conversion position diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "5.2": {
    "title": "Planned visual: Essential Endgames",
    "description": "A core endgame plate demonstrating King and Pawn opposition, the Lucena and Philidor rook ending positions, and bishop of opposite colors drawing rules.",
    "plannedAsset": "Downloaded open endgame reference diagram set.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "6.1": {
    "title": "Planned visual: Deep Calculation Trees & Visualisation",
    "description": "A decision-tree diagram showing candidate move branching, forcing reply falsification, and visual re-anchoring on an annotated calculation position.",
    "plannedAsset": "Downloaded open calculation tree and candidate moves graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "6.2": {
    "title": "Planned visual: Diagnostic Error Logging and the Seven Deadly Sins",
    "description": "An error classification matrix detailing the 4 categories (Perception, Visualisation, Knowledge, Decision) and the Seven Deadly Sins of chess thinking.",
    "plannedAsset": "Downloaded open error log and diagnostic training sheet.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "6.3": {
    "title": "Planned visual: Advanced Engine Management & Technical Play",
    "description": "A disciplined engine analysis workflow diagram showing human self-analysis, engine evaluation comparison, and flashcard extraction.",
    "plannedAsset": "Downloaded open engine analysis workflow graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.1": {
    "title": "Planned visual: Psychological Intimidation & Title-Match Dynamics",
    "description": "An archival championship photograph documenting title match psychological tension, player confrontation, and stage protocol.",
    "plannedAsset": "Downloaded public-domain or permission-cleared historical photograph.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.2": {
    "title": "Planned visual: Cold War Geopolitics & Solitary Mental Resistance",
    "description": "A verified historical photograph documenting the 1972 Fischer-Spassky match in Reykjavik in its Cold War political and cultural context.",
    "plannedAsset": "Downloaded public-domain archival photograph.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.3": {
    "title": "Planned visual: Romantic Traditions & Magician Sacrifices",
    "description": "An annotated game board illustrating Mikhail Tal’s speculative piece sacrifices and the tactical complications that overwhelmed defenders.",
    "plannedAsset": "Downloaded open historical game diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.4": {
    "title": "Planned visual: War Metaphors, Disappearances & Rivalries",
    "description": "An archival photograph of Karpov and Kasparov during their epic World Championship marathon matches, paired with a defining structural position.",
    "plannedAsset": "Downloaded public-domain or permission-cleared historical image.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.5": {
    "title": "Planned visual: Spielmann’s Sacrifice Classification",
    "description": "A conceptual matrix plate distinguishing Sham Sacrifices (Positional, Gain, Mating) from Real Sacrifices (Active vs Passive, Form, Size, Object).",
    "plannedAsset": "Downloaded open annotated sacrifice classification diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.6": {
    "title": "Planned visual: Elo Rating System and FIDE (Revised)",
    "description": "A clean historical graphic showing Dr. Arpad Elo, the normal distribution curve, the 15 players who crossed 2800, and FIDE title standards.",
    "plannedAsset": "Downloaded official or openly licensed ratings graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "7.7": {
    "title": "Planned visual: The Historical Greats and Their Peak Ratings",
    "description": "A comparative ratings infographic showing historical world champions and their peak Classical, Rapid, and Blitz Elo numbers.",
    "plannedAsset": "Downloaded public-domain or permission-cleared champion photographs and data graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "8.1": {
    "title": "Planned visual: Positional Chess versus Structure-First Chess",
    "description": "A comparative board diagram showing two plans from identical piece placement, illustrating how the pawn skeleton determines correct piece coordination.",
    "plannedAsset": "Downloaded open comparative position diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "8.2": {
    "title": "Planned visual: The Mastery Check: The Unified Method End-to-End",
    "description": "A full-board master synthesis diagram integrating pawn structure identification, candidate generation, calculation tree, conversion path, and error audit.",
    "plannedAsset": "Downloaded open capstone teaching diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.1": {
    "title": "Planned visual: 1. Daily Routine (30–60 Minutes)",
    "description": "An instructional daily schedule plate showing tactical puzzle scan routine, mating pattern drill, structure file review, and error logging sequence.",
    "plannedAsset": "Downloaded open study desk and routine diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.2": {
    "title": "Planned visual: 2. Weekly Training",
    "description": "An instructional weekly training planner illustrating master-game prediction, blindfold visualization, spaced repetition, and prophylaxis sessions.",
    "plannedAsset": "Downloaded open weekly training schedule graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.3": {
    "title": "Planned visual: 3. Pre-Game Protocol",
    "description": "An instructional timeline illustrating the 15-minute pre-game activation: light tactical warm-up, breathing reset, and cognitive scan readiness.",
    "plannedAsset": "Downloaded open tournament preparation diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.4": {
    "title": "Planned visual: 4. In-Game Execution",
    "description": "An in-game decision checklist graphic showing the V1 scan, G1 blunder check, M1 structural checkpoint, and time management allocation.",
    "plannedAsset": "Downloaded open in-game execution checklist diagram.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.5": {
    "title": "Planned visual: 5. Post-Game Review",
    "description": "A post-game review workflow diagram illustrating human self-analysis first, 4-category error logging, structure re-labeling, and secondary engine comparison.",
    "plannedAsset": "Downloaded open post-game audit workflow graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.6": {
    "title": "Planned visual: 6. The Daily and Weekly Tracker",
    "description": "A clean operational tracking template showing daily minutes logged, weekly drill completions, and the 10-game gauntlet audit log.",
    "plannedAsset": "Downloaded open training log template graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  },
  "App.7": {
    "title": "Planned visual: 7. End-of-Course: The Mastery Check",
    "description": "A mastery assessment certificate and 5-phase rubric card detailing the graduation standards for The Homing Square.",
    "plannedAsset": "Downloaded open mastery rubric and evaluation graphic.",
    "status": "PLACEHOLDER",
    "assetStatus": "PLACEHOLDER"
  }
};

export const getVisualPlaceholder = (unitCode: string, title: string): VisualPlaceholder => {
  return VISUAL_PLACEHOLDERS[unitCode] || {
    title: `Planned visual: ${title}`,
    description: `A colour instructional image showing the central idea of Unit ${unitCode}, with the relevant board position, players, or historical context clearly labelled.`,
    plannedAsset: 'Downloaded image with verified public-domain or Creative Commons licensing.',
    assetStatus: 'PLACEHOLDER',
    status: 'PLACEHOLDER'
  };
};
