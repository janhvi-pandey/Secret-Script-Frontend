import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; 
import { auth, googleProvider } from "../firebase/FirebaseConfig"; 
import { signInWithPopup } from "firebase/auth";

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

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.removeItem("token");  // Remove the token if it's found
    localStorage.removeItem("user");   // Remove the user data if it's found
  }, []);

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


 // Handle Google Sign-In
const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider); 
    const user = result.user;
   
    localStorage.setItem("user", JSON.stringify({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));

    alert(`Welcome back, ${user.displayName}! We’ve missed you!`);
    navigate("/userprofile");
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
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            border: "none",
            fontSize: "0.9rem",
            padding: "0.6rem",
          }}
        >
          Sign In
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
          Sign in with Google
        </button>

        <p
          className="text-center"
          style={{ color: "white", fontSize: "0.82rem" }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "white", fontWeight: "bold" }}>
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
