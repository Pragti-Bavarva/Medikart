import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
// import user_list_icon from "../../assets/User_List_icon.svg"; // Add this line

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addMedicine"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Medicine</p>
        </div>
      </Link>
      <Link to={"/listMedicine"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Medicines List</p>
        </div>
      </Link>
      <Link to={"/inventory"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Inventory</p>
        </div>
      </Link>
      <Link to={"/users"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>User List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
