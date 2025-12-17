import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { setupFocusManager } from '../../../utils/reactQuery/focusManger';
import { setupOnlineManager } from '../../../utils/reactQuery/onlineManager';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const TQueryProvider = ({ children }: Props) => {
  useEffect(() => {
    const cleanupOnline = setupOnlineManager();
    const cleanupFocus = setupFocusManager();

    return () => {
      cleanupOnline();
      cleanupFocus();
    };
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
