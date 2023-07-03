// React imports
import React, { useEffect, useState } from 'react'
// Material-ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// firebase imports
import { db } from "../firebase";
import {
    doc,
    updateDoc,
    addDoc,
    collection,
} from "firebase/firestore";

function Comment(props) {
    // states
    const [comment, setComment] = useState("");

    const handleClick = async () => {
        if (comment) {
            const obj = {
                text: comment,
                uProfileImg: props.userData.profileImage,
                uName: props.userData.Fullname
            }

            const userRef = collection(db, "comment");
            const dataRef = await addDoc(userRef, obj);

            const commentID = dataRef.id
            const userDocRef = doc(db, "posts", props.postData.Pid);
            await updateDoc(userDocRef, {
                comments:
                    props.postData.comments === null ? [commentID] : [...props.postData.comments, commentID],
            });
            setComment('')
        }
    }

    useEffect(() => {

    })

    return (
        <div>
            <div className="comment-act-cnt">
                <TextField
                    id="outlined-basic"
                    style={{ width: "60%" }}
                    size="small"
                    label="Comment here"
                    variant="outlined"
                    maxwidth="lg"
                    className="comment-inpt"
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }} />
                <Button color="secondary" size='small' onClick={handleClick} >Post</Button>
            </div>
        </div>
    )
}

export default Comment
