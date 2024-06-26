import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/Header";
import Sidebar from "../../Common/Sidebar/Sidebar";
import MeetingHeader from "../../Common/Header/MeetingHeader";
import "../Unit/style/unit.css";
import axios from "../../../../node_modules/axios/index";
import Alert from "../../Common/Alert";
import LoaderButton from "../../Common/LoaderButton";
import Loader from "../../Common/Loader";
import { Modal, Button, Table, Dropdown, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataFound from "../../Common/NoDataFound";

const Unit = () => {
  //Create
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData._id;
  console.log("userId====", userId);
  const organizationId = userData.organizationId;
  const accessToken = localStorage.getItem("accessToken");
  const [unitData, setUnitData] = useState({ name: "", address: "" });
  const [formValues, setFormValues] = useState({ name: "", address: "" });
  const [errors, setErrors] = useState({ name: "", address: "" });
  //List
  const [units, setUnits] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isGetApiRes, setIsGetApiRes] = useState(false);
  const [apiResData, setApiResData] = useState({
    isSuccess: false,
    message: "",
  });

  // Edit Unit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitName, setUnitName] = useState("");
  const [unitAddress, setUnitAddress] = useState("");

  //Delete Unit
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);
  console.log("unitToDelete-->", unitToDelete);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData({
      ...unitData,
      [name]: value,
    });
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};
    if (!formValues.name.trim()) {
      errors.name = "Unit Name is required";
      isValid = false;
      toast.error(errors.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
    if (!formValues.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
      toast.error(errors.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
    setErrors(errors);
    return isValid;
  };

  const fieldValidationCheck = (e) => {
    e.preventDefault();

    const newErrors = validate(formValues);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here

      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGetApiRes(false);
    setIsLoading(true);
    if (validate()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/V1/unit/createUnit`,
          { ...unitData, organizationId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        );
        if (response.data.success) {
          setFormValues({ name: "", address: "" });
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
          });
          fetchUnitData();
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
          });
        }
        setApiResData({
          isSuccess: response.data.success,
          message: response.data.message,
        });
        setIsGetApiRes(true);
      } catch (error) {
        console.log("error--->", error);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        console.error("Error creating unit:", error.response.data.message);
      }
    }
    setIsLoading(false);
  };

  const fetchUnits = async (bodyData) => {
    try {
      console.log("bodyData-->", bodyData);
      setIsFetching(true);
      const headerObject = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        params: { limit, page, order },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/V1/unit/listUnit`,
        bodyData,
        headerObject
      );
      const data = response.data.data || {};
      console.log("Unit id->", data);
      setUnits(data.unitData || []);
      setTotalCount(data.totalCount || 0);
      setIsFetching(false);
    } catch (error) {
      console.log("Error while Fetching Unit:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUnitData();
  }, [searchKey, page, limit, order]);

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
    setPage(1);
  };
  const fetchUnitData = async () => {
    const bodyData = searchKey
      ? { searchKey, organizationId }
      : { organizationId };
    console.log("bodyData-->", bodyData);
    await fetchUnits(bodyData);
  };
  const formatDateTimeFormat = (date) => {
    const sourceDate = new Date(date).toDateString();
    const sourceTime = new Date(date).toLocaleTimeString();
    const [, month, day, year] = sourceDate.split(" ");
    const formattedDate = [day, month, year].join(" ");
    const [hour, minute] = sourceTime.split(":");
    const formattedTime = `${hour}:${minute} ${sourceTime.split(" ")[1]}`;

    console.log("formattedTime-->", formattedTime);
    return { formattedTime, formattedDate };
  };

  const handleEditClick = (unit) => {
    setSelectedUnit(unit);
    setUnitName(unit.name);
    setUnitAddress(unit.address);
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      const updatedUnit = {
        name: unitName,
        address: unitAddress,
        organizationId,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/V1/unit/editUnit/${selectedUnit._id}`,
        updatedUnit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        setSelectedUnit(null);
        setShowEditModal(false);
        fetchUnitData();
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
      }
      // setUnits((prevUnits) =>
      //   prevUnits.map((unit) =>
      //     unit._id === selectedUnit._id ? { ...unit, ...updatedUnit } : unit
      //   )
      // );
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      console.log("Error while updating units:", error);
    }
  };

  //Row per page
  const handleRowsPerPageChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };
  const fromDataCount = units.length === 0 ? 0 : (page - 1) * limit + 1;
  const toDataCount = (page - 1) * limit + units.length;
  const totalOption = Math.round(totalCount / 5 + 0.5);
  const totalPage = Math.round(totalCount / limit + 0.5);
  const totalPageArray = Array(totalPage).fill();

  //Delete Unit
  const handleDeleteClick = (unit) => {
    setUnitToDelete(unit);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (unitToDelete) {
        await deleteUnit(unitToDelete._id);
        // setUnits((prevUnits) =>
        //   prevUnits.filter((unit) => unit._id !== unitToDelete._id)
        // );
        setShowDeleteModal(false);
        setUnitToDelete(null);
      }
    } catch (error) {
      console.error("Error while deleting unit:", error);
    }
  };

  const deleteUnit = async (unitId) => {
    try {
      console.log("unitId-->", unitId);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/V1/unit/deleteUnit/${unitId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
      }
      fetchUnitData();
      return response.data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      console.error("Error deleting unit:", error);
      throw error;
    }
  };

  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="Action-list-page input-width">
          <div className="meeting-header-text">
            <h4>Add Units</h4>
          </div>
          <div className="mt-2 table-box">
            <form className="meeting-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="mb-1">
                  Unit Name<span className="star-mark"> *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter Unit Name"
                  onBlur={fieldValidationCheck}
                  onChange={handleChange}
                  value={formValues.name}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label className="mb-1">
                  Unit Address
                  <span className="star-mark"> *</span>
                </label>
                <textarea
                  name="address"
                  cols="3"
                  rows="3"
                  placeholder="Enter Unit Address"
                  onChange={handleChange}
                  value={formValues.address}
                  onBlur={fieldValidationCheck}
                ></textarea>
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <button
                className="save Mom-btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoaderButton /> : <p>Submit</p>}
              </button>
            </form>
            <div>
              {/* {isGetApiRes ? (
                <div className="alertwidth">
                  <Alert
                    status={apiResData.isSuccess}
                    message={apiResData.message}
                    timeoutSeconds={3000}
                  />
                </div>
              ) : null} */}
            </div>
          </div>
          {/* ////////////////////////// */}
          <div className="meeting-header-text">
            <h4>Manage Units</h4>
          </div>
          <div className="mt-2 table-box">
            <div className="tbl-text-search">
              <div className="left-tbl-text">
                {totalCount > 0 ? (
                  <p>
                    Showing {fromDataCount} to {toDataCount} of {totalCount}{" "}
                    entries
                  </p>
                ) : null}
              </div>
              <div className="search-box">
                <input
                  type="search"
                  autoComplete="off"
                  placeholder="Search By Unit Name"
                  value={searchKey}
                  onChange={handleSearch}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#4F2CC8"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </div>

            {isFetching ? (
              <div className="meeting-page loader-cont">
                <Loader />
              </div>
            ) : units.length > 0 ? (
              <>
                <Table className="mt-4 table table-bordered">
                  <thead>
                    <tr>
                      <th>Unit Name</th>
                      <th>Unit Address</th>
                      <th>Updated At</th>
                      <th className="action-col">Action</th>
                    </tr>
                  </thead>{" "}
                  <tbody>
                    {units.map((unit, index) => {
                      return (
                        <tr key={index}>
                          <td>{unit.name}</td>
                          <td>{unit.address}</td>
                          <td>
                            {formatDateTimeFormat(unit.updatedAt).formattedDate}
                            <p className="detail-date-time">
                              {
                                formatDateTimeFormat(unit.updatedAt)
                                  .formattedTime
                              }
                            </p>
                          </td>
                          <td data-label="Action">
                            <Dropdown>
                              {/* <div className="d-inline-block menu-dropdown custom-dropdown"> */}
                              <Dropdown.Toggle id="dropdown-basic">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#000"
                                  className="bi bi-three-dots-vertical"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => handleEditClick(unit)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="me-2 bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                    />
                                  </svg>
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => handleDeleteClick(unit)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="me-2 bi bi-trash3"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                  </svg>
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                              {/* </div> */}
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                <div className="tbl-bottom">
                  <div className="left-tbl-bottom">
                    {page !== 1 ? (
                      <button
                        className="left-arrow"
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        disabled={page === 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fff"
                          className="bi bi-chevron-left"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                          />
                        </svg>
                      </button>
                    ) : null}
                    <ul>
                      {totalPageArray.length > 0 &&
                        totalPageArray.map((_, option) => (
                          <li
                            key={option}
                            className={
                              option + 1 === page ? "selected-page" : ""
                            }
                            onClick={() => setPage(option + 1)}
                          >
                            {option + 1}
                          </li>
                        ))}
                    </ul>
                    {page < totalPage ? (
                      <button
                        className="right-arrow"
                        onClick={() =>
                          setPage(page * limit < totalCount ? page + 1 : page)
                        }
                        disabled={page * limit >= totalCount}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fff"
                          className="bi bi-chevron-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                          />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                  <div className="right-tbl-bottom">
                    <p>Rows Per Page</p>
                    <select
                      className="no-opt-box"
                      name="limit"
                      onChange={handleRowsPerPageChange}
                      value={limit}
                    >
                      {Array(totalOption)
                        .fill()
                        .map((_, option) => (
                          <option key={option} value={(option + 1) * 5}>
                            {(option + 1) * 5}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NoDataFound />
              </>
            )}
          </div>

          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="unitName">
                  <Form.Label>Unit Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Unit Name"
                    value={unitName}
                    autoComplete="off"
                    onChange={(e) => setUnitName(e.target.value)}
                    onBlur={fieldValidationCheck}
                  />
                </Form.Group>
                <Form.Group controlId="unitAddress" className="mt-3">
                  <Form.Label>Unit Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Unit Address"
                    value={unitAddress}
                    autoComplete="off"
                    onChange={(e) => setUnitAddress(e.target.value)}
                    onBlur={fieldValidationCheck}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="light"
                className="btn-light"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleEditSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this unit?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="light"
                onClick={() => setShowDeleteModal(false)}
                className="btn-light"
              >
                <p>Cancel</p>
              </Button>
              <Button variant="primary" onClick={handleDeleteConfirm}>
                <p>Delete</p>
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Unit;
