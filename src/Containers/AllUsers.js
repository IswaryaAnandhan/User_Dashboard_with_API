import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { UserContext } from "../Components/UserContext";

const AllUsers = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "Please enter your name";
      } else if (values.username.length > 20) {
        errors.username = "Must be 20 characters or less";
      }
      if (!values.email) {
        errors.email = "Please enter your email id";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values) => {
      // Find the selected user
      const selectedUser = users.find(
        (user) =>
          user.username === values.username && user.email === values.email
      );
      if (selectedUser) {
        // Set the user in the context
        setUser(selectedUser);
        // Navigate to the dashboard
        navigate(`/posts/${selectedUser.id}`);
        alert("Signin successfully");
      } else {
        alert("User not found");
      }
    },
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-lg-block">
                  <h2 className="text-primary">
                    List of All username and email
                  </h2>
                  <ul className="list-group">
                    {users.map((user) => (
                      <li key={user.id} className="list-group-item">
                        <strong>
                          {user.username} || {user.email}
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <h1 className="h3 text-success mb-2">
                      Sign In to User Dashboard
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group mt-4 mb-3 user">
                        <input
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          type="text"
                          placeholder="Your user name"
                          className={`form-control form-control-user ${
                            formik.touched.username && formik.errors.username
                              ? "is-invalid"
                              : ""
                          } ${
                            formik.touched.username && !formik.errors.username
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {formik.touched.username && formik.errors.username && (
                          <div className="invalid-feedback">
                            {formik.errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          type="email"
                          placeholder="Your Email Address"
                          className={`form-control form-control-user ${
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          } ${
                            formik.touched.email && !formik.errors.email
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="invalid-feedback">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                      <div className="form-group mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="text-warning mt-5 h3">
                      Thank you for using this platform
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
