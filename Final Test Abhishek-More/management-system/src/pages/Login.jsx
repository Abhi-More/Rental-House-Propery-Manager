import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import Style from "../assets/css/Login.module.css";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import image from "../assets/images/signin-vector.jpeg";
import { loginSchema } from "../validation/ValidationSchema";

const Login = () => {
  // initial values of login form
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.path;

  useEffect(() => {
    getUsers();
  }, []);

  // handle submit of login form
  const handleSubmit = async (values, { resetForm }) => {
    const currentUser = users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (currentUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
        })
      );
      resetForm();
      toast.success("Login Successful ✔");
      setTimeout(() => {
        if (path) {
          navigate(`${path}`);
        } else {
          navigate("/properties");
        }
      }, 1000);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  // get all users
  const getUsers = async () => {
    try {
      const response = await apiRequest("GET", "/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  return (
    <div className={Style["login-section"]}>
      <div className="container">
        <Row className={Style["login-row"]}>
          <Col sm={12} md={8} lg={5}>
            <div className={Style["login-form"]}>
              <h2 className={Style["form-title"]}>Sign In</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    <div className={Style.error}>
                      <ErrorMessage name="email" component="div" />
                    </div>
                  </div>

                  <div className={Style["password-form-group"]}>
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <div className={Style["input-wrapper"]}>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="form-control"
                      />
                      {showPassword && (
                        <FaEyeSlash
                          onClick={() => setShowPassword(!showPassword)}
                          className={Style["eye-icon"]}
                        />
                      )}
                      {!showPassword && (
                        <FaEye
                          onClick={() => setShowPassword(!showPassword)}
                          className={Style["eye-icon"]}
                        />
                      )}
                    </div>
                    <div className={Style.error}>
                      <ErrorMessage name="password" component="div" />
                    </div>
                  </div>

                  <div className={Style["button-wrapper"]}>
                    <div className="form-group form-button">
                      <button
                        type="submit"
                        name="signin"
                        id="signin"
                        className={Style["login-submit-btn"]}
                      >
                        Login
                      </button>
                    </div>
                    <div className="form-group form-button">
                      <button
                        type="reset"
                        name="reset"
                        id="reset"
                        className={Style["login-reset-btn"]}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </Col>
          <Col sm={12} md={8} lg={6}>
            <div className={Style["login-image"]}></div>
            <div className={Style["image-outer"]}>
              <img src={image} alt="Login" />
            </div>
          </Col>
        </Row>
      </div>

      {/* to display toastr messages */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
