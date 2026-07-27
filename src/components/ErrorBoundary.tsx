import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Usage:
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div 
          className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md space-y-6">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, var(--vibrant-magenta), var(--vibrant-orange))',
                opacity: 0.8
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-10 h-10 text-white"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
                />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold groovy-text">
                Something went wrong
              </h2>
              <p className="text-white/70">
                We encountered an unexpected error. This has been logged and we'll look into it.
              </p>
            </div>
            
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
              style={{
                background: 'linear-gradient(135deg, var(--vibrant-cyan), var(--vibrant-magenta))',
              }}
            >
              Try Again
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-white/50 hover:text-white/70 text-sm">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 p-4 rounded-lg bg-black/50 text-red-400 text-xs overflow-auto max-h-40">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper component for sections that might fail independently
 */
interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
}

export function SectionErrorBoundary({ children, sectionName }: SectionErrorBoundaryProps): ReactNode {
  return (
    <ErrorBoundary
      fallback={
        <div 
          className="py-16 px-6"
          role="alert"
        >
          <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
            <p className="text-white/70">
              {sectionName 
                ? `Unable to load the ${sectionName} section.` 
                : 'Unable to load this section.'}
            </p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}