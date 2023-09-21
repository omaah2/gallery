/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Components/AuthProvider";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [error, setError] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    // Simulate an asynchronous check of user authentication
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated 2-second loading time
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <div>
          <div className="mt-16">
            <Navbar />
            {isLoading ? (
              <div className="flex items-center justify-center h-screen">
              </div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? <ImageGallery setError={setError} /> : <Login />
                  }
                />
                <Route
                  path="/ImageGallery"
                  element={<ImageGallery setError={setError} />}
                />
              </Routes>
            )}
          </div>
          {error && <ErrorPage error={error} />}
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
