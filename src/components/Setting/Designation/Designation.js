import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/Header";
import Sidebar from "../../Common/Sidebar/Sidebar";
import MeetingHeader from "../../Common/Header/MeetingHeader";
import axios from "../../../../node_modules/axios/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Table, Dropdown, Form } from "react-bootstrap";
import Loader from "../../Common/Loader";
import LoaderButton from "../../Common/LoaderButton";
import NoDataFound from "../../Common/NoDataFound";

const Designation = () => {
  //Create designation
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData._id;
  const organizationId = userData.organizationId;
  const accessToken = localStorage.getItem("accessToken");
  const [designationData, setDesignationData] = useState({ name: "" });
  const [formValues, setFormValues] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //List designation
  const [designation, setDesignation] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);
  const [isGetApiRes, setIsGetApiRes] = useState(false);
  const [apiResData, setApiResData] = useState({
    isSuccess: false,
    message: "",
  });

  //DELETE Designation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [designationToDelete, setDesignationToDelete] = useState(null);

  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const validate = () => {
    let isValid = true;
    let errors = {};
    if (!formValues.name.trim()) {
      errors.name = "Department Name is required";
      isValid = false;
      toast.error(errors.name, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setErrors(errors);
    return isValid;
  };

  const dsnameValidationCheck = () => {
    console.log("calling-------------------", formValues);
    const errors = {};
    if (!formValues.name.trim()) {
      errors.name = "Designation Name is required";
    }
    setErrors(errors);
    return errors;
  };

  //Create designation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/V1/designation/createDesignation",
          { ...formValues, organizationId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        );
        console.log("Designation created successfully:", response.data);
        console.log("Response-->", response.data);
        if (response.data.success) {
          setFormValues({ name: "" });
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          fetchDesignationData();
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
          });
        }
      } catch (error) {
        console.error("Error creating Designation:", error);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(
          "Error while creating designation",
          error.response?.data?.message || error.message
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  //List designation
  const fetchDesignation = async (bodyData) => {
    try {
      setIsFetching(true);
      const headerObject = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        params: { limit, page, order },
      };
      const response = await axios.post(
        `http://localhost:8000/api/V1/designation/listDesignation`,
        bodyData,
        headerObject
      );
      const data = response.data.data || {};
      console.log("Designation list", data.designationList);
      setDesignation(data.designationList || []);
      setTotalCount(data.totalCount || 0);
      setIsFetching(false);
    } catch (error) {
      console.log("Error while Fetching Designation:", error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchDesignationData();
  }, [searchKey, page, limit, order]);
  const handleSearch = (event) => {
    setSearchKey(event.target.value);
    setPage(1);
  };
  const fetchDesignationData = async () => {
    const bodyData = searchKey
      ? { searchKey, organizationId }
      : { organizationId };
    console.log("bodyData-->", bodyData);
    await fetchDesignation(bodyData);
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

  //Row per page
  const handleRowsPerPageChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };
  const fromDataCount = designation.length === 0 ? 0 : (page - 1) * limit + 1;
  const toDataCount = (page - 1) * limit + designation.length;
  const totalOption = Math.round(totalCount / 5 + 0.5);
  const totalPage = Math.round(totalCount / limit + 0.5);
  const totalPageArray = Array(totalPage).fill();

  //DELETE DESIGNATION
  const handleDeleteClick = (designation) => {
    setDesignationToDelete(designation);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (designationToDelete) {
        // console.log("which Id--->>>>>", departmentToDelete._id);
        await deleteDesignation(designationToDelete._id);
        setShowDeleteModal(false);
        setDesignationToDelete(null);
      }
    } catch (error) {
      console.error("Error while deleting unit:", error);
    }
  };

  const deleteDesignation = async (designationId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/V1/designation/deleteDesignation/${designationId}`,
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
      fetchDesignationData();
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
        <div className="Action-list-page">
          <div className="meeting-header-text">
            <h4>Add Designation</h4>
          </div>
          <div className="mt-2 table-box">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-4">
                  <div className="form-group">
                    <label className="mb-1">
                      Designation<span className="star-mark"> *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      placeholder="Enter Designation Name"
                      onChange={handleChange}
                      value={formValues.name}
                      onBlur={dsnameValidationCheck}
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>
                </div>
              </div>
              {isLoading ? (
                <LoaderButton />
              ) : (
                <button
                  className="save Mom-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  Submit
                </button>
              )}
            </form>
          </div>

          <div className="meeting-header-text">
            <h4>Manage Designations</h4>
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
                  placeholder="Search By Department Name"
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
            ) : designation.length > 0 ? (
              <>
                <Table className="mt-4 table table-bordered">
                  <thead>
                    <tr>
                      <th>Department Name</th>
                      <th>Updated At</th>
                      <th className="action-col">Action</th>
                    </tr>
                  </thead>{" "}
                  <tbody>
                    {designation.map((designation, index) => {
                      return (
                        <tr key={index}>
                          <td>{designation.name}</td>
                          <td>
                            {
                              formatDateTimeFormat(designation.updatedAt)
                                .formattedDate
                            }
                            <p className="detail-date-time">
                              {
                                formatDateTimeFormat(designation.updatedAt)
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
                                  onClick={() => "handleEditClick(department)"}
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
                                  onClick={() => handleDeleteClick(designation)}
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
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this Department?
            </Modal.Body>
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

export default Designation;
