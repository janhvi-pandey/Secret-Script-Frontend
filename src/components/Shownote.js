import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEdit, FaTimes, FaArrowLeft } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const ShowNote = () => {
  const host="https://secret-script-backend.vercel.app";
  // const host = "http://localhost:5005";
  
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await fetch(`${host}/notes/getnotes`, {
          method: "GET",
          headers: { token, "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchNotes();
  }, [token, navigate]);

  // Slice description
  const sliceDescription = (description, maxLength = 50) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setUpdatedTitle(note.title);
    setUpdatedDescription(note.description);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!updatedTitle || !updatedDescription) {
      setError("Both title and description are required.");
      return;
    }

    if (selectedNote) {
      const response = await fetch(
        `${host}/notes/editnote/${selectedNote._id}`,
        {
          method: "PUT",
          headers: {
            token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
          }),
        }
      );

      if (response.ok) {
        const updatedNotes = notes.map((note) =>
          note._id === selectedNote._id
            ? { ...note, title: updatedTitle, description: updatedDescription }
            : note
        );
        setNotes(updatedNotes);
        setShowEditModal(false);
      } else {
        alert("Failed to update the note");
      }
    }
  };

  const handleDelete = async () => {
    await fetch(`${host}/notes/deletenote/${noteToDelete._id}`, {
      method: "DELETE",
      headers: { token },
    });

    const response = await fetch(`${host}/notes/getnotes`, {
      method: "GET",
      headers: { token, "Content-Type": "application/json" },
    });
    const data = await response.json();
    setNotes(data.notes);
    setShowDeleteConfirm(false);
  };

  const handleDeleteConfirm = (note) => {
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  };

  const handleBack = () => {
    navigate("/userprofile");
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FaArrowLeft />
      </BackButton>

      <Heading>Explore Your Creative Mind</Heading>
      <Message>
        Here are all the notes you've captured. Edit or delete them as you wish.
      </Message>

      <NotesSection>
        {notes.length === 0 ? (
          <EmptyNotesMessage>
            <p>
              Oops! no thoughts captured yet. Add some
              <br /> 😢
            </p>
          </EmptyNotesMessage>
        ) : (
          <Row>
            {notes.map((note) => (
              <Col key={note._id} md={4} className="mb-4">
                <NoteCard>
                  <div className="card-body">
                    <h5>{note.title}</h5>
                    <p>{sliceDescription(note.description)}</p>
                    <div className="d-flex m-2">
                      <EditIcon onClick={() => handleEdit(note)}>
                        <FaRegEdit />
                      </EditIcon>
                      <DeleteIcon onClick={() => handleDeleteConfirm(note)}>
                        <MdDeleteOutline />
                      </DeleteIcon>
                    </div>
                  </div>
                </NoteCard>
              </Col>
            ))}
          </Row>
        )}
      </NotesSection>

      {/* Edit Modal */}
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <ModalHeader>
          <ModalTitle>Edit Note</ModalTitle>
          <FaTimes onClick={() => setShowEditModal(false)} />
        </ModalHeader>

        <ModalBody>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Enter note title"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Enter note description"
              />
            </Form.Group>
          </Form>
        </ModalBody>

        <ModalFooter>
          <ButtonCancel type="button" onClick={() => setShowEditModal(false)}>
            Cancel
          </ButtonCancel>
          <ButtonSave type="button" onClick={handleSaveEdit}>
            Save Changes
          </ButtonSave>
        </ModalFooter>
      </EditModal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
      >
        <ModalHeader>
          <ModalTitle>Confirm Deletion</ModalTitle>
          <FaTimes onClick={() => setShowDeleteConfirm(false)} />
        </ModalHeader>

        <ModalBody>
          <p>Are you sure you want to delete this note?</p>
        </ModalBody>

        <ModalFooter>
          <ButtonCancel
            type="button"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </ButtonCancel>
          <ButtonDanger type="button" onClick={handleDelete}>
            Delete
          </ButtonDanger>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background-color: #000;
  min-height: 100vh;
  padding: 2rem 1rem;
  color: white;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Heading = styled.div`
  text-align: center;
  margin-top: 70px;
  font-size: 3rem;
  font-weight: 500;
  color: transparent;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  text-shadow: 2px 2px 4px rgba(255, 165, 0, 0.6);
  -webkit-background-clip: text;
  @media (max-width: 768px) {
    margin-top: 60px;
    font-size: 2rem;
  }
`;

const Message = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #aeb6bf;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 1.1rem;
  }
`;

const NotesSection = styled.div`
  margin-top: 20px;
`;

const EmptyNotesMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: white;
  padding: 20px;
`;

const NoteCard = styled.div`
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  transition: all 0.3s ease;
  padding: 1rem;
  margin: 3%;
  border-radius: 5px;
  height: 155px;
  width: auto;
  .card-body {
    h5 {
      font-size: 1.3rem;
    }

    p {
      font-size: 1rem;
    }
  }

  &:hover {
    background-color: #444;
  }
`;

const EditModal = styled(Modal)`
  .modal-content {
    background-color: #333;
    color: white;
  }
`;

const ModalHeader = styled(Modal.Header)`
  border-bottom: 1px solid white;
  background-color: #333;
  color: white;
  padding: 0.5rem;
`;

const ModalTitle = styled(Modal.Title)`
  font-size: 1.2rem;
`;

const ModalBody = styled(Modal.Body)`
  background-color: #333;
  color: white;
  padding: 15px;
`;

const ModalFooter = styled(Modal.Footer)`
  background-color: #333;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonCancel = styled.button`
  background-color: #f1c40f;
  color: white;
  border: 0;
  border-radius: 1vh;
  font-size: 2vh;
  padding: 0.8vh 2vh;
  cursor: pointer;

  &:hover {
    background-color: #d4ac0d;
  }
`;

const ButtonSave = styled(Button)`
  background-image: linear-gradient(45deg,rgb(213, 5, 16),rgb(201, 73, 22));
  color: white;
  border: 0;
  border-radius: 1vh;
  font-size: 2vh;
  padding: 0.8vh 2vh;
`;

const ButtonDanger = styled(Button)`
  background-image: linear-gradient(45deg, #e50914,rgb(212, 88, 22));
  border: 0;
  border-radius: 1vh;
  font-size: 2vh;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const EditIcon = styled.div`
  cursor: pointer;
  font-size: 1rem;
  color: #ccc;

  &:hover {
    color: #fff;
  }
`;

const DeleteIcon = styled.div`
  cursor: pointer;
  font-size: 1.12rem;
  color: #ccc;
  padding-left: 0.5rem;

  &:hover {
    color: #fff;
  }
`;

export default ShowNote;
