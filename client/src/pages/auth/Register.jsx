import React, { useState } from "react";
import bg from "../../assets/bg.jpg";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/db.config";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const actionCodeSettings = {
        url: "http://localhost:5173/verification-success", // ✅ 👈 where the user lands after verifying
        handleCodeInApp: false, // must be false to open in browser
      };

      await sendEmailVerification(user, actionCodeSettings);

      // 🔒 Use UID as Firestore document ID (preferred)
      const documentId = `${name.toLowerCase()}-${surname.toLowerCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      // ✅ Save user data in Firestore
      await setDoc(doc(db, "users", documentId), {
        name,
        surname,
        email,
        role: "worker",
        userId: user.uid,
        createdAt: new Date(),
      });

      await setDoc(doc(db, "workers", documentId), {
        accountCreated: false,
        userId: user.uid,
        createdAt: new Date(),
      });

      console.log("User registered successfully");
      alert(
        "Registration successful! A verification email has been sent. Please verify your email before logging in."
      );
    } catch (error) {
      console.error("Registration error:", error.code, error.message);
      alert(`Error: ${error.message}`);
    }
  };

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
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create a Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <div className="flex items-center mb-2">
                <MdPerson className="mr-0.5" size={20} />
                <label className="text-sm font-medium text-gray-700 mb-1 gap-1">
                  First Name
                </label>
              </div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Surname */}
            <div>
              <div className="flex items-center mb-2">
                <MdPerson className="mr-0.5" size={20} />
                <label className="text-sm font-medium text-gray-700 mb-1 gap-1">
                  Surname
                </label>
              </div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center mb-2">
                <MdEmail className="mr-0.5" size={20} />
                <label className="text-sm font-medium text-gray-700 mb-1 gap-1">
                  Email Address
                </label>
              </div>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center mb-2">
                <MdLock className="mr-0.5" size={20} />
                <label className="text-sm font-medium text-gray-700 mb-1 gap-1">
                  Password
                </label>
              </div>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <Link to={"/"} className="text-purple-700">
                Click here
              </Link>{" "}
              to login
            </p>
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
