import { focusManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

/**
 * Sync app foreground/background state with React Query
 */
export function setupFocusManager(): () => void {
  const subscription = AppState.addEventListener('change', (state) => {
    focusManager.setFocused(state === 'active');
  });

  return () => subscription.remove();
}
