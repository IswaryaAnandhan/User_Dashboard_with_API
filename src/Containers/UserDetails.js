import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { Loading } from '../Components';

const UserDetails = () => {

  const { userId } = useParams();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="col-md-6">
        {userDetails ? (
          <div className="card">
            <div className="card-header text-info">
              <h4>User Personal Details</h4>
            </div>
            <div className="card-body text-start ml-3">
              <div className="mb-2">
                <strong className="text-primary mr-1">Name:</strong> {userDetails.name}
              </div>
              <div className="mb-2">
                <strong className="text-primary">Phone:</strong> {userDetails.phone}
              </div>
              <div className="mb-2">
                <strong className="text-primary">Address:</strong> {userDetails.address.street}, {userDetails.address.suite}, {userDetails.address.city}, {userDetails.address.zipcode}
              </div>
              <div className="mb-2">
                <strong className="text-primary">Website:</strong> {userDetails.website}
              </div>
              <div className="mb-2">
                <strong className="text-primary">Company Name:</strong> {userDetails.company.name}
              </div>
              <div className="mb-2">
                <strong className="text-primary">Company Catch Phrase:</strong> {userDetails.company.catchPhrase}
              </div>
              <div className="mb-2">
                <strong className="text-primary">Company Business:</strong> {userDetails.company.bs}
              </div>
            </div>
          </div>
        ) : (
          <Loading/>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
