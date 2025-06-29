import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
type Props = Readonly<{
  children: React.ReactNode;
}>;
export const TQueryProvider = ({ children }: Props) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
