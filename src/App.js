import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Components/AuthProvider";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [error, setError] = useState(null);
  const user = useContext(AuthContext);

  return (
      <Router>
        <AuthProvider>
          <div>
            <div className="mt-16">
              <Navbar /> {/* Add top margin to create space below Navbar */}
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
            </div>
            {error && <ErrorPage error={error} />}
          </div>
        </AuthProvider>
      </Router>

  );
}

export default App;
