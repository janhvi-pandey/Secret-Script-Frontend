import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AddNote from "./AddNote";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [notetoedit, setNotetoedit] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      const response = await fetch("http://localhost:8000/auth/userprofile", {
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

  const getNotes = async () => {
    const response = await fetch("http://localhost:8000/notes/getnotes", {
      method: "GET",
      headers: { token, "Content-Type": "application/json" },
    });
    const data = await response.json();
    setNotes(data.notes);
  };

  const handleEdit = async (id) => {
    const note = await fetch(`http://localhost:8000/notes/getnote/${id}`, {
      method: "GET",
      headers: { token, "Content-Type": "application/json" },
    });
    const data = await note.json();
    setNotetoedit(data);
  };

  const handleChange = (e) => {
    setNotetoedit({ ...notetoedit, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:8000/notes/editnote/${id}`, {
      method: "PUT",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify(notetoedit),
    });
    getNotes(); // Refresh notes after update
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: { token },
    });
    getNotes(); // Refresh notes after deletion
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "2rem" }}>
      <div className="container">
        <header className="d-flex text-white justify-content-between align-items-center mb-4">
          <h1>Welcome Back, {user ? user.name : "Loading..."} </h1>
          <button
            className=" btn btn-outline-danger text-white border-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <AddNote />

        <button
          className="btn btn-secondary mb-4"
          onClick={getNotes}
        >
          Retrieve Notes
        </button>

        <div className="row">
          {notes.map((note) => (
            <div
              key={note._id}
              className="col-md-4 mb-4"
            >
              <div className="card shadow-lg p-3 mb-5  rounded" style={{ backgroundColor: "#212529", color: "white", boxShadow: "0 8px 16px rgba(255, 255, 255, 0.3)" }}>
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                  <div className="d-flex justify-content-between">
                    <FaRegEdit
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => handleEdit(note._id)}
                    />
                    <MdDelete
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(note._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        <div
          className="modal fade "
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ boxShadow: "0 8px 16px rgba(255, 255, 255, 0.3)" }}>
              <div className="modal-header">
                <h2 className="modal-title" id="editModalLabel">Edit Note</h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label" style={{fontSize:"20px", fontWeight:"400"}}>Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={notetoedit.title}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" style={{fontSize:"20px", fontWeight:"400"}}>Description</label>
                  <textarea
                    id="description"
                    name="description"
                    cols="30"
                    rows="5"
                    value={notetoedit.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(notetoedit._id)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
