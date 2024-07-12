import React from "react";
import { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import Style from "../assets/css/Properties.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import apiRequest from "../api/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showError, setshowError] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  // load all properties
  const loadData = async () => {
    try {
      const response = await apiRequest("GET", "/properties");
      setProperties(response.data);
      setIsLoaded(true);
      setshowError(false);
    } catch (error) {
      toast.error("Failed to load properties!");
      setIsLoaded(true);
      setshowError(true);
    }
  };

  // delete property
  const deleteProperty = async () => {
    try {
      await apiRequest("DELETE", `/properties/${deleteId}`);
      loadData();
      setShow(false);
      toast.success("Property deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete property! Try again later.");
    }
  };

  // to display delete confirmation modal
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div className={Style["manage-section"]}>
      <Container>
        <div className={Style["title-section"]}>
          <div className={Style["title"]}>Properties List</div>
          <div className={Style["sub-text"]}>Manage properties</div>
        </div>
        <div className={Style["add-section"]}>
          <button className={Style["add-btn"]} onClick={() => navigate("/properties/add")}>
            <IoMdAdd size={"25"} color="white" /> Add New Property
          </button>
        </div>
        {!isLoaded && (
          <div className={Style["spinner-wrapper"]}>
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {showError && (
          <div className={Style["spinner-wrapper"]}>
            <h3 className="text-danger">Failed to load data!</h3>
          </div>
        )}
        {isLoaded && properties?.length > 0 && (
          <div className={Style.table}>
            <Table responsive>
              <thead>
                <tr>
                  <th className={Style["id-col"]}>ID</th>
                  <th>Property Name</th>
                  <th>Property Type</th>
                  <th className={Style["center-col"]}>No. of Bedroooms</th>
                  <th className={Style["center-col"]}>No. of Bathrooms</th>
                  <th className={Style["center-col"]}>Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.length > 0 &&
                  properties.map((property) => {
                    return (
                      <tr key={property.id}>
                        <td className={Style["id-col"]}>{property.id}</td>
                        <td>{property.propertyName}</td>
                        <td>{property.propertyType}</td>
                        <td className={Style["center-col"]}>
                          {property.bedrooms}
                        </td>
                        <td className={Style["center-col"]}>
                          {property.bathrooms}
                        </td>
                        <td className={Style["action-col"]}>
                          <button type="button" className="btn btn-success difplay-flex align-item-center" 
                          onClick={() => navigate(`/properties/edit/${property.id}`)}>
                            Edit <MdEdit size={"20"} />
                          </button>
                          <button type="button" className="btn btn-danger"
                            onClick={() => handleShow(property.id)}>
                            Delete <MdDelete size={"20"} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        )}

        {/* for toastr message */}
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
            <Modal.Title>Delete Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete property ?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteProperty}>
              Ok
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Properties;
