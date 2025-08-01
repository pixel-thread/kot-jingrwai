import React, { Component, ErrorInfo, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../ui/typography';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { Container } from './Container';
import { logger } from '../../utils/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole app.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to the console and potentially to an error reporting service
    logger.error({ message: 'Error caught by ErrorBoundary', error, errorInfo });
    this.setState({
      errorInfo,
    });
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, render the default fallback UI
      return (
        <Container>
          <Reanimated.View
            entering={FadeIn.duration(500)}
            className="flex-1 items-center justify-center px-4">
            <Text size="2xl" weight="bold" align="center" className="mb-6">
              Something went wrong
            </Text>
            <Text size="md" align="center" className="mb-6">
              The application encountered an unexpected error. We&apos;ve been notified and are
              working to fix the issue.
            </Text>
            <TouchableOpacity
              onPress={this.resetError}
              className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 dark:bg-indigo-500">
              <Text size="md" weight="semibold" className="text-white">
                Try Again
              </Text>
            </TouchableOpacity>
          </Reanimated.View>
        </Container>
      );
    }

    return this.props.children;
  }
}
