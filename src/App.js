import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Components/AuthProvider";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar"; // Import the Navbar component
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [error, setError] = useState(null);
  const user = useContext(AuthContext);

  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <Navbar /> {/* Include the Navbar component */}
          <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
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

            {error && <ErrorPage error={error} />}
          </div>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
