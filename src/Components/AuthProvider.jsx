
import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication modules

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase app and get Firebase Authentication instance
    const auth = getAuth();

    // Listen for changes in user authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); // Set the user to the authenticated user or null
      setLoading(false); // Set loading to false once authentication state is determined
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

