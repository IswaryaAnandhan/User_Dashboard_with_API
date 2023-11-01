import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Loading } from "../Components";
import { UserContext } from "../Components/UserContext";

const Comments = () => {
  const { user } = useContext(UserContext);
  const { userId } = useParams();

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?userId=${userId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h2 className="text-info">All Comments of Users</h2>
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
        {isLoading ? (
          <Loading />
        ) : (
          <div className="card-body">
            <ul className="list-group">
              {comments.map((comment) => (
                <li key={comment.id} className="list-group-item text-start">
                  <strong className="text-primary">Name:</strong>
                  {comment.name}
                  <br />
                  <strong className="text-primary">Email:</strong>
                  {comment.email}
                  <br />
                  <strong className="text-primary">Comment:</strong>
                  {comment.body}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
