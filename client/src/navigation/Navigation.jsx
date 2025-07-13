import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import VerificationSuccess from "../pages/auth/VerificationSuccess";
import Login from "../pages/auth/Login";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/verification-success" element={<VerificationSuccess />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
