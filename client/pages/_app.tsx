import type { AppProps } from 'next/app';
import { AppWrapper } from './components/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/global.css';
const queryClient = new QueryClient();
const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  </QueryClientProvider>
);

export default MyApp;
