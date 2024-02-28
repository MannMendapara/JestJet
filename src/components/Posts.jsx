// React imports
import React, { useState, useEffect } from "react";
// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// Material ui imports
import CircularProgress from "@mui/material/CircularProgress";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Avatar from "@mui/material/Avatar";
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
// Components imports
import Video from "./video";
import Like from "./Like";
import Comment from "./Comment";
import ShowComments from "./ShowComments";
//css imports
import "./post.css";

function Posts(props) {
  //states
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const getPosts = async () => {
      const collectionRef = collection(db, "posts");
      try {
        const querySnapshot = await getDocs(collectionRef);
        const parr = querySnapshot.docs.map((doc) => ({
          Pid: doc.id,
          ...doc.data(),
        }));
        setPost(parr);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
        // Log the specific error message
        console.error("Firestore Error Message: ", error.message);
        // Set a more informative error message in the state
        setPost([]);
      }
    };
    getPosts();
  }, [props.user, post]);


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
                  <Video src={post.pUrl} className="post-video" />
                  <div className="fa" style={{ display: "flex", gap: "7px" }}>
                    <Avatar
                      src={props.user.profileImage}
                      sx={{ width: 30, height: 30 }}
                    />
                    <h4 style={{ marginTop: "4px", color: "white" }}>{props.user.Fullname}</h4>
                  </div>
                  <div>
                    <Like userData={props.user} postData={post} />
                    <h4 className="likes-count">{post.likes.length}</h4>
                  </div>
                  <AddCommentIcon className="commnet-icon" onClick={() => handleClickOpen(post.Pid)} />
                  <Dialog
                    open={open === post.Pid}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                  >
                    <div className="modal-cnt">
                      <div className="modal-video-cnt">
                        <video src={post.pUrl} muted className="modal-video" controls autoPlay={true}></video>
                      </div>
                      <div className="comment-cnt">
                        <Card variant="outlined" className="show-comment-cnt">
                          <div style={{ overflow: "hidden" }}>
                            <ShowComments PostData={post} />
                          </div>
                        </Card>
                        <Card variant="outlined" className="comment-card">
                          <Comment postData={post} userData={props.user} />
                        </Card>
                      </div>
                    </div>
                  </Dialog>
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

