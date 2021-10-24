import { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuthentication } from '../auth/api/AuthApi';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();
  const [token, setToken] = useState();

  const checkAuth = async() => {
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

  return ( <
    AppContext.Provider value = {
      { user, setUser, token, setToken, authenticated, setAuthenticated }
    } > { children } <
    /AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
};