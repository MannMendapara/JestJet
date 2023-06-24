// React imports
import React, { useState, useEffect } from "react";
// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// Material ui imports
import CircularProgress from "@mui/material/CircularProgress";

function Posts({ userData }) { // Destructuring the props and get the userData
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
      setPost(parr)
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    }
    }
    getPosts();
  }, []);

  return (
    <>
      {post === null || userData === null ? (
        <CircularProgress />
      ) : (
        <div className="video-cnt">
          {
            post.map((video,index) => {
              return (
              <React.Fragment key={index}>
                <div className="videos">

                </div>
              </React.Fragment>
              )
            })
          }
        </div>
      )}
    </>
  );
}

export default Posts;
