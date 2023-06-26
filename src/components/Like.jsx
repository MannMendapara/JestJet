import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Like(props) {
    const [like, setLike] = useState(null);

    useEffect(() => {
        const check = props.postData.likes.includes(props.userData.userID);
        setLike(check);
    }, [props.postData, like]);

    const handleLike = async () => {
        if (like) {
            const updatedLikes = props.postData.likes.filter((id) => id !== props.userData.userID);
            const userDocRef = doc(db, 'posts', props.postData.Pid);
            await updateDoc(userDocRef, {
                likes: updatedLikes,
            });
        } else {
            const updatedLikes = props.postData.likes === null
                ? [props.userData.userID]
                : [...props.postData.likes, props.userData.userID];

            const userDocRef = doc(db, 'posts', props.postData.Pid);
            await updateDoc(userDocRef, {
                likes: updatedLikes,
            });
        }
    };

    return (
        <div>
            {like !== null && (
                <>
                    {like ? (
                        <FavoriteIcon className='icon-styling liked' onClick={handleLike} />
                    ) : (
                        <FavoriteIcon className='icon-styling unliked' onClick={handleLike} />
                    )}
                </>
            )}
        </div>
    );
}

export default Like;
