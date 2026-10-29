import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <Spinner label="Checking session…" />;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}