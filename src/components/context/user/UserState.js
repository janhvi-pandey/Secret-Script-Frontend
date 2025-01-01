import { useState } from "react";
import userContext from "./UserContext";

const UserState = (props) => {
  const host = "https://secret-script-backend.vercel.app";
  // const host="http://localhost:5005";
  const [user, setUser] = useState(null);

  // Fetch user details
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found, please log in");
      }

      const response = await fetch(`${host}/auth/userprofile`, {
        method: "GET",
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  // Edit user profile
  const editProfile = async (name, email, photoURL) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("photoURL", photoURL);

      const response = await fetch(`${host}/user/editprofile`, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/auth/changepassword`, {
        method: "POST",
        headers: {
          token, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
    
      return data;
    } catch (error) {
      throw new Error(error.message || "Error while changing password");
    }
  };

  return (
    <userContext.Provider value={{ user, setUser, fetchUser, editProfile, changePassword }}>
      {props.children}
    </userContext.Provider>
  );
};

export { UserState, userContext };
