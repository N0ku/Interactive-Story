import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

function PrivateRoutes() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if user is authenticated asynchronously using the accountAuthService.isLogged()
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        // Make an API call to validate the token and set the authenticated state accordingly
        const response = await axios.get("http://localhost:5050/check-auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if ((response.data = 200)) {
          setAuthenticated(true);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setAuthenticated(false);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    // Render a loading indicator while the authentication status is being checked
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  // Render the child components if the user is authenticated
  return <Outlet />;
}

export default PrivateRoutes;
