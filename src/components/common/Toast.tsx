import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Award,
  X,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { playWoodenClick, playChimeSound, playMilestoneFanfare } from '../board/ChessBoard';

export type ToastType = 'success' | 'info' | 'warning' | 'milestone' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    milestone: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
  };
  addToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode; soundEnabled?: boolean }> = ({
  children,
  soundEnabled = true
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string, duration: number = 3800) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev.slice(-3), newToast]); // Keep max 4 toasts visible

      // Subtle audio feedback based on toast type
      if (soundEnabled) {
        if (type === 'milestone') {
          playMilestoneFanfare(true);
        } else if (type === 'success') {
          playChimeSound(true);
        } else {
          playWoodenClick(true);
        }
      }

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast, soundEnabled]
  );

  const toastMethods = {
    success: (title: string, message?: string) => addToast('success', title, message),
    info: (title: string, message?: string) => addToast('info', title, message),
    warning: (title: string, message?: string) => addToast('warning', title, message),
    milestone: (title: string, message?: string) => addToast('milestone', title, message, 5000),
    error: (title: string, message?: string) => addToast('error', title, message, 4500)
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods, addToast, removeToast }}>
      {children}

      {/* Confined Floating Toast Stack (Bottom-Right or Top-Right responsive) */}
      <aside
        aria-label="Academy Notifications"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full px-3 sm:px-0 pointer-events-none"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border shadow-xl transition-all duration-300 animate-slideUp font-sans ${
              item.type === 'milestone'
                ? 'bg-linear-to-r from-[#1E3A2F] to-[#244336] text-[#F6F1E7] border-[#C6A664] ring-1 ring-[#C6A664]/50'
                : item.type === 'success'
                ? 'bg-[#FAF7F2] text-[#1E3A2F] border-emerald-600/40 ring-1 ring-emerald-500/20'
                : item.type === 'warning'
                ? 'bg-[#FAF7F2] text-amber-950 border-amber-500/40'
                : item.type === 'error'
                ? 'bg-[#FAF7F2] text-rose-950 border-rose-500/40'
                : 'bg-[#FAF7F2] text-[#1E3A2F] border-[#D9CFC0]'
            }`}
          >
            {/* Toast Icon */}
            <div className="shrink-0 mt-0.5">
              {item.type === 'milestone' && (
                <div className="w-7 h-7 rounded-lg bg-[#C6A664]/20 border border-[#C6A664] flex items-center justify-center text-[#C6A664]">
                  <Award className="w-4 h-4 text-[#C6A664]" />
                </div>
              )}
              {item.type === 'success' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
              )}
              {item.type === 'warning' && (
                <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                </div>
              )}
              {item.type === 'error' && (
                <div className="w-7 h-7 rounded-lg bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                </div>
              )}
              {item.type === 'info' && (
                <div className="w-7 h-7 rounded-lg bg-[#EDE6D8] border border-[#D9CFC0] flex items-center justify-center text-[#1E3A2F]">
                  <Info className="w-4 h-4 text-[#1E3A2F]" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-display text-xs sm:text-sm font-semibold truncate ${
                    item.type === 'milestone' ? 'text-[#F6F1E7]' : 'text-[#1E3A2F]'
                  }`}
                >
                  {item.title}
                </span>
                {item.type === 'milestone' && (
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A664] shrink-0" />
                )}
              </div>
              {item.message && (
                <p
                  className={`text-[11px] sm:text-xs mt-0.5 leading-snug line-clamp-2 ${
                    item.type === 'milestone' ? 'text-[#D9CFC0]' : 'text-[#595959]'
                  }`}
                >
                  {item.message}
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => removeToast(item.id)}
              className={`p-1 rounded-md transition-colors shrink-0 ${
                item.type === 'milestone'
                  ? 'text-[#D9CFC0] hover:text-white hover:bg-white/10'
                  : 'text-[#8C7A6B] hover:text-[#1E3A2F] hover:bg-[#EDE6D8]'
              }`}
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
