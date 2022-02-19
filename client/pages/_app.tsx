import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import { AppContextProvider } from '../contexts/AppContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import ItemPanel from './items/components/ItemPanel/ItemPanel';
import CreateCollectionModal from './collections/CreateCollectionModal';
import CollectionsPanel from './collections/CollectionsPanel';
import CreateModal from './items/components/CreateModal';

import '../styles/global.css';

const queryClient = new QueryClient();
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Hoard</title>
        <link rel="shortcut icon" href="/../public/hoard.jpeg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppContextProvider>
            <Toaster />
            <Component {...pageProps} />
            <ItemPanel />
            <CollectionsPanel />
            <CreateModal />
            <CreateCollectionModal />
          </AppContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
