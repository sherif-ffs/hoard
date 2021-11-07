import { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuthentication } from '../auth/api/AuthApi';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
};

export function AppWrapper({ children }) {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();
  const [token, setToken] = useState();
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const checkAuth = async() => {
    const response = await checkUserAuthentication();
    const data = await response.json();
    const userIsAuthenticated = data && data.data && data.data.authenticated;
    const activeUser = data && data.data && data.data.user;
    console.log('activeUser: ', activeUser)
    setUser(activeUser);
    setAuthenticated(userIsAuthenticated);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return ( <
    AppContext.Provider value = {
      { user, setUser, token, setToken, authenticated, setAuthenticated, createModalIsOpen, setCreateModalIsOpen }
    } > { children } <
    /AppContext.Provider>
  );
};