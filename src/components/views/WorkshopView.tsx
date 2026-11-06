import React, { useState } from 'react';
import { NavView } from '../layout/Header';
import { Download, Users, FileCheck, CheckCircle2, TrendingUp, Building2, ExternalLink } from 'lucide-react';

interface WorkshopViewProps {
  onNavigate: (view: NavView) => void;
}

export const WorkshopView: React.FC<WorkshopViewProps> = ({ onNavigate }) => {
  const [selectedCohort, setSelectedCohort] = useState('cohort_01');

  const cohortRoster = [
    { name: 'Marcus V.', gamesLogged: 10, rubricScore: '5/5 Yes', status: 'Graduated' },
    { name: 'Elena R.', gamesLogged: 9, rubricScore: '4/5 Yes, 1 Partly', status: 'Gauntlet Final' },
    { name: 'Tariq A.', gamesLogged: 7, rubricScore: '3/5 Yes, 2 Partly', status: 'Active' },
    { name: 'Sarah K.', gamesLogged: 8, rubricScore: '4/5 Yes, 1 Partly', status: 'Active' },
    { name: 'David L.', gamesLogged: 10, rubricScore: '5/5 Yes', status: 'Graduated' },
    { name: 'Amara N.', gamesLogged: 6, rubricScore: '3/5 Yes, 1 Partly, 1 No (Re-studying Ch 4)', status: 'Remediation' },
    { name: 'James O.', gamesLogged: 10, rubricScore: '4/5 Yes, 1 Partly', status: 'Graduated' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Workshop Header */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C6A664] tracking-wider mb-1">
            <span>Institutional & Coaching Portal</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1E3A2F] tracking-tight">
            The Workshop: For Coaches & Institutions
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] mt-1 font-sans max-w-2xl leading-relaxed">
            The separate door for the educators, community leaders, and organizations who deliver the course.
            Assign coursework, audit rubric progress, run cohorts, and generate verifiable outcome reports.
          </p>
        </div>

        {/* Course PDF Direct Download */}
        <a
          href="/assets/aistudio/Structure_First_Chess_Mastery_31a83b4c.pdf"
          download="Structure_First_Chess_Mastery_Guide.pdf"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 bg-[#1E3A2F] text-[#F6F1E7] rounded-xl text-xs font-semibold hover:bg-[#152921] transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 text-[#C6A664]" />
          <span>Download Curriculum Guide PDF</span>
        </a>
      </div>

      {/* Sustainable Business Model Principle Banner */}
      <div className="p-6 bg-[#1E3A2F] text-[#F6F1E7] rounded-2xl border border-[#C6A664]/30 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-[#C6A664] uppercase block font-semibold text-[11px]">
              01. The Principle
            </span>
            <strong className="text-sm font-display text-white block">Free for the individual learner, forever.</strong>
            <p className="text-[#D9CFC0] leading-relaxed">
              Revenue comes from institutions, schools, rehabilitation centers, and licensed coaches. The learner never hits a paywall.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[#C6A664] uppercase block font-semibold text-[11px]">
              02. Proof of Commitment
            </span>
            <strong className="text-sm font-display text-white block">Measurable behavioral outcomes.</strong>
            <p className="text-[#D9CFC0] leading-relaxed">
              We do not measure vanity rating clicks. We measure presence, completing checkpoints, and honest error logging.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[#C6A664] uppercase block font-semibold text-[11px]">
              03. The Horizon
            </span>
            <strong className="text-sm font-display text-white block">The Long Way Home.</strong>
            <p className="text-[#D9CFC0] leading-relaxed">
              Graduating the Mastery Check earns entry into the annual flagship expedition — proof a person can commit, opening a door outward.
            </p>
          </div>
        </div>
      </div>

      {/* Cohort 01 Management Dashboard */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D9CFC0]/60 shadow-sm space-y-6">
        <div className="border-b border-[#D9CFC0]/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block">
              Active Cohort Tracker
            </span>
            <h2 className="font-display text-xl text-[#1E3A2F]">
              Cohort 01 — “The Threshold” (Autumn 2026)
            </h2>
            <p className="text-xs text-[#595959] mt-0.5">
              7 Active Homecomers · 3 Graduated · Target Homecoming Day: Nov 28
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#595959]">Cohort:</span>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="text-xs bg-white border border-[#D9CFC0] rounded-md px-3 py-1.5 text-[#262626]"
            >
              <option value="cohort_01">Cohort 01 (Threshold)</option>
              <option value="cohort_02">Cohort 02 (Winter Intake)</option>
            </select>
          </div>
        </div>

        {/* Cohort Roster Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-[#D9CFC0] bg-[#EDE6D8]/50 text-[#1E3A2F] font-semibold">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Gauntlet Logs</th>
                <th className="py-2.5 px-3">5-Phase Rubric Audit</th>
                <th className="py-2.5 px-3">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9CFC0]/60 text-[#262626]">
              {cohortRoster.map((student, i) => (
                <tr key={i} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-3 font-medium text-[#1E3A2F]">{student.name}</td>
                  <td className="py-3 px-3 font-mono">{student.gamesLogged} / 10 Games</td>
                  <td className="py-3 px-3 font-mono text-[#595959]">{student.rubricScore}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        student.status === 'Graduated'
                          ? 'bg-[#1E3A2F] text-[#F6F1E7]'
                          : student.status === 'Remediation'
                          ? 'bg-[#A8553F]/15 text-[#A8553F]'
                          : 'bg-[#C6A664]/30 text-[#1E3A2F]'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Outcome Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/60 shadow-sm space-y-4">
          <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block">
            Institutional Outcome Metric 1
          </span>
          <h3 className="font-display text-lg text-[#1E3A2F]">
            Structural Discipline & Executive Function
          </h3>
          <p className="text-xs text-[#595959] leading-relaxed">
            In Cohort 01, students demonstrated a <strong>94% rate</strong> of naming the pawn structure and writing a one-sentence plan by move 12 in serious games.
          </p>
          <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] text-xs font-mono text-[#1E3A2F]">
            Pre-course impulse moves: 42% → Post-course V1 compliance: 89%
          </div>
        </div>

        <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#D9CFC0]/60 shadow-sm space-y-4">
          <span className="text-xs font-mono uppercase text-[#C6A664] tracking-wider block">
            Institutional Outcome Metric 2
          </span>
          <h3 className="font-display text-lg text-[#1E3A2F]">
            Emotional Regulation & Defeat Resilience
          </h3>
          <p className="text-xs text-[#595959] leading-relaxed">
            Students showed a <strong>68% reduction in tilt/rage-quitting</strong> by implementing Chapter 4.3 fortress drawing techniques and the diagnostic 4-leak post-game review.
          </p>
          <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] text-xs font-mono text-[#1E3A2F]">
            Premature resignations: Reduced from 38% to 4%
          </div>
        </div>
      </div>
    </div>
  );
};
