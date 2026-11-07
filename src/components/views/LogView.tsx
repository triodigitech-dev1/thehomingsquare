import React, { useState } from 'react';
import { LoggedGame, ErrorLeakCategory, ConversionPath } from '../../types/chess';
import { PAWN_STRUCTURES, ERROR_CATEGORIES } from '../../data/structures';
import { ChessBoard, playWoodenClick } from '../board/ChessBoard';
import { BoardToolbar } from '../common/BoardToolbar';
import { NavView } from '../layout/Header';
import { BookOpen, Plus, Tag, Shield, ArrowRight, CheckCircle2, ChevronRight, FileText, Search } from 'lucide-react';

interface LogViewProps {
  loggedGames: LoggedGame[];
  onAddGame: (game: LoggedGame) => void;
  onNavigate: (view: NavView) => void;
  soundEnabled: boolean;
}

export const LogView: React.FC<LogViewProps> = ({
  loggedGames,
  onAddGame,
  onNavigate,
  soundEnabled
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>(loggedGames[0]?.id || '');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New game form state
  const [newTitle, setNewTitle] = useState('');
  const [newEvent, setNewEvent] = useState('Rated Game');
  const [newWhite, setNewWhite] = useState('Homecomer');
  const [newBlack, setNewBlack] = useState('Opponent');
  const [newResult, setNewResult] = useState('1 - 0');
  const [newStructure, setNewStructure] = useState('Carlsbad Formation');
  const [newPlan, setNewPlan] = useState('');
  const [newPathSwitched, setNewPathSwitched] = useState(false);
  const [newFromPath, setNewFromPath] = useState<ConversionPath>('B');
  const [newToPath, setNewToPath] = useState<ConversionPath>('C');
  const [newPathTrigger, setNewPathTrigger] = useState('');
  const [newPathDesc, setNewPathDesc] = useState('');
  const [newDefResource, setNewDefResource] = useState<'Fortress' | 'Perpetual Check' | 'Stalemate Trick' | 'Desperado' | 'Drawn Ending' | 'None'>('Fortress');
  const [newDefDesc, setNewDefDesc] = useState('');
  const [newDefUsedOrMissed, setNewDefUsedOrMissed] = useState<'used' | 'missed' | 'n/a'>('used');
  const [newLeakCat, setNewLeakCat] = useState<ErrorLeakCategory>('Perception');
  const [newLeakMove, setNewLeakMove] = useState(18);
  const [newLeakDesc, setNewLeakDesc] = useState('');
  const [newLeakLesson, setNewLeakLesson] = useState('');
  const [newPgn, setNewPgn] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [pawnSkeletonMode, setPawnSkeletonMode] = useState(false);

  const filteredGames = loggedGames.filter((g) => {
    if (resultFilter !== 'all' && g.result !== resultFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        g.title.toLowerCase().includes(q) ||
        g.structure.toLowerCase().includes(q) ||
        g.whitePlayer.toLowerCase().includes(q) ||
        g.blackPlayer.toLowerCase().includes(q) ||
        g.event.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeGame = loggedGames.find((g) => g.id === selectedGameId) || filteredGames[0] || loggedGames[0];

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPlan.trim()) return;

    const newGame: LoggedGame = {
      id: `log_custom_${Date.now()}`,
      title: newTitle,
      event: newEvent,
      date: new Date().toISOString().split('T')[0],
      whitePlayer: newWhite,
      blackPlayer: newBlack,
      result: newResult,
      structure: newStructure,
      oneSentencePlan: newPlan,
      pathSwitch: {
        occurred: newPathSwitched,
        fromPath: newFromPath,
        toPath: newToPath,
        triggerMove: newPathTrigger,
        description: newPathDesc || 'Conditions shifted, triggering path switch.'
      },
      defensiveResource: {
        identified: newDefResource !== 'None',
        type: newDefResource,
        description: newDefDesc || 'Standard defensive drawing mechanism.',
        wasUsedOrMissed: newDefUsedOrMissed
      },
      errorLeaks: newLeakDesc
        ? [
            {
              category: newLeakCat,
              moveNumber: Number(newLeakMove) || 1,
              description: newLeakDesc,
              lesson: newLeakLesson || 'Enforce V1 scan before moving.'
            }
          ]
        : [],
      pgn: newPgn || '1. d4 d5 2. c4 e6 ...',
      notes: 'Logged via 5-question protocol.'
    };

    onAddGame(newGame);
    setSelectedGameId(newGame.id);
    setIsAddingNew(false);
    playWoodenClick(soundEnabled);

    // Reset form
    setNewTitle('');
    setNewPlan('');
    setNewLeakDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            The Log
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans">
            Import or paste games and answer the five diagnostic questions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-4 py-2.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C6A664]" />
          <span>{isAddingNew ? 'Close Form' : 'Log a Game'}</span>
        </button>
      </div>

      {/* Modal / Inline Add Form */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateGame}
          className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border-2 border-[#1E3A2F]/30 shadow-md space-y-6 animate-fadeIn"
        >
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C6A664]">
                New Audit Entry
              </span>
              <h2 className="font-display text-xl text-[#1E3A2F]">
                Post-Game Diagnostic Audit
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-[#595959] hover:text-[#1E3A2F]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#262626] mb-1">Game Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Carlsbad Minority Attack"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs bg-white border border-[#D9CFC0] rounded-md p-2.5 text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#262626] mb-1">Event / Source</label>
              <input
                type="text"
                placeholder="e.g. Club Match or Rapid 15+10"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                className="w-full text-xs bg-white border border-[#D9CFC0] rounded-md p-2.5 text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#262626] mb-1">Result</label>
              <select
                value={newResult}
                onChange={(e) => setNewResult(e.target.value)}
                className="w-full text-xs bg-white border border-[#D9CFC0] rounded-md p-2.5 text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              >
                <option value="1 - 0">1 - 0 (White won)</option>
                <option value="0 - 1">0 - 1 (Black won)</option>
                <option value="1/2 - 1/2">1/2 - 1/2 (Draw)</option>
              </select>
            </div>
          </div>

          {/* Question 1: What was the structure? */}
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2">
            <span className="text-xs font-mono font-semibold text-[#1E3A2F] block">
              1. What was the structure?
            </span>
            <select
              value={newStructure}
              onChange={(e) => setNewStructure(e.target.value)}
              className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded-md p-2 text-[#262626]"
            >
              {PAWN_STRUCTURES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question 2: What was the plan (one sentence)? */}
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2">
            <span className="text-xs font-mono font-semibold text-[#1E3A2F] block">
              2. What was the plan (written in one plain sentence)?
            </span>
            <input
              type="text"
              required
              placeholder="e.g. Advance b4-b5 to soften c6, create an outpost on c5, and prevent ...e5."
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value)}
              className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded-md p-2.5 text-[#262626]"
            />
          </div>

          {/* Question 3: Where did the path switch? */}
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-3">
            <span className="text-xs font-mono font-semibold text-[#1E3A2F] block">
              3. Where did the conversion path switch?
            </span>
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPathSwitched}
                  onChange={(e) => setNewPathSwitched(e.target.checked)}
                  className="rounded text-[#1E3A2F]"
                />
                <span>A path switch occurred</span>
              </label>
            </div>
            {newPathSwitched && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] text-[#595959]">From Path</label>
                  <select
                    value={newFromPath}
                    onChange={(e) => setNewFromPath(e.target.value as ConversionPath)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                  >
                    <option value="B">Path B (Build-up)</option>
                    <option value="A">Path A (Hunt/Tactics)</option>
                    <option value="C">Path C (Endgame)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#595959]">To Path</label>
                  <select
                    value={newToPath}
                    onChange={(e) => setNewToPath(e.target.value as ConversionPath)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                  >
                    <option value="C">Path C (Endgame)</option>
                    <option value="A">Path A (Hunt/Tactics)</option>
                    <option value="B">Path B (Build-up)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#595959]">Trigger Move & Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Move 29.Qxd8 trade"
                    value={newPathTrigger}
                    onChange={(e) => setNewPathTrigger(e.target.value)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Question 4: What defensive or prophylactic resource existed? */}
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-3">
            <span className="text-xs font-mono font-semibold text-[#1E3A2F] block">
              4. What defensive or prophylactic resource existed (used or missed)?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#595959]">Resource Type</label>
                <select
                  value={newDefResource}
                  onChange={(e) => setNewDefResource(e.target.value as any)}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                >
                  <option value="Fortress">Fortress</option>
                  <option value="Perpetual Check">Perpetual Check</option>
                  <option value="Stalemate Trick">Stalemate Trick</option>
                  <option value="Desperado">Desperado</option>
                  <option value="Drawn Ending">Drawn Ending</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-[#595959]">Status</label>
                <select
                  value={newDefUsedOrMissed}
                  onChange={(e) => setNewDefUsedOrMissed(e.target.value as any)}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                >
                  <option value="used">Used by Player</option>
                  <option value="missed">Missed Opportunity</option>
                  <option value="n/a">Not Applicable</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-[#595959]">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Opposite-coloured bishop blockade on d5"
                  value={newDefDesc}
                  onChange={(e) => setNewDefDesc(e.target.value)}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                />
              </div>
            </div>
          </div>

          {/* Question 5: Which category does each error belong to? */}
          <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-3">
            <span className="text-xs font-mono font-semibold text-[#1E3A2F] block">
              5. Error Leak Categorisation (Converts into Drill Flashcard)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-[#595959]">Leak Category</label>
                <select
                  value={newLeakCat}
                  onChange={(e) => setNewLeakCat(e.target.value as ErrorLeakCategory)}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                >
                  <option value="Perception">Perception (Missed Threat)</option>
                  <option value="Visualisation">Visualisation (Calculation)</option>
                  <option value="Knowledge">Knowledge (Pattern)</option>
                  <option value="Decision">Decision (Time / Emotion)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-[#595959]">Move #</label>
                <input
                  type="number"
                  value={newLeakMove}
                  onChange={(e) => setNewLeakMove(Number(e.target.value))}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-[#595959]">What happened & Lesson</label>
                <input
                  type="text"
                  placeholder="e.g. Played too fast; missed f8 knight fork. Run V1 scan."
                  value={newLeakDesc}
                  onChange={(e) => setNewLeakDesc(e.target.value)}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC0] rounded p-1.5"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D9CFC0]/60">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 text-xs text-[#595959] hover:text-[#262626]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1E3A2F] text-[#F6F1E7] text-xs font-semibold rounded-lg hover:bg-[#152921] transition-colors shadow-sm"
            >
              Save to Gauntlet Log & Generate Flashcard
            </button>
          </div>
        </form>
      )}

      {/* Main 2-Column Log Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List (4 cols) */}
        <div className="lg:col-span-4 bg-[#FAF7F2] rounded-2xl p-5 border border-[#D9CFC0]/60 shadow-sm space-y-3">
          <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider font-semibold">
              Recorded Games
            </span>
            <span className="text-xs text-[#595959] font-mono">
              {filteredGames.length} of {loggedGames.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
            <input
              type="text"
              placeholder="Filter by title, player, or structure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-white border border-[#D9CFC0] rounded-lg pl-8 pr-3 py-2 text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
            />
          </div>

          {/* Result Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: '1 - 0', label: '1 - 0' },
              { id: '0 - 1', label: '0 - 1' },
              { id: '1/2 - 1/2', label: '½ - ½' }
            ].map((rf) => (
              <button
                key={rf.id}
                type="button"
                onClick={() => setResultFilter(rf.id)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors shrink-0 ${
                  resultFilter === rf.id
                    ? 'bg-[#1E3A2F] text-[#F6F1E7] font-semibold'
                    : 'bg-[#EDE6D8] text-[#595959] hover:bg-white'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredGames.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#8C7A6B] bg-white rounded-xl border border-[#D9CFC0]">
                No recorded games match your search criteria.
              </div>
            ) : (
              filteredGames.map((game) => {
                const isSelected = game.id === activeGame?.id;
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => {
                      setSelectedGameId(game.id);
                      playWoodenClick(soundEnabled);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]'
                        : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isSelected ? 'text-[#C6A664]' : 'text-[#595959]'}>
                        {game.date}
                      </span>
                      <span className="font-semibold">{game.result}</span>
                    </div>
                    <h3 className="font-display text-sm font-semibold leading-snug truncate">
                      {game.title}
                    </h3>
                    <div
                      className={`text-xs mt-1 truncate ${
                        isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'
                      }`}
                    >
                      {game.structure}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Active Game Detail (8 cols) */}
        {activeGame && (
          <div className="lg:col-span-8 bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0]/70 shadow-sm space-y-5 max-h-[720px] overflow-y-auto pr-2">
            
            {/* Game Header */}
            <div className="border-b border-[#D9CFC0]/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#595959] mb-1">
                  <span>{activeGame.event}</span>
                  <span>·</span>
                  <span>{activeGame.date}</span>
                </div>
                <h2 className="font-display text-2xl text-[#1E3A2F]">
                  {activeGame.title}
                </h2>
                <div className="text-xs text-[#595959] mt-0.5 font-sans">
                  {activeGame.whitePlayer} vs. {activeGame.blackPlayer} — Result: <strong className="text-[#1E3A2F]">{activeGame.result}</strong>
                </div>
              </div>

              {activeGame.isGauntletGame && (
                <div className="px-3 py-1 bg-[#C6A664]/20 border border-[#C6A664] rounded-md text-[11px] font-mono text-[#1E3A2F] font-semibold self-start sm:self-auto">
                  Gauntlet Verified Game
                </div>
              )}
            </div>

            {/* Chessboard Preview if FEN available */}
            {activeGame.fenKeyPosition && (
              <div className="flex flex-col items-center p-4 bg-[#EDE6D8]/40 rounded-xl border border-[#D9CFC0]">
                <ChessBoard
                  initialFen={activeGame.fenKeyPosition}
                  interactive={false}
                  size="sm"
                  homingSquare="c5"
                  flipped={boardFlipped}
                  pawnSkeletonOnly={pawnSkeletonMode}
                />
                <BoardToolbar
                  fen={activeGame.fenKeyPosition}
                  flipped={boardFlipped}
                  onToggleFlip={() => setBoardFlipped(!boardFlipped)}
                  pawnSkeletonOnly={pawnSkeletonMode}
                  onTogglePawnSkeleton={() => setPawnSkeletonMode(!pawnSkeletonMode)}
                  className="mt-2 max-w-[280px]"
                />
              </div>
            )}

            {/* The 5 Answers Detailed Card */}
            <div className="space-y-4">
              
              {/* Answer 1: Structure */}
              <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#C6A664] tracking-wider block">
                  1. Pawn Structure
                </span>
                <span className="font-display text-base font-semibold text-[#1E3A2F] block">
                  {activeGame.structure}
                </span>
              </div>

              {/* Answer 2: One-Sentence Plan */}
              <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#C6A664] tracking-wider block">
                  2. One-Sentence Plan
                </span>
                <p className="font-display italic text-sm text-[#1E3A2F] leading-relaxed">
                  “{activeGame.oneSentencePlan}”
                </p>
              </div>

              {/* Answer 3: Path Switch */}
              <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-1.5 text-xs">
                <span className="text-[11px] font-mono uppercase text-[#C6A664] tracking-wider block">
                  3. Conversion Path Switch
                </span>
                {activeGame.pathSwitch.occurred ? (
                  <div>
                    <span className="font-semibold text-[#1E3A2F]">
                      Switch: Path {activeGame.pathSwitch.fromPath} → Path {activeGame.pathSwitch.toPath} (Trigger: {activeGame.pathSwitch.triggerMove})
                    </span>
                    <p className="text-[#595959] mt-0.5">{activeGame.pathSwitch.description}</p>
                  </div>
                ) : (
                  <p className="text-[#595959]">No path switch occurred; maintained steady trajectory.</p>
                )}
              </div>

              {/* Answer 4: Defensive Resource */}
              <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-1.5 text-xs">
                <span className="text-[11px] font-mono uppercase text-[#C6A664] tracking-wider block">
                  4. Defensive / Prophylactic Resource
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1E3A2F]">
                    {activeGame.defensiveResource.type} ({activeGame.defensiveResource.wasUsedOrMissed})
                  </span>
                </div>
                <p className="text-[#595959]">{activeGame.defensiveResource.description}</p>
              </div>

              {/* Answer 5: Error Leak Categorisation */}
              <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-[#A8553F] tracking-wider block">
                    5. Error Leaks Categorised
                  </span>
                  <span className="text-[11px] text-[#595959]">
                    {activeGame.errorLeaks.length} Recorded
                  </span>
                </div>

                {activeGame.errorLeaks.length > 0 ? (
                  <div className="space-y-2 text-xs">
                    {activeGame.errorLeaks.map((leak, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#A8553F]/10 border border-[#A8553F]/30 rounded-lg space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#A8553F]">
                            Move {leak.moveNumber}: {leak.category} Leak
                          </span>
                          <span className="text-[10px] font-mono text-[#595959]">
                            Flashcard Active in Drill Hall
                          </span>
                        </div>
                        <p className="text-[#262626]">{leak.description}</p>
                        <p className="text-[11px] text-[#1E3A2F] italic pt-1 border-t border-[#A8553F]/20">
                          Remedy: {leak.lesson}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#595959] italic">Zero critical leaks identified in this game.</p>
                )}
              </div>

            </div>

            {/* Move Notation / PGN strip */}
            {activeGame.pgn && (
              <div className="p-4 bg-[#EDE6D8]/50 rounded-xl border border-[#D9CFC0] text-xs font-mono">
                <span className="text-[#595959] block mb-1 uppercase font-semibold">Notation:</span>
                <p className="text-[#262626] leading-relaxed line-clamp-3 select-all">
                  {activeGame.pgn}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-end text-xs text-[#595959]">
              <button
                type="button"
                onClick={() => onNavigate('mastery')}
                className="text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Mastery Check</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
