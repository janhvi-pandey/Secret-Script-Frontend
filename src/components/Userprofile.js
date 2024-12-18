import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdMenuBook, MdFormatListBulletedAdd } from "react-icons/md";
import { useNavigate } from "react-router";

const pulse = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const DotLoaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:nth-child(1) {
    background-color: #ff6347;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    background-color: #1e90ff;
    animation-delay: 0.3s;
  }
  &:nth-child(3) {
    background-color: #32cd32;
    animation-delay: 0.6s;
  }
`;

const Container = styled.div`
  background-color: black;
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Greeting = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Username = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  text-shadow: 2px 2px 4px rgba(255, 165, 0, 0.6);
  -webkit-background-clip: text;
  color: transparent;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-top: 0;
  }
`;

const WelcomeMessage = styled.div`
  font-size: 1.5rem;
  color: #f4f6f6;
  margin-top: 1.5rem;

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
    } else if (currentTime < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
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
        
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, navigate]);

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

  if (loading) {
    return (
      <Container>
        {loadingTimeout ? (
          <p>
            Loading is taking too long. Please refresh the page or check your
            network connection.
          </p>
        ) : (
          <DotLoaderContainer>
            <Dot />
            <Dot />
            <Dot />
          </DotLoaderContainer>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Greeting>{greeting}</Greeting>
      <Username>{user?.name || "Guest"}</Username>
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
      </ActionContainer>
    </Container>
  );
};

export default UserProfile;
