import React, { useState } from 'react';
import { Eye, Code, Copy, Check } from 'lucide-react';
import { playWoodenClick } from '../board/ChessBoard';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  initialMode?: 'rendered' | 'raw';
  soundEnabled?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  initialMode = 'rendered',
  soundEnabled = true
}) => {
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>(initialMode);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      playWoodenClick(soundEnabled);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Helper to parse inline styles (bold, italic, code)
  const renderInlineFormatted = (text: string) => {
    // Split by code, bold, italic
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Regex for inline code: `code`
    // bold: **bold**
    // italic: *italic* or _italic_
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchStr = match[0];
      if (matchStr.startsWith('`') && matchStr.endsWith('`')) {
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded bg-[#EDE6D8] border border-[#D9CFC0] font-mono text-[11px] text-[#1E3A2F]"
          >
            {matchStr.slice(1, -1)}
          </code>
        );
      } else if (matchStr.startsWith('**') && matchStr.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-[#1E3A2F]">
            {matchStr.slice(2, -2)}
          </strong>
        );
      } else if (
        (matchStr.startsWith('*') && matchStr.endsWith('*')) ||
        (matchStr.startsWith('_') && matchStr.endsWith('_'))
      ) {
        parts.push(
          <em key={keyIdx++} className="italic text-[#262626]">
            {matchStr.slice(1, -1)}
          </em>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Render markdown lines into structured elements
  const renderDocument = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

    const flushList = () => {
      if (!currentList) return;
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-3 space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-[#262626]">
            {currentList.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInlineFormatted(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-3 space-y-1.5 pl-5 list-decimal text-xs sm:text-sm text-[#262626]">
            {currentList.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInlineFormatted(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Horizontal Rule
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        flushList();
        elements.push(<hr key={idx} className="my-5 border-[#D9CFC0]/60" />);
        return;
      }

      // Headers
      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={idx} className="font-display text-2xl sm:text-3xl font-semibold text-[#1E3A2F] mt-6 mb-2 tracking-tight">
            {renderInlineFormatted(trimmed.slice(2))}
          </h1>
        );
        return;
      }
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="font-display text-xl sm:text-2xl font-semibold text-[#1E3A2F] mt-5 mb-2 tracking-tight border-b border-[#D9CFC0]/40 pb-1">
            {renderInlineFormatted(trimmed.slice(3))}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={idx} className="font-display text-base sm:text-lg font-semibold text-[#1E3A2F] mt-4 mb-1">
            {renderInlineFormatted(trimmed.slice(4))}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote
            key={idx}
            className="my-3 pl-4 border-l-3 border-[#C6A664] italic text-xs sm:text-sm text-[#1E3A2F] bg-[#EDE6D8]/30 py-2 rounded-r-lg font-display"
          >
            {renderInlineFormatted(trimmed.slice(2))}
          </blockquote>
        );
        return;
      }

      // Unordered list
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!currentList || currentList.type !== 'ul') {
          flushList();
          currentList = { type: 'ul', items: [] };
        }
        currentList.items.push(trimmed.slice(2));
        return;
      }

      // Ordered list (e.g. 1. , 2. )
      const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (orderedMatch) {
        if (!currentList || currentList.type !== 'ol') {
          flushList();
          currentList = { type: 'ol', items: [] };
        }
        currentList.items.push(orderedMatch[2]);
        return;
      }

      // Normal paragraph
      if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p key={idx} className="my-2.5 text-xs sm:text-sm text-[#262626] leading-relaxed font-sans">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className={`rounded-xl border border-[#D9CFC0] bg-white overflow-hidden shadow-xs ${className}`}>
      {/* Top Document Bar */}
      <div className="bg-[#FAF7F2] px-4 py-2 border-b border-[#D9CFC0] flex items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-1 bg-[#EDE6D8] p-0.5 rounded-lg border border-[#D9CFC0]">
          <button
            type="button"
            onClick={() => {
              setViewMode('rendered');
              playWoodenClick(soundEnabled);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              viewMode === 'rendered'
                ? 'bg-white text-[#1E3A2F] shadow-xs font-semibold'
                : 'text-[#595959] hover:text-[#262626]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>Document View</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('raw');
              playWoodenClick(soundEnabled);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              viewMode === 'raw'
                ? 'bg-white text-[#1E3A2F] shadow-xs font-semibold'
                : 'text-[#595959] hover:text-[#262626]'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-[#1E3A2F]" />
            <span>Source Markdown</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-[#595959] hover:text-[#1E3A2F] hover:bg-[#EDE6D8] transition-colors"
          title="Copy markdown text"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Text</span>
            </>
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="p-6 sm:p-8 max-h-[600px] overflow-y-auto">
        {viewMode === 'rendered' ? (
          <article className="prose prose-sm max-w-none text-[#262626]">
            {renderDocument()}
          </article>
        ) : (
          <pre className="font-mono text-xs text-[#262626] bg-[#FAF7F2] p-4 rounded-lg border border-[#D9CFC0] whitespace-pre-wrap leading-relaxed select-all">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
};
