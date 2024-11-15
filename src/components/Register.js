import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlesubmit = async () => {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all details to access your secure space 😒");
      return;
    }

    try {
      const response = await fetch('https://secret-script-backend.vercel.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });
      const data = await response.json();

      if (data.alreadyexist) {
        alert("Email already exists 😉");
      } else {
        localStorage.setItem('token', data.token);
        navigate('/userprofile');
      }
    } catch (error) {
      alert("Error in registration");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#212529",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        className="bg-dark"
        style={{
          padding: "15px", // Reduced padding for smaller height
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
          width: "90%",
          maxWidth: "350px",
          marginBottom: "10px", // Reduced margin bottom
        }}
      >
        <h2
          className="text-white text-center mb-2"
          style={{
            fontSize: "1.3rem",  // Reduced font size
            lineHeight: "1.2",   // Tightened line height
          }}
        >
          Sign Up to <span style={{ color: 'yellow' }}>Secret Script</span>
        </h2>
        <p className="text-white text-center mb-3" style={{ fontSize: "0.85rem" }}>
          Create Your Secure Space for Thoughts and Creativity.
        </p>

        {/* Name input with icon */}
        <div className="input-group mb-2">
          <span
            className="input-group-text"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
            }}
          >
            <FaUser />
          </span>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={handlechange}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "none",
              fontSize: "0.85rem",
              padding: "0.4rem", // Reduced padding for smaller size
            }}
          />
        </div>

        {/* Email input with icon */}
        <div className="input-group mb-2">
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
              fontSize: "0.85rem",
              padding: "0.4rem", // Reduced padding for smaller size
            }}
          />
        </div>

        {/* Password input with icon */}
        <div className="input-group mb-2">
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
              fontSize: "0.85rem",
              padding: "0.4rem", // Reduced padding for smaller size
            }}
          />
        </div>

        {/* Register button */}
        <button
          onClick={handlesubmit}
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "#000",
            border: "none",
            fontSize: "0.9rem",
            padding: "0.5rem", // Adjusted padding for smaller button
          }}
        >
          Sign Up
        </button>

        <p className="text-center" style={{ color: "white", fontSize: "0.8rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "white", fontWeight: "bold" }}>
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
