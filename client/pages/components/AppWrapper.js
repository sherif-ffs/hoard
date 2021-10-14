import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // let sharedState = {
  //   user: null,
  //   token: null,
  // }

  return ( <
    AppContext.Provider value = {
      { user, setUser, token, setToken }
    } > { children } <
    /AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}