import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";
import backgroundImage from '../images/bg-17.avif';

function ShowNote() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // For editing selected note
  const [showEditModal, setShowEditModal] = useState(false); // For modal visibility
  const [updatedTitle, setUpdatedTitle] = useState(""); // Updated title
  const [updatedDescription, setUpdatedDescription] = useState(""); // Updated description
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch notes on component load
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchNotes = async () => {
      const response = await fetch("https://secret-script-backend.vercel.app/notes/getnotes", {
        method: "GET",
        headers: { token, "Content-Type": "application/json" },
      });
      const data = await response.json();
      setNotes(data.notes);
    };

    fetchNotes();
  }, [token, navigate]);

  // Handle edit button click, open modal with selected note data
  const handleEdit = (note) => {
    setSelectedNote(note);
    setUpdatedTitle(note.title);
    setUpdatedDescription(note.description);
    setShowEditModal(true);
  };

  // Handle saving edited note
  const handleSaveEdit = async () => {
    if (selectedNote) {
      const response = await fetch(`https://secret-script-backend.vercel.app/notes/editnote/${selectedNote._id}`, {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });

      if (response.ok) {
        // Update the local state with the edited note
        const updatedNotes = notes.map((note) =>
          note._id === selectedNote._id
            ? { ...note, title: updatedTitle, description: updatedDescription }
            : note
        );
        setNotes(updatedNotes);
        setShowEditModal(false); // Close modal after saving
      } else {
        alert("Failed to update the note");
      }
    }
  };

  // Handle deleting a note
  const handleDelete = async (id) => {
    await fetch(`https://secret-script-backend.vercel.app/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: { token },
    });

    // Refresh notes after deletion
    const response = await fetch("https://secret-script-backend.vercel.app/notes/getnotes", {
      method: "GET",
      headers: { token, "Content-Type": "application/json" },
    });
    const data = await response.json();
    setNotes(data.notes);
  };

 
  const handleBack = () => {
    navigate("/userprofile");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#FFFFFF",
        padding: "2rem",
        position: "relative",
      }}
    >
      <header className="d-flex justify-content-start mb-4">
        <button className="btn btn-outline-light" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back to Your Profile
        </button>
      </header>

      <div
        className="container"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        <div className="text-center mb-5">
          <h1 className="mb-3">Explore Your Creative Mind</h1>
          <p className="mb-4">Here are all the notes you've collected. Edit or delete them as you wish.</p>
        </div>

        <div className="row">
          {notes.map((note) => (
            <div key={note._id} className="col-md-4 mb-4">
              <div
                className="card shadow-lg p-3 mb-5 rounded"
                style={{
                  backgroundColor: "#2c2c2c",
                  color: "#FFFFFF",
                  border: "1px solid #444",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                  <div className="d-flex justify-content-between">
                    <FaRegEdit
                      style={{
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        color: "#FFD700",
                      }}
                      onClick={() => handleEdit(note)}
                    />
                    <MdDelete
                      style={{
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        color: "#FF6347",
                      }}
                      onClick={() => handleDelete(note._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowNote;
