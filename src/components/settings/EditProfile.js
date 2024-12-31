import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import userContext from "../context/user/UserContext";
import defaultImg from "../../images/def2small.png"; // Default image for fallback
import Loading from "../LoadingDots"; // Import your Loading component
import { FaPen } from "react-icons/fa"; // Pencil icon for editing

// Styled Components
const ProfileContainer = styled.div`
  padding: 50px 0;
  width: 100%;
  height: 90%; /* Adjusted height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 0 20px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
  border-radius: 50%;
  box-shadow: 0 0 25px 0 rgba(249, 241, 241, 0.1);
  padding: 2.5px;
  position: relative;
`;

const Avatar = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`;

const PencilIcon = styled(FaPen)`
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 1.5rem;
  color: white;
  background-color: #d4ac0d;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgb(205, 154, 13);
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #333;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  width: 100%;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 15px;
    text-align: center;
  }
`;

const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 14px;
  background-color: rgb(62, 64, 65);
  color: #fff;
  border: none;
  border-radius: 10px 2px 2px 10px;
  width: 75px;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

const StyledInput = styled.input`
  background-color: #222;
  color: rgb(178, 180, 180);
  border: none;
  padding: 5px;
  border-radius: 2px 10px 10px 2px;
  font-size: 1rem;
  width: 250px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

// Main Component
const EditProfile = () => {
  const { user, fetchUser, editProfile } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchUser();
        setName(user?.name || "");
        setEmail(user?.email || "");
        setProfilePictureUrl(user?.photoURL || defaultImg);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleError = (e) => {
    e.target.src = defaultImg; // Fallback to default image on error
  };

  const handleSave = async () => {
    try {
      setLoading(true);
     console.log({name});
     console.log({imageFile});
      const response = await editProfile(name,email,imageFile);
     console.log(response)
      if (response.success) {
        await fetchUser();
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImageFile(file);
      setProfilePictureUrl(URL.createObjectURL(file));
      // console.log(profilePictureUrl)
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "50vh",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <ProfileContainer>
      <ProfileWrapper>
        <AvatarWrapper>
          <Avatar
            src={profilePictureUrl || defaultImg}
            alt="User Avatar"
            onError={handleError}
          />
          <label htmlFor="profile-picture">
            <PencilIcon />
          </label>
          <input
            type="file"
            accept="image/*"
            id="profile-picture"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
          />
        </AvatarWrapper>

        <ProfileDetails>
          <Detail>
            <Field>Name</Field>
            <StyledInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Detail>
          <Detail>
            <Field>Email</Field>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Detail>
        </ProfileDetails>

        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#d4ac0d",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default EditProfile;
