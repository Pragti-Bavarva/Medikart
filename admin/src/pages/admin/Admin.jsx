import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddMedicine from "../../Components/addMedicine/AddMedicine";
import ListMedicine from "../../Components/listMedicine/ListMedicine";
import Inventory from "../../Components/Inventory/Inventory";
import UserList from "../../Components/UserList.jsx/UserList";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addMedicine" element={<AddMedicine />} />
        <Route path="/listMedicine" element={<ListMedicine />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default Admin;
