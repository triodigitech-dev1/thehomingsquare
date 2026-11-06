import React, { useState } from 'react';
import { StudentAccount } from '../../types/chess';
import { Shield, BookOpen, CheckCircle2, UserCheck, X, ArrowRight, GraduationCap } from 'lucide-react';
import { playWoodenClick } from '../board/ChessBoard';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (account: StudentAccount) => void;
  currentAccount?: StudentAccount;
  soundEnabled: boolean;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  currentAccount,
  soundEnabled
}) => {
  const [mode, setMode] = useState<'signin' | 'enrol'>('enrol');
  
  // Enrol form
  const [fullName, setFullName] = useState(currentAccount?.fullName || '');
  const [email, setEmail] = useState(currentAccount?.email || '');
  const [cohort, setCohort] = useState(currentAccount?.cohort || 'Cohort 01 (Active Term)');
  const [tier, setTier] = useState<StudentAccount['tier']>('Mastery (Elo 1600–2200)');
  const [pledgeAccepted, setPledgeAccepted] = useState(true);

  // Sign in form
  const [signInIdentifier, setSignInIdentifier] = useState(currentAccount?.email || '');

  if (!isOpen) return null;

  const handleEnrol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const newStudent: StudentAccount = {
      isAuthenticated: true,
      studentId: `HS-2026-${randomIdSuffix}`,
      fullName: fullName.trim(),
      email: email.trim(),
      cohort,
      tier,
      enrolledDate: new Date().toISOString().split('T')[0],
      status: 'Active Scholar'
    };

    playWoodenClick(soundEnabled);
    onAuthenticate(newStudent);
    onClose();
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInIdentifier.trim()) return;

    const matchedName = signInIdentifier.includes('@')
      ? signInIdentifier.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase())
      : signInIdentifier;

    const existingStudent: StudentAccount = {
      isAuthenticated: true,
      studentId: signInIdentifier.startsWith('HS-') ? signInIdentifier : 'HS-2026-4819',
      fullName: currentAccount?.fullName || matchedName || 'Enrolled Scholar',
      email: signInIdentifier.includes('@') ? signInIdentifier : `${signInIdentifier.toLowerCase()}@homingsquare.org`,
      cohort: 'Cohort 01 (Active Term)',
      tier: 'Mastery (Elo 1600–2200)',
      enrolledDate: '2026-01-15',
      status: 'Active Scholar'
    };

    playWoodenClick(soundEnabled);
    onAuthenticate(existingStudent);
    onClose();
  };

  const handleGuestScholar = () => {
    const demoStudent: StudentAccount = {
      isAuthenticated: true,
      studentId: 'HS-2026-7721',
      fullName: 'Arthur Pendelton',
      email: 'arthur.p@homingsquare.org',
      cohort: 'Cohort 01 (Active Term)',
      tier: 'Mastery (Elo 1600–2200)',
      enrolledDate: '2026-02-01',
      status: 'Active Scholar'
    };
    playWoodenClick(soundEnabled);
    onAuthenticate(demoStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1E3A2F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] max-w-lg w-full rounded-2xl border-2 border-[#1E3A2F]/20 shadow-2xl p-6 sm:p-8 relative text-[#262626] animate-fadeIn space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-[#595959] hover:text-[#1E3A2F] hover:bg-[#EDE6D8] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* School Crest Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden shadow-md border border-[#C6A664]/40 bg-[#152921] flex items-center justify-center p-1">
            <img
              src="/assets/aistudio/The_Homing_Square_Chess_Emblem_dbf19a72.png"
              alt="The Homing Square Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="font-display text-2xl text-[#1E3A2F] tracking-tight">
            The School Portal
          </h2>
          <p className="text-xs text-[#595959] font-sans">
            Structure-First Chess Mastery · Enrolment & Classroom Desk
          </p>
        </div>

        {/* Tab Switcher: Enrol vs Sign In */}
        <div className="flex bg-[#EDE6D8] p-1 rounded-xl border border-[#D9CFC0]">
          <button
            type="button"
            onClick={() => setMode('enrol')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'enrol'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'text-[#595959] hover:text-[#1E3A2F]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Enrol as Student</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'signin'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'text-[#595959] hover:text-[#1E3A2F]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Sign In to Class</span>
          </button>
        </div>

        {/* Enrolment Form */}
        {mode === 'enrol' && (
          <form onSubmit={handleEnrol} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[#1E3A2F] font-semibold mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Elena Rostova"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              />
            </div>

            <div>
              <label className="block text-[#1E3A2F] font-semibold mb-1">
                Student Email
              </label>
              <input
                type="email"
                required
                placeholder="elena@example.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#1E3A2F] font-semibold mb-1">
                  Assigned Cohort
                </label>
                <select
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                >
                  <option value="Cohort 01 (Active Term)">Cohort 01 (Active Term)</option>
                  <option value="Cohort 02 (Summer 2026)">Cohort 02 (Summer 2026)</option>
                  <option value="Independent Scholar">Independent Study Track</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1E3A2F] font-semibold mb-1">
                  Study Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                >
                  <option value="Foundations (Elo 1000–1600)">Foundations (1000–1600)</option>
                  <option value="Mastery (Elo 1600–2200)">Mastery (1600–2200)</option>
                  <option value="Candidate (Elo 2200+)">Candidate (2200+)</option>
                </select>
              </div>
            </div>

            {/* Honor Code Pledge */}
            <div className="p-3 bg-[#EDE6D8]/60 rounded-xl border border-[#D9CFC0] space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pledgeAccepted}
                  onChange={(e) => setPledgeAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-[#1E3A2F] focus:ring-[#1E3A2F]"
                />
                <span className="text-[11px] text-[#262626] leading-relaxed">
                  <strong>Academy Code:</strong> I commit to honest self-confrontation at the board, running the V1 scan, logging errors, and finishing the 10-game gauntlet.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!pledgeAccepted}
              className="w-full py-3 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <span>Enrol & Enter Classroom</span>
              <ArrowRight className="w-4 h-4 text-[#C6A664]" />
            </button>
          </form>
        )}

        {/* Sign In Form */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[#1E3A2F] font-semibold mb-1">
                Student Email or Student ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. arthur.p@homingsquare.org or HS-2026-4819"
                value={signInIdentifier}
                onChange={(e) => setSignInIdentifier(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              />
            </div>

            <p className="text-[11px] text-[#595959]">
              Enrolled students have continuous access to lesson checkpoints, cohort discussions, and the graduation gauntlet.
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Sign In to Classroom</span>
              <ArrowRight className="w-4 h-4 text-[#C6A664]" />
            </button>
          </form>
        )}

        {/* Instant Guest Scholar Access */}
        <div className="pt-2 border-t border-[#D9CFC0]/60 flex items-center justify-between text-xs text-[#595959]">
          <span>Quick Evaluation Access?</span>
          <button
            type="button"
            onClick={handleGuestScholar}
            className="text-[#1E3A2F] font-semibold hover:underline"
          >
            Enter as Guest Scholar →
          </button>
        </div>

      </div>
    </div>
  );
};
