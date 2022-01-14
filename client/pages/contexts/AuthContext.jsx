import { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuthentication } from '../auth/api/AuthApi';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();
  const [token, setToken] = useState();

  const checkAuth = async () => {
    const response = await checkUserAuthentication();
    const data = await response.json();
    const userIsAuthenticated = data && data.data && data.data.authenticated;
    const activeUser = data && data.data && data.data.user;
    setUser(activeUser);
    setAuthenticated(userIsAuthenticated);
  };

  console.log('user: ', user)
  useEffect(() => {
    checkAuth();
  }, []);

  const userId = user && user._id;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        authenticated,
        setAuthenticated,
        checkAuth
      }}
    >
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
}
