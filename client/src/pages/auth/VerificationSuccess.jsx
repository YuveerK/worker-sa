import React, { useState } from "react";
import bg from "../../assets/bg.jpg";
import { Link } from "react-router-dom";

const VerificationSuccess = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Blur */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[-1]" />

      {/* Registration Card */}
      <div className="flex items-center justify-center w-full h-screen overflow-auto">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Success! ✅
          </h2>
          <p className="text-center">
            You have successfully verified your account
          </p>
          <p className="text-center">
            Please{" "}
            <Link to={"/"} className="cursor-pointer text-purple-600">
              login
            </Link>{" "}
            to complete your profile{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
