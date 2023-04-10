import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token != null){
      setCurrentUser(localStorage.getItem('currentUser'));
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  })



  function logout(){
    setCurrentUser(null);
    localStorage.removeItem('token');
    // localStorage.removeItem('currentUser');
  }

  const value = {
    currentUser,
    setCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
