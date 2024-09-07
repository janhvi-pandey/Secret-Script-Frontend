import React, { useState } from "react";
import { FaRegFileAlt, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/b.jpg'; 

function AddNote() {
  const [note, setNote] = useState({
    title: "",
    description: "",
    
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  

  const handleClick = async () => {
    try {
      const response = await fetch("https://script-backend.vercel.app/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
     
      
      if (data.msg==="Success") {
        alert("Your Note is added 😉. Click on Unveil your thoughts to access it");
      
        navigate("/userprofile");
      } else {
        alert("Error adding note 🤔");
      }
    } catch (error) {
      alert("Error adding note 🤔");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: "100vh",
        width: "100vw",
        color: "#FFFFFF",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: 'relative'
      }}
    >
      <button 
        className="btn btn-outline-light position-absolute"
        style={{ top: "1rem", left: "1rem" }}
        onClick={() => navigate('/userprofile')}
      >
        Back to Profile
      </button>

      <div
        style={{
          width: '80%',
          maxWidth: '600px',
          padding: '2rem',
          borderRadius: '10px',
          border: '1px solid #444',
          backgroundColor: 'rgba(44, 44, 44, 0.6)', // Transparent background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h1 className="text-center mb-4" style={{ 
          fontWeight: '700',
          fontSize: '2.5rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          color: '#FFD700'
        }}>Craft Your Script</h1>
        <form>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <FaRegFileAlt />
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white"
                style={{ border: '1px solid #444' }}
                placeholder='Title'
                id="title"
                name="title"
                value={note.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <FaRegCommentDots />
              </span>
              <textarea
                className="form-control bg-dark text-white"
                style={{ border: '1px solid #444' }}
                placeholder='Description'
                id="description"
                name="description"
                value={note.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          {/* <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="starred"
              checked={note.starred}
              onChange={handleStarChange}
            />
            <label className="form-check-label" htmlFor="starred">Star this note</label>
          </div> */}
          <button
            type="button"
            className="btn btn-outline-light w-100"
            onClick={handleClick}
          >
            Add Script
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
