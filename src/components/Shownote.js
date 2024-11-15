import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEdit,FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa"; // For back arrow

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

    const response = await fetch("https://secret-script-backend.vercel.app/notes/getnotes", {
      method: "GET",
      headers: { token, "Content-Type": "application/json" },
    });
    const data = await response.json();
    setNotes(data.notes);
  };

  // Handle navigating back to profile
  const handleBack = () => {
    navigate("/userprofile");
  };

  return (
    <div
      style={{
        backgroundColor: "#212529", // Page background set to #212529
        minHeight: "100vh",
        padding: "2rem 1rem", // Extra padding for spacing
        color: "white",
        position: "relative", // For positioning elements outside the main container
      }}
    >
      {/* Back Button */}
      <button
        className="btn btn-outline-light position-absolute"
        style={{
          top: "20px",
          left: "20px", // Icon on the left
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold", // Make it bold on larger screens
        }}
        onClick={handleBack}
      >
        <FaArrowLeft className="d-none d-md-block" /> {/* Visible on large screens */}
        <span className="d-md-none" style={{ fontSize: "1.8rem" }}>
          &#8592; {/* Back arrow for small screens */}
        </span>
      </button>

      {/* Heading and Subheading Section */}
      <div
        className="text-center"
        style={{
          marginTop: "80px", // Giving space at the top for heading
        }}
      >
        <h1
          className="display-4"
          style={{
            fontSize: "2.3rem", // Default font size
            fontWeight:'450'
          }}
        >
          Explore Your Creative Mind
        </h1>
        <p
          style={{
            fontSize: "1rem",
            marginTop: "20px",
            maxWidth: "80%", // Limit width for a cleaner layout
            margin: "auto",
          }}
        >
          Here are all the notes you've captured. Edit or delete them as you wish.
        </p>
      </div>

      {/* Main Content - Notes Section */}
      <div
        className="container mt-5"
        style={{
          width: "100%",
          marginTop: "20px", // Space for heading and subheading
        }}
      >
        {/* If no notes, show a simple message */}
        {notes.length === 0 ? (
          <div
            className="text-center"
            style={{
              fontSize: "1.1rem", // Adjusted font size to be consistent
              color: "white", // Simple white text
              padding: "20px",
            }}
          >
            <p>Oops! no thoughts captured yet. Add some 😢</p>
          </div>
        ) : (
          // Notes Section - Directly display notes without container
          <div className="row">
            {notes.map((note) => (
              <div key={note._id} className="col-12 col-md-4 mb-4">
                <div
                  className="card shadow-lg p-3 mb-5 rounded"
                  style={{
                    backgroundColor: "#333",
                    color: "#FFFFFF",
                    border: "1px solid #444",
                    transition: "all 0.3s ease", // Smooth hover effect
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
                      {note.title}
                    </h5>
                    <p className="card-text" style={{ fontSize: "1rem" }}>
                      {note.description}
                    </p>
                    <div className="d-flex justify-content-between">
                      <FaRegEdit
                        style={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          color: "#007bff", // Blue for Edit
                        }}
                        onClick={() => handleEdit(note)}
                      />
                      <MdDelete
                        style={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          color: "#dc3545", // Red for Delete
                        }}
                        onClick={() => handleDelete(note._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg" // Default large size
        className="custom-modal" // Custom class for media queries
      >
        <div style={{ boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)" }}>
          {/* Modal Header with a white line after the heading */}
          <Modal.Header
            
            style={{
              borderBottom: "1px solid white", // White line below heading
              backgroundColor: "#333", // Matching the dark theme
              color: "white",
              padding: "0.5rem", // Reduce padding to make it more compact
            }}
          >
            <Modal.Title style={{ color: "white", fontSize: "1.2rem" }}>
              Edit Note
            </Modal.Title> {/* White color for modal heading */}
            <FaTimes
              onClick={() => setShowEditModal(false)}
              style={{
                color: "white", // White close icon
                fontSize: "1.5rem", // Adjust size as necessary
                cursor: "pointer", // Pointer cursor to indicate it's clickable
                marginRight: "10px", // Space between icon and title
              }}
            />
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: "#333", // Dark background for modal body
              color: "white",
              padding: "15px", // Reduced padding
            }}
          >
            <Form>
              <Form.Group className="mb-2">
                <Form.Label style={{ fontSize: "0.9rem" }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  style={{
                    backgroundColor: "#555", // Dark background for input fields
                    color: "white",
                    border: "1px solid #444",
                    fontSize: "0.9rem", // Smaller font size for inputs
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label style={{ fontSize: "0.9rem" }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  style={{
                    backgroundColor: "#555", // Dark background for input fields
                    color: "white",
                    border: "1px solid #444",
                    fontSize: "0.9rem", // Smaller font size for inputs
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          {/* Modal Footer with Red "Close" button */}
          <Modal.Footer
            style={{
              backgroundColor: "#333", // Match footer with body color
              padding: "0.5rem", // Reduced padding
              borderTop: "none", // Removed the line above buttons
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
              style={{
                backgroundColor: "#dc3545", 
                border: "none",
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveEdit}
              style={{
                backgroundColor: "#007bff", // Blue for Save Changes button
                border: "none",
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Add CSS to manage responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .custom-modal .modal-dialog {
            margin:auto;
            max-width: 85%; /* Smaller modal on small screens */
          }
        }

        @media (min-width: 769px) {
          .custom-modal .modal-dialog {
            max-width: 40%; /* Larger modal on large screens */
          }
        }
      `}</style>
    </div>
  );
}

export default ShowNote;
