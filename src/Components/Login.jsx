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


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(
    password
  );

  const handleLoginOrSignUp = async (e) => {
    e.preventDefault();

    if (!isEmailValid || !isPasswordValid) {
      setError(
        "Email must be in the format user@example.com and password must contain at least 8 characters with at least one digit, one uppercase letter, and one lowercase letter."
      );
      return;
    }

    try {
      setIsLoading(true);

      if (isLogin) {
        const userDetails = await signInWithEmailAndPassword(
          authInstance,
          email,
          password
        );
        const user = userDetails.user;
        setUser(user);
      } else {
        const userDetails = await createUserWithEmailAndPassword(
          authInstance,
          email,
          password
        );
        const user = userDetails.user;
        setUser(user);
      }

      setIsLoading(false);
      setSuccessMessage(isLogin ? "Login successful!" : "Sign up successful!");

      navigate("/imageGallery");
    } catch (error) {
      console.error(
        "Firebase Authentication Error:",
        error.code,
        error.message
      );
      setError("Authentication failed: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto transform transition-transform hover:scale-105">
          <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
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
              placeholder="Password (e.g. 1Password)"
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
