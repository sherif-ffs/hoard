import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ItemsContextProvider } from './contexts/ItemsContext';
import { AppWrapper } from './components/AppWrapper';
import ItemPanel from './items/components/ItemPanel/ItemPanel';
import CreateCollectionModal from './collections/CreateCollectionModal';
import CollectionsPanel from './collections/CollectionsPanel';
import CreateModal from './items/components/CreateModal';

import '../styles/global.css';

const queryClient = new QueryClient();
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <ItemsContextProvider>
          <Component {...pageProps} />
          <ItemPanel />
          <CollectionsPanel />
          <CreateModal />
          <CreateCollectionModal />
        </ItemsContextProvider>
      </AppWrapper>
    </QueryClientProvider>
  );
};

export default MyApp;
