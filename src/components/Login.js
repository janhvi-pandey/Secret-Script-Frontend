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
    const response = await fetch(
      "https://secret-script-backend.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    if (!data.alreadyexist) {
      alert("User does not exist 🤔");
    } else {
      if (data.user === null) {
        alert("Password incorrect 😒");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/userprofile");
      }
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
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
          width: "90%", 
          maxWidth: "350px", 
        }}
      >
        <h2
          className=" text-center mb-3"
          style={{
            fontSize: "1.4rem",
            backgroundImage: "linear-gradient(45deg, #ffd700, #ff8c00)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          Sign In
        </h2>
        <p
          className="text-white text-center mb-4"
          style={{ fontSize: "0.85rem" }}
        >
          Access Your Secure Space for Ideas and Insights.
        </p>

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
              fontSize: "0.9rem",
              padding: "0.5rem",
            }}
          />
        </div>

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
              fontSize: "0.9rem",
              padding: "0.5rem",
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
            fontSize: "0.9rem", 
            padding: "0.6rem",
          }}
        >
          Sign In
        </button>

       
        <p
          className="text-center"
          style={{ color: "white", fontSize: "0.82rem" }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "white", fontWeight: "bold" }}>
            SignUp Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
