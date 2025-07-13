import React, { useState } from "react";
import bg from "../../assets/bg.jpg";
import { MdEmail, MdLock } from "react-icons/md";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // 🔒 Set persistent login
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (user.emailVerified) {
        console.log("✅ Login successful");
        navigate("/dashboard"); // Change this to your desired page
      } else {
        alert(
          "Your email is not verified. Please check your inbox and click the verification link."
        );
      }
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[-1]" />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <p className="text-center">Don't have an account?</p>
            <p className="text-center">
              <Link to="/register" className="text-purple-700">
                Register
              </Link>{" "}
              here to create one
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
