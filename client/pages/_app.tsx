import type { AppProps } from 'next/app';
import { AppWrapper } from './components/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppWrapper>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </AppWrapper>
);

export default MyApp;
