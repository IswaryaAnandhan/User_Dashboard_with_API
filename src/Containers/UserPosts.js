import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Components/UserContext";
import { Loading } from "../Components";


const UserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user} = useContext(UserContext)
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const postsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
<div className="container mt-4">
      {isLoading ? (
        <Loading /> 
      ) : (
        <div>
          <h2 className="text-start mb-3 text-warning">
            {user.username}'s Dashboard - <span>Number of Posts: {posts.length}</span>
          </h2>
          <ul className="list-group mb-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center"
              >
                <div className="d-flex flex-column">
                  <Link to={`/${userId}/posts/${post.id}/edit`} style={{ color: 'blue' }} className="text-decoration-none">
                    {post.title}
                  </Link>
                </div>
                <div className="btn-group">
                  <Link
                    to={`/${userId}/posts/${post.id}/comments`}
                    className="text-decoration-none btn btn-secondary"
                  >
                    Comments
                  </Link>
                  <Link
                    to={`/${userId}/posts/${post.id}/edit`}
                    className="text-decoration-none btn btn-primary"
                  >
                    Edit Post
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  
  );
}

export default UserPosts;
