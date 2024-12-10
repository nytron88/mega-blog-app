import React from "react";
import HeaderBtn from "./HeaderBtn";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    authService.logout();
  }
  return <HeaderBtn slug="/" name="Logout" onClick={logoutHandler}/>;
}

export default LogoutBtn;