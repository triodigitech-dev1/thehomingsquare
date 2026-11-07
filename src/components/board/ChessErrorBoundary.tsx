import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ChessErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ChessErrorBoundary caught an error in <ChessBoard>:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#152921] border border-[#C6A664]/40 rounded-xl text-center max-w-md mx-auto my-4 text-[#F6F1E7] shadow-lg">
          <div className="w-12 h-12 rounded-full bg-[#C6A664]/10 border border-[#C6A664]/40 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-[#C6A664]" />
          </div>
          <h4 className="font-display text-lg text-[#F6F1E7] mb-1">
            Board Position Interrupted
          </h4>
          <p className="text-xs text-[#D9CFC0] max-w-xs mb-4 leading-relaxed font-sans">
            {this.props.fallbackMessage ||
              'A piece coordinate or position state encountered an irregularity. The board can be safely restored.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-[#C6A664] hover:bg-[#DFCA95] text-[#1E3A2F] text-xs font-semibold rounded-md transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Board to Standard View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
