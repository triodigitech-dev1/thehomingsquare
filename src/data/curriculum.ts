import { CurriculumChapter } from '../types/chess';

export const CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'ch_p',
    number: 'P',
    code: 'Prerequisite',
    title: 'The Fun Foundation',
    subtitle: 'Welcome to Chess — Rules, Geometry, Literacy & First Joy',
    description: 'Establishes basic literacy, tactical fluency, competitive awareness, and a positive relationship with chess as both a game and a tool for personal comeback.',
    units: [
      {
        id: 'unit_p1',
        chapterId: 'ch_p',
        chapterNumber: 'P',
        unitCode: 'P1',
        title: 'What Is Chess?',
        subtitle: 'A Perfect-Information Strategy Arena',
        whatToLearn: 'The definition of chess as a two-player perfect-information strategy game on an 8x8 chequered board. Brief history and cultural significance.',
        whatToExpect: 'A clear, non-technical introduction that removes intimidation and frames chess as accessible, dignified, and enjoyable.',
        expectedOutcome: 'The student can explain what chess is and why it has endured across cultures for centuries.',
        summary: 'Chess is an unsparing mirror: there is no dice, no hidden cards, no luck. Everything that happens was permitted by your own choices.',
        contentParagraphs: [
          'Chess is a game of perfect information. Both players sit before the same 64 squares with all pieces visible. There is no fog of war, no rolling of dice, and no external referee altering the outcome.',
          'Originating in ancient India as chaturanga and evolving through Persia into medieval Europe, the game became a universal language of strategic thought.',
          'For someone returning to life after retreat, chess offers a safe, bounded arena. You can make an error, feel the sting, and immediately reset the board. Being worse is not being lost: every piece has a home square.'
        ],
        initialFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        checkpoint: {
          question: 'What makes chess fundamentally distinct from games of chance or games with hidden information?',
          options: [
            'It is played exclusively with clocks and written notation',
            'Both players have complete, identical visibility over all pieces with zero element of luck',
            'White always has a mathematically proven win from move one',
            'Pieces can only move diagonally across the board'
          ],
          correctIndex: 1,
          explanation: 'Chess is a game of perfect information: nothing is hidden, and no external chance dictates the outcome. Every consequence stems from chosen moves.',
          takeaway: 'Total clarity: you are responsible for your position, and every error carries its own lesson.'
        }
      },
      {
        id: 'unit_p2',
        chapterId: 'ch_p',
        chapterNumber: 'P',
        unitCode: 'P2',
        title: 'The Board, Pieces & Movement',
        subtitle: 'Ranks, Files, Special Rules and Values',
        whatToLearn: 'Ranks, files, diagonals, algebraic notation. The six piece types and their relative values. Special moves: Castling, En passant, and Pawn promotion.',
        whatToExpect: 'Hands-on practice placing and moving pieces; clear visual understanding of the board geometry.',
        expectedOutcome: 'The student can set up the board correctly and execute every move legally without hesitation.',
        summary: 'White on the right, queen on her own color. Pawns advance like foot soldiers; knights jump the barriers.',
        contentParagraphs: [
          'The 64 squares are organized into 8 vertical files (a to h) and 8 horizontal ranks (1 to 8). Each square has a unique coordinate, such as e4 or c6.',
          'Castling is the king’s return to its home sanctuary: the king moves two squares toward a rook, and the rook hops over to settle adjacent.',
          'En passant ensures that a pawn cannot bypass an enemy pawn’s strike zone by leaping two squares on its initial move.'
        ],
        initialFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        checkpoint: {
          question: 'Under what specific condition is the En Passant capture legal?',
          options: [
            'Whenever any enemy pawn advances to the fifth rank',
            'Only immediately on the turn after an opponent pawn advances two squares past your fifth-rank pawn',
            'Only after both players have castled',
            'Any time a knight and pawn coordinate on the same file'
          ],
          correctIndex: 1,
          explanation: 'En passant must be executed immediately on the turn after the opponent’s two-square pawn advance; otherwise the right to capture en passant is permanently lost.',
          takeaway: 'Rules of chess reward alertness: timing matters as much as geometry.'
        }
      },
      {
        id: 'unit_p6',
        chapterId: 'ch_p',
        chapterNumber: 'P',
        unitCode: 'P6',
        title: 'Basic Mating Patterns & King-Attack Themes',
        subtitle: 'Smothered, Arabian, Anastasia, Boden’s & Greek Gift',
        isNew: true,
        whatToLearn: 'Named checkmate patterns that recur across every level of play, plus standard attacking setups: Smothered, Arabian, Anastasia, Boden’s, Legal’s, Greco’s, Back-rank, Epaulette, and Greek Gift (Bxh7+).',
        whatToExpect: 'Pattern drills using labelled mate positions; sensing danger early when your own king is the target.',
        expectedOutcome: 'The student can name and execute standard mating patterns, spot them forming in games, and sense king vulnerability.',
        summary: 'Named mating patterns turn tactical chaos into instantaneous recognition.',
        contentParagraphs: [
          'Checkmate patterns are geometric templates stored in long-term memory. When an expert glances at a board, they do not calculate random moves; they perceive the outline of a known mating net.',
          'In Smothered Mate, the knight exploits the enemy king being imprisoned by its own pieces — often following a queen sacrifice that blocks the remaining flight square.',
          'The Greek Gift (Bxh7+ or Bxh2+) is the classical sacrifice ripping away the castle walls. It requires White to control the g5/g4 square and have a queen ready to enter h5.',
          'Recognizing these patterns defensively is equally vital: if your f6 defender is deflected, you must immediately foresee the Greek Gift.'
        ],
        initialFen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
        checkpoint: {
          question: 'What is the key defining feature of a Smothered Mate?',
          options: [
            'A bishop cuts across two intersecting open diagonals',
            'A knight checkmates a king that cannot escape because its flight squares are blocked by its own friendly pieces',
            'Two rooks cut off the entire seventh and eighth ranks',
            'A pawn delivers mate supported by a distant queen'
          ],
          correctIndex: 1,
          explanation: 'Smothered mate occurs when the king is completely hemmed in by its own army, allowing a knight to jump in and deliver inescapable mate.',
          takeaway: 'A congested position can be just as fatal as an exposed king.'
        }
      },
      {
        id: 'unit_p7',
        chapterId: 'ch_p',
        chapterNumber: 'P',
        unitCode: 'P7',
        title: 'Competitive Rules, Clock & Etiquette',
        subtitle: 'Touch-Move, Clock Handling, Illegal Moves & Draw Claims',
        isNew: true,
        whatToLearn: 'The FIDE Laws of Chess that govern over-the-board competition: Touch-move (Article 4), clock handling (Article 6), illegal moves (Article 7), draw claims (Article 9), and scoresheets.',
        whatToExpect: 'Clear summaries of the rules that decide real tournaments and disputes; scenario drills on proper etiquette.',
        expectedOutcome: 'The student can play in a rated OTB event without procedural anxiety and knows how to handle claims correctly.',
        summary: 'Over-the-board chess is a formal social contract. Dignity is maintained through disciplined adherence to the rules.',
        contentParagraphs: [
          'Touch-move is absolute: if you deliberately touch a piece having the intention of moving it, you must move it if a legal move exists. If you want to adjust a piece, you must say "J\'adoube" or "I adjust" BEFORE touching it.',
          'Clocks must be pressed with the same hand that made the move. Do not bang the clock or hold your hand hovering over it.',
          'Critical rule on draw claims: Threefold repetition or the fifty-move rule must be claimed BEFORE making your move on the board (write the move on your scoresheet and inform the arbiter). Touching a piece before claiming forfeits the claim for that turn!'
        ],
        initialFen: '8/8/8/4k3/8/4K3/8/8 w - - 0 1',
        checkpoint: {
          question: 'If you want to claim a draw by threefold repetition, when MUST you make the claim according to FIDE rules?',
          options: [
            'Any time within 10 moves after the position repeats',
            'Before making the move on the board, by writing it on your scoresheet and declaring the intention to the arbiter',
            'Only after your opponent has already pressed their clock',
            'At the conclusion of the round during post-game handshakes'
          ],
          correctIndex: 1,
          explanation: 'FIDE Article 9.2 states that if the repetition occurs after your next move, you must write it down on your scoresheet and declare the claim to the arbiter before executing it on the board.',
          takeaway: 'Procedure protects your rights. Never touch a piece before making a legal draw claim.'
        }
      }
    ]
  },
  {
    id: 'ch_1',
    number: 1,
    code: 'Chapter 1',
    title: 'The Science of Chess Intelligence',
    subtitle: 'Cognitive Architecture, Neuroscience, Geometry & Psychology',
    description: 'Demystifies pattern recognition, calculation, intuition, and decision quality under pressure through cognitive science, neuroscience, and endocrinology.',
    units: [
      {
        id: 'unit_1_1',
        chapterId: 'ch_1',
        chapterNumber: 1,
        unitCode: '1.1',
        title: 'Cognitive Architecture of Chess Expertise',
        subtitle: 'Chunking Theory, Template Theory & Intuition',
        whatToLearn: 'Chunking theory (Chase & Simon) and Template theory (Gobet & Simon). Experts perceive meaningful groupings of pieces, not isolated units. What intuition really is.',
        whatToExpect: 'Clear explanations with classic experimental findings (de Groot, Chase & Simon, Gobet).',
        expectedOutcome: 'The student understands that "talent" is largely organised pattern knowledge and can begin building it deliberately.',
        summary: 'Intuition is not magic: it is the rapid, unconscious retrieval of 50,000 structured chunks from long-term memory.',
        contentParagraphs: [
          'In classic experiments by Adriaan de Groot and later Chase & Simon, grandmasters and novices were shown chess positions for 5 seconds. In real game positions, grandmasters reconstructed 90% of the pieces correctly, while novices managed only 30%.',
          'However, when pieces were placed randomly on the board, the grandmasters’ advantage disappeared completely! Their superiority was not superhuman memory, but domain-specific pattern chunks.',
          'Fernand Gobet extended this into Template Theory: frequently recurring chunks merge into large core templates (such as the Carlsbad pawn skeleton) with flexible variable slots for minor pieces.'
        ],
        initialFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
        checkpoint: {
          question: 'Why did grandmasters perform no better than beginners when asked to recall randomly placed chess pieces?',
          options: [
            'Grandmasters calculate slower when they are tired',
            'Grandmaster memory relies on structured domain chunks and meaningful templates, which do not exist in random positions',
            'Grandmasters refuse to memorize positions without kings',
            'The test was conducted without tournament clocks'
          ],
          correctIndex: 1,
          explanation: 'The Chase & Simon experiments proved that chess memory is chunk-based. Without the grammatical logic of chess, expert recall drops to novice baseline.',
          takeaway: 'You build skill by internalizing structural patterns, not by brute memorization.'
        }
      },
      {
        id: 'unit_1_4',
        chapterId: 'ch_1',
        chapterNumber: 1,
        unitCode: '1.4',
        title: 'Biology, Chemistry & Hormonal Influences',
        subtitle: 'Dopamine, Cortisol, Stress & High-Stakes Performance',
        whatToLearn: 'Neurotransmitters (dopamine, acetylcholine, serotonin) and stress hormones (cortisol, testosterone). Practical implications for sleep, nutrition, recovery, and cognitive resilience.',
        whatToExpect: 'Evidence-based practical recommendations for managing biological variables during matches.',
        expectedOutcome: 'The student can manage biological and lifestyle factors that directly govern calculation stamina.',
        summary: 'Your brain is a biological organ. When cortisol spikes, peripheral vision narrows and candidate move generation crashes.',
        contentParagraphs: [
          'Acute stress triggers cortisol and adrenaline release. While moderate arousal sharpens focus on immediate threats, excessive cortisol impairs prefrontal cortex calculation and induces tunnel vision.',
          'Dopamine regulates motivation and candidate generation. Deep calculation demands sustained acetylcholine and glycogen reserves.',
          'The Homing Square pre-game protocol emphasizes 8 hours of sleep, a light non-glycemic meal, and 10–15 minutes of calm tactical warm-ups to prime the visual scanning engine without cognitive fatigue.'
        ],
        initialFen: '8/8/4k3/8/8/4K3/8/8 w - - 0 1',
        checkpoint: {
          question: 'What is the primary cognitive danger of elevated cortisol during a tense middlegame?',
          options: [
            'It speeds up piece movement beyond the legal limit',
            'It narrows attention and induces tunnel vision, causing the player to miss quiet intermediate moves and wide-board threats',
            'It prevents the player from writing notation on the scoresheet',
            'It causes immediate stalemate on the board'
          ],
          correctIndex: 1,
          explanation: 'High stress hormones shut down creative search trees and lock attention onto a single perceived danger, blinding the player to tactical refutations on other wings.',
          takeaway: 'When feeling panic, step back, take three deliberate breaths, and re-anchor coordinates.'
        }
      }
    ]
  },
  {
    id: 'ch_2',
    number: 2,
    code: 'Chapter 2',
    title: 'Perception Engine & Static Board Vision',
    subtitle: 'Pure Board Reading — Skeletons, Imbalances & Scanning Protocols',
    description: 'Before calculation or planning, the board must be read accurately. Seeing the pawn skeleton, imbalances, weaknesses, piece quality, and space as a coherent whole.',
    units: [
      {
        id: 'unit_2_1',
        chapterId: 'ch_2',
        chapterNumber: 2,
        unitCode: '2.1',
        title: 'Pawn Structures (The Structural Skeleton)',
        subtitle: 'The Core Catalog: Carlsbad, IQP, French, Hedgehog, KID',
        whatToLearn: 'The complete core list of pawn structures and internal elements: pawn chains (heads/bases), available breaks, fixed vs mobile pawns, majorities/minorities, open/semi-open files.',
        whatToExpect: 'Structure flashcards, reconstruction drills, model positions with pawns alone.',
        expectedOutcome: 'The student can glance at a position and instantly name the dominant pawn structure.',
        summary: 'Pawns do not retreat. Every pawn move permanently defines the landscape for both armies.',
        contentParagraphs: [
          'Philidor called pawns the soul of chess. In Structure-First Chess, pawns are the skeleton: pieces are merely muscles attached to the bone.',
          'Notice how pawns dictate open files for rooks and determine whether bishops are active or imprisoned behind their own chains.',
          'Whenever you evaluate a new position, mentally strip the pieces away and examine the pawn skeleton. Where do the pawn chains point? That is where play will unfold.'
        ],
        initialFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
        structureId: 'carlsbad',
        checkpoint: {
          question: 'Why does Structure-First Chess teach reading the pawn skeleton before calculating piece moves?',
          options: [
            'Because pawns are worth fewer points than rooks',
            'Because pawn moves are irreversible and permanently determine open files, outposts, and plans',
            'Because FIDE rules forbid moving minor pieces in the first 5 moves',
            'Because pieces can never cross pawn chains'
          ],
          correctIndex: 1,
          explanation: 'Pawn moves cannot be taken back. The pawn skeleton establishes the permanent outposts, open files, and breaks that govern where pieces belong.',
          takeaway: 'Read the skeleton first; then the pieces will know where to go.'
        }
      },
      {
        id: 'unit_2_5',
        chapterId: 'ch_2',
        chapterNumber: 2,
        unitCode: '2.5',
        title: 'Visual Scanning Protocols & Cognitive Database',
        subtitle: 'V1 Fixed Scan Order: Checks, Captures, Threats, Loose Pieces',
        whatToLearn: 'V1 Fixed Scan Order: Checks → Captures → Threats (both sides) → Loose Pieces → King Safety → Candidate Generation. V2 Opponent-Threat First. D1–D5 Cognitive Database.',
        whatToExpect: 'Daily scan drills and spaced-repetition routines to eliminate blind spots.',
        expectedOutcome: 'Automatic, reliable board reading and a growing personal database of patterns and errors.',
        summary: 'Blunders happen when a player looks at their own dreams instead of their opponent’s checks and threats.',
        contentParagraphs: [
          'The V1 Scan Order is an unvarying perceptual checklist. Before you calculate your own attacking combinations, you must run:',
          '1. Checks (forcing king moves)',
          '2. Captures (material trades on all squares)',
          '3. Threats (direct attacks against undefended pieces)',
          '4. Loose Pieces (unprotected pieces on both sides)',
          '5. King Safety (exposure and escape squares)',
          'Only after this 5-point perimeter scan is complete do you begin candidate move generation.'
        ],
        initialFen: 'r1bqk2r/pppp1ppp/2n5/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
        checkpoint: {
          question: 'In the V1 Scan Protocol, what is the mandatory sequence before candidate generation?',
          options: [
            'Candidates → Calculation → Pawn advance → Evaluation',
            'Checks → Captures → Threats → Loose Pieces → King Safety',
            'Queen moves → Rook lifts → King safety → Resignation check',
            'Opening book → Engine evaluation → Clock check'
          ],
          correctIndex: 1,
          explanation: 'The V1 Scan Order runs: Checks → Captures → Threats → Loose Pieces → King Safety. This catches 95% of tactical blunders before they happen.',
          takeaway: 'Discipline beats impulse. Run the scan on every single move.'
        }
      }
    ]
  },
  {
    id: 'ch_3',
    number: 3,
    code: 'Chapter 3',
    title: 'Opening Philosophies & The 7 Approaches',
    subtitle: 'The P1–P7 Framework and Full Opening Structural Map',
    description: 'Openings are studied not as move sequences to memorise but as philosophical choices that generate characteristic pawn structures.',
    units: [
      {
        id: 'unit_3_1',
        chapterId: 'ch_3',
        chapterNumber: 3,
        unitCode: '3.1',
        title: 'Foundational Decision Framework (P1–P7)',
        subtitle: 'The Seven Opening Principles Explained',
        isRevised: true,
        whatToLearn: 'The 7 Opening Principles (P1–P7) with rule, test, and caveat for each: P1 Dictate structure, P2 Force opponent, P3 Prefer pawns for center, P4 Minimise branching, P5 Repeatable plan, P6 Do not weaken, P7 Initiative is a trade.',
        whatToExpect: 'Direct instruction in each principle with rule, test, and caveat, followed by application to repertoire scoring.',
        expectedOutcome: 'The student can state and apply the seven opening principles explicitly, not merely reference them.',
        summary: 'An opening repertoire is not a phonebook of moves; it is a declaration of which pawn structures you agree to master.',
        contentParagraphs: [
          'P1 Dictate the structure: Commit on move one to a pawn formation that defines the game. If you don’t commit, your opponent does.',
          'P4 Minimise the opponent’s branching: Prefer a move whose replies fall into few structural families, so one body of preparation covers most games.',
          'P7 The initiative is a trade, not a free lunch: Treat the initiative as borrowed. What structural concession pays for it? If you sacrifice a pawn for development, you must win before the endgame arrives.'
        ],
        initialFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
        checkpoint: {
          question: 'According to Principle P7, how must the initiative be treated?',
          options: [
            'As an infinite gift that guarantees a win without calculation',
            'As a borrowed asset that usually requires a structural concession and must be converted before the debt comes due',
            'As something only Black is allowed to have',
            'As a numerical rating advantage granted by FIDE'
          ],
          correctIndex: 1,
          explanation: 'Principle P7 states that the initiative is borrowed. Every tempo of initiative is paid for by pawn moves or material, meaning you must convert or face structural deficit.',
          takeaway: 'Never give up structural integrity without concrete tactical compensation.'
        }
      },
      {
        id: 'unit_3_2',
        chapterId: 'ch_3',
        chapterNumber: 3,
        unitCode: '3.2',
        title: 'The Seven Approaches (Full Opening Map)',
        subtitle: 'Classical 1.e4/1.d4, Hypermodern, Modern, Flank, Offbeat',
        whatToLearn: 'The seven approaches: Classical 1.e4, Classical 1.d4, Hypermodern vs 1.e4, Hypermodern vs 1.d4, Modern, Flank, and Offbeat. How each approach yields specific pawn structures.',
        whatToExpect: 'Mapping your own openings to structural families.',
        expectedOutcome: 'The student can place any opening in its philosophical family and predict the structures it will produce.',
        summary: 'Whether you play the French, the Sicilian, or the King’s Indian, you are choosing a structure, not a line.',
        contentParagraphs: [
          '3.2.1 Classical 1.e4: Occupy the centre with pawns, develop rapidly, maintain structural integrity (Spanish, Italian, French, Caro-Kann).',
          '3.2.2 Classical 1.d4: Closed frameworks, IQP, Carlsbad, Slav/Semi-Slav.',
          '3.2.4 Hypermodern against 1.d4: Invite White’s broad pawn center and strike it down with pieces (King’s Indian, Grünfeld, Nimzo-Indian).'
        ],
        initialFen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2',
        checkpoint: {
          question: 'What is the foundational philosophy of Hypermodern systems against 1.d4 (such as the King’s Indian or Grünfeld)?',
          options: [
            'Copy White’s moves until move 15',
            'Allow White to build a broad pawn centre with c4/d4/e4, and then undermine and counterattack it with pieces and flank breaks',
            'Trade all pieces immediately to reach a king-and-pawn endgame',
            'Only move pawns on the a and h files'
          ],
          correctIndex: 1,
          explanation: 'Hypermodern players do not rush to occupy the center with pawns; they invite the opponent to extend pawns forward, creating targets for piece pressure and timely pawn breaks.',
          takeaway: 'Space is an advantage only if the pawns can be defended.'
        }
      }
    ]
  },
  {
    id: 'ch_4',
    number: 4,
    code: 'Chapter 4',
    title: 'Middlegame Structural Management & Plan Execution',
    subtitle: 'The M1–M7 Engine, Defence, Prophylaxis & Unified Evaluation',
    description: 'A repeatable decision process for every middlegame position: naming the structure, prophylactic restriction, fortress building, and the 7-step evaluation checklist.',
    units: [
      {
        id: 'unit_4_1',
        chapterId: 'ch_4',
        chapterNumber: 4,
        unitCode: '4.1',
        title: 'The 7 Middlegame Principles (M1–M7)',
        subtitle: 'The Universal Middlegame Loop',
        whatToLearn: 'M1 Name the structure (by move 10–12 write type + 1-sentence plan). M2 Structure dictates break. M3 Pieces follow pawns. M4 Stop their break first. M5 Trade by structure. M6 Keep tension. M7 Calculate irreversible moves.',
        whatToExpect: 'Checklist practice on real games. Universal loop: after every trade or break, re-run M1.',
        expectedOutcome: 'The student consistently names the structure and attaches a coherent plan.',
        summary: 'If you cannot write your plan in one plain sentence, you do not have a plan; you have a wish.',
        contentParagraphs: [
          'By move 10 to 12, the opening dust settles. At this moment, every serious practitioner pauses to execute M1: Name the structure and write your one-sentence plan.',
          'Principle M4 is where amateur players lose games: they pursue their own plan while ignoring the opponent’s liberating break. Always stop their break first.',
          'Universal Loop: after every pawn break or major piece trade, the structure changes. Immediately re-run M1!'
        ],
        initialFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
        checkpoint: {
          question: 'What is the "Universal Loop" in Structure-First Chess middlegame play?',
          options: [
            'Offer a draw every 10 moves',
            'After every pawn break or major trade, re-run M1 to re-name the structure and update your one-sentence plan',
            'Always sacrifice the queen for two rooks',
            'Calculate every candidate move to 10 plies deep'
          ],
          correctIndex: 1,
          explanation: 'The Universal Loop ensures your mind does not autopilot on an outdated plan. When a trade or break alters the pawn terrain, you immediately re-evaluate the new structure.',
          takeaway: 'Never play tomorrow’s plan on yesterday’s pawn skeleton.'
        }
      },
      {
        id: 'unit_4_3',
        chapterId: 'ch_4',
        chapterNumber: 4,
        unitCode: '4.3',
        title: 'Defensive Technique & Drawing Resources',
        subtitle: 'Fortresses, Perpetual Check, Stalemate Tricks & Desperados',
        isNew: true,
        whatToLearn: 'Defence as a distinct skill set: fortresses (opposite-coloured bishops, rook-and-pawn), perpetual check, stalemate tricks, desperado sacrifices, trading into drawn endings, sticking defence.',
        whatToExpect: 'Defensive puzzle sets, fortress recognition drills, model games of great defensive saves (Petrosian, Karpov).',
        expectedOutcome: 'The student can hold inferior positions more often and actively looks for drawing resources instead of collapsing.',
        summary: 'Being worse is not being lost. Defence is the art of erecting barriers and finding the one drawing resource.',
        contentParagraphs: [
          'Many players collapse when they lose a pawn or face an attack. But defence is a creative discipline. A fortress holds despite a material deficit because the attacker cannot make progress without conceding the win.',
          'Opposite-coloured bishops are the ultimate drawing resource: even two pawns down, a blockade on the light or dark squares cannot be breached.',
          'The practical defensive checklist: identify the opponent’s ONLY winning idea, and eliminate that idea before attempting to improve your own pieces.'
        ],
        initialFen: '8/8/4k3/4b3/8/4B3/4P3/4K3 w - - 0 1',
        checkpoint: {
          question: 'Why are opposite-coloured bishop endgames famously known as powerful drawing resources even with a pawn deficit?',
          options: [
            'Bishops move in straight lines and block rooks',
            'Neither bishop can ever attack the squares controlled by the other, allowing the defender to create an unbreachable blockade',
            'FIDE awards half a point whenever opposite-coloured bishops are on the board',
            'The pawns cannot move forward once bishops are exchanged'
          ],
          correctIndex: 1,
          explanation: 'Because each bishop controls exclusively one color complex, the defender can set up a fortress on their color complex that the attacking bishop can never disturb.',
          takeaway: 'When worse, search for trades that steer into drawn technical endings.'
        }
      },
      {
        id: 'unit_4_4',
        chapterId: 'ch_4',
        chapterNumber: 4,
        unitCode: '4.4',
        title: 'Prophylaxis, Restriction, Blockade & Zugzwang',
        subtitle: 'The Nimzowitsch-Petrosian-Karpov Tradition',
        isNew: true,
        whatToLearn: 'Core positional tools: Prophylaxis (guiding question: "What would they play if it were their move?"), restriction of enemy knights, overprotection of key points, blockading passed pawns, and zugzwang.',
        whatToExpect: 'Model games from Nimzowitsch, Petrosian, and Karpov; distinguishing passive over-prevention from aggressive prophylaxis.',
        expectedOutcome: 'The student integrates prophylactic and restrictive tools into middlegame play and can use blockade as a concrete weapon.',
        summary: 'Prophylaxis is not cowardice; it is the quiet act of taking away your opponent’s dreams before pursuing your own.',
        contentParagraphs: [
          'Aron Nimzowitsch wrote: "Neither attack nor defence is the essence of positional play, but prophylaxis." Tigran Petrosian and Anatoly Karpov elevated this to an art form.',
          'Prophylaxis asks on every move: "If my opponent had the move right now, what would they play?" Once you identify their intended break or piece transfer, you neutralize it before launching your advance.',
          'Restriction specifically targets enemy knights — the least mobile pieces. An outpost pawn on e5 or d5 strips a knight of its forward squares, reducing it to a spectator.'
        ],
        initialFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP1BBPPP/R2Q1RK1 w - - 0 9',
        checkpoint: {
          question: 'What is the governing question behind true prophylactic thinking?',
          options: [
            'How can I deliver checkmate in the fewest possible moves?',
            'What would my opponent play if it were their move right now, and how do I prevent it?',
            'Can I win a pawn on the queenside immediately?',
            'What is the engine evaluation to depth 25?'
          ],
          correctIndex: 1,
          explanation: 'Prophylaxis begins by stepping into the opponent’s mind, discerning their plan, and disarming it before executing your own.',
          takeaway: 'Before you strike, silence your opponent’s counterplay.'
        }
      },
      {
        id: 'unit_4_5',
        chapterId: 'ch_4',
        chapterNumber: 4,
        unitCode: '4.5',
        title: 'The Unified Evaluation Checklist',
        subtitle: 'The 7-Step Tool: Evaluate Before You Plan',
        isNew: true,
        whatToLearn: 'The single ordered checklist: 1. Material & imbalances, 2. King safety, 3. Space & central control, 4. Piece quality & activity, 5. Pawn structure & weaknesses, 6. Dynamic factors, 7. The Three-Path Filter.',
        whatToExpect: 'Checklist practice on real positions; calibrated against master evaluations.',
        expectedOutcome: 'The student evaluates positions consistently and transitions from evaluation to plan without drifting.',
        summary: 'A disciplined checklist stops emotional drifting and guides you straight into the right conversion path.',
        contentParagraphs: [
          'Amateurs drift: they look at a bishop, then calculate a random tactic, then worry about their king. The Unified Evaluation Checklist replaces wandering with an ordered 7-step sequence.',
          'Step 7 connects evaluation to action: The Three-Path Filter. After reviewing material, king safety, space, piece quality, pawn structure, and dynamics, ask: Which conversion path (A, B, or C) is live?',
          'If Path A (tactical win) is not live, you must NOT force a combination. You stay in Path B (build-up) or steer to Path C (endgame conversion).'
        ],
        initialFen: '2r2rk1/1p1nbppp/pq2pn2/3p4/3P4/1PN1PN2/PB2BPPP/2RQ1RK1 w - - 0 12',
        checkpoint: {
          question: 'What is the final step (Step 7) of the Unified Evaluation Checklist that translates evaluation into move choice?',
          options: [
            'Check the remaining clock time',
            'The Three-Path Filter: asking which conversion path (A Tactical, B Positional, C Technical Endgame) is live',
            'Offer a handshake to the opponent',
            'Count how many pawns remain on the a-file'
          ],
          correctIndex: 1,
          explanation: 'Step 7 applies the Three-Path Filter to determine whether you are hunting (A), building (B), or converting an endgame (C).',
          takeaway: 'Evaluate first; let the path emerge from the structure.'
        }
      }
    ]
  },
  {
    id: 'ch_5',
    number: 5,
    code: 'Chapter 5',
    title: 'The 3-Path Conversion Engine & Essential Endgames',
    subtitle: 'Path A, B, C Framework & The Must-Know Endgames',
    description: 'A practical filter for choosing the highest-percentage route to victory on every move, paired with Silman, Shereshevsky, and de la Villa endgame mastery.',
    units: [
      {
        id: 'unit_5_1',
        chapterId: 'ch_5',
        chapterNumber: 5,
        unitCode: '5.1',
        title: 'The 3-Path Conversion Model',
        subtitle: 'Path A (Tactical), Path B (Positional), Path C (Endgame)',
        whatToLearn: 'Path A (Forcing win; rules A1–A7). Path B (Positional build-up, second weakness; rules B1–B7). Path C (Trade into endgame; rules C1–C8). Shared rules G1–G5 and Winning Rules W1–W4.',
        whatToExpect: 'Path-identification drills; practicing transitions when conditions change.',
        expectedOutcome: 'Fewer missed wins and fewer unnecessary complications; clean conversion technique.',
        summary: 'Most won games are thrown away because players seek a flashy tactical mate (Path A) when the position called for a quiet technical trade (Path C).',
        contentParagraphs: [
          'Winning a won game is the hardest task in chess. The 3-Path Conversion Engine provides three distinct operational gears:',
          'Path A (The Hunt): Enter ONLY when a concrete calculation tree leads to a clear mate or material victory.',
          'Path B (The Build): When no forced win exists, do not panic. Improve your worst piece, tie down enemy pieces, and create a second weakness.',
          'Path C (The Convert): Trade down queens and minor pieces into a known, won endgame. Winning Rule W4: "Know when to stop pressing and trade into safety."'
        ],
        initialFen: '4r1k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
        checkpoint: {
          question: 'When should a player transition from Path B (Build-up) to Path C (Technical Endgame)?',
          options: [
            'Whenever their clock drops below 2 minutes',
            'When a trade of pieces simplifies into a known, favourable ending that eliminates opponent counterplay',
            'Only when the opponent agrees to trade queens',
            'Never; Path B should always lead directly to checkmate'
          ],
          correctIndex: 1,
          explanation: 'Path C simplifies the position into a known theoretical win, draining all tactical counter-chances from the opponent.',
          takeaway: 'The simplest route to victory is the master’s route.'
        }
      },
      {
        id: 'unit_5_2',
        chapterId: 'ch_5',
        chapterNumber: 5,
        unitCode: '5.2',
        title: 'Essential Endgames & Principles E1–E8',
        subtitle: 'Lucena, Philidor, Vancura & King and Pawn Fundamentals',
        isExpanded: true,
        whatToLearn: 'Core endgames: Lucena building a bridge, Philidor passive defense, Vancura rook vs. pawn, outside passed pawns, pawn breakthroughs, distant opposition, and Endgame Principles E1–E8.',
        whatToExpect: 'Systematic practice from basic mates to complex rook endings; tablebase verification.',
        expectedOutcome: 'Reliable technique across must-know endgames; converting advantages and saving half-points.',
        summary: 'In the endgame, the king transforms from a timid target into an aggressive attacking piece.',
        contentParagraphs: [
          'Principle E1: Activate the king. In king-and-pawn and rook endgames, the king’s activity often outweighs an entire pawn.',
          'Lucena Position: The bridge-building technique (cutting off the enemy king, advancing the rook to the 4th rank, and shielding the king from checks).',
          'Philidor Position: The defensive masterclass. Keep the rook on the 6th rank to prevent the attacking king from entering; once the pawn advances to the 6th rank, immediately drop the rook to the back rank for perpetual rear checks!'
        ],
        initialFen: '1K6/1P1k4/8/8/8/8/1r6/R7 w - - 0 1',
        checkpoint: {
          question: 'What is the golden rule of the Philidor defensive rook ending setup?',
          options: [
            'Advance your king to the center of the board immediately',
            'Hold the 6th rank with your rook to bar the enemy king; as soon as the enemy pawn advances to the 6th rank, drop to the 8th/1st rank to deliver checks from behind',
            'Sacrifice your rook for the enemy pawn on move one',
            'Hide your king in the corner'
          ],
          correctIndex: 1,
          explanation: 'The Philidor defense rests on barring the enemy king with a 6th rank rook. Once the pawn steps forward, the king can no longer hide, so checks from the rear force a perpetual draw.',
          takeaway: 'Rook endings are drawn unless you know how to build a bridge or stop a king.'
        }
      }
    ]
  },
  {
    id: 'ch_6',
    number: 6,
    code: 'Chapter 6',
    title: 'Deep Calculation, Error Logging & Elite Performance',
    subtitle: 'Kotov Trees, The 4 Leaks & Engine Discipline',
    description: 'Candidate-move generation and single-branch calculation to completion, paired with post-game diagnostic error logging that converts mistakes into spaced-repetition flashcards.',
    units: [
      {
        id: 'unit_6_2',
        chapterId: 'ch_6',
        chapterNumber: 6,
        unitCode: '6.2',
        title: 'Diagnostic Error Logging',
        subtitle: 'The Four Leak Categories & Spaced-Repetition',
        whatToLearn: 'The 4 leak categories: Perception (missed threat), Visualisation (miscalculation / coordinate slip), Knowledge (unfamiliar theoretical pattern), Decision (time trouble / tilt). Targeted remediation.',
        whatToExpect: 'Post-game logging protocol and immediate flashcard creation.',
        expectedOutcome: 'Rapid reduction of recurring error types through honest diagnosis.',
        summary: 'You do not improve by playing 1,000 bullet games. You improve by diagnosing why your mind leaked on move 23.',
        contentParagraphs: [
          'Every mistake in chess belongs to one of four leaks:',
          '1. Perception Leak: You did not see what was on the board right now (loose piece, undefended square, opponent threat).',
          '2. Visualisation Leak: You calculated, but missed a quiet intermediate move (zwischenzug) 3 moves deep.',
          '3. Knowledge Leak: You did not know the Lucena bridge or the Carlsbad minority attack.',
          '4. Decision Leak: You knew better, but played on impulse or rushed because your clock was ticking.',
          'Categorising every blunder pinpoints exactly which training drill will fix it.'
        ],
        initialFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        checkpoint: {
          question: 'If a player knows how to defend a rook endgame in theory, but rushes a move with 30 seconds on the clock and blunders, which leak occurred?',
          options: [
            'Knowledge leak',
            'Decision leak (time management / psychological impulse)',
            'Geometry leak',
            'Perception leak'
          ],
          correctIndex: 1,
          explanation: 'The player possessed the theoretical knowledge, but failed in execution due to time pressure and emotional rush. This is a Decision leak.',
          takeaway: 'Distinguish between what you do not know and how you behave under pressure.'
        }
      }
    ]
  },
  {
    id: 'ch_7',
    number: 7,
    code: 'Chapter 7',
    title: 'Chess Narratives, Psychology & Historical Context',
    subtitle: 'Baguio 1978, Reykjavik 1972, Magicians & FIDE',
    description: 'Historical, psychological, and institutional context that enriches practical play and long-term motivation: Karpov-Korchnoi, Fischer-Spassky, Tal’s sacrifices, and FIDE titles.',
    units: [
      {
        id: 'unit_7_1',
        chapterId: 'ch_7',
        chapterNumber: 7,
        unitCode: '7.1',
        title: 'Psychological Intimidation & Title-Match Dynamics',
        subtitle: 'Baguio 1978, Hypnotists, Glasses & Lasker’s Mind Games',
        whatToLearn: 'Baguio 1978 (Karpov vs. Korchnoi), Tal’s piercing gaze and Benko’s sunglasses, Lasker’s psychological approach versus Steinitz’s dogmatic objectivity.',
        whatToExpect: 'Examining the psychological pressure of championship matches and resilience at the board.',
        expectedOutcome: 'Understanding that chess is played by human beings with nervous systems, not silicon engines.',
        summary: 'Emanuel Lasker did not play the best move; he played the move most uncomfortable for his specific opponent.',
        contentParagraphs: [
          'In Baguio 1978, Anatoly Karpov and Viktor Korchnoi battled amidst accusations of parapsychologists, coded yoghurt flavors, and mirrored sunglasses. The psychological tension was suffocating.',
          'Emanuel Lasker, World Champion for 27 years, pioneered psychological play: steering games toward structures his opponents detested.',
          'At The Homing Square, we recognize that staying calm in chaos is a learned skill. When the board catches fire, presence of mind is your most lethal piece.'
        ],
        initialFen: 'r1bqk2r/pppp1ppp/2n5/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
        checkpoint: {
          question: 'What was Emanuel Lasker’s core psychological insight during match play?',
          options: [
            'Always move as quickly as possible to intimidate the opponent',
            'Choose positions that present practical difficulties tailored to the opponent’s temperament and stylistic weaknesses',
            'Only play openings approved by Steinitz',
            'Refuse to shake hands before the round'
          ],
          correctIndex: 1,
          explanation: 'Lasker understood that an objectively second-best move that demands exhausting calculation from an opponent often scores higher than a dry, equal line.',
          takeaway: 'Respect the human across the board: match psychological fortitude with structural clarity.'
        }
      }
    ]
  },
  {
    id: 'ch_8',
    number: 8,
    code: 'Chapter 8',
    title: 'Philosophy and Mastery',
    subtitle: 'Positional Chess vs. Structure-First Chess & The Mastery Check',
    description: 'The capstone chapter: comparing structural thinking to classical positional schools, and re-assembling the entire method end-to-end for the Homecoming graduation.',
    units: [
      {
        id: 'unit_8_1',
        chapterId: 'ch_8',
        chapterNumber: 8,
        unitCode: '8.1',
        title: 'Positional Chess versus Structure-First Chess',
        subtitle: 'The Continuous Structural Question',
        whatToLearn: 'Conceptual distinction: Classical positional chess accumulates small edges; Structure-First Chess organizes everything around the pawn skeleton and the continuous question.',
        whatToExpect: 'Reflective comparison and practical guidelines on when structural vs. dynamic thinking is most appropriate.',
        expectedOutcome: 'The student can articulate the philosophy of the course and apply its continuous question in every phase.',
        summary: 'The single continuous question: "What is the structure, what plan belongs to it, and has anything just changed?"',
        contentParagraphs: [
          'Classical positional chess emphasizes accumulating small advantages, prophylaxis, piece placement, and weak squares. It is a noble tradition, but can lead to aimless maneuvering.',
          'Structure-First Chess unifies the game under a single question: "What is the structure, what plan belongs to it, and has anything just changed?"',
          'The pawn skeleton tells you which breaks belong to you and which belong to your opponent. When the skeleton transforms, your plan must transform immediately.'
        ],
        initialFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
        checkpoint: {
          question: 'What is the single continuous question that governs Structure-First Chess from move one to move eighty?',
          options: [
            'Can I sacrifice a piece for an attack?',
            '"What is the structure, what plan belongs to it, and has anything just changed?"',
            'What would Stockfish play in this position?',
            'How many moves remain until the time control?'
          ],
          correctIndex: 1,
          explanation: 'This single question anchors your mind across opening, middlegame transitions, and endgames, keeping you in touch with the board reality.',
          takeaway: 'Hold this question in mind: it will guide you through every position.'
        }
      },
      {
        id: 'unit_8_2',
        chapterId: 'ch_8',
        chapterNumber: 8,
        unitCode: '8.2',
        title: 'The Mastery Check: The Unified Method End-to-End',
        subtitle: 'The Capstone: One-Page Map, Model Walkthrough, 5-Phase Rubric & Graduation Gauntlet',
        isNew: true,
        whatToLearn: 'Re-assembling what was taught and testing the assembly: 1. The One-Page Map, 2. Annotated Walkthrough, 3. The 5-Phase Rubric, 4. The 10-Game Gauntlet, 5. The Honest Limits.',
        whatToExpect: 'Auditing your own games against the five-phase rubric; completing the graduation protocol.',
        expectedOutcome: 'The student can articulate the unified method, run it end-to-end, identify which layer leaked, and demonstrate competence for Homecoming certification.',
        summary: 'Mastery is demonstrated, not declared. Ten games logged, five phases reviewed, proof of commitment.',
        contentParagraphs: [
          'The course taught the unified method in parts so each layer was learned cleanly. The cost of that design was fragmentation. Unit 8.2 is the re-integration pass: it proves you can run the whole chain.',
          'The Graduation Gauntlet requires playing 10 serious games (rated OTB or long-form online without engine assistance) and completing a 1-page log for each.',
          'The five-phase rubric audits Opening (P1-P7), Middlegame (M1-M7), Conversion (A/B/C), Endgame (E1-E8), and Perception & Discipline (V1 scan + Error log).',
          'Pass standard: rubric is scored Yes or Partly in all five phases, with no phase at No, and at least three phases at Yes.'
        ],
        initialFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
        checkpoint: {
          question: 'What is the graduation standard for the 10-Game Gauntlet in the Mastery Check?',
          options: [
            'Winning all 10 games with an Elo rating over 2000',
            'Scoring "Yes" or "Partly" in all five rubric phases with zero phases at "No", and at least three phases at "Yes"',
            'Submitting 10 puzzle solutions within 5 minutes',
            'Having an engine verify that you made zero blunders'
          ],
          correctIndex: 1,
          explanation: 'The Mastery Check rewards discipline over outcome: a phase at "No" is not a failure of the person, but a precise diagnosis of which layer to re-study.',
          takeaway: 'Mastery is demonstrated through honest accounting, not boasting.'
        }
      }
    ]
  }
];
