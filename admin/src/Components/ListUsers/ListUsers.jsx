import React, { useState, useEffect } from "react";
import "./ListUsers.css";
import cross_icon from "../../assets/cross_icon.png"; // Assuming you have a cross icon for deletion

const ListUsers = () => {
  const [users, setAllUsers] = useState([]);

  // Fetch users from the API
  const fetchUsers = async () => {
    await fetch("http://localhost:5555/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data); // Accessing users array from API response
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const remove_User = async (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this user?");
    if (confirmed) {
      await fetch("http://localhost:5555/removeUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id : id }),
      });
      await fetchUsers(); // Refresh the user list after removal
    }
  };

  return (
    <div className="listUsers">
      <h1>Users List</h1>
      <div className="listUsers-header">
        <p>User ID</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Remove</p>
      </div>
      <div className="listUsers-users">
        <hr />
        {users.map((User, index) => {
          return (
          <React.Fragment key={index}>
            <div className="listUsers-item">
              <p>{User.userId}</p>
              <p>{User.name}</p>
              <p>{User.email}</p>
              <p>{User.phone}</p>
              <img
                onClick={() => remove_User(User.id)}
                className="listUsers-remove-icon"
                src={cross_icon}
                alt=""
              />
            </div>
            <hr />
          </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ListUsers;
