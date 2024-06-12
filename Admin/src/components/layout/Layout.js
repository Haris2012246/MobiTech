import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { MainContainer } from "./layout.styles";
import { useSelector } from "react-redux";
import { selectUserState } from "../../store/user/userSlice";

function Layout({ children }) {
  const location = useLocation();
  const hideHeader = { "/": "hidden" };
  const user = useSelector(selectUserState);

  return (
    <React.Fragment>
      {!hideHeader[location.pathname] && user.id && <Navbar />}
      {children}
    </React.Fragment>
  );
}

export default Layout;
