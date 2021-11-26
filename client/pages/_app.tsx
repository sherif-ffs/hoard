import type { AppProps } from 'next/app';
import { AppWrapper } from './components/AppWrapper';
import { ItemsContextProvider } from './contexts/ItemsContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/global.css';
const queryClient = new QueryClient();
const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <AppWrapper>
      <ItemsContextProvider>
        <Component {...pageProps} />
      </ItemsContextProvider>
    </AppWrapper>
  </QueryClientProvider>
);

export default MyApp;
