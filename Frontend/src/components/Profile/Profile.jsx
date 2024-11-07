import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to log in to view this page.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5555/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data.user);
        setOrders(data.orders);
        setAddresses(data.addresses);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone}</p>

          <h3>Orders</h3>
          {/* {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>{order.details}</li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )} */}

          <h3>Saved Addresses</h3>
          {/* {addresses.length > 0 ? (
            <ul>
              {addresses.map((address) => (
                <li key={address.id}>{address.details}</li>
              ))}
            </ul>
          ) : (
            <p>No addresses saved.</p>
          )} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
