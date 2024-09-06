import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlesubmit = async () => {
    const response = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    if (data.alreadyexist) {
      alert("Email already exists");
    } else {
      localStorage.setItem('token', data.token);
      navigate('/userprofile');
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
          width: "428px",
        }}
      >
        <h2 className="text-white text-center mb-4" style={{ color: "white" }}>
          Register to Secret Script
        </h2>
        <p className="text-white text-center mb-4">
          Create Your Secure Space for Thoughts and Creativity.
        </p>

        {/* Name input with icon */}
        <div className="input-group mb-3">
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
              outline: "none",
            }}
          />
        </div>

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

        {/* Register button */}
        <button
          onClick={handlesubmit}
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "#000",
            border: "none",
          }}
        >
          Register
        </button>

        
        <p className="text-center" style={{ color: "white" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "white", fontWeight: "bold" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
