import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

export const TQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryOptions: QueryClientConfig = {
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  };

  const client = new QueryClient(queryOptions);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
