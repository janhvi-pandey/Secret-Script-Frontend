import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdMenuBook, MdFormatListBulletedAdd } from "react-icons/md";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import defaultImg from "../images/def2small.png";
import LoadingDots from "./LoadingDots";

const Container = styled.div`
  background-color: black;
  min-height: 100vh;
  color: #fff;
  padding-top: 60px; /* Add space for the fixed navbar */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Greetuser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px; /* Adjust gap as needed */
  width: 100%; /* Ensure it spans the container width */
  text-align: center;
  margin: 1rem; /* Add some spacing below */
   @media (max-width: 768px) {
    font-size: 1.8rem; 
     display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:10px;
  margin-bottom:0.5rem;
  }

`;

const Greeting = styled.h1`
  font-size: 2.5rem; /* Adjust size to balance with Username */
  font-weight: bold;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.8rem; /* Adjust for smaller screens */
  }
`;

const Username = styled.h2`
  font-size: 2.5rem; /* Match with Greeting for balance */
  font-weight: 700;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  text-shadow: 2px 2px 4px rgba(255, 165, 0, 0.6);
  -webkit-background-clip: text;
  color: transparent;

  @media (max-width: 768px) {
    font-size: 1.8rem; /* Adjust for smaller screens */
  }
`;


const WelcomeMessage = styled.div`
  font-size: 1.5rem;
  color: #f4f6f6;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 1.1rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.3rem;
  color: #aeb6bf;
  margin: 0.4rem 0 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 35vw;
  margin-top: 1.5rem;
  gap:1rem;

  @media (max-width: 768px) {
    width: 70vw;
    margin-top: 0.5rem;
    flex-direction: row;
    gap: 2px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.4);
  gap: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.4);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    flex-direction: row;
    padding: 1rem 1.5rem;
    svg {
      margin-bottom: 0;
      margin-right: 0.5rem;
      font-size: 2rem;
    }

    span {
      display: none;
    }
  }
`;
const ProfilePicture = styled.img`
  width: 165px;
  height: 160px;
    object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 3px solid #ffd700;
`;

const UserProfile = () => {
  // const host = "http://localhost:5005";
  const host = "https://secret-script-backend.vercel.app";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  //  console.log(token);
  // Greeting based on the time of day
  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      setGreeting("Good Morning!");
    } else if (currentTime < 17) {
      setGreeting("Good Afternoon!");
    } else if(currentTime<21) {
      setGreeting("Good Evening!");
    }
    else{
      setGreeting("Good Night!");
    }
  }, []);

  // Fetching user data from localStorage or API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${host}/auth/userprofile`, {
          method: "GET",
          headers: { token, "Content-Type": "application/json" },
        });
        const data = await response.json();
        // console.log(data);
        
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
     // eslint-disable-next-line 
  }, []);

  // Timeout for loading state
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
    setLoadingTimeout(false);
  }, [loading]);

  const handleAddThoughts = () => navigate("/addnote");
  const handleShowNotes = () => navigate("/shownotes");
  // const handleAddImage = () => navigate("/imageupload");

  if (loading) {
    return (
      <Container>
        {loadingTimeout ? (
          <p>
            Loading is taking too long. Please refresh the page or check your
            network connection.
          </p>
        ) : (
          <LoadingDots />
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Navbar/>
    
      {user?.photoURL && <ProfilePicture src={user?.photoURL} alt={user.name} onError={(e) => { e.target.src = defaultImg; }}/>}
      <Greetuser><Greeting>{greeting}</Greeting>
      <Username>{user?.name || "Guest"}</Username></Greetuser>
      
      <WelcomeMessage>
        Welcome back! Your thoughts await.
        <Tagline>Capture your ideas and reflect on your past notes.</Tagline>
      </WelcomeMessage>
      <ActionContainer>
        <ActionButton onClick={handleShowNotes}>
          <MdMenuBook />
          <span>Unveil thoughts</span>
        </ActionButton>
        <ActionButton onClick={handleAddThoughts}>
          <MdFormatListBulletedAdd />
          <span>Add Thoughts</span>
        </ActionButton>
        {/* <ActionButton onClick={handleAddImage}>
          <MdImage />
          <span>Add image</span>
        </ActionButton> */}
      </ActionContainer>
    </Container>
  );
};

export default UserProfile;
