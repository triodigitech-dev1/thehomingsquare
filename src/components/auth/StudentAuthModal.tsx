import React, { useState } from 'react';
import { StudentAccount } from '../../types/chess';
import { Shield, BookOpen, CheckCircle2, UserCheck, X, ArrowRight, GraduationCap, Wrench, ShieldAlert } from 'lucide-react';
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
  const [role, setRole] = useState<'student' | 'instructor' | 'admin'>('student');
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
      studentId: role === 'admin' ? `HS-ADM-${randomIdSuffix}` : role === 'instructor' ? `HS-FAC-${randomIdSuffix}` : `HS-2026-${randomIdSuffix}`,
      fullName: fullName.trim(),
      email: email.trim(),
      cohort,
      tier,
      enrolledDate: new Date().toISOString().split('T')[0],
      status: role === 'admin' ? 'Alumnus' : role === 'instructor' ? 'Active Scholar' : 'Active Scholar',
      role
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

    const isAdmin = signInIdentifier.toLowerCase().includes('admin') || signInIdentifier.toLowerCase().includes('maintainer');
    const isInstructor = signInIdentifier.toLowerCase().includes('coach') || signInIdentifier.toLowerCase().includes('faculty') || signInIdentifier.toLowerCase().includes('instructor');

    const detectedRole: 'student' | 'instructor' | 'admin' = isAdmin ? 'admin' : isInstructor ? 'instructor' : 'student';

    const existingStudent: StudentAccount = {
      isAuthenticated: true,
      studentId: signInIdentifier.startsWith('HS-') ? signInIdentifier : isAdmin ? 'HS-ADM-9001' : 'HS-2026-4819',
      fullName: currentAccount?.fullName || matchedName || (isAdmin ? 'Academy Maintainer' : isInstructor ? 'Head Coach Elena' : 'Enrolled Scholar'),
      email: signInIdentifier.includes('@') ? signInIdentifier : `${signInIdentifier.toLowerCase()}@homingsquare.org`,
      cohort: 'Cohort 01 (Active Term)',
      tier: 'Mastery (Elo 1600–2200)',
      enrolledDate: '2026-01-15',
      status: 'Active Scholar',
      role: detectedRole
    };

    playWoodenClick(soundEnabled);
    onAuthenticate(existingStudent);
    onClose();
  };

  const handleQuickRoleLogin = (selectedRole: 'student' | 'instructor' | 'admin') => {
    let mockAccount: StudentAccount;
    if (selectedRole === 'admin') {
      mockAccount = {
        isAuthenticated: true,
        studentId: 'HS-ADM-1001',
        fullName: 'Archivist Thorne (Admin / Maintainer)',
        email: 'maintainer@homingsquare.org',
        cohort: 'Faculty & Curators',
        tier: 'Candidate (Elo 2200+)',
        enrolledDate: '2026-01-01',
        status: 'Alumnus',
        role: 'admin'
      };
    } else if (selectedRole === 'instructor') {
      mockAccount = {
        isAuthenticated: true,
        studentId: 'HS-FAC-2044',
        fullName: 'Coach Mikhail Vance (Instructor)',
        email: 'mikhail.v@homingsquare.org',
        cohort: 'Cohort 01 Lead Instructor',
        tier: 'Candidate (Elo 2200+)',
        enrolledDate: '2026-01-10',
        status: 'Active Scholar',
        role: 'instructor'
      };
    } else {
      mockAccount = {
        isAuthenticated: true,
        studentId: 'HS-2026-7721',
        fullName: 'Arthur Pendelton (Scholar)',
        email: 'arthur.p@homingsquare.org',
        cohort: 'Cohort 01 (Active Term)',
        tier: 'Mastery (Elo 1600–2200)',
        enrolledDate: '2026-02-01',
        status: 'Active Scholar',
        role: 'student'
      };
    }

    playWoodenClick(soundEnabled);
    onAuthenticate(mockAccount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1E3A2F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] max-w-lg w-full rounded-2xl border-2 border-[#1E3A2F]/20 shadow-2xl p-6 sm:p-8 relative text-[#262626] animate-fadeIn space-y-5 max-h-[90vh] overflow-y-auto">
        
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
        <div className="text-center space-y-1.5">
          <div className="w-14 h-14 mx-auto rounded-xl overflow-hidden shadow-md border border-[#C6A664]/40 bg-[#152921] flex items-center justify-center p-1">
            <img
              src="/assets/aistudio/Golden_Chess_Academy_Emblem_2bfcdfbb.png"
              alt="Golden Chess Academy Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="font-display text-2xl text-[#1E3A2F] tracking-tight">
            The School Portal
          </h2>
          <p className="text-xs text-[#595959] font-sans">
            Structure-First Chess Mastery · Multi-Role Enrolment & Desk
          </p>
        </div>

        {/* Quick Role Switcher for Testing / Demonstration */}
        <div className="p-3 bg-white rounded-xl border border-[#D9CFC0] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A664] font-semibold block text-center">
            One-Click Desk Switcher (Try Any Perspective)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('student')}
              className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#EDE6D8] border border-[#D9CFC0] text-center text-xs transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-[#1E3A2F] mx-auto mb-1" />
              <span className="font-display font-semibold text-[#1E3A2F] block text-[11px]">Scholar</span>
              <span className="text-[9px] text-[#595959] font-sans block">Student View</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('instructor')}
              className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#EDE6D8] border border-[#D9CFC0] text-center text-xs transition-colors"
            >
              <Wrench className="w-4 h-4 text-[#C6A664] mx-auto mb-1" />
              <span className="font-display font-semibold text-[#1E3A2F] block text-[11px]">Instructor</span>
              <span className="text-[9px] text-[#595959] font-sans block">Cohort Audit</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('admin')}
              className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#EDE6D8] border border-[#D9CFC0] text-center text-xs transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-emerald-800 mx-auto mb-1" />
              <span className="font-display font-semibold text-[#1E3A2F] block text-[11px]">Maintainer</span>
              <span className="text-[9px] text-[#595959] font-sans block">Unlocks Library</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Enrol vs Sign In */}
        <div className="flex bg-[#EDE6D8] p-1 rounded-xl border border-[#D9CFC0]">
          <button
            type="button"
            onClick={() => setMode('enrol')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'enrol'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'text-[#595959] hover:text-[#1E3A2F]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Enrol New Account</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'signin'
                ? 'bg-[#1E3A2F] text-[#F6F1E7] shadow-xs'
                : 'text-[#595959] hover:text-[#1E3A2F]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Sign In to Desk</span>
          </button>
        </div>

        {/* Enrolment Form */}
        {mode === 'enrol' && (
          <form onSubmit={handleEnrol} className="space-y-3.5 text-xs font-sans">
            <div>
              <label className="block text-[#1E3A2F] font-semibold mb-1">
                Full Name
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
                Email Address
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[#1E3A2F] font-semibold mb-1">
                  Desk Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full p-2 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                >
                  <option value="student">Student Scholar</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Maintainer / Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1E3A2F] font-semibold mb-1">
                  Assigned Cohort
                </label>
                <select
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  className="w-full p-2 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                >
                  <option value="Cohort 01 (Active Term)">Cohort 01</option>
                  <option value="Cohort 02 (Summer 2026)">Cohort 02</option>
                  <option value="Independent Scholar">Independent</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1E3A2F] font-semibold mb-1">
                  Study Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full p-2 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                >
                  <option value="Foundations (Elo 1000–1600)">1000–1600</option>
                  <option value="Mastery (Elo 1600–2200)">1600–2200</option>
                  <option value="Candidate (Elo 2200+)">2200+</option>
                </select>
              </div>
            </div>

            {/* Honor Code Pledge */}
            <div className="p-2.5 bg-[#EDE6D8]/60 rounded-xl border border-[#D9CFC0] space-y-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pledgeAccepted}
                  onChange={(e) => setPledgeAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-[#1E3A2F] focus:ring-[#1E3A2F]"
                />
                <span className="text-[11px] text-[#262626] leading-tight">
                  <strong>Academy Code:</strong> I commit to structure-first discipline, running the V1 scan, and diagnostic auditing.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!pledgeAccepted}
              className="w-full py-2.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <span>Enrol & Access Quarters</span>
              <ArrowRight className="w-4 h-4 text-[#C6A664]" />
            </button>
          </form>
        )}

        {/* Sign In Form */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3.5 text-xs font-sans">
            <div>
              <label className="block text-[#1E3A2F] font-semibold mb-1">
                Student ID, Email, or "admin"
              </label>
              <input
                type="text"
                required
                placeholder="e.g. arthur.p@homingsquare.org or admin@homingsquare.org"
                value={signInIdentifier}
                onChange={(e) => setSignInIdentifier(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D9CFC0] rounded-lg text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
              />
            </div>

            <p className="text-[11px] text-[#595959]">
              Type <strong>admin</strong> to sign in as Maintainer, or use any student or instructor email.
            </p>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1E3A2F] hover:bg-[#152921] text-[#F6F1E7] font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Sign In to Academy</span>
              <ArrowRight className="w-4 h-4 text-[#C6A664]" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
