import { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuthentication } from '../auth/api/AuthApi';
import loadAllCollections from '../collections/hooks/loadAllCollections';
import loadMyCollections from '../collections/hooks/loadCollectionById';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppWrapper({ children }) {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();
  const [token, setToken] = useState();
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const checkAuth = async () => {
    const response = await checkUserAuthentication();
    const data = await response.json();
    const userIsAuthenticated = data && data.data && data.data.authenticated;
    const activeUser = data && data.data && data.data.user;
    setUser(activeUser);
    setAuthenticated(userIsAuthenticated);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const userId = user && user._id;
  const myCollections = loadMyCollections(userId);

  const allCollections = loadAllCollections();

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        authenticated,
        setAuthenticated,
        createModalIsOpen,
        setCreateModalIsOpen,
        myCollections,
        allCollections,
      }}
    >
      {' '}
      {children}{' '}
    </AppContext.Provider>
  );
}
