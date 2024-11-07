import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="Logo" className="nav-logo" />
      <div className="nav-admin-panel">Admin Panel</div>
      {/* <img src={navProfile} alt="Profile" className="nav-profile" /> */}
    </div>
  );
};

export default Navbar;
