import React from 'react';
import { CheckCircle2, Clock, Circle, PlayCircle, Lock } from 'lucide-react';

export type LessonProgressStatus = 'completed' | 'in_progress' | 'current' | 'not_started' | 'locked';

interface LessonStatusProps {
  status: LessonProgressStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const LessonStatus: React.FC<LessonStatusProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  switch (status) {
    case 'completed':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 ${sizeClasses} ${className}`}
        >
          <CheckCircle2 className={size === 'sm' ? 'w-3 h-3 text-emerald-600' : 'w-3.5 h-3.5 text-emerald-600'} />
          <span>Completed</span>
        </span>
      );
    case 'current':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-mono font-semibold rounded-full bg-[#1E3A2F] text-[#F6F1E7] border border-[#C6A664]/40 shadow-2xs ${sizeClasses} ${className}`}
        >
          <PlayCircle className={size === 'sm' ? 'w-3 h-3 text-[#C6A664]' : 'w-3.5 h-3.5 text-[#C6A664]'} />
          <span>Current Lesson</span>
        </span>
      );
    case 'in_progress':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full bg-amber-50 text-amber-900 border border-amber-200 ${sizeClasses} ${className}`}
        >
          <Clock className={size === 'sm' ? 'w-3 h-3 text-amber-600' : 'w-3.5 h-3.5 text-amber-600'} />
          <span>In Progress</span>
        </span>
      );
    case 'locked':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-mono text-[#8C7A6B] rounded-full bg-slate-100 border border-slate-200 ${sizeClasses} ${className}`}
        >
          <Lock className={size === 'sm' ? 'w-3 h-3 text-slate-500' : 'w-3.5 h-3.5 text-slate-500'} />
          <span>Locked</span>
        </span>
      );
    case 'not_started':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-mono text-[#8C7A6B] rounded-full bg-[#EDE6D8]/50 border border-[#D9CFC0] ${sizeClasses} ${className}`}
        >
          <Circle className={size === 'sm' ? 'w-3 h-3 text-[#8C7A6B]' : 'w-3.5 h-3.5 text-[#8C7A6B]'} />
          <span>Not Started</span>
        </span>
      );
  }
};
