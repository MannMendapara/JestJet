// React imports
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context imports
import { AuthContext } from "../Context/AuthContext";

// Component imports
import UploadFile from "./UploadFile";


export default function Feed() {
  const navigation = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation("/login");
  };

  return (
    <div>
      <h1>Feed</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
