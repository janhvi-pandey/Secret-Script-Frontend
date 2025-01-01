import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/def2small.png";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
 

  background-color: #000; /* Dark background for the navbar */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align content to the right */
  padding: 0 1.5rem;
  z-index: 1000; /* Ensure it's above other elements */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: inline-block; 
`;

const SmallProfilePicture = styled.img`
  width: 50px;
  height: 50px;
   object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgb(246, 159, 77); /* Optional border styling */
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 60px; /* Adjust for the navbar height */
  right: 0;
  background: linear-gradient(135deg, #444, #222);
  color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
  width: 160px;
  padding: 10px 0;
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-20px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 1001; /* Above the navbar */
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")}; /* Prevent interactions when closed */
`;

const DropdownItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background: rgba(246, 159, 77, 0.2);
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  // const host = "http://localhost:5005";
  const host = "https://secret-script-backend.vercel.app";

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(token)

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
      }
    };

    fetchUser();
  }, [token]);

  // Close the dropdown if the user clicks outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  // const handleMouseLeave = () => {
  //   setIsDropdownOpen(false);
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <NavbarContainer>
      <ProfileWrapper
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >

        {user?.photoURL && (
          <SmallProfilePicture
            src={user.photoURL}
            alt="Profile"
            onError={(e) => {
              e.target.src = defaultImg;
            }}
            onClick={() => setIsDropdownOpen((prev) => !prev)} 
          />
        )}
        <DropdownContainer $isOpen={isDropdownOpen}>
        <DropdownItem onClick={() => navigate("/userprofile")}>
            Home
          </DropdownItem>
          <DropdownItem onClick={() => navigate("/settings")}>
            Settings
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownContainer>
      </ProfileWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
