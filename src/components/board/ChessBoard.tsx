import React, { useState, useEffect, useRef } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';

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
}

// Gentle wooden tap using Web Audio API
export function playWoodenClick(enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch {
    // Ignore audio permission restrictions
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

export const ChessBoard: React.FC<ChessBoardProps> = ({
  initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  onMove,
  interactive = true,
  highlightSquares = [],
  homingSquare,
  pawnSkeletonOnly = false,
  flipped = false,
  className = '',
  size = 'md'
}) => {
  const [chess, setChess] = useState(() => new Chess(initialFen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Sync when initialFen changes from outside
  useEffect(() => {
    try {
      const newGame = new Chess(initialFen);
      setChess(newGame);
      setSelectedSquare(null);
      setLegalMoves([]);
    } catch {
      // Invalid FEN fallback
    }
  }, [initialFen]);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  const handleSquareClick = (square: Square) => {
    if (!interactive) return;

    // If already selected, try to move
    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      // Attempt move
      try {
        const move = chess.move({
          from: selectedSquare,
          to: square,
          promotion: 'q'
        });

        if (move) {
          playWoodenClick(true);
          setLastMove({ from: selectedSquare, to: square });
          setSelectedSquare(null);
          setLegalMoves([]);
          if (onMove) {
            onMove(selectedSquare, square, move.san, chess.fen());
          }
          return;
        }
      } catch {
        // Not a legal move to that square, proceed to select new piece if friendly
      }
    }

    // Select piece
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      setSelectedSquare(square);
      const moves = chess.moves({ square, verbose: true });
      setLegalMoves(moves.map((m) => m.to));
      playWoodenClick(true);
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const sizeClasses = {
    sm: 'w-[280px] h-[280px]',
    md: 'w-[360px] h-[360px] sm:w-[420px] sm:h-[420px]',
    lg: 'w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px]'
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Board Outer Container styled like a crafted wooden study tray */}
      <div
        ref={boardRef}
        className={`${sizeClasses} relative rounded-xl p-2.5 bg-[#1E3A2F] shadow-xl border border-[#C6A664]/30`}
      >
        <div className="w-full h-full grid grid-cols-8 grid-rows-8 rounded-lg overflow-hidden border border-[#D9CFC0]/40">
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

              // Hide pieces if pawnSkeletonOnly is active, unless it's a pawn
              const showPiece = piece && (!pawnSkeletonOnly || piece.type === 'p');

              // Colors based on brand guidelines
              // Classic board: cream #F0D9B5 light squares, #B58863 dark squares
              let squareBg = isLight ? 'bg-[#F0D9B5]' : 'bg-[#B58863]';

              if (isSelected) {
                squareBg = 'bg-[#C6A664]';
              } else if (isLastMoveFrom || isLastMoveTo) {
                squareBg = isLight ? 'bg-[#E3D19A]' : 'bg-[#9E774C]';
              } else if (isHighlighted) {
                squareBg = isLight ? 'bg-[#D2E2D5]' : 'bg-[#7E9C88]';
              } else if (isHoming) {
                squareBg = 'bg-[#C6A664]/80 ring-2 ring-[#C6A664] ring-inset';
              }

              return (
                <button
                  key={square}
                  type="button"
                  onClick={() => handleSquareClick(square)}
                  className={`relative flex items-center justify-center transition-colors duration-150 ${squareBg} cursor-pointer focus:outline-none`}
                  title={`${square} ${piece ? `(${piece.color === 'w' ? 'White' : 'Black'} ${piece.type.toUpperCase()})` : ''}`}
                >
                  {/* File & Rank Coordinates on perimeter squares */}
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

                  {/* Homing Square Arc Visual (Brand Mark Motif) */}
                  {isHoming && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-3/4 h-3/4 rounded-full border border-[#1E3A2F]/40 animate-pulse" />
                    </div>
                  )}

                  {/* Legal move destination indicator */}
                  {isLegal && !piece && (
                    <span className="w-3 h-3 rounded-full bg-[#1E3A2F]/30 pointer-events-none" />
                  )}
                  {isLegal && piece && (
                    <span className="absolute inset-0 rounded-full border-4 border-[#1E3A2F]/40 pointer-events-none" />
                  )}

                  {/* Chess Piece */}
                  {showPiece && (
                    <div className="w-[84%] h-[84%] flex items-center justify-center transition-transform hover:scale-105">
                      {renderPieceSvg(piece.type, piece.color)}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Pawn Skeleton Mode Banner */}
      {pawnSkeletonOnly && (
        <div className="mt-2 text-xs text-[#595959] italic flex items-center gap-1.5 font-sans">
          <span>Pawn Skeleton Filter Active (Pieces hidden to reveal the terrain)</span>
        </div>
      )}
    </div>
  );
};
