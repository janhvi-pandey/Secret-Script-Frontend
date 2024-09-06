import React, { useState } from "react";
import { FaRegFileAlt, FaRegCommentDots } from "react-icons/fa";

function AddNote() {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
      
      alert("Your Note is added 😉. Click on Retrieve Notes to access it")
    } catch (error) {
      alert("Error adding note 🤔");
    }
  };

  return (
    <div className="d-flex justify-content-start align-items-center mb-4 mt-5">
      <div
        style={{
       
          width: '70%',
          padding: '2rem',
          borderRadius: '10px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#212529',
          color: 'white'
        }}
      >
        <h1 className="text-left mb-4" style={{ fontWeight: '400' }}>Add a Note</h1>
        <form>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <FaRegFileAlt />
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white"
                style={{ border: '1px solid #ddd' }}
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
              <input
                type="text"
                className="form-control bg-dark text-white"
                style={{ border: '1px solid #ddd' }}
                placeholder='Description'
                id="description"
                name="description"
                value={note.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-light w-100"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
