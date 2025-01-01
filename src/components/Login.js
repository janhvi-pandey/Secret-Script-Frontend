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
  const host="https://secret-script-backend.vercel.app";
  // const host="http://localhost:5005";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    authmethod:"manual",
  });

  useEffect(() => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");   
  }, []);

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlesubmit = async () => {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  
    const data = await response.json();
    // console.log(data);
  
    // Check if user doesn't exist or incorrect password
    if (data.message === "User does not exist") {
      alert("User does not exist 🤔");
    } else if (data.message === "Incorrect password") {
      alert("Incorrect password 😒");
    } else if (data.user) {
      // Successful login
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/userprofile");
    } else {
      // Handle any unexpected cases
      alert("Something went wrong. Please try again later.");
    }
  };
  

 // Handle Google Sign-In
 const handleGoogleSignIn = async () => {
  try {
    // Trigger Google Sign-In Popup
    const result = await signInWithPopup(auth, googleProvider);
    // console.log(result);
    
    const googleUser = result.user;
    // console.log(googleUser);
    const authmethod="google";
    // Extract necessary user details
    const googleUserPayload = {
      email: googleUser.email,
      name: googleUser.displayName,
      photoURL:googleUser.photoURL,
      authmethod: authmethod
    };
    // console.log(googleUserPayload);

    // Send user data to backend
    const response = await fetch(`${host}/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(googleUserPayload),
    });

    const data = await response.json();
    // console.log(data);
    
    if (data.success) {
      // Store the token and navigate to user profile
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/userprofile");
    } else {
      alert("Failed to sign in with Google.");
    }
  } catch (error) {
    console.error("Google Sign-In error:", error.message);
    alert("Google Sign-In failed.");
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
