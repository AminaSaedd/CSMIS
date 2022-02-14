import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AuthRouts from "./Auth/Routes";
import AddComplain from "./components/complains/AddComplain";


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthRouts />} />
      <Route path="*" element={<App />} />
    </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
