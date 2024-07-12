import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginAuthGuard = ({ component: Component }) => {
  const navigate = useNavigate();

  // fetch user from localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/properties");
    }
  }, [user, navigate]);

  return <Component />;
};

export default LoginAuthGuard;
