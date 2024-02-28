// React imports
import React, { useState, useEffect } from "react";
// Firebase imports
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';

function ShowComments(props) {
    const [comments, setComments] = useState();

    useEffect(() => {
        const getPosts = async () => {
            const parr = []
            for (let i = 0; i < props.PostData.comments.length; i++) {
                try {
                    const commentDocRef = doc(db, 'comment', props.PostData.comments[i]);
                    const commentDocSnapshot = await getDoc(commentDocRef);
                    if (commentDocSnapshot.exists()) {
                        const data = commentDocSnapshot.data();
                        parr.push(data)
                    }
                } catch (error) {
                    console.error('Error fetching comment:', error);
                }
            };
            setComments(parr)
        }
        getPosts();
    }, [props.PostData]);

    return (
        <div>
            {comments &&
                comments.map((commentObj, index) => (
                    <div key={index} style={{ display: "flex", marginBottom: "3px" }}>
                        <img src={commentObj.uProfileImg} style={{ height: "25px", width: "25px", borderRadius: "50%", marginRight: "5px" }} alt="..." />
                        <p style={{ marginTop: "1px", fontWeight: "bold" }}>{commentObj.text}</p>
                    </div>
                ))}
        </div>
    );
}

export default ShowComments;
