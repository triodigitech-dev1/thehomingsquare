export interface ResourceItem {
  id: string;
  category: 'Curriculum & Guides' | 'Foundations & Standards' | 'Visual Gallery & Assets' | 'System Protocols';
  title: string;
  description: string;
  format: 'PDF' | 'Markdown' | 'Image' | 'Data';
  fileUrl?: string;
  markdownContent?: string;
  imagePath?: string;
  aspectRatio?: string;
}

export const PLATFORM_RESOURCES: ResourceItem[] = [
  // 1. Official Guides
  {
    id: 'res_pdf_curriculum',
    category: 'Curriculum & Guides',
    title: 'Structure-First Chess Mastery: Complete Lifespan Curriculum Guide',
    description: 'Course Work Contents Guide — Final Enriched Edition. Elo 1000–2700+, Prerequisite Chapter + 8 Main Chapters + Capstone Unit 8.2 + Appendix.',
    format: 'PDF',
    fileUrl: '/assets/aistudio/Structure_First_Chess_Mastery_31a83b4c.pdf'
  },
  {
    id: 'res_md_manifesto',
    category: 'Foundations & Standards',
    title: 'The Homing Square: Full Brand Book & Philosophy',
    description: 'The naming stack, meaning, tone of voice, visual direction, five non-negotiables, and founding manifesto.',
    format: 'Markdown',
    markdownContent: `# The Homing Square — Foundations & Standards

## 1. The Meaning
- **Human:** *homing* is the instinct to return — the way a homing pigeon finds its way back from anywhere, without being taught. It says the way home is already in you.
- **Chess:** a *square* is a place on the board — and a *safe square* is where a piece belongs. **Castling** is the king's return to its home square.
- **The dignity:** you are not being rescued. You are being reminded that the capacity to come back was never lost.
- **The club line:** *"Every piece has a home square."*

## 2. Mission & Vision
- **Mission:** Use chess as a threshold back to life — a free, low-stakes arena where anyone in retreat can practise presence, honest self-confrontation, and finishing something hard.
- **Vision:** A world where the board is the first journey and the globe is the second — where completing the Mastery Check is proof a person can commit, and that proof opens a door outward.

## 3. Visual Palette & Architecture
A calm, focused reading environment with warm tones, generous whitespace, and zero noise.
- **Primary:** Homing Green (\`#1E3A2F\`)
- **Base:** Paper Ivory (\`#F6F1E7\`)
- **Accent:** Homing Gold (\`#C6A664\`) — exactly one lit square per screen.
- **Text:** Charcoal (\`#262626\`)
- **Secondary surface:** Warm Stone (\`#D9CFC0\`)
- **Alert / Tag:** Clay (\`#A8553F\`)

## 4. The 5 Non-Negotiables
1. Free for the individual learner, forever.
2. Mastery demonstrated, not declared.
3. No data monetisation, no clinical claims, no borrowed labels.
4. No leaderboards of wins.
5. The door is open to everyone.`
  },
  {
    id: 'res_md_principles',
    category: 'System Protocols',
    title: 'The Foundational Decision Framework (P1–P7 & M1–M7)',
    description: 'The 7 Opening Principles with rule, test, and caveat for each, plus the 7 Middlegame Principles and the Universal Loop.',
    format: 'Markdown',
    markdownContent: `# Structure-First Decision Framework

## The Seven Opening Principles (P1–P7)
- **P1. Dictate the structure:** Commit on move one to a pawn formation that defines the game. Test: Is the pawn skeleton still the one I chose?
- **P2. Force the opponent:** Pose a concrete question Black must answer, not merely develop. Test: Can I state the question in one sentence?
- **P3. Prefer pawns to pieces for central control:** Use pawns to hold the centre and pieces to support them.
- **P4. Minimise the opponent’s branching:** Prefer a move whose replies fall into few structural families.
- **P5. Have a repeatable plan:** Know moves 2 to 4 as defaults before seeing Black's reply.
- **P6. Do not weaken your own position:** Avoid pawn moves that create permanent holes or open diagonals.
- **P7. The initiative is a trade, not a free lunch:** Treat the initiative as borrowed. What structural concession pays for it?

## The 7 Middlegame Principles (M1–M7)
- **M1. Name the structure:** By move 10–12 write type + one-sentence plan.
- **M2. Structure dictates the break:** Identify both sides’ breaks before choosing your plan.
- **M3. Pieces follow pawns:** Pawn skeleton is the terrain.
- **M4. Stop their break first:** Prophylaxis precedes execution.
- **M5. Trade by structure:** Exchange pieces that favor the opponent.
- **M6. Keep tension until release pays:** Premature pawn captures clarify opponent problems.
- **M7. Calculate before irreversible moves:** Pawn moves and sacrifices cannot be taken back.

*Universal Loop: After every break or major trade, re-run M1.*`
  },
  {
    id: 'res_md_operational',
    category: 'System Protocols',
    title: 'Operational Schedules & Daily/Weekly Training Protocols',
    description: 'The 30–60 minute daily routine, weekly training schedule, pre-game scan warmup, and post-game diagnostic error review.',
    format: 'Markdown',
    markdownContent: `# Operational Schedules & Routines (From Appendix)

## Daily Routine (30–60 minutes)
1. **Tactical puzzles under strict V1 scan order:** Checks → Captures → Threats → Loose Pieces → King Safety → Candidates.
2. **Mating-pattern drill:** A short set of labelled mate-in-1, mate-in-2, and mate-in-3 puzzles (Smothered, Arabian, Anastasia, Boden's).
3. **Review one pawn-structure file** and one error-log entry.

## Weekly Training
- Master-game prediction (guess moves, compare with text).
- Blindfold visualisation drill and spaced-repetition review of flashcards.
- One focused structure package (study + exercises).
- One defensive-resource session: fortresses, perpetual check, stalemate tricks, or exchanging into a drawn ending.
- One prophylactic-thinking session: model games of Nimzowitsch, Petrosian, or Karpov.

## Pre-Game Protocol
Protect sleep, light meal, 10–15 minutes of warm-up puzzles to activate the visual scan engine.

## In-Game Execution
Enforce V1 scan, G1 blunder check, M1 structural checkpoint after trades. Before any irreversible move, run the unified evaluation checklist and verify the live path (A/B/C).

## Post-Game Review
Categorise every mistake into Perception, Visualisation, Knowledge, or Decision leaks. Turn critical errors into spaced-repetition flashcards.`
  },

  // 2. Visual Gallery & Assets
  {
    id: 'res_img_study',
    category: 'Visual Gallery & Assets',
    title: 'The Reading Room',
    description: 'Study room with handcrafted wooden chessboard on oak table under banker’s lamp.',
    format: 'Image',
    imagePath: '/src/assets/images/study_reading_room_lamplight_1793960008937.jpg',
    aspectRatio: '16:9'
  },
  {
    id: 'res_img_hands',
    category: 'Visual Gallery & Assets',
    title: 'Hands at the Board',
    description: 'Player in concentration over a wooden chessboard.',
    format: 'Image',
    imagePath: '/src/assets/images/hands_board_concentration_1793960010852.jpg',
    aspectRatio: '4:3'
  },
  {
    id: 'res_img_book',
    category: 'Visual Gallery & Assets',
    title: 'Book One: The Threshold',
    description: 'Hardcover edition on study desk.',
    format: 'Image',
    imagePath: '/src/assets/images/book_the_threshold_cover_1793960011717.jpg',
    aspectRatio: '3:4'
  },
  {
    id: 'res_img_community',
    category: 'Visual Gallery & Assets',
    title: 'Community Gathering',
    description: 'Study group at chessboards in evening lamplight.',
    format: 'Image',
    imagePath: '/src/assets/images/community_homing_gathering_1793960011638.jpg',
    aspectRatio: '16:9'
  },
  {
    id: 'res_img_emblem',
    category: 'Visual Gallery & Assets',
    title: 'Golden Chess Academy Emblem',
    description: 'Official Academy golden crest and emblem.',
    format: 'Image',
    imagePath: '/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png',
    aspectRatio: '1:1'
  },
  {
    id: 'res_img_wordmark',
    category: 'Visual Gallery & Assets',
    title: 'Official Wordmark & Motto',
    description: 'The Homing Square — Chess · Learn · Improve · Belong.',
    format: 'Image',
    imagePath: '/assets/aistudio/The_Homing_Square_Wordmark_ba0065b1.png',
    aspectRatio: '16:9'
  }
];
