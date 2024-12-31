import { useState } from "react";
import userContext from "./UserContext";
const UserState = (props) => {
  const host="https://secret-script-backend.vercel.app";
//   const host = "http://localhost:5005";
  const [user, setUser] = useState(null);
  // const token = localStorage.getItem("token");
  // console.log(token);

  //  Fetch user details
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        throw new Error("Token not found, please log in");
      }

      const response = await fetch(`${host}/auth/userprofile`, {
        method: "GET",
        headers: {
          token, // Correctly set Authorization header
          "Content-Type": "application/json", // Ensure correct Content-Type
        },
      });

      // Check for unauthorized response
      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      // console.log("User Data:", data);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  const editProfile = async (name, email, photoURL) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("photoURL", photoURL);

      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });
      // console.log(photoURL.name); // Logs the file name
      // console.log(photoURL.size); // Logs the file size in bytes
      // console.log(photoURL.type);
      const response = await fetch(`${host}/user/editprofile`, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      // console.log(data);
      // console.log(data.success)
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  return (
    <userContext.Provider value={{ user, setUser, fetchUser, editProfile }}>
      {props.children}
    </userContext.Provider>
  );
};

export { UserState, userContext };
