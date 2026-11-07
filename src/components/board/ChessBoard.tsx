import React, { useState, useEffect, useRef } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';
import { ChessErrorBoundary } from './ChessErrorBoundary';

interface ChessBoardProps {
  initialFen?: string;
  onMove?: (from: Square, to: Square, san: string, newFen: string) => void;
  interactive?: boolean;
  highlightSquares?: string[];
  homingSquare?: string; // Specific square to highlight with the homing gold glow
  pawnSkeletonOnly?: boolean;
  flipped?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showCapturedPieces?: boolean;
  showTurnStatus?: boolean;
  soundEnabled?: boolean;
}

export type { Square, PieceSymbol, Color };

// Audio synthesizers via Web Audio API
export function playMoveSound(enabled = true, isCapture = false, isCheck = false, isCastling = false) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (isCheck) {
      // Alerting double check chime
      [587.33, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.22);
      });
      return;
    }

    if (isCastling) {
      // Double wooden tap
      [0, 0.08].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + delay + 0.05);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.06);
      });
      return;
    }

    // Capture or normal move
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = isCapture ? 'square' : 'triangle';
    const startFreq = isCapture ? 200 : 145;
    const endFreq = isCapture ? 55 : 45;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(isCapture ? 0.24 : 0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Audio context permission restrictions ignored
  }
}

export function playWoodenClick(enabled = true, isCapture = false) {
  playMoveSound(enabled, isCapture, false, false);
}

// Resonant success chime
export function playChimeSound(enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.38);
    });
  } catch {
    // Ignore
  }
}

// Gentle failure tone for inaccurate moves/drills
export function playFailureSound(enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.14);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Ignore
  }
}

// Grand milestone fanfare for graduation and major accomplishments
export function playMilestoneFanfare(enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const chord = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.65);
    });
  } catch {
    // Ignore
  }
}

// Crisp SVG piece symbols
export function renderPieceSvg(type: PieceSymbol, color: Color) {
  const isWhite = color === 'w';
  const fill = isWhite ? '#FFFFFF' : '#262626';
  const stroke = isWhite ? '#333333' : '#F6F1E7';

  switch (type) {
    case 'k':
      return (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm select-none pointer-events-none">
          <g fill="none" fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.5 11.63V6M20 8h5" stroke={stroke} strokeLinejoin="miter" />
            <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill={fill} stroke={stroke} />
            <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V23.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7z" fill={fill} stroke={stroke} />
            <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" stroke={stroke} />
          </g>
        </svg>
      );
    case 'q':
      return (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm select-none pointer-events-none">
          <g fill={fill} fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm16.5-4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm16.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm21 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15L14 11v14l-7-11 2 12z" strokeLinejoin="miter" />
            <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5 0-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
            <path d="M11 38.5a35 35 1 0 0 23 0" fill="none" stroke={stroke} />
            <path d="M11 29a35 35 1 0 1 23 0" fill="none" stroke={stroke} />
          </g>
        </svg>
      );
    case 'r':
      return (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm select-none pointer-events-none">
          <g fill={fill} fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 39h27v-3H9v3zm3-3v-4.5h21V36H12zm2-4.5v-13h17v13H14zm-3-15h23V11H11v6.5zm-2-9v4.5h4V9H9zm7 0v4.5h3V9h-3zm6 0v4.5h3V9h-3zm6 0v4.5h3V9h-3zm6 0v4.5h4V9h-4z" />
          </g>
        </svg>
      );
    case 'b':
      return (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm select-none pointer-events-none">
          <g fill="none" fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <g fill={fill} strokeLinecap="butt">
              <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z" />
              <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
              <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
            </g>
            <path d="M17.5 26h10M15 30h15m-7.5-14.5v5m-3-2.5h6" stroke={stroke} />
          </g>
        </svg>
      );
    case 'n':
      return (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm select-none pointer-events-none">
          <g fill="none" fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill={fill} />
            <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0-.62 1.46-1 2-1 1.5-1 4-1 5 0 0 1.5-1.5 2-1 .5.5 1 1 1.5 1.5 1.5 1.5 3 2.5 5 2.5 0-4.5 1.5-6.5 4-8.5 2.5-2 1-4.5.5-6.5-.5-2-1.5-3.5-3-4" fill={fill} />
            <path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.5-9a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z" fill={stroke} />
            <path d="M15 15.5c-1 0-2 .5-2 1.5" stroke={stroke} />
          </g>
        </svg>
      );
    case 'p':
      return (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm select-none pointer-events-none">
          <path
            d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export const STANDARD_START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function createSafeChess(fen?: string): Chess {
  if (!fen || typeof fen !== 'string') {
    return new Chess(STANDARD_START_FEN);
  }
  try {
    return new Chess(fen.trim());
  } catch (err) {
    console.warn('[The Homing Square] Non-standard FEN caught, using safe fallback:', fen, err);
    try {
      return new Chess(STANDARD_START_FEN);
    } catch {
      return new Chess();
    }
  }
}

// Calculate captured pieces & material difference
function getCapturedPieces(chess: Chess) {
  const startingCounts: Record<Color, Record<PieceSymbol, number>> = {
    w: { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 },
    b: { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 }
  };

  const currentCounts: Record<Color, Record<PieceSymbol, number>> = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
  };

  const board = chess.board();
  for (const row of board) {
    for (const square of row) {
      if (square) {
        currentCounts[square.color][square.type]++;
      }
    }
  }

  const pieceValues: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  const capturedByWhite: PieceSymbol[] = [];
  const capturedByBlack: PieceSymbol[] = [];

  let whitePoints = 0;
  let blackPoints = 0;

  (['q', 'r', 'b', 'n', 'p'] as PieceSymbol[]).forEach((p) => {
    // White captured black pieces
    const diffBlack = startingCounts.b[p] - currentCounts.b[p];
    for (let i = 0; i < diffBlack; i++) {
      capturedByWhite.push(p);
      whitePoints += pieceValues[p];
    }
    // Black captured white pieces
    const diffWhite = startingCounts.w[p] - currentCounts.w[p];
    for (let i = 0; i < diffWhite; i++) {
      capturedByBlack.push(p);
      blackPoints += pieceValues[p];
    }
  });

  return {
    capturedByWhite,
    capturedByBlack,
    whiteAdvantage: whitePoints - blackPoints
  };
}

interface PendingPromotion {
  from: Square;
  to: Square;
  color: Color;
}

interface Arrow {
  from: Square;
  to: Square;
}

export const ChessBoardInner: React.FC<ChessBoardProps> = ({
  initialFen = STANDARD_START_FEN,
  onMove,
  interactive = true,
  highlightSquares = [],
  homingSquare,
  pawnSkeletonOnly = false,
  flipped = false,
  className = '',
  size = 'md',
  showCapturedPieces = true,
  showTurnStatus = true,
  soundEnabled = true
}) => {
  const [chess, setChess] = useState(() => createSafeChess(initialFen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  
  // Drag-and-drop state
  const [draggedSquare, setDraggedSquare] = useState<Square | null>(null);

  // Promotion selector state (Lichess/Chess.com style)
  const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);

  // Right-click highlights & arrows (Lichess/Chess.com style)
  const [rightClickHighlights, setRightClickHighlights] = useState<Set<Square>>(new Set());
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [arrowStart, setArrowStart] = useState<Square | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  // Sync when initialFen changes from outside
  useEffect(() => {
    try {
      const newGame = createSafeChess(initialFen);
      setChess(newGame);
      setSelectedSquare(null);
      setLegalMoves([]);
      setLastMove(null);
      setPendingPromotion(null);
      setRightClickHighlights(new Set());
      setArrows([]);
    } catch {
      // Fallback handled safely
    }
  }, [initialFen]);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  // Find King square if in check
  const inCheck = chess.inCheck();
  let checkedKingSquare: Square | null = null;
  if (inCheck) {
    const turn = chess.turn();
    for (const r of ranks) {
      for (const f of files) {
        const sq = `${f}${r}` as Square;
        const p = chess.get(sq);
        if (p && p.type === 'k' && p.color === turn) {
          checkedKingSquare = sq;
          break;
        }
      }
      if (checkedKingSquare) break;
    }
  }

  // Execute move helper
  const executeMove = (from: Square, to: Square, promoPiece: 'q' | 'r' | 'b' | 'n' = 'q') => {
    try {
      const isCastling = (from === 'e1' && (to === 'g1' || to === 'c1')) || (from === 'e8' && (to === 'g8' || to === 'c8'));
      const targetPiece = chess.get(to);
      const isCapture = Boolean(targetPiece);

      const move = chess.move({
        from,
        to,
        promotion: promoPiece
      });

      if (move) {
        const causesCheck = chess.inCheck();
        playMoveSound(soundEnabled, isCapture, causesCheck, isCastling);

        setLastMove({ from, to });
        setSelectedSquare(null);
        setLegalMoves([]);
        setPendingPromotion(null);
        setRightClickHighlights(new Set());
        setArrows([]);

        if (onMove) {
          onMove(from, to, move.san, chess.fen());
        }
        return true;
      }
    } catch {
      // Not legal
    }
    return false;
  };

  // Check if a move requires promotion
  const isPromotionMove = (from: Square, to: Square): boolean => {
    const piece = chess.get(from);
    if (!piece || piece.type !== 'p') return false;
    const destRank = to[1];
    return (piece.color === 'w' && destRank === '8') || (piece.color === 'b' && destRank === '1');
  };

  // Click handler
  const handleSquareClick = (square: Square) => {
    if (!interactive) return;

    // Clear user annotations on left click
    if (rightClickHighlights.size > 0 || arrows.length > 0) {
      setRightClickHighlights(new Set());
      setArrows([]);
    }

    // If a promotion modal is active, clicking away dismisses it
    if (pendingPromotion) {
      setPendingPromotion(null);
      return;
    }

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      // Check if promotion is needed
      if (isPromotionMove(selectedSquare, square)) {
        const moves = chess.moves({ square: selectedSquare, verbose: true });
        const canMoveTo = moves.some((m) => m.to === square);
        if (canMoveTo) {
          setPendingPromotion({
            from: selectedSquare,
            to: square,
            color: chess.get(selectedSquare)!.color
          });
          return;
        }
      }

      // Try executing move
      const moved = executeMove(selectedSquare, square);
      if (moved) return;
    }

    // Select piece
    try {
      const piece = chess.get(square);
      if (piece && piece.color === chess.turn()) {
        setSelectedSquare(square);
        const moves = chess.moves({ square, verbose: true });
        setLegalMoves(moves.map((m) => m.to));
        playMoveSound(soundEnabled, false, false, false);
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    } catch {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  // HTML5 Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, square: Square) => {
    if (!interactive) return;
    const piece = chess.get(square);
    if (!piece || piece.color !== chess.turn()) {
      e.preventDefault();
      return;
    }
    setDraggedSquare(square);
    setSelectedSquare(square);
    const moves = chess.moves({ square, verbose: true });
    setLegalMoves(moves.map((m) => m.to));

    // Clear annotations
    setRightClickHighlights(new Set());
    setArrows([]);

    e.dataTransfer.setData('text/plain', square);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!interactive || !draggedSquare) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSquare: Square) => {
    if (!interactive || !draggedSquare) return;
    e.preventDefault();

    if (draggedSquare === targetSquare) {
      setDraggedSquare(null);
      return;
    }

    if (isPromotionMove(draggedSquare, targetSquare)) {
      const moves = chess.moves({ square: draggedSquare, verbose: true });
      if (moves.some((m) => m.to === targetSquare)) {
        setPendingPromotion({
          from: draggedSquare,
          to: targetSquare,
          color: chess.get(draggedSquare)!.color
        });
        setDraggedSquare(null);
        return;
      }
    }

    executeMove(draggedSquare, targetSquare);
    setDraggedSquare(null);
  };

  // Right-click annotation handlers (Lichess/Chess.com style)
  const handleMouseDown = (e: React.MouseEvent, square: Square) => {
    if (e.button === 2) {
      // Right click start
      e.preventDefault();
      setArrowStart(square);
    }
  };

  const handleMouseUp = (e: React.MouseEvent, square: Square) => {
    if (e.button === 2) {
      e.preventDefault();
      if (arrowStart) {
        if (arrowStart === square) {
          // Toggle highlight
          setRightClickHighlights((prev) => {
            const next = new Set(prev);
            if (next.has(square)) next.delete(square);
            else next.add(square);
            return next;
          });
        } else {
          // Toggle arrow
          setArrows((prev) => {
            const exists = prev.some((a) => a.from === arrowStart && a.to === square);
            if (exists) {
              return prev.filter((a) => !(a.from === arrowStart && a.to === square));
            }
            return [...prev, { from: arrowStart, to: square }];
          });
        }
      }
      setArrowStart(null);
    }
  };

  // Helper for arrow coordinates (percentage 0 to 100)
  const getSquareCoordinates = (sq: Square) => {
    const f = sq[0];
    const r = sq[1];
    const fIdx = displayFiles.indexOf(f);
    const rIdx = displayRanks.indexOf(r);
    const x = (fIdx + 0.5) * 12.5;
    const y = (rIdx + 0.5) * 12.5;
    return { x, y };
  };

  const { capturedByWhite, capturedByBlack, whiteAdvantage } = getCapturedPieces(chess);

  const sizeClasses = {
    sm: 'w-[280px] h-[280px]',
    md: 'w-[360px] h-[360px] sm:w-[420px] sm:h-[420px]',
    lg: 'w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px]'
  }[size];

  // Game state description
  let statusBadge = null;
  if (showTurnStatus) {
    if (chess.isGameOver()) {
      let message = 'Game Over';
      if (chess.isCheckmate()) {
        message = chess.turn() === 'w' ? 'Checkmate · Black Wins' : 'Checkmate · White Wins';
      } else if (chess.isStalemate()) {
        message = 'Draw · Stalemate';
      } else if (chess.isThreefoldRepetition()) {
        message = 'Draw · Threefold Repetition';
      } else if (chess.isInsufficientMaterial()) {
        message = 'Draw · Insufficient Material';
      }
      statusBadge = (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-900 text-emerald-100 border border-emerald-500 shadow-xs">
          {message}
        </span>
      );
    } else if (inCheck) {
      statusBadge = (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-red-900/90 text-red-200 border border-red-500 animate-pulse">
          {chess.turn() === 'w' ? 'White King in Check!' : 'Black King in Check!'}
        </span>
      );
    } else {
      statusBadge = (
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#595959]">
          <span
            className={`w-2 h-2 rounded-full border border-black/30 ${
              chess.turn() === 'w' ? 'bg-white' : 'bg-[#152921]'
            }`}
          />
          <span>{chess.turn() === 'w' ? 'White to move' : 'Black to move'}</span>
        </span>
      );
    }
  }

  // Top and bottom captured trays
  const topCaptured = flipped ? capturedByBlack : capturedByWhite;
  const bottomCaptured = flipped ? capturedByWhite : capturedByBlack;
  const topAdvantage = flipped ? -whiteAdvantage : whiteAdvantage;
  const bottomAdvantage = flipped ? whiteAdvantage : -whiteAdvantage;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* Top Bar: Opponent Captured Pieces & Advantage */}
      {showCapturedPieces && size !== 'sm' && (
        <div className="w-full flex items-center justify-between px-2 py-1 text-xs text-[#595959] font-mono mb-1">
          <div className="flex items-center gap-1 min-h-5 flex-wrap">
            {topCaptured.map((p, i) => (
              <span key={i} className="w-4 h-4 inline-flex items-center justify-center opacity-85">
                {renderPieceSvg(p, flipped ? 'w' : 'b')}
              </span>
            ))}
            {topAdvantage > 0 && (
              <span className="text-[10px] font-bold text-[#1E3A2F] bg-[#FAF7F2] px-1 rounded border border-[#D9CFC0]">
                +{topAdvantage}
              </span>
            )}
          </div>
          {statusBadge}
        </div>
      )}

      {/* Board Outer Container styled like a crafted wooden study tray */}
      <div
        ref={boardRef}
        onContextMenu={(e) => e.preventDefault()}
        className={`${sizeClasses} relative rounded-xl p-2.5 bg-[#1E3A2F] shadow-xl border border-[#C6A664]/30`}
      >
        <div className="relative w-full h-full grid grid-cols-8 grid-rows-8 rounded-lg overflow-hidden border border-[#D9CFC0]/40">
          {displayRanks.map((rank, rIdx) =>
            displayFiles.map((file, fIdx) => {
              const square = `${file}${rank}` as Square;
              const isLight = (fIdx + rIdx) % 2 === (flipped ? 1 : 0);
              const piece = chess.get(square);
              const isSelected = selectedSquare === square;
              const isLegal = legalMoves.includes(square);
              const isHighlighted = highlightSquares.includes(square);
              const isHoming = homingSquare === square;
              const isLastMoveFrom = lastMove?.from === square;
              const isLastMoveTo = lastMove?.to === square;
              const isKingChecked = checkedKingSquare === square;
              const isRightClickHighlighted = rightClickHighlights.has(square);

              // Hide pieces if pawnSkeletonOnly is active, unless it's a pawn
              const showPiece = piece && (!pawnSkeletonOnly || piece.type === 'p');

              // Colors based on brand guidelines
              let squareBg = isLight ? 'bg-[#F0D9B5]' : 'bg-[#B58863]';

              if (isKingChecked) {
                squareBg = 'bg-red-500/80 ring-4 ring-red-600 ring-inset';
              } else if (isSelected) {
                squareBg = 'bg-[#C6A664]';
              } else if (isLastMoveFrom || isLastMoveTo) {
                squareBg = isLight ? 'bg-[#E3D19A]' : 'bg-[#9E774C]';
              } else if (isHighlighted) {
                squareBg = isLight ? 'bg-[#D2E2D5]' : 'bg-[#7E9C88]';
              } else if (isHoming) {
                squareBg = 'bg-[#C6A664]/80 ring-2 ring-[#C6A664] ring-inset';
              }

              return (
                <div
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  onMouseDown={(e) => handleMouseDown(e, square)}
                  onMouseUp={(e) => handleMouseUp(e, square)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, square)}
                  className={`relative flex items-center justify-center transition-colors duration-100 ${squareBg} cursor-pointer focus:outline-none`}
                  title={`${square} ${piece ? `(${piece.color === 'w' ? 'White' : 'Black'} ${piece.type.toUpperCase()})` : ''}`}
                >
                  {/* Right-click highlight overlay (Lichess/Chess.com style) */}
                  {isRightClickHighlighted && (
                    <div className="absolute inset-0 bg-red-500/35 border-2 border-red-500 pointer-events-none" />
                  )}

                  {/* King Check Red Radial Aura */}
                  {isKingChecked && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.4) 65%, transparent 100%)'
                      }}
                    />
                  )}

                  {/* Coordinates on perimeter squares */}
                  {fIdx === 0 && (
                    <span
                      className={`absolute top-0.5 left-1 text-[9px] font-mono select-none font-semibold ${
                        isLight ? 'text-[#B58863]' : 'text-[#F0D9B5]'
                      }`}
                    >
                      {rank}
                    </span>
                  )}
                  {rIdx === 7 && (
                    <span
                      className={`absolute bottom-0.5 right-1 text-[9px] font-mono select-none font-semibold ${
                        isLight ? 'text-[#B58863]' : 'text-[#F0D9B5]'
                      }`}
                    >
                      {file}
                    </span>
                  )}

                  {/* Homing Square Arc Visual */}
                  {isHoming && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-3/4 h-3/4 rounded-full border border-[#1E3A2F]/40 animate-pulse" />
                    </div>
                  )}

                  {/* Legal move destination indicator (Lichess/Chess.com style dot & ring) */}
                  {isLegal && !piece && (
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1E3A2F]/30 pointer-events-none shadow-xs" />
                  )}
                  {isLegal && piece && (
                    <span className="absolute inset-0 rounded-full border-4 border-[#1E3A2F]/40 pointer-events-none" />
                  )}

                  {/* Chess Piece with Draggable Support */}
                  {showPiece && (
                    <div
                      draggable={interactive && piece.color === chess.turn()}
                      onDragStart={(e) => handleDragStart(e, square)}
                      className={`w-[86%] h-[86%] flex items-center justify-center transition-transform ${
                        interactive && piece.color === chess.turn()
                          ? 'cursor-grab active:cursor-grabbing hover:scale-105'
                          : 'cursor-pointer'
                      } ${draggedSquare === square ? 'opacity-40 scale-95' : 'opacity-100'}`}
                    >
                      {renderPieceSvg(piece.type, piece.color)}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* SVG Overlay for Right-Click Arrows (Lichess/Chess.com style) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <marker
                id="arrowhead-gold"
                markerWidth="6"
                markerHeight="6"
                refX="4"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#C6A664" />
              </marker>
              <marker
                id="arrowhead-red"
                markerWidth="6"
                markerHeight="6"
                refX="4"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#EF4444" />
              </marker>
            </defs>
            {arrows.map((arr, i) => {
              const start = getSquareCoordinates(arr.from);
              const end = getSquareCoordinates(arr.to);
              return (
                <line
                  key={i}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke="#C6A664"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.85"
                  markerEnd="url(#arrowhead-gold)"
                />
              );
            })}
          </svg>

          {/* Pawn Promotion Modal (Lichess/Chess.com style) */}
          {pendingPromotion && (
            <div className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center backdrop-blur-xs animate-fadeIn">
              <div className="bg-[#FAF7F2] p-3 rounded-2xl border-2 border-[#C6A664] shadow-2xl flex flex-col items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#1E3A2F] uppercase tracking-wider">
                  Promote Pawn to
                </span>
                <div className="flex items-center gap-2">
                  {(['q', 'n', 'r', 'b'] as const).map((pieceType) => (
                    <button
                      key={pieceType}
                      type="button"
                      onClick={() => executeMove(pendingPromotion.from, pendingPromotion.to, pieceType)}
                      className="w-12 h-12 rounded-xl bg-white border border-[#D9CFC0] hover:border-[#1E3A2F] hover:bg-[#EDE6D8] transition-all p-1 flex items-center justify-center shadow-xs hover:scale-110 cursor-pointer"
                      title={pieceType === 'q' ? 'Queen' : pieceType === 'n' ? 'Knight' : pieceType === 'r' ? 'Rook' : 'Bishop'}
                    >
                      {renderPieceSvg(pieceType, pendingPromotion.color)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Player Captured Pieces & Advantage */}
      {showCapturedPieces && size !== 'sm' && (
        <div className="w-full flex items-center justify-between px-2 py-1 text-xs text-[#595959] font-mono mt-1">
          <div className="flex items-center gap-1 min-h-5 flex-wrap">
            {bottomCaptured.map((p, i) => (
              <span key={i} className="w-4 h-4 inline-flex items-center justify-center opacity-85">
                {renderPieceSvg(p, flipped ? 'b' : 'w')}
              </span>
            ))}
            {bottomAdvantage > 0 && (
              <span className="text-[10px] font-bold text-[#1E3A2F] bg-[#FAF7F2] px-1 rounded border border-[#D9CFC0]">
                +{bottomAdvantage}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#8C7A6B] italic hidden sm:inline">
            Right-click to highlight & drag arrows
          </span>
        </div>
      )}

      {/* Pawn Skeleton Mode Banner */}
      {pawnSkeletonOnly && (
        <div className="mt-1.5 text-xs text-[#595959] italic flex items-center gap-1.5 font-sans">
          <span>Pawn Skeleton Filter Active (Pieces hidden to reveal the terrain)</span>
        </div>
      )}
    </div>
  );
};

// Export ChessBoard wrapped with ErrorBoundary to guarantee graceful recovery
export const ChessBoard: React.FC<ChessBoardProps> = (props) => {
  return (
    <ChessErrorBoundary>
      <ChessBoardInner {...props} />
    </ChessErrorBoundary>
  );
};
