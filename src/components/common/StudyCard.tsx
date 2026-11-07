import React, { ReactNode } from 'react';

export interface StudyCardProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  kicker?: string;
  badge?: ReactNode;
  badgeVariant?: 'gold' | 'dark' | 'warm' | 'default';
  actions?: ReactNode;
  headerAction?: ReactNode;
  variant?: 'default' | 'elevated' | 'inset' | 'accent' | 'parchment';
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onClick?: () => void;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  children,
  title,
  subtitle,
  kicker,
  badge,
  badgeVariant = 'default',
  actions,
  headerAction,
  variant = 'default',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  onClick
}) => {
  const variantStyles = {
    default: 'bg-[#FAF7F2] border-[#D9CFC0]/70 text-[#262626]',
    elevated: 'bg-white border-[#D9CFC0] text-[#262626] shadow-md',
    inset: 'bg-[#EDE6D8]/50 border-[#D9CFC0]/80 text-[#262626]',
    accent: 'bg-[#1E3A2F] border-[#C6A664]/30 text-[#F6F1E7]',
    parchment: 'bg-[#FBF9F4] border-[#D9CFC0] text-[#262626]'
  }[variant];

  const badgeStyles = {
    gold: 'bg-[#C6A664]/20 text-[#8C6D23] border-[#C6A664]/40',
    dark: 'bg-[#1E3A2F] text-[#F6F1E7] border-[#1E3A2F]',
    warm: 'bg-[#EDE6D8] text-[#595959] border-[#D9CFC0]',
    default: 'bg-[#EDE6D8] text-[#595959] border-[#D9CFC0]'
  }[badgeVariant];

  const isInteractive = Boolean(onClick);
  const actionSlot = actions || headerAction;
  const hasHeader = Boolean(title || kicker || subtitle || badge || actionSlot);

  return (
    <section
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${variantStyles} ${
        isInteractive ? 'cursor-pointer hover:border-[#1E3A2F]/40 hover:shadow-md' : ''
      } ${className}`}
    >
      {hasHeader && (
        <header
          className={`px-5 py-4 sm:px-6 border-b flex items-start justify-between gap-4 ${
            variant === 'accent' ? 'border-[#C6A664]/20' : 'border-[#D9CFC0]/50'
          } ${headerClassName}`}
        >
          <div className="space-y-0.5 min-w-0">
            {kicker && (
              <span
                className={`text-[11px] font-mono uppercase tracking-wider block ${
                  variant === 'accent' ? 'text-[#C6A664]' : 'text-[#8C7A6B]'
                }`}
              >
                {kicker}
              </span>
            )}
            {title && (
              <h3
                className={`font-display text-lg sm:text-xl font-semibold leading-tight truncate ${
                  variant === 'accent' ? 'text-[#F6F1E7]' : 'text-[#1E3A2F]'
                }`}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={`text-xs font-sans leading-relaxed line-clamp-2 ${
                  variant === 'accent' ? 'text-[#D9CFC0]' : 'text-[#595959]'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>

          {(badge || actionSlot) && (
            <div className="flex items-center gap-2 shrink-0">
              {badge && typeof badge === 'string' ? (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${badgeStyles}`}>
                  {badge}
                </span>
              ) : (
                badge
              )}
              {actionSlot}
            </div>
          )}
        </header>
      )}

      {children && <div className={`p-5 sm:p-6 ${bodyClassName}`}>{children}</div>}
    </section>
  );
};
