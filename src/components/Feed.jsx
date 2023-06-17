//react imports
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//firebase imports
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
//context imports
import { AuthContext } from "../Context/AuthContext";
//components imports
import UploadFile from "./UploadFile";
//css imports
import "./Feed.css";

export default function Feed() {
  const navigation = useNavigate();
  //states
  const [userData, setUserData] = useState("");

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      // check if user is exist or not if we don't check than it gives an error can not read properties of undefine
      if (user) {
        try {
          // to get the doc of given id
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data()); 
          } else {
            console.log("Data not found");
          }
        } catch (error) {
          console.error("Error in useEffect:", error);
        }
      }
    };

    getUserData(); // called this function for the cleanup
  }, [user]);

  const handleLogout = async () => {
    // for the logout
    await logout();
    navigation("/login");
  };

  return (
    <>
      <div className="cnt">
        <div className="comp">
          <h1>Feed</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        {/* pass userdata to component */}
        <UploadFile user={userData} /> 
      </div>
    </>
  );
}
