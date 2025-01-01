import React, { useState } from "react";
import styled from "styled-components";
import YourProfile from "./YourProfile";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Navbar from "../Navbar";
import { IoLockOpen } from "react-icons/io5";
import { FaUser, FaUserEdit } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 60vw;
  height: 70vh;
  background-color: #181818;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  margin: auto;
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    height: auto;
    margin-top: 20px;
  }
`;

const Sidebar = styled.div`
  flex: 2;
  height: 100%;
  background-color: #282828;
  padding: 20px;
  border-radius: 10px 0 0 10px;
  box-shadow: 2px 0 5px rgba(56, 55, 55, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    border-radius: 10px;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const SidebarItem = styled.div`
  margin: 15px 0;
  padding: 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 570;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(114, 113, 112, 0.2);
    transform: scale(1.05);
  }

  &.active {
    background-color: rgba(255, 165, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 12px;
    margin: 0;
    padding: 10px;
  }
`;

const Icon = styled.div`
  font-size: 16px;
  margin-right: 10px;
  margin-bottom:6px;

  @media (max-width: 768px) {
    margin: 0;
    font-size: 24px;
  }
`;


const EditIcon = styled.div`
  font-size: 20px;
  margin-right: 10px;
 margin-bottom:7px;
  @media (max-width: 768px) {
    margin: 0;
    font-size: 26px;
  }
`;

const PasswordIcon = styled.div`
  font-size: 18px;
  margin-right: 10px;
 margin-bottom:6.5px;
  @media (max-width: 768px) {
    margin: 0;
    font-size: 24.5px;
  }
`;

const ContentArea = styled.div`
  flex: 6;
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
    padding: 15px;
  }
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: transparent;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  text-shadow: 2px 2px 4px rgba(255, 165, 0, 0.6);
  -webkit-background-clip: text;
  margin-top: 80px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-top: 100px;
    font-size: 24px;
  }
`;

const ManageProfile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Heading */}
      <Heading>Manage Your Profile</Heading>

      {/* Main Container */}
      <Container>
        <Sidebar>
          <SidebarItem
            className={activeSection === "Your Profile" ? "active" : ""}
            onClick={() => setActiveSection("Your Profile")}
          >
            <Icon>
              <FaUser />
            </Icon>
            <span>Your Profile</span>
          </SidebarItem>
          <SidebarItem
            className={activeSection === "Edit Profile" ? "active" : ""}
            onClick={() => setActiveSection("Edit Profile")}
          >
            <EditIcon>
              <FaUserEdit />
            </EditIcon>
            <span>Edit Profile</span>
          </SidebarItem>
          <SidebarItem
            className={activeSection === "Change Password" ? "active" : ""}
            onClick={() => setActiveSection("Change Password")}
          >
            <PasswordIcon>
              <IoLockOpen />
            </PasswordIcon>
            <span>Change Password</span>
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
