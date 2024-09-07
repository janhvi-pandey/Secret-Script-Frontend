import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlesubmit = async () => {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    // console.log (data);
    if (!data.alreadyexist) {
      alert("User does not exist 🤔");
    } else {
      if (data.user === null) {
        alert("Password incorrect 😒");
      } else {
        localStorage.setItem('token', data.token);
        navigate("/userprofile");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#212529",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="bg-dark"
        style={{
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
          width: "420px",
        }}
      >
        <h2 className="text-white text-center mb-4">Login to <span style={{ color: 'yellow' }}>Secret Script</span> </h2>
        <p className="text-white text-center mb-4">
          Access Your Secure Space for Ideas and Insights.
        </p>

        {/* Email input with icon */}
        <div className="input-group mb-3">
          <span
            className="input-group-text"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
            }}
          >
            <FaEnvelope />
          </span>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            onChange={handlechange}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Password input with icon */}
        <div className="input-group mb-3">
          <span
            className="input-group-text"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
            }}
          >
            <FaLock />
          </span>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handlechange}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Login button */}
        <button
          onClick={handlesubmit}
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "#000",
            border: "none",
          }}
        >
          Login
        </button>

        {/* Catchy call to action */}
        <p className="text-center" style={{ color: "white" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "white", fontWeight: "bold" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
