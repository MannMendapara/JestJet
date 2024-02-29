import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from './Navbar';
import { Typography } from '@mui/material';

function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [Posts, setPosts] = useState(null);

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
                                    <Typography variant="h4">
                                        Email : {userData.emailID}
                                    </Typography>
                                    <Typography variant="h6">
                                        Posts : {userData.postID.length}
                                    </Typography>
                                </div> 
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Profile
