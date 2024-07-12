import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import image from "../assets/images/house3.png";
import Style from "../assets/css/AddProperty.module.css";
import apiRequest from "../api/api";
import { propertySchema } from "../validation/ValidationSchema";

const AddProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [types, setTypes] = useState([]);
  
  // initial values for form
  const [initialValues, setInitialValues] = useState({
    id: "",
    propertyType: "",
    propertyName: "",
    bedrooms: "",
    bathrooms: "",
    furnishingType: "",
    address: "",
    contact: "",
    rent: "",
    details: "",
  });
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadPropertyTypes();
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [id]);

  // load property types in form
  const loadPropertyTypes = async () => {
    try {
      const response = await apiRequest("GET", "/property-types");
      setTypes(response.data);
    } catch (error) {
      toast.error("Error while loading property types");
    }
  };

  // load property data for update
  const fetchData = async () => {
    try {
      const response = await apiRequest("GET", `/properties/${id}`);
      setInitialValues(response.data);
    } catch (error) {
      toast.error("Error while loading data");
    }
  };

  // handle click on save button
  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);

    // to avoid extra spaces to be stored
    const trimmedValues = Object.keys(values).reduce((arr, key) => {
      arr[key] = typeof values[key] === 'string' ? values[key].trim() : values[key];
      return arr;
    }, {});

    try {
      if (id) {
        await apiRequest("PUT", `/properties/${id}`, trimmedValues);
        setTimeout(() => {
          toast.success("Property updated successfully");
          resetForm();
          setIsLoading(false);
        }, 1000);
      } else {
        await apiRequest("POST", `/properties`, trimmedValues);
        setTimeout(() => {
          toast.success("Property added successfully");
          resetForm();
          setIsLoading(false);
        }, 1000);
      }
      setTimeout(() => {
        navigate("/properties");
      }, 2000);
    } catch (error) {
      toast.error("Error, try again later.");
    }
  };
  
  return (
    <div className={Style["add-edit-section"]}>
      <Container>
        <Row className={Style.row}>
          <Col xs={12} sm={10} md={5} lg={3}>
            <div className={Style["image-outer"]}>
              <img src={image} alt="House" />
            </div>
          </Col>
          <Col xs={12} sm={10} lg={5} md={5} className={Style["intro-col"]}>
            {id ? (
              <div className="page-intro">
                <h1 className={Style["page-title"]}>Edit Property Details</h1>
                <p className={Style["sub-title"]}>
                  Modify the fields and click on Save to save your changes. Once
                  updated, you'll be redirected back to the Properties page
                  where you can view and manage all properties.
                </p>
              </div>
            ) : (
              <div className="page-intro">
                <h1 className={Style["page-title"]}>Add New Property</h1>
                <p className={Style["sub-title"]}>
                  Fill out all fields and click "Save" to submit your new
                  property. Once added, you'll be redirected back to the List of
                  all properties page where you can view and manage all
                  properties.
                </p>
              </div>
            )}
          </Col>
        </Row>
        <Row className={Style.row}>
          <Col sm={10} lg={9} md={10}>
            <div className={Style.form}>
              <div className={Style["form-title"]}>
                {id && <h3>Property Id: {id}</h3>}
              </div>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={propertySchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Row className={Style["form-row"]}>
                    <Col sm={10} lg={5} md={5}>
                      <div className="form-group select-group">
                        <label htmlFor="propertyType">Property Type:</label>
                        <Field as="select" name="propertyType">
                          <option value="">Select Property Type</option>
                          {types.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Field>
                        <div className={Style.error}>
                          <ErrorMessage name="propertyType" component="div" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="propertyName" className="form-label">
                          Property Name
                        </label>
                        <Field
                          type="text"
                          name="propertyName"
                          placeholder="Property Name"
                          className="form-control"
                        />
                        <div className={Style.error}>
                          <ErrorMessage name="propertyName" component="div" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="bedrooms">Number of Bedrooms</label>
                        <div role="group" className={Style["radio-group"]}>
                          <label>
                            <Field type="radio" name="bedrooms" value="1" />1
                          </label>
                          <label>
                            <Field type="radio" name="bedrooms" value="2" />2
                          </label>
                          <label>
                            <Field type="radio" name="bedrooms" value="3" />3
                          </label>
                          <label>
                            <Field type="radio" name="bedrooms" value="4" />4
                          </label>
                        </div>
                        <div className={Style.error}>
                          <ErrorMessage name="bedrooms" component="div" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="bathrooms">Number of bathrooms</label>
                        <div role="group" className={Style["radio-group"]}>
                          <label>
                            <Field type="radio" name="bathrooms" value="1" />1
                          </label>
                          <label>
                            <Field type="radio" name="bathrooms" value="2" />2
                          </label>
                          <label>
                            <Field type="radio" name="bathrooms" value="3" />3
                          </label>
                        </div>
                        <div className={Style.error}>
                          <ErrorMessage name="bathrooms" component="div" />
                        </div>
                      </div>
                      <div className="form-group select-group">
                        <label htmlFor="furnishingType">Furnishing Type:</label>
                        <Field as="select" name="furnishingType">
                          <option value="">Select Furnishing Type</option>
                          <option value="Unfurnished">Unfurnished</option>
                          <option value="Semi-furnished">Semi-furnished</option>
                          <option value="Fully-furnished">
                            Fully-furnished
                          </option>
                        </Field>
                        <div className={Style.error}>
                          <ErrorMessage name="furnishingType" component="div" />
                        </div>
                      </div>
                    </Col>
                    <Col sm={10} lg={5} md={5}>
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <Field
                          as="textarea"
                          name="address"
                          placeholder="Address"
                          className="form-control"
                        />
                        <div className={Style.error}>
                          <ErrorMessage name="address" component="div" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact" className="form-label">
                          Contact
                        </label>
                        <Field
                          name="contact"
                          placeholder="Contact"
                          className="form-control"
                        />
                        <div className={Style.error}>
                          <ErrorMessage name="contact" component="div" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="rent" className="form-label">
                          Rent (<FaRupeeSign size={14} /> per month)
                        </label>
                        <Field
                          name="rent"
                          placeholder="Rent"
                          className="form-control"
                        />
                        <div className={Style.error}>
                          <ErrorMessage name="rent" component="div" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="details">Details</label>
                        <Field
                          as="textarea"
                          name="details"
                          placeholder="Details"
                          className="form-control"
                        />
                        <div className={Style.error}>
                          <ErrorMessage name="details" component="div" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={Style["button-wrapper"]}>
                    <Col sm={12} md={6} lg={6} className={Style["button-col"]}>
                      {isLoading ? (
                        <Spinner animation="border" variant="primary" />
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      )}
                    </Col>
                    <Col sm={12} md={6} lg={6} className={Style["button-col"]}>
                      <button type="reset" className="btn btn-secondary">
                        Reset
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>

      {/* to show toast messages */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
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

export default AddProperty;
