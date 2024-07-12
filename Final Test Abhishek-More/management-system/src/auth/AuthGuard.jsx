import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthGuard = ({ component: Component }) => {
  const navigate = useNavigate();

  // fetch user from localstorage
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        toast.warning("Please Login");
      }, 50);
      navigate("/login", { state: { path: location.pathname } });
    }
  }, [user, navigate, location.pathname]);

  return <Component />;
};

export default AuthGuard;
