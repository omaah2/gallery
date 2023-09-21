import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const authInstance = getAuth(); // Create an auth instance
  let unsubscribe; // Declare an unsubscribe function

  useEffect(() => {
    // Listen for changes in user authentication state
    unsubscribe = onAuthStateChanged(authInstance, (authUser) => {
      setUser(authUser);
    });

    // Clean up the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authInstance, setUser]);

  const handleLoginOrSignUp = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login
        const userDetails = await signInWithEmailAndPassword(
          authInstance,
          email,
          password
        );
        const user = userDetails.user;
        setUser(user);
      } else {
        // Sign up
        const userDetails = await createUserWithEmailAndPassword(
          authInstance,
          email,
          password
        );
        const user = userDetails.user;
        setUser(user);
      }

      // Redirect to the image gallery page after successful login or signup
      navigate("/ImageGallery");
    } catch (error) {
  console.error("Firebase Authentication Error:", error.code, error.message);
  setError("Authentication failed: " + error.message);
 }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto transform transition-transform hover:scale-105">
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleLoginOrSignUp}>
          <input
            className="border rounded-md py-2 px-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border rounded-md py-2 px-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            placeholder="Password (e.g., Password123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className={`bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-transform hover:scale-105`}
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-purple-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"} here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
