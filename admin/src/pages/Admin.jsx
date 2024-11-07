import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";

// Import the UserList component
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
      s
      <Sidebar />
      <Routes>
        <Route path="/addMedicine" element={<AddProduct />} />
        <Route path="/listMedicine" element={<ListProduct />} />

        {/* Add this route */}
      </Routes>
    </div>
  );
};

export default Admin;
