import React, { useState } from 'react';
import { NavView } from '../layout/Header';
import { StudyCard } from '../common/StudyCard';
import { playWoodenClick, playChimeSound } from '../board/ChessBoard';
import {
  Download,
  Users,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Shield,
  Layers,
  FileText,
  X,
  Search,
  Filter,
  Check,
  UserCheck,
  Sparkles,
  Printer,
  ChevronRight,
  Compass
} from 'lucide-react';

interface WorkshopViewProps {
  onNavigate: (view: NavView) => void;
  soundEnabled?: boolean;
}

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  cohort: string;
  gamesLogged: number;
  rubricScore: string;
  status: 'Graduated' | 'Active' | 'Remediation' | 'Gauntlet Final';
  preferredPath: 'Path A' | 'Path B' | 'Path C';
  primaryLeak: string;
  oneSentencePlanAccuracy: number;
  rubricPhases: {
    opening: 'Yes' | 'Partly' | 'No';
    middlegame: 'Yes' | 'Partly' | 'No';
    conversion: 'Yes' | 'Partly' | 'No';
    endgame: 'Yes' | 'Partly' | 'No';
    discipline: 'Yes' | 'Partly' | 'No';
  };
  coachNotes: string;
}

export const WorkshopView: React.FC<WorkshopViewProps> = ({ onNavigate, soundEnabled = true }) => {
  const [selectedCohort, setSelectedCohort] = useState('cohort_01');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  const initialStudents: StudentRecord[] = [
    {
      id: 'marcus_v',
      name: 'Marcus V.',
      email: 'marcus.v@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 10,
      rubricScore: '5/5 Yes',
      status: 'Graduated',
      preferredPath: 'Path B',
      primaryLeak: 'Resolved (was Decision rush)',
      oneSentencePlanAccuracy: 96,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'Yes',
        conversion: 'Yes',
        endgame: 'Yes',
        discipline: 'Yes'
      },
      coachNotes: 'Exemplary minority lever timing. Ready for capstone certification and alumni mentoring.'
    },
    {
      id: 'elena_r',
      name: 'Elena R.',
      email: 'elena.r@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 9,
      rubricScore: '4/5 Yes, 1 Partly',
      status: 'Gauntlet Final',
      preferredPath: 'Path C',
      primaryLeak: 'Visualisation (short-range rook traps)',
      oneSentencePlanAccuracy: 92,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'Yes',
        conversion: 'Partly',
        endgame: 'Yes',
        discipline: 'Yes'
      },
      coachNotes: 'Needs 1 more game log focusing on Philidor 6th rank cutoff defense before diploma conferral.'
    },
    {
      id: 'tariq_a',
      name: 'Tariq A.',
      email: 'tariq.a@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 7,
      rubricScore: '3/5 Yes, 2 Partly',
      status: 'Active',
      preferredPath: 'Path A',
      primaryLeak: 'Perception (missed defensive resources)',
      oneSentencePlanAccuracy: 84,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'Partly',
        conversion: 'Partly',
        endgame: 'Yes',
        discipline: 'Yes'
      },
      coachNotes: 'Watch for opponent desperado pins when attacking along the g-file.'
    },
    {
      id: 'sarah_k',
      name: 'Sarah K.',
      email: 'sarah.k@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 8,
      rubricScore: '4/5 Yes, 1 Partly',
      status: 'Active',
      preferredPath: 'Path B',
      primaryLeak: 'Decision (time trouble on move 35)',
      oneSentencePlanAccuracy: 88,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'Yes',
        conversion: 'Yes',
        endgame: 'Partly',
        discipline: 'Yes'
      },
      coachNotes: 'Excellent Carlsbad execution. Focus on clock management when entering rook endgames.'
    },
    {
      id: 'david_l',
      name: 'David L.',
      email: 'david.l@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 10,
      rubricScore: '5/5 Yes',
      status: 'Graduated',
      preferredPath: 'Path C',
      primaryLeak: 'Resolved (was Knowledge leak)',
      oneSentencePlanAccuracy: 98,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'Yes',
        conversion: 'Yes',
        endgame: 'Yes',
        discipline: 'Yes'
      },
      coachNotes: 'Flawless Lucena bridge execution in game 10. Conferred with honors.'
    },
    {
      id: 'amara_n',
      name: 'Amara N.',
      email: 'amara.n@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 6,
      rubricScore: '3/5 Yes, 1 Partly, 1 No',
      status: 'Remediation',
      preferredPath: 'Path A',
      primaryLeak: 'Perception (loose piece blunders in middlegame)',
      oneSentencePlanAccuracy: 72,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'No',
        conversion: 'Partly',
        endgame: 'Yes',
        discipline: 'Yes'
      },
      coachNotes: 'Prescribed daily 15-minute V1 tactile scans before playing any serious games.'
    },
    {
      id: 'james_o',
      name: 'James O.',
      email: 'james.o@homingsquare.org',
      cohort: 'Cohort 01',
      gamesLogged: 10,
      rubricScore: '4/5 Yes, 1 Partly',
      status: 'Graduated',
      preferredPath: 'Path B',
      primaryLeak: 'Resolved',
      oneSentencePlanAccuracy: 91,
      rubricPhases: {
        opening: 'Yes',
        middlegame: 'Yes',
        conversion: 'Yes',
        endgame: 'Partly',
        discipline: 'Yes'
      },
      coachNotes: 'Mastered French pawn chains and base pressure. Graduation audit approved.'
    }
  ];

  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(initialStudents[0].id);

  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) || students[0];

  const filteredStudents = students.filter((s) => {
    const matchesCohort = selectedCohort === 'cohort_01' ? s.cohort === 'Cohort 01' : true;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preferredPath.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCohort && matchesStatus && matchesSearch;
  });

  const handleUpdatePhase = (
    phase: keyof StudentRecord['rubricPhases'],
    newScore: 'Yes' | 'Partly' | 'No'
  ) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === selectedStudent.id) {
          return {
            ...s,
            rubricPhases: {
              ...s.rubricPhases,
              [phase]: newScore
            }
          };
        }
        return s;
      })
    );
    playWoodenClick(soundEnabled);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSaved(true);
    playChimeSound(soundEnabled);
    setTimeout(() => setFeedbackSaved(false), 2500);
  };

  const handlePrintAudit = () => {
    playWoodenClick(soundEnabled);
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      
      {/* Top Banner: Dual-Persona Switcher & Mode Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-[#D9CFC0] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] text-[#C6A664] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold">
                Faculty & Coaching Deck
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#C6A664]/20 text-[#8C6D23] font-semibold">
                Instructor View
              </span>
            </div>
            <h1 className="font-display text-lg font-semibold text-[#1E3A2F] leading-tight">
              The Workshop — Instructor Cohort Management & Audits
            </h1>
          </div>
        </div>

        {/* Quick Link back to Student Cockpit */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={handlePrintAudit}
            className="px-3 py-1.5 rounded-lg border border-[#D9CFC0] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#1E3A2F] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Cohort Audit</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('cockpit')}
            className="px-3.5 py-1.5 rounded-lg border border-[#D9CFC0] bg-[#FAF7F2] hover:bg-[#EDE6D8] text-xs font-semibold text-[#1E3A2F] transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>Switch to Student View</span>
            <ArrowRight className="w-3 h-3 text-[#595959]" />
          </button>
        </div>
      </div>

      {/* Instructor Command Center KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D9CFC0] shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
            Active Cohort Scholars
          </span>
          <div className="font-display text-2xl font-bold text-[#1E3A2F]">
            7 Scholars
          </div>
          <span className="text-[11px] text-[#595959] block">
            Cohort 01 Term 2026
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D9CFC0] shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
            Gauntlet Graduation Rate
          </span>
          <div className="font-display text-2xl font-bold text-emerald-700">
            86% Passed
          </div>
          <span className="text-[11px] text-[#595959] block">
            3 Graduated · 1 Finalist
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D9CFC0] shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
            Structural Discipline
          </span>
          <div className="font-display text-2xl font-bold text-[#1E3A2F]">
            94% Accuracy
          </div>
          <span className="text-[11px] text-[#595959] block">
            Plan recorded by move 12
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D9CFC0] shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block">
            Blunder Leaks Reduced
          </span>
          <div className="font-display text-2xl font-bold text-emerald-700">
            -68% Drop
          </div>
          <span className="text-[11px] text-[#595959] block">
            Impulse moves suppressed
          </span>
        </div>
      </div>

      {/* Main Screen Partition: Left Roster & Right Audit Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PARTITION (5 cols): Cohort Directory & Student Roster */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#D9CFC0]/70 shadow-sm space-y-3.5">
          
          <div className="border-b border-[#D9CFC0]/60 pb-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#C6A664] font-semibold">
                Cohort Student Directory
              </span>
              <span className="text-xs font-mono text-[#595959]">
                {filteredStudents.length} Students
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student or path..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:border-[#1E3A2F]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {['all', 'Graduated', 'Gauntlet Final', 'Active', 'Remediation'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setStatusFilter(f);
                    playWoodenClick(soundEnabled);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                    statusFilter === f
                      ? 'bg-[#1E3A2F] text-[#F6F1E7] font-semibold'
                      : 'bg-[#EDE6D8] text-[#595959] hover:bg-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Student Roster List with Internal Scrolling */}
          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {filteredStudents.map((s) => {
              const isSelected = s.id === selectedStudent.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedStudentId(s.id);
                    playWoodenClick(soundEnabled);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F] shadow-sm'
                      : 'bg-white border-[#D9CFC0] text-[#262626] hover:border-[#1E3A2F]/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-display font-semibold text-sm">
                      {s.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isSelected
                          ? 'bg-black/30 text-[#DFCA95]'
                          : s.status === 'Graduated'
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.status === 'Remediation'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-[#EDE6D8] text-[#1E3A2F]'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono mt-1">
                    <span className={isSelected ? 'text-[#C6A664]' : 'text-[#595959]'}>
                      Gauntlet: {s.gamesLogged}/10 Games
                    </span>
                    <span className={isSelected ? 'text-[#D9CFC0]' : 'text-[#8C7A6B]'}>
                      Plan: {s.oneSentencePlanAccuracy}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT PARTITION (7 cols): Live Student Audit & Remediation Console */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#D9CFC0]/70 shadow-sm space-y-6">
          
          {/* Selected Student Header */}
          <div className="border-b border-[#D9CFC0]/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block mb-0.5">
                Live Audit Console · {selectedStudent.cohort}
              </span>
              <h2 className="font-display text-2xl text-[#1E3A2F]">
                {selectedStudent.name}
              </h2>
              <span className="text-xs text-[#595959] font-sans">
                Assigned Track: <strong>{selectedStudent.preferredPath}</strong> · Primary Leak: <span className="text-rose-800 font-medium">{selectedStudent.primaryLeak}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-white border border-[#D9CFC0] text-[#1E3A2F] font-semibold">
                {selectedStudent.gamesLogged} / 10 Games Audited
              </span>
            </div>
          </div>

          {/* Interactive 5-Phase Rubric Evaluation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#1E3A2F] font-semibold">
                5-Phase Capstone Rubric Audit
              </span>
              <span className="text-[11px] text-[#595959] font-sans">
                Click any score to update student record
              </span>
            </div>

            <div className="space-y-2">
              {[
                {
                  key: 'opening' as const,
                  label: 'Phase 1: Opening Discipline',
                  desc: 'Pawn structure identified and one-sentence plan written by move 12.'
                },
                {
                  key: 'middlegame' as const,
                  label: 'Phase 2: Middlegame Execution',
                  desc: 'Committed decisively to Path A, B, or C with no impulse moves.'
                },
                {
                  key: 'conversion' as const,
                  label: 'Phase 3: Conversion Technique',
                  desc: 'Pawn lever timing executed; zero counterplay granted.'
                },
                {
                  key: 'endgame' as const,
                  label: 'Phase 4: Theoretical Endgame',
                  desc: 'Lucena bridge or Philidor barrier demonstrated accurately.'
                },
                {
                  key: 'discipline' as const,
                  label: 'Phase 5: Emotional & Time Discipline',
                  desc: 'V1 scan observed on every move; no premature resignation.'
                }
              ].map((phase) => {
                const currentScore = selectedStudent.rubricPhases[phase.key];
                return (
                  <div
                    key={phase.key}
                    className="p-3 bg-white rounded-xl border border-[#D9CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-display font-semibold text-xs text-[#1E3A2F] block">
                        {phase.label}
                      </span>
                      <p className="text-[11px] text-[#595959] font-sans leading-tight">
                        {phase.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {(['Yes', 'Partly', 'No'] as const).map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => handleUpdatePhase(phase.key, sc)}
                          className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-lg transition-colors ${
                            currentScore === sc
                              ? sc === 'Yes'
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : sc === 'Partly'
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-rose-700 text-white shadow-xs'
                              : 'bg-[#EDE6D8] text-[#595959] hover:bg-[#D9CFC0]'
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coach Notes & Prescribed Remediation */}
          <form onSubmit={handleSaveNotes} className="space-y-2 pt-2 border-t border-[#D9CFC0]/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#1E3A2F] font-semibold">
                Instructor Notes & Prescribed Action
              </span>
              {feedbackSaved && (
                <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Synced to Scholar Desk</span>
                </span>
              )}
            </div>

            <textarea
              defaultValue={selectedStudent.coachNotes}
              rows={3}
              placeholder="Enter instructor feedback and remediation drills for this student..."
              className="w-full p-3 bg-white border border-[#D9CFC0] rounded-xl text-xs text-[#262626] font-sans focus:outline-none focus:border-[#1E3A2F] shadow-xs"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-3.5 h-3.5 text-[#C6A664]" />
                <span>Save & Sync Audit to Student</span>
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
