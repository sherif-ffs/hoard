import { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuthentication } from '../auth/api/AuthApi';
import loadAllCollections from '../collections/hooks/loadAllCollections'
import loadMyCollections from '../collections/hooks/loadCollectionById';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
};

export function AppWrapper({ children }) {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();
  const [token, setToken] = useState();
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  // const [myCollections, setMyCollections] = useState([]);

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

  // my collections 
  // if (user) {}
  const userId = user && user._id;
  // console.log('userId: ', userId);
  // if (userId) {
  //   const myCollections = loadMyCollections(userId);
  //   console.log('myCollections: ', myCollections);
  // }
  const myCollections = loadMyCollections(userId);
  console.log('myCollections: ', myCollections);
  // const myCollections = loadMyCollections(userId);

  // useEffect(() => {
  //   const myCollections = loadMyCollections(userId);
  //   setMyCollections(myCollections);
  // }, [userId]);

  // console.log('myCollections: ', myCollections);

  const allCollections = loadAllCollections();
  // console.log('allCollections: ', allCollections);



  return ( <
    AppContext.Provider value = {
      { user, setUser, token, setToken, authenticated, setAuthenticated, createModalIsOpen, setCreateModalIsOpen, myCollections, allCollections }
    } > { children } <
    /AppContext.Provider>
  );
};