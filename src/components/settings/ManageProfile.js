import React, { useState } from "react";
import styled from "styled-components";
import YourProfile from "./YourProfile";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Navbar from "../Navbar";

// Main Container - Centered with Dark Theme
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* Align items to the left within the container */
  align-items: center;
  width: 60vw;
  height: 70vh;
  background-color: #181818;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  margin: auto; /* Automatically center the container horizontally and vertically */
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    height: auto;
    margin-top: 20px;
  }
`;

// Sidebar Section
const Sidebar = styled.div`
  flex: 2; /* Use flex ratios for precise 20% width */
//   width:20%;
  height: 100%;
  background-color: #282828;
  padding: 20px;
  border-radius: 10px 0 0 10px;
  box-shadow: 2px 0 5px rgba(56, 55, 55, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

// Sidebar Item (Menu Options)
const SidebarItem = styled.div`
  margin: 15px 0;
  padding: 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
     background: rgba(114, 113, 112, 0.2);
    transform: scale(1.05);
    
  }

`;

// Content Area Section
const ContentArea = styled.div`
  flex: 6; /* Use flex ratios for precise 60% width */
  height: 100%;
  padding: 20px;
  background-color: #222;
  border-left: 2px solid #444;
  border-radius: 0 10px 10px 0;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
  }
`;

// Heading (Main Title)
const Heading = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
    color: transparent;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  text-shadow: 2px 2px 4px rgba(255, 165, 0, 0.6);
  -webkit-background-clip: text;
  margin-top: 70px;
  margin-bottom: 10px;
`;

// ManageProfile Component
const ManageProfile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Navbar */}
      <Navbar />

      {/* Page Heading */}
      <Heading>Manage Your Profile</Heading>

      {/* Main Container */}
      <Container>
        <Sidebar>
          <SidebarItem onClick={() => setActiveSection("Your Profile")}>
            Your Profile
          </SidebarItem>
          <SidebarItem onClick={() => setActiveSection("Edit Profile")}>
            Edit Profile
          </SidebarItem>
          <SidebarItem onClick={() => setActiveSection("Change Password")}>
            Change Password
          </SidebarItem>
        </Sidebar>

        <ContentArea>
          {activeSection === "Your Profile" && <YourProfile />}
          {activeSection === "Edit Profile" && <EditProfile />}
          {activeSection === "Change Password" && <ChangePassword />}
        </ContentArea>
      </Container>
    </div>
  );
};

export default ManageProfile;
