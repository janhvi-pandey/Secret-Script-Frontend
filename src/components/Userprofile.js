import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import backgroundImage from '../images/bg-17.avif'; 

function UserProfile() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      const response = await fetch("https://secret-script-backend.vercel.app/auth/userprofile", {
        method: "GET",
        headers: { token, "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddThoughts = () => {
    navigate("/addnote"); 
  };

  const handleShowNotes = () => {
    navigate("/shownotes"); 
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: "100vh",
        color: "#FFFFFF",
        padding: "2rem",
        position: 'relative'
      }}
    >
      <header className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
      </header>

      <div className="container w-50 mt-5" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "10px", padding: "2rem" }}>
        <div className="text-center mb-5 mt-3">
          <h1 className="mb-3">Welcome <span style={{ color: 'yellow' }}>{user ? user.name : "Loading..."}</span> </h1>
          <h2 className="mt-4">Your Thoughts Await!</h2>
          <p className="mb-4">Capture your ideas and reflect on your past notes.</p>
          <button className="btn btn-secondary me-2" onClick={handleAddThoughts}>Add Your Thoughts</button>
          <button className="btn btn-secondary" onClick={handleShowNotes}>Unveil Your Thoughts</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
