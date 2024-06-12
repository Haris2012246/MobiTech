import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserState } from "../../store/user/userSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUserState);

  return user.id ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
