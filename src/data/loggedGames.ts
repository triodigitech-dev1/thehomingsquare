import { LoggedGame } from '../types/chess';

export const INITIAL_LOGGED_GAMES: LoggedGame[] = [
  {
    id: 'log_01_carlsbad',
    title: 'Minority Attack & Queenside Execution',
    event: 'Homecoming Cohort 01 — Serious Game 1',
    date: '2026-10-14',
    whitePlayer: 'Homecomer (1640)',
    blackPlayer: 'Opponent (1695)',
    result: '1 - 0',
    structure: 'Carlsbad Formation',
    oneSentencePlan: 'Conduct the minority attack b4-b5 to fix c6 as a backward target, while blockading Black’s ...e5 break.',
    pathSwitch: {
      occurred: true,
      fromPath: 'B',
      toPath: 'C',
      triggerMove: '28.Qxc8',
      description: 'Once Black agreed to trade rooks and queens, switched from Positional Build (B) to Technical Endgame (C) to harvest the b7 weakness.'
    },
    defensiveResource: {
      identified: true,
      type: 'Perpetual Check',
      description: 'Opponent had a potential queen check resource on move 26, but missed it by playing ...Rc8.',
      wasUsedOrMissed: 'missed'
    },
    errorLeaks: [
      {
        category: 'Perception',
        moveNumber: 15,
        description: 'Failed to notice Black’s knight on f8 had an eye on the d7 square; played a slight inaccuracy before correcting.',
        lesson: 'Run full V1 Checks & Threats scan before candidate move generation.'
      },
      {
        category: 'Decision',
        moveNumber: 22,
        description: 'Rushed move 22 with 14 minutes still on the clock; played impulsively without Kotov tree falsification.',
        lesson: 'Slow down. Time reserve is meant to be spent on irreversible decisions.'
      }
    ],
    endgameReached: 'Rook & Pawn with outside passed b-pawn',
    isGauntletGame: true,
    fenKeyPosition: 'r2qr1k1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8',
    pgn: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 Be7 6. e3 O-O 7. Bd3 Nbd7 8. Nf3 c6 9. Qc2 Re8 10. O-O Nf8 11. Rab1 Be6 12. b4 a6 13. a4 N6d7 14. Bxe7 Qxe7 15. b5 axb5 16. axb5 c5 17. dxc5 Nxc5 18. Nd4 Rec8 19. Rfc1 Nfd7 20. Bxh7+ Kh8 21. Bf5 Nb6 22. Qe2 g6 23. Bxe6 fxe6 24. Qg4 Qf6 25. Nce2 e5 26. Nf3 Kg7 27. Qg3 Nbd7 28. Rd1 Ra2 29. Nc3 Rc2 30. Nxd5 Qf7 31. Nxe5 Nxe5 32. Qxe5+ Kh6 33. Nf4 Re8 34. Qd6 Ne4 35. Qd3 Rxf2 36. Rf1 Rd2 37. Qa3 Ra2 38. Qb4 Qe7 39. Qxe7 Rxe7 40. Nd5 Re5 41. Nb4 Rd2 42. Rbd1 1-0',
    notes: 'Exemplary execution of Carlsbad minority attack. Demonstrated patience under opponent counter-threats.'
  },
  {
    id: 'log_02_french',
    title: 'French Advance Fortress Save',
    event: 'Club Championship Round 3',
    date: '2026-10-21',
    whitePlayer: 'Opponent (1720)',
    blackPlayer: 'Homecomer (1640)',
    result: '1/2 - 1/2',
    structure: 'French Advance Chain',
    oneSentencePlan: 'Assault White’s pawn chain base at d4 with ...c5, ...Nc6, and ...Qb6 while keeping the king safe on the queenside.',
    pathSwitch: {
      occurred: true,
      fromPath: 'B',
      toPath: 'C',
      triggerMove: '36...Bxf4',
      description: 'Being a pawn down, switched into Path C (Technical Ending) by steering into an opposite-coloured bishop ending to erect an unbreachable fortress.'
    },
    defensiveResource: {
      identified: true,
      type: 'Fortress',
      description: 'Built a dark-square blockade with Bishop on d5 and King on e6 against White’s extra light-squared pawn.',
      wasUsedOrMissed: 'used'
    },
    errorLeaks: [
      {
        category: 'Visualisation',
        moveNumber: 19,
        description: 'Miscalculated a 3-ply combination involving a knight jump, allowing White to capture on a7.',
        lesson: 'Check all intermediate checks (zwischenzugs) before committing to piece sacrifices.'
      }
    ],
    endgameReached: 'Opposite-Coloured Bishop Fortress',
    isGauntletGame: true,
    fenKeyPosition: '8/8/4k3/3b4/8/3B4/4P3/4K3 w - - 0 37',
    pgn: '1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3 Nh6 7. b4 cxd4 8. cxd4 Nf5 9. Bb2 Bd7 10. g4 Nfe7 11. Nc3 Na5 12. Na4 Qc6 13. Nc5 Nc4 14. Bc1 b6 15. Nxd7 Qxd7 16. Bd3 Rc8 17. O-O h5 18. h3 hxg4 19. hxg4 g6 20. Kg2 Bg7 21. Rh1 Rxh1 22. Qxh1 Kd8 23. Qh7 Bf8 24. Qxf7 Kc7 25. Bg5 Kb8 26. Rh1 Qe8 27. Qxe6 Rc6 28. Rh8 Rxe6 29. Bxe7 Rxe7 30. Bxg6 Qxg6 31. Rxf8+ Kb7 32. g5 Rf7 33. Rxf7+ Qxf7 34. Kg3 Qf5 35. Nh4 Qxg5+ 36. Kh3 Nd2 37. Ng2 Ne4 38. f4 Qh5+ 39. Nh4 Nf2+ 40. Kg3 Ne4+ 41. Kh3 Nf2+ 1/2-1/2',
    notes: 'A critical lesson in never resigning prematurely. Unit 4.3 drawing techniques preserved the half-point.'
  },
  {
    id: 'log_03_kid',
    title: 'King’s Indian Counter-Strike & Path Switch',
    event: 'Online Rapid Classical Rated',
    date: '2026-10-28',
    whitePlayer: 'Candidate Master (1810)',
    blackPlayer: 'Homecomer (1645)',
    result: '0 - 1',
    structure: 'King’s Indian Locked Centre',
    oneSentencePlan: 'Absorb White’s c5 break on the queenside while rolling pawns ...f5, ...f4, ...g5 for a kingside mating net.',
    pathSwitch: {
      occurred: true,
      fromPath: 'B',
      toPath: 'A',
      triggerMove: '29...f3!',
      description: 'When White’s knight vacated the defensive f1 square, switched instantly from Path B (Build-up) to Path A (Forcing mating net with ...f3 and ...Qh3).'
    },
    defensiveResource: {
      identified: true,
      type: 'Desperado',
      description: 'Looked for White’s desperado knight checks on e7 before releasing the tactical strike.',
      wasUsedOrMissed: 'used'
    },
    errorLeaks: [
      {
        category: 'Knowledge',
        moveNumber: 9,
        description: 'Played ...exd4 instead of the structural norm ...e5, momentarily handing White free central squares.',
        lesson: 'In KID structures, keeping the center locked with ...e5 is essential to secure kingside attacking time.'
      }
    ],
    endgameReached: 'Mating net delivered in middlegame (Path A)',
    isGauntletGame: true,
    fenKeyPosition: 'r1bq1rk1/ppp1n1bp/3p2p1/3Ppp2/2P1P3/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 11',
    pgn: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. Be3 f5 11. f3 f4 12. Bf2 g5 13. Nd3 Nf6 14. c5 Ng6 15. Rc1 Rf7 16. cxd6 cxd6 17. Nb5 a6 18. Na3 b5 19. Rc6 g4 20. Bb6 Qf8 21. Qc2 g3 22. Rc1 Bd7 23. Rc7 gxh2+ 24. Kh1 Nh5 25. Bf2 Ng3+ 26. Kxh2 Qe7 27. Kg1 Qh4 28. Bxg3 fxg3 29. Bd1 Qh2+ 30. Kf1 Qh1+ 31. Ke2 Qxg2+ 32. Ke1 Qg1+ 33. Kd2 Bh6+ 34. Kc3 Qd4+ 35. Kb3 Bxc1 36. Qxc1 Qxd3+ 37. Rc3 Qd4 0-1',
    notes: 'Clean execution of Path A transition once the king was stripped of defenders.'
  }
];
