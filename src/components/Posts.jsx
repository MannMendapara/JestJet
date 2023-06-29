// React imports
import React, { useState, useEffect } from "react";
// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// Material ui imports
import CircularProgress from "@mui/material/CircularProgress";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
// Components imports
import Video from "./video";
import Like from "./Like";
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
                  <Video src={post.pUrl} className="post-video" />
                  <div className="fa" style={{ display: "flex", gap: "7px" }}>
                    <Avatar
                      src={props.user.profileImage}
                      sx={{ width: 30, height: 30 }}
                    />
                    <h4 style={{ marginTop: "4px", color: "white" }}>{props.user.Fullname}</h4>
                  </div>
                  <Like userData={props.user} postData={post} />
                  <AddCommentIcon className="commnet-icon" onClick={() => handleClickOpen(post.Pid)} />
                  <Dialog
                    open={open === post.Pid}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true"
                    maxWidth="lg"
                  >
                    <div className="modal-cnt">
                      <div className="modal-video-cnt">
                        <video src={post.pUrl} autoPlay="true" muted className="modal-video"></video>
                      </div>
                      <div className="comment-cnt">
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image="/static/images/cards/contemplative-reptile.jpg"
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                Lizard
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              Share
                            </Button>
                          </CardActions>
                        </Card>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image="/static/images/cards/contemplative-reptile.jpg"
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                Lizard
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              Share
                            </Button>
                          </CardActions>
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
