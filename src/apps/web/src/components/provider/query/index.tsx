import { useAuth } from "@clerk/nextjs";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

export const TQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();

  const queryOptions: QueryClientConfig = {
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
    defaultOptions: { queries: { enabled: isSignedIn } },
  };

  const client = new QueryClient(queryOptions);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
