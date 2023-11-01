import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Components/UserContext";
import { Loading } from "../Components";


const UserTodos = () => {
  const { user } = useContext(UserContext);
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Fetch todos data
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [userId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filterTodos = () => {
    if (activeTab === "all") {
      return todos;
    } else if (activeTab === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (activeTab === "completed") {
      return todos.filter((todo) => todo.completed);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h2 className="text-primary">Todo List of {user.username}</h2>
          </div>
          <div>
            <Link
              to={`/posts/${user.id}`}
              className="text-decoration-none btn btn-secondary"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs">
            <li className="nav-item" onClick={() => handleTabClick("all")}>
              <button
                className={`nav-link ${activeTab === "all" ? "active" : ""}`}
              >
                All
              </button>
            </li>
            <li className="nav-item" onClick={() => handleTabClick("active")}>
              <button
                className={`nav-link ${activeTab === "active" ? "active" : ""}`}
              >
                Active
              </button>
            </li>
            <li
              className="nav-item"
              onClick={() => handleTabClick("completed")}
            >
              <button
                className={`nav-link ${
                  activeTab === "completed" ? "active" : ""
                }`}
              >
                Completed
              </button>
            </li>
          </ul>
          {isLoading ? (<Loading/>):( 
          <ul className="list-group mt-2">
            {filterTodos().map((todo) => (
              <li key={todo.id} className="list-group-item text-start">
                <input type="checkbox" readOnly checked={todo.completed} />
                {todo.title}
              </li>
            ))}
          </ul>)}
        </div>
      </div>
    </div>
  );
};

export default UserTodos;
