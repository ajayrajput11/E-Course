import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If NOT logged in OR NOT admin → redirect to login
  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // If admin is logged in → allow access
  return children;
};

export default AdminProtectedRoute;
