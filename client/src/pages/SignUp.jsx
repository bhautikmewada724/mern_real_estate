import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/user/userslice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Regular expressions for email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Client-side validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    try {
      dispatch(signUpStart());
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Sign up failed");
      }
      dispatch(signUpSuccess(data));
      setLoading(false);
      setError(null);
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Signed Up Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Navigate to sign-in page
      navigate("/");
    } catch (error) {
      dispatch(signUpFailure(error.message));
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          {error && <p className="text-red-500 mt-5">{error}</p>}

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading.." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
