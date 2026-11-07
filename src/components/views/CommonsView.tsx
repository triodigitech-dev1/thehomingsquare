import React, { useState, useEffect } from 'react';
import { PAWN_STRUCTURES } from '../../data/structures';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { playWoodenClick, playChimeSound } from '../board/ChessBoard';
import {
  MessageSquare,
  Users,
  Sparkles,
  ExternalLink,
  Hash,
  ArrowRight,
  Send,
  UserCheck,
  Check,
  Clock,
  ShieldCheck,
  Flame,
  PhoneCall,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Share2,
  BookOpen,
  Filter
} from 'lucide-react';

interface CommonsViewProps {
  onNavigate: (view: NavView) => void;
  onSelectStructure: (structId: string) => void;
  soundEnabled?: boolean;
}

interface PeerDiscussionPost {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
}

interface StudyPartner {
  id: string;
  name: string;
  cohort: string;
  ratingTier: string;
  focus: string;
  timeSlot: string;
  timezone: string;
  status: 'Available' | 'In Session';
}

export const CommonsView: React.FC<CommonsViewProps> = ({
  onNavigate,
  onSelectStructure,
  soundEnabled = true
}) => {
  const [activeZoneTab, setActiveZoneTab] = useState<'study_together' | 'partners' | 'circles'>('study_together');
  const [selectedCircle, setSelectedCircle] = useState<string>('carlsbad');
  const [newPostContent, setNewPostContent] = useState('');
  const [partnerRequestedId, setPartnerRequestedId] = useState<string | null>(null);
  const [partnerFilter, setPartnerFilter] = useState<string>('all');

  // Co-Study Focus Timer (15-min default)
  const [timerSeconds, setTimerSeconds] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTopic, setFocusTopic] = useState('Carlsbad Minority Levers & Path B');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playChimeSound(soundEnabled);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    playWoodenClick(soundEnabled);
  };

  const handleResetTimer = (minutes: number = 15) => {
    setIsTimerRunning(false);
    setTimerSeconds(minutes * 60);
    playWoodenClick(soundEnabled);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const circles = [
    {
      id: 'carlsbad',
      title: 'Carlsbad Study Circle',
      members: 142,
      lastPost: '2 hours ago',
      activeTopic: 'Minority attack timing: when is a4-b4-b5 better than Rab1-b4?',
      excerpt: 'Homecomers discussing the difference between Botvinnik’s setup with Nge2 and Kasparov’s active f3 push.'
    },
    {
      id: 'iqp',
      title: 'IQP & Dynamic Centre Hub',
      members: 98,
      lastPost: '4 hours ago',
      activeTopic: 'Holding the d5 blockade vs. allowing d5 breakthrough',
      excerpt: 'Focus on Nimzowitsch blockading technique with knights on d5.'
    },
    {
      id: 'hedgehog',
      title: 'The Hedgehog Collective',
      members: 86,
      lastPost: 'Yesterday',
      activeTopic: 'Patience behind the 6th-rank spines',
      excerpt: 'Review of Ljubojevic vs. Miles model game: waiting for White to overextend.'
    },
    {
      id: 'kid_locked',
      title: 'King’s Indian Den',
      members: 115,
      lastPost: '3 hours ago',
      activeTopic: 'Surviving White’s queenside breach while rolling ...f4-...g5',
      excerpt: 'Evaluating whether the king should stay on g8 or tuck into h8.'
    },
    {
      id: 'french_chain',
      title: 'French & Caro-Kann Chain Forum',
      members: 74,
      lastPost: '1 day ago',
      activeTopic: 'Attacking the base at d4 vs. chipping the head at e5',
      excerpt: 'Practical examples from Nimzowitsch vs. Salwe.'
    },
    {
      id: 'endgames',
      title: 'Endgame Sanctuary (Unit 4.3 & 5.2)',
      members: 160,
      lastPost: '30 mins ago',
      activeTopic: 'Philidor 6th-rank cutoff vs. Lucena bridge building',
      excerpt: 'Why students rush king moves instead of setting the horizontal barrier.'
    }
  ];

  const [postsByCircle, setPostsByCircle] = useState<Record<string, PeerDiscussionPost[]>>({
    carlsbad: [
      {
        id: 'p1',
        author: 'Marcus V.',
        role: 'Cohort 01 Graduate',
        timeAgo: '15m ago',
        content: 'I noticed in my 7th gauntlet game that playing Rab1 before a4 allowed Black to play ...a5 immediately, forcing a lock. Now I always evaluate a4 before Rab1.',
        likes: 12
      },
      {
        id: 'p2',
        author: 'Elena R.',
        role: 'Cohort 01 Finalist',
        timeAgo: '2h ago',
        content: 'The key is whether Black’s knight on d7 can reach b6. If ...Nb6 is ready, an immediate b4-b5 gets hit with ...Nc4 outpost.',
        likes: 8
      }
    ],
    iqp: [
      {
        id: 'p3',
        author: 'Tariq A.',
        role: 'Cohort 01 Scholar',
        timeAgo: '4h ago',
        content: 'Blockading d5 with a Knight on d5 is the classic Nimzowitsch rule, but remember to trade off Black’s light-squared bishop first so d5 is undisputed.',
        likes: 6
      }
    ]
  });

  const availablePartners: StudyPartner[] = [
    {
      id: 'elena',
      name: 'Elena R.',
      cohort: 'Cohort 01',
      ratingTier: 'Mastery (Elo 1850)',
      focus: 'Endgame Rook Conversions & Path C',
      timeSlot: 'Evenings (19:00 - 21:00)',
      timezone: 'UTC+1',
      status: 'Available'
    },
    {
      id: 'marcus',
      name: 'Marcus V.',
      cohort: 'Cohort 01 Graduate',
      ratingTier: 'Candidate (Elo 2120)',
      focus: 'Carlsbad Minority Levers & 5-Phase Auditing',
      timeSlot: 'Weekends (14:00 - 18:00)',
      timezone: 'EST (UTC-5)',
      status: 'Available'
    },
    {
      id: 'tariq',
      name: 'Tariq A.',
      cohort: 'Cohort 01',
      ratingTier: 'Foundations (Elo 1550)',
      focus: 'V1 Scan Drills & Blunder Radar',
      timeSlot: 'Mornings (08:00 - 10:00)',
      timezone: 'CET (UTC+1)',
      status: 'In Session'
    },
    {
      id: 'sarah',
      name: 'Sarah K.',
      cohort: 'Cohort 01',
      ratingTier: 'Mastery (Elo 1780)',
      focus: 'Path B Minority Attack vs King’s Indian',
      timeSlot: 'Evenings (20:00 - 22:00)',
      timezone: 'GMT (UTC+0)',
      status: 'Available'
    },
    {
      id: 'david',
      name: 'David L.',
      cohort: 'Cohort 01 Graduate',
      ratingTier: 'Candidate (Elo 2080)',
      focus: 'Lucena Bridge & Technical Endgames',
      timeSlot: 'Flexible / On-Demand',
      timezone: 'PST (UTC-8)',
      status: 'Available'
    }
  ];

  const filteredPartners = availablePartners.filter((p) => {
    if (partnerFilter === 'all') return true;
    if (partnerFilter === 'mastery') return p.ratingTier.includes('Mastery');
    if (partnerFilter === 'candidate') return p.ratingTier.includes('Candidate');
    if (partnerFilter === 'available') return p.status === 'Available';
    return true;
  });

  const currentCircle = circles.find((c) => c.id === selectedCircle) || circles[0];
  const currentPosts = postsByCircle[selectedCircle] || [];

  const handleSelectCircle = (circleId: string) => {
    setSelectedCircle(circleId);
    playWoodenClick(soundEnabled);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: PeerDiscussionPost = {
      id: `user_${Date.now()}`,
      author: 'You (Active Scholar)',
      role: 'Cohort 01 Scholar',
      timeAgo: 'Just now',
      content: newPostContent.trim(),
      likes: 1
    };

    setPostsByCircle((prev) => ({
      ...prev,
      [selectedCircle]: [newPost, ...(prev[selectedCircle] || [])]
    }));

    setNewPostContent('');
    playChimeSound(soundEnabled);
  };

  const handleLikePost = (postId: string) => {
    setPostsByCircle((prev) => {
      const circlePosts = prev[selectedCircle] || [];
      return {
        ...prev,
        [selectedCircle]: circlePosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
              hasLiked: !p.hasLiked
            };
          }
          return p;
        })
      };
    });
    playWoodenClick(soundEnabled);
  };

  const handleRequestPartner = (partnerId: string) => {
    setPartnerRequestedId(partnerId);
    playChimeSound(soundEnabled);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Commons Hero Header */}
      <StudyCard
        badge="Academic Agora"
        badgeVariant="gold"
        title="Study Together & The Commons"
        subtitle="Quiet discourse, structure study circles, virtual focus tables, and verified gauntlet study-partner pairing."
      >
        {/* Zone 1: Verified Community Gateways (Discord & WhatsApp) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Discord Gateway */}
          <div className="p-4 rounded-xl bg-[#1E3A2F] text-[#F6F1E7] border border-[#C6A664]/30 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Discord Campfire</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-semibold">
                  Online
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-[#F6F1E7]">
                The Homing Square Discord
              </h3>
              <p className="text-xs text-[#D9CFC0] leading-relaxed">
                Quiet voice rooms, structure analysis channels, and 1-on-1 board screen sharing with cohort scholars.
              </p>
            </div>

            <a
              href="https://discord.gg/PaPmZDUDn"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>Join Discord Campfire</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Gateway */}
          <div className="p-4 rounded-xl bg-[#152921] text-[#F6F1E7] border border-emerald-500/30 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Study Group</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  Active Term
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-[#F6F1E7]">
                Official WhatsApp Cohort Desk
              </h3>
              <p className="text-xs text-[#D9CFC0] leading-relaxed">
                Daily pawn break puzzles, quick diagnostic leak questions, and fast mobile partner pairing on the go.
              </p>
            </div>

            <a
              href="https://chat.whatsapp.com/LsbsOdGasocLiBFIxM4ZoK"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Join WhatsApp Study Group</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Zone Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#D9CFC0]/60 mt-4">
          <button
            type="button"
            onClick={() => {
              setActiveZoneTab('study_together');
              playWoodenClick(soundEnabled);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeZoneTab === 'study_together'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>Study Together Lounge</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveZoneTab('partners');
              playWoodenClick(soundEnabled);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeZoneTab === 'partners'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>Gauntlet Partner Zone ({availablePartners.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveZoneTab('circles');
              playWoodenClick(soundEnabled);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeZoneTab === 'circles'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>Pawn Structure Circles (6)</span>
          </button>
        </div>
      </StudyCard>

      {/* ZONE 2: Study Together Virtual Lounge (Timer & Co-Study Tables) */}
      {activeZoneTab === 'study_together' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          {/* Left: Pomodoro Co-Study Timer Console (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-5 text-center">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
                Deep Practice Focus Table
              </span>
              <h2 className="font-display text-xl sm:text-2xl text-[#1E3A2F]">
                15-Min Quiet Co-Study Block
              </h2>
              <p className="text-xs text-[#595959]">
                Silent, undistracted calculation. No moves played on impulse.
              </p>
            </div>

            {/* Timer Dial */}
            <div className="py-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-white border-4 border-[#1E3A2F] flex flex-col items-center justify-center shadow-inner">
                <span className="font-mono text-3xl font-bold text-[#1E3A2F] tracking-wider">
                  {formatTimer(timerSeconds)}
                </span>
                <span className="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider mt-1">
                  {isTimerRunning ? 'Session Active' : 'Paused / Ready'}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleToggleTimer}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-xs ${
                  isTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7]'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Focus</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-[#C6A664]" />
                    <span>Start Focus Session</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleResetTimer(15)}
                className="p-2.5 bg-white border border-[#D9CFC0] rounded-xl text-[#595959] hover:text-[#1E3A2F] hover:bg-[#EDE6D8] transition-colors"
                title="Reset to 15 mins"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#D9CFC0]/60 text-xs">
              <span className="text-[11px] font-mono text-[#8C7A6B]">Presets:</span>
              {[10, 15, 25, 30].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleResetTimer(m)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                    timerSeconds === m * 60
                      ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                      : 'bg-[#EDE6D8] text-[#262626] hover:bg-white'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {/* Right: Live Virtual Study Tables (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#D9CFC0]/60 pb-3">
                <div>
                  <h3 className="font-display text-lg text-[#1E3A2F]">
                    Virtual Co-Study Tables
                  </h3>
                  <p className="text-xs text-[#595959]">
                    Join an open study hall with fellow scholars analyzing specific structures.
                  </p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  3 Tables Active
                </span>
              </div>

              <div className="space-y-3">
                {/* Table 1 */}
                <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-display font-semibold text-sm text-[#1E3A2F]">
                        Table A: Carlsbad Minority Attack Lab
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#C6A664] font-semibold">
                      4 Scholars In Session
                    </span>
                  </div>
                  <p className="text-xs text-[#595959] font-sans">
                    Focus: Move 12–20 minority levers (b4-b5). Calculating lines where Black plays ...a5 early.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#D9CFC0]/60 text-xs">
                    <span className="text-[11px] font-mono text-[#8C7A6B]">
                      Moderator: Marcus V. (Candidate)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectStructure('carlsbad');
                        onNavigate('lesson');
                      }}
                      className="px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg text-xs font-semibold hover:bg-[#152921] transition-colors"
                    >
                      Join Table in Classroom →
                    </button>
                  </div>
                </div>

                {/* Table 2 */}
                <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-display font-semibold text-sm text-[#1E3A2F]">
                        Table B: Endgame Sanctuary (Philidor & Lucena)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#C6A664] font-semibold">
                      3 Scholars In Session
                    </span>
                  </div>
                  <p className="text-xs text-[#595959] font-sans">
                    Focus: Drilling the 6th-rank cutoff defense and building the 4th-rank rook bridge without calculating mistakes.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#D9CFC0]/60 text-xs">
                    <span className="text-[11px] font-mono text-[#8C7A6B]">
                      Moderator: Elena R. (Mastery)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('drills');
                      }}
                      className="px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg text-xs font-semibold hover:bg-[#152921] transition-colors"
                    >
                      Join Drill Session →
                    </button>
                  </div>
                </div>

                {/* Table 3 */}
                <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="font-display font-semibold text-sm text-[#1E3A2F]">
                        Table C: 5-Question Audit Peer Review
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#C6A664] font-semibold">
                      2 Scholars Reviewing
                    </span>
                  </div>
                  <p className="text-xs text-[#595959] font-sans">
                    Focus: Reviewing 2 recent games against the 4 diagnostic error leaks (Perception, Visualisation, Knowledge, Decision).
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#D9CFC0]/60 text-xs">
                    <span className="text-[11px] font-mono text-[#8C7A6B]">
                      Moderator: Tariq A. (Foundations)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('log');
                      }}
                      className="px-3 py-1.5 bg-[#1E3A2F] text-[#F6F1E7] rounded-lg text-xs font-semibold hover:bg-[#152921] transition-colors"
                    >
                      Open Diagnostic Log →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ZONE 3: Gauntlet Partner Zone */}
      {activeZoneTab === 'partners' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/70 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9CFC0]/60 pb-3">
              <div>
                <h3 className="font-display text-xl text-[#1E3A2F]">
                  Gauntlet Study Partner Roster
                </h3>
                <p className="text-xs text-[#595959]">
                  Exchange game logs, audit each other's 10 gauntlet games against the 5-phase rubric, and sharpen calculation.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Partners' },
                  { id: 'available', label: 'Available Now' },
                  { id: 'mastery', label: 'Mastery Tier' },
                  { id: 'candidate', label: 'Candidate Tier' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setPartnerFilter(f.id);
                      playWoodenClick(soundEnabled);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      partnerFilter === f.id
                        ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                        : 'bg-white border border-[#D9CFC0] text-[#262626] hover:bg-[#EDE6D8]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPartners.map((peer) => {
                const isRequested = partnerRequestedId === peer.id;
                return (
                  <div
                    key={peer.id}
                    className="p-5 bg-white rounded-xl border border-[#D9CFC0] flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#1E3A2F] text-[#C6A664] flex items-center justify-center font-display font-semibold text-xs">
                            {peer.name.slice(0, 2)}
                          </div>
                          <div>
                            <span className="font-display font-semibold text-sm text-[#1E3A2F] block">
                              {peer.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#8C7A6B]">
                              {peer.cohort}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            peer.status === 'Available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {peer.status}
                        </span>
                      </div>

                      <div className="text-xs space-y-1">
                        <span className="text-[11px] font-mono text-[#C6A664] block font-semibold">
                          {peer.ratingTier}
                        </span>
                        <p className="text-[#595959] leading-snug">
                          <strong>Study Focus:</strong> {peer.focus}
                        </p>
                        <p className="text-[#8C7A6B] text-[11px] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#8C7A6B]" />
                          <span>{peer.timeSlot} ({peer.timezone})</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRequestPartner(peer.id)}
                      disabled={isRequested}
                      className={`w-full py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                        isRequested
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-default'
                          : 'bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7]'
                      }`}
                    >
                      {isRequested ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Audit Exchange Scheduled!</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5 text-[#C6A664]" />
                          <span>Request 5-Question Audit Exchange</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ZONE 4: Pawn Structure Circles & Live Discourse */}
      {activeZoneTab === 'circles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          {/* Circles Directory (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#D9CFC0]/70 shadow-sm space-y-3">
            <div className="border-b border-[#D9CFC0]/60 pb-3 flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider font-semibold">
                Pawn Structure Rooms
              </span>
              <span className="text-xs text-[#595959] font-mono">6 Active</span>
            </div>

            <div className="space-y-2">
              {circles.map((circle) => {
                const isSelected = circle.id === selectedCircle;
                return (
                  <button
                    key={circle.id}
                    type="button"
                    onClick={() => handleSelectCircle(circle.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-sm'
                        : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isSelected ? 'text-[#C6A664]' : 'text-[#595959]'}>
                        {circle.members} Scholars
                      </span>
                      <span className={isSelected ? 'text-[#D9CFC0]' : 'text-[#8C7A6B]'}>
                        {circle.lastPost}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold leading-snug">
                      {circle.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 truncate font-sans ${
                        isSelected ? 'text-[#D9CFC0]' : 'text-[#595959]'
                      }`}
                    >
                      {circle.activeTopic}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Circle Active Discussion (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0]/70 shadow-sm space-y-5">
              <div className="border-b border-[#D9CFC0]/60 pb-4">
                <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block mb-1 font-semibold">
                  Live Structure Room
                </span>
                <h2 className="font-display text-2xl text-[#1E3A2F]">
                  {currentCircle.title}
                </h2>
                <p className="text-xs text-[#595959] mt-1 font-sans">
                  Pinned syllabus topic: <strong className="text-[#262626]">{currentCircle.activeTopic}</strong>
                </p>
              </div>

              {/* Moderator Dispatch */}
              <div className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#595959]">
                  <span className="font-semibold text-[#1E3A2F] flex items-center gap-1.5 font-display">
                    <ShieldCheck className="w-4 h-4 text-[#1E3A2F]" />
                    <span>Cohort 01 Faculty Moderator Note</span>
                  </span>
                  <span className="font-mono text-[11px]">Pinned Dispatch</span>
                </div>
                <p className="text-xs sm:text-sm text-[#262626] leading-relaxed font-sans">
                  {currentCircle.excerpt}
                </p>
                <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between text-xs text-[#595959]">
                  <span className="font-mono text-[11px]">Chapter 4.2 Structural Packages</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectStructure(currentCircle.id);
                      onNavigate('lesson');
                    }}
                    className="text-[#1E3A2F] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Open in Lesson Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Peer Observations */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-[#595959] tracking-wider block font-semibold">
                  Peer Notes & Game Observations
                </span>

                {currentPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-white rounded-xl border border-[#D9CFC0] space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1E3A2F] font-display">{post.author}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#EDE6D8] text-[#595959]">
                          {post.role}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#8C7A6B]">{post.timeAgo}</span>
                    </div>
                    <p className="text-xs text-[#262626] leading-relaxed font-sans">{post.content}</p>
                    <div className="pt-1 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleLikePost(post.id)}
                        className={`text-xs flex items-center gap-1 font-mono transition-colors ${
                          post.hasLiked ? 'text-[#1E3A2F] font-bold' : 'text-[#8C7A6B] hover:text-[#1E3A2F]'
                        }`}
                      >
                        <Flame className={`w-3.5 h-3.5 ${post.hasLiked ? 'text-[#C6A664] fill-[#C6A664]' : ''}`} />
                        <span>{post.likes} Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Compose Form */}
                <form onSubmit={handleAddPost} className="p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-2 shadow-xs">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={`Share an observation or move lever insight for ${currentCircle.title}...`}
                    rows={2}
                    className="w-full p-2.5 text-xs text-[#262626] bg-[#FAF7F2] border border-[#D9CFC0] rounded-lg focus:outline-none focus:border-[#1E3A2F] font-sans resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#8C7A6B] font-sans">
                      Dispatches are synced with your active cohort.
                    </span>
                    <button
                      type="submit"
                      disabled={!newPostContent.trim()}
                      className="px-3.5 py-1.5 bg-[#1E3A2F] disabled:opacity-40 text-[#F6F1E7] text-xs font-semibold rounded-lg hover:bg-[#152921] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3 h-3 text-[#C6A664]" />
                      <span>Publish Insight</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
