import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../Components/UserContext";
import { Loading } from "../Components";

const Comments = () => {
  const { user } = useContext(UserContext);
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h2 className="text-info">
              {postId}. Comments of {user.username}
            </h2>
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
            <ul className="list-group text-start">
              {comments.map((comment) => (
                <li key={comment.id} className="list-group-item">
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
