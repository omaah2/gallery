/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate authentication logic
  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setUser(/* Your authentication logic here */);
      setLoading(false);
    }, 2000); // Simulated 2-second delay
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
