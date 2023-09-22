/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const authInstance = getAuth();
  let unsubscribe;
  const unsubscribeRef = useRef(null);
  useEffect(() => {
    unsubscribeRef.current = onAuthStateChanged(authInstance, (authUser) => {
      setUser(authUser);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [authInstance, setUser]);

  const handleLoginOrSignUp = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Start loading

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

      setIsLoading(false); // Stop loading

      // Display success message
      setSuccessMessage(isLogin ? "Login successful!" : "Sign up successful!");

      // Redirect to the image gallery page after successful login or signup
      navigate("/imageGallery");
    } catch (error) {
      console.error(
        "Firebase Authentication Error:",
        error.code,
        error.message
      );
      setError("Authentication failed: " + error.message);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading ? (
        <LoadingPage />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto transform transition-transform hover:scale-105">
          <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          {/* Display success message with Tailwind CSS styling */}
          {successMessage && (
            <div className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
              {successMessage}
            </div>
          )}
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
      )}
    </div>
  );
};

export default Login;
