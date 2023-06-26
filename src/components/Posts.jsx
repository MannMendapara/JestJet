// React imports
import React, { useState, useEffect } from "react";
// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// Material ui imports
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
// Components imports
import Video from "./video";
import Like from "./Like";
//css imports
import "./post.css";

function Posts(props) {
  //states
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      const collectionRef = collection(db, "posts");
      try {
        const querySnapshot = await getDocs(collectionRef);
        const parr = [];
        querySnapshot.docs.forEach((doc) => {
          const data = { Pid: doc.id, ...doc.data() };
          parr.push(data);
        });
        setPost(parr);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    getPosts();
  }, []);
  return (
    <>
      {post === null || props.user === null ? (
        <CircularProgress />
      ) : (
        <div className="video-cnt">
          {post.map((post, index) => {
            return (
              <React.Fragment key={index}>
                <div className="videos">
                  <Video src={post.pUrl} />
                  <div className="fa" style={{ display: "flex", gap: "7px" }}>
                    <Avatar
                      src={props.user.profileImage}
                      sx={{ width: 30, height: 30 }}
                    />
                    <h4 style={{ marginTop: "4px", color: "white" }}>{props.user.Fullname}</h4>
                  </div>
                  <Like userData={props.user} postData={post}/>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Posts;
