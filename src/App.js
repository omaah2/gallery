import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./Components/AuthProvider";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  return (
    <React.StrictMode>
      <AuthProvider>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>
          {user ? <ImageGallery setError={setError} /> : <Login />}

          {error && <ErrorPage error={error} />}
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
