import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import AddTaxPayers from "./components/taxpayers/AddTaxPayers";
import AddComplain from "./components/complains/AddComplain";
import ComplainList from "./components/complains/ComplainList";
import ComplainTypes from "./components/complains/ComplainTypes";
import AddNewDevice from "./components/devices/AddNewDevice";
import TaxPayersList from "./components/taxpayers/TaxPayersList";
import Register from "./components/users/Register";
import UsersList from "./components/users/UsersList";
import { Header } from "./layout/Header";
import { Sidebar } from "./layout/Sidebar";
import ComplainTypesList from "./components/complains/ComplainTypesList";
import Devices from "./components/devices/Devices";
import EditTaxPayers from "./components/taxpayers/EditTaxPayers";
import ChangePassword from "./components/users/ChangePassword";
import EditComplains from "./components/complains/EditComplains";

function App() {

  var token = localStorage.getItem("sys_user");
  if(!token){
  return <Navigate to="/auth/login"/>
  }

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <Routes>
          {/* User Paths */}
          <Route path="users/register" element={<Register />} />
          <Route path="users/list" element={<UsersList />} />
          {/* <Route path="users/changePassword" element={<ChangePassword/>}/> */}

          {/* TaxPayer Paths */}
          <Route path="taxpayers/add" element={<AddTaxPayers />} />
          <Route path="taxpayers/list" element={<TaxPayersList />} />
          <Route path="taxpayer/edit" element={<EditTaxPayers/>} />

          {/* Complains paths */}
          <Route path="complains/add" element={<AddComplain />} />
          <Route path="complains/list" element={<ComplainList />} />
          <Route path="complains/editcomplain" element={<EditComplains />} />

          {/* complain types */}
          <Route path="complainTypes/add" element={<ComplainTypes />} />
          <Route path="complainTypes/list" element={<ComplainTypesList />} />

          {/* Devices Paths */}
          <Route path="devices/add" element={<AddNewDevice/>} />
          <Route path="devices/list" element={<Devices/>} />
          
        </Routes>
      </main>
    </>
  );
}

export default App;
