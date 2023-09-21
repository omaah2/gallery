import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); 
      setLoading(false); 
    });

   
    return () => unsubscribe();
  }, []); 
  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
