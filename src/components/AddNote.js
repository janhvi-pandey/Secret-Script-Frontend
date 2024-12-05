import React, { useState } from "react";
import { FaRegFileAlt, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const PageWrapper = styled.div`
  width: 100vw;
  background-color: #000;
  min-height: 100vh;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: 1px solid grey;
  background-color: transparent;
  color: #d5dbdb;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    border: 1px solid yellow;
    color: #fff;
  }
`;

const FormContainer = styled.div`
  width: 75vw;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #444;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  @media(max-width:768px){
  width:90vw;
  padding:0.8rem;}
`;

const Title = styled.h2`
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 620;
  font-size: 2.5rem;
  @media (max-width:768px){
  font-size: 2rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const InputGroupimg = styled.span`
  background-color: #333;
  border: 1px solid #444;
  padding: 0.75rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 0 0 5px;
`;

const InputField = styled.input`
  background-color: #111;
  color: #ecf0f1;
  border: 1px solid #444;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 0 5px 5px 0; /* Rounded right corner */
`;

const Descriptionimg = styled.span`
  background-color: #333;
  border: 1px solid #444;
  padding: 0.75rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 0 0 5px;
  height: 100px; 
`;

const TextAreaField = styled.textarea`
  background-color: #111;
  color: #ecf0f1;
  border: 1px solid #444;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  align-content:center;
  height: 100px; 
  border-radius: 0 5px 5px 0; 
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #d4ac0d;
  color: #000;
  border: none;
  font-weight: bold;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(255, 165, 0, 0.4);
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #b7950b;
  }
`;

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
      const response = await fetch(
        "https://secret-script-backend.vercel.app/notes/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(note),
        }
      );

      const data = await response.json();

      if (data.msg === "Success") {
        alert(
          "Your Note is added 😉. Click on Unveil your thoughts to access it"
        );
        navigate("/userprofile");
      } else {
        alert("Error adding note 🤔");
      }
    } catch (error) {
      alert("Error adding note 🤔");
    }
  };

  return (
    <PageWrapper>
      <BackButton onClick={() => navigate("/userprofile")}>
        Back to Profile
      </BackButton>

      <FormContainer>
        <Title>Craft Your Script</Title>
        <form>
          <InputGroup>
            <InputGroupimg>
              <FaRegFileAlt />
            </InputGroupimg>
            <InputField
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Descriptionimg>
              <FaRegCommentDots />
            </Descriptionimg>
            <TextAreaField
              placeholder="Description"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <SubmitButton type="button" onClick={handleClick}>
            Add Script
          </SubmitButton>
        </form>
      </FormContainer>
    </PageWrapper>
  );
}

export default AddNote;
