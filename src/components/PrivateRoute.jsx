import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/PrivateRoute.css";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setError("⚠ You must log in first to access this page.");
    }
  }, []);

  return (
    <div className={isAuthenticated ? "private-route-container" : "private-route-container with-bg"}>
      {!isAuthenticated && <div className="error-message">{error && <p>{error}</p>}</div>}
      
      {/* Page content wrapped to prevent cut-off */}
      <div className="page-content">
        {isAuthenticated ? <Outlet /> : null}
      </div>
    </div>
  );
};

export default PrivateRoute;
