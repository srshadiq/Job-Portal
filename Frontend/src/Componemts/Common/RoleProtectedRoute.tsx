import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/",
}) => {
  const user = useSelector((state: any) => state.user);

  // If user is not logged in, redirect to home
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user's role is not in allowed roles, redirect
  if (!allowedRoles.includes(user.accountType)) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user has the correct role, render the component
  return <>{children}</>;
};

export default RoleProtectedRoute;
