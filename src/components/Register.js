import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { auth, googleProvider } from "../firebase/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
`;

const DividerLine = styled.hr`
  flex: 1;
  border: none;
  border-top: 1px solid grey;
  margin: 0 10px;
`;

const DividerText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

function Register() {
  const host="https://secret-script-backend.vercel.app";
  //  const host="http://localhost:5005";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
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
      const response = await fetch(
        `${host}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "An error occurred during registration");
        return;
      }

      const data = await response.json();

      if (data.alreadyexist) {
        alert("Email already exists 😉");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/userprofile");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Network or server error occurred. Please try again.");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
    
      const googleUserPayload = {
        name: googleUser.displayName,
        email: googleUser.email,
        password: "google-oauth",
      };

      const response = await fetch(
       `${host}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(googleUserPayload),
          credentials: "include",
        }
      );
      const data = await response.json();
      

      if (data.alreadyexist) {
        alert("Email already exists 😉");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/userprofile");
      }
    } catch (error) {
      console.error("Google Sign-In error:", error.message);
      alert("Failed to sign in with Google.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "linear-gradient(to bottom, #121212, #262626)",
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
          Sign Up
        </h2>
        <p
          className="text-white text-center mb-3"
          style={{ fontSize: "0.85rem" }}
        >
          Embrace Your Base for Ideas and Grace.
        </p>

        {/* Name input with icon */}
        <div
          className="input-group "
          style={{
            marginBottom: "0.8rem",
          }}
        >
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
              padding: "0.4rem",
            }}
          />
        </div>

        <div
          className="input-group "
          style={{
            marginBottom: "0.8rem",
          }}
        >
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
              padding: "0.4rem",
            }}
          />
        </div>

        <div
          className="input-group"
          style={{
            marginBottom: "0.8rem",
          }}
        >
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
              padding: "0.4rem",
            }}
          />
        </div>

        <button
          onClick={handlesubmit}
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            border: "none",
            fontSize: "0.9rem",
            padding: "0.5rem",
          }}
        >
          Sign Up
        </button>

        <DividerContainer>
          <DividerLine />
          <DividerText>Or </DividerText>
          <DividerLine />
        </DividerContainer>

        {/* Google Sign-In button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            border: "none",
            fontSize: "0.9rem",
            padding: "0.6rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FcGoogle style={{ marginRight: "8px", fontSize: "1.2rem" }} />
          Sign Up with Google
        </button>
        <p
          className="text-center"
          style={{ color: "white", fontSize: "0.8rem" }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "white", fontWeight: "bold" }}>
            Sign in Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
