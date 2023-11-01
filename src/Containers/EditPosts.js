import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../Components/UserContext";
import { Loading } from "../Components";

const EditPosts = () => {
  const { user } = useContext(UserContext);
  const { postId } = useParams();

  const [post, setPost] = useState({});
  const [editedPost, setEditedPost] = useState({ ...post });
  const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } 
      finally {
        setIsLoading(false);
      }
      
    };

    fetchPost();
  }, [postId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${postId}`, editedPost)
      .then((response) => {
        setResponseMessage("Post updated successfully!", response);
        setIsEditing(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div className="h2 text-primary">
            Post Title-<span className="h3 text-dark"> {post.title}</span>
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
          <div>
            <h5 className="text-warning">Post Body:</h5>
            {isEditing ? (
              <div className="form-group">
                <textarea
                  rows="4"
                  className="form-control"
                  value={editedPost.body}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, body: e.target.value })
                  }
                ></textarea>
              </div>
            ) : (
              <p>{isEditing ? editedPost.body : post.body}</p>
            )}
            {isEditing ? (
              <div>
                <button className="btn btn-success m-2" onClick={handleSave}>
                  Save Post
                </button>
                <button className="btn btn-danger" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit Post
              </button>
            )}
            <h4 className="mt-4 text-success">{responseMessage}</h4>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default EditPosts;
