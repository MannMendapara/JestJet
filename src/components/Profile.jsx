import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import Video from "./video";
import Like from "./Like";
import Comment from "./Comment";
import ShowComments from "./ShowComments";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Avatar from "@mui/material/Avatar";
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import "./Profile.css";
import { Source } from '@mui/icons-material';

function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [Posts, setPosts] = useState(null);

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                // to get the doc of given id
                const docRef = doc(db, "users", id);
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
        getUserData(); // called this function for the cleanup
    }, [userData]);

    useEffect(() => {
        const getUserPosts = async () => {
            if (userData != null) {
                let parr = [];
                for (let i = 0; i < userData.postID.length; i++) {
                    let postdata = doc(db, "posts", userData.postID[i]);
                    const postSnap = await getDoc(postdata);
                    if (postSnap) {
                        parr.push(postSnap.data());
                    }
                }
                setPosts(parr);
            }
        }
        getUserPosts();
    }, [userData])

    return (
        <div>
            {
                userData == null || Posts == null ? (
                    <CircularProgress sx={{ marginTop: '1rem' }} />
                ) : (
                    <>
                        <Navbar userData={userData} />
                        <div className="spacer"></div>
                        <div className="container">
                            <div className="upper-part">
                                <div className='profile-img'>
                                    <img src={userData.profileImage} alt="Profile" />
                                </div>
                                <div className="info">
                                    <Typography variant="h5">
                                        Email : {userData.emailID}
                                    </Typography>
                                    <Typography variant="h6">
                                        Posts : {userData.postID.length}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
                            <div className="profile-video">
                                {Posts.map((post, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="videos">
                                                <video src={post.pUrl} className="post-video" onClick={() => handleClickOpen(post.Pid)} />
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
                                                                <Comment postData={post} userData={userData} />
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Profile
