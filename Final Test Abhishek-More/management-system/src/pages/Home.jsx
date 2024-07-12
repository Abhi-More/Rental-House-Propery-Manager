import React from "react";
import Style from "../assets/css/Home.module.css";
import { Col, Container, Row } from "react-bootstrap";
import image from "../assets/images/house.png";
import image2 from "../assets/images/house2.jpeg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={Style["home-section"]}>
      <Container>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <div className={Style["image-outer"]}>
              <img src={image} alt="House" />
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} className={Style["title-col"]}>
            <div className={Style["page-title"]}>
              <h4>Welcome to</h4>
              <h1 className={Style["title"]}>
                Rental Housing Property Management System
              </h1>
              <p className={Style["sub-title"]}>
                Here managing properties is made simple and efficient. Whether
                you're adding new properties, editing existing ones, or
                overseeing your property portfolio, our platform provides you
                with all the tools you need.
              </p>
            </div>
            <div className={Style["button-section"]}>
              <button
                className={Style["see-button"]}
                onClick={() => navigate("/properties")}
              >
                See Properties
              </button>
              <button
                className={Style["add-button"]}
                onClick={() => navigate("/properties/add")}
              >
                Add Properties
              </button>
            </div>
          </Col>
        </Row>

        <Row className={Style["feature-section"]}>
          <Col lg={6} md={12} sm={12} className={Style["feature-col"]}>
            <div>
              <h2>Key Features Of Our System</h2>
              <ul>
                <li>
                  <b>Secure Login:</b> Access your admin account securely with
                  our robust authentication system.
                </li>
                <li>
                  <b>Intuitive Interface:</b> Easily navigate through our
                  user-friendly interface designed for property management tasks
                </li>
                <li>
                  <b>Efficient Property Management:</b> Add, edit, and delete
                  properties seamlessly with just a few clicks.
                </li>
                <li>
                  <b>Comprehensive Property Details:</b> Capture all essential
                  details about your properties, ensuring clarity and
                  completeness.
                </li>
                <li>
                  <b>Real-time Updates:</b> Stay updated with real-time data
                  management and interaction capabilities.
                </li>
                <li>
                  <b>Responsive Support:</b> Our support team is here to assist
                  you every step of the way.
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <div className={Style["image-outer"]}>
              <img src={image2} alt="House" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
