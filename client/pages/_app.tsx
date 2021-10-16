import styles from '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect, createContext, useContext, useState } from 'react';
import { AppWrapper } from './components/AppWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { checkUserAuthentication } from './auth/api/AuthApi';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // const checkAuth = async () => {
  //   const response = await checkUserAuthentication();
  //   const data = await response.json();
  //   // const { user } = data && data;
  //   console.log('auth data; ', data);
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <AppWrapper>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppWrapper>
  );
}
export default MyApp;
