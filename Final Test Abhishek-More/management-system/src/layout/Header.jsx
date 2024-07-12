import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "../assets/css/Layout.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import logo from '../assets/images/home-image-logo.png'

const Header = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line
  }, [currentUser]);

  //check login status
  const checkLoginStatus = () => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  // logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    setShow(false);
    setLoggedIn(false);
    setTimeout(() => {
      toast.success("Logged out");
    }, 50);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className={Style.header} bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className={Style["navbar-brand"]} as={Link} to="/home">
        <img src={logo} alt="" style={{height: '50px'}}/>
          {/* <ImHome size={30} /> */}
          <p> RHP Management</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" className={Style["nav-link"]}>
              Home
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/properties"className={Style["nav-link"]}>
                  Properties
                </Nav.Link>
                <Nav.Link onClick={() => setShow(true)} className={Style["nav-link"]}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className={Style["nav-link"]}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* to show toastr message */}
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

      {/* modal to ask confirmation before deleting property */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleLogout}>
            Ok
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
