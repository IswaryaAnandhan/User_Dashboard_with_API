import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  faCircleUser,
  faComment,
  faSquareCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { userId } = useParams();
  const [users, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <nav className="navbar navbar-expand-lg shadow-lg p-2 mb-5 bg-white rounded text-primary">
      <div className="container-fluid">
        <Link to={`/user_details/${user.id}`} className="navbar-brand mr-3">
          <img
            src="../images/icon.png"
            className="img-fluid"
            style={{ maxWidth: "55px" }}
            alt="User Dashboard"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i style={{ color: "black" }} className="fas fa-bars"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse ml-3" id="navbarNav">
          <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
            <li className="nav-item text-center mx-2 mx-lg-1">
              <FontAwesomeIcon icon={faUserPlus} />
              <Link
                to={`/posts/${user.id}`}
                className="nav-link text-primary"
              >
                Posts
              </Link>
            </li>
            <li className="nav-item text-center mx-1 mx-lg-1">
              <FontAwesomeIcon icon={faComment} />
              <Link
                to={`/Allcomments/${user.id}`}
                className="nav-link text-primary"
              >
                Comments
              </Link>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
              <FontAwesomeIcon icon={faSquareCheck} />
              <Link to={`/todos/${user.id}`} className="nav-link text-primary">
                Todos
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="d-none d-lg-block">
              <strong className="m-2">
                <FontAwesomeIcon icon={faCircleUser} />
                <Link to={`/user_details/${user.id}`} className="text-decoration-none">{users.username}</Link>  
              </strong>
            </div>
            <Link to="/" className="btn btn-danger">
              Signout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;