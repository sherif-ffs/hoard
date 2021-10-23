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
    console.log('data: ', data);
    const userIsAuthenticated = data && data.data && data.data.authenticated;
    console.log('userIsAuthenticated: ', userIsAuthenticated);
    const activeUser = data && data.data && data.data.user;
    console.log('activeUser: ', activeUser);
    setUser(activeUser);
    setAuthenticated(userIsAuthenticated);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return ( <
    AppContext.Provider value = {
      { user, setUser, token, setToken, authenticated }
    } > { children } <
    /AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
};