import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from './components/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppWrapper>
  );
}
export default MyApp;
