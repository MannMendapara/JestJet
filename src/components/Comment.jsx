// React imports
import React, { useEffect, useState } from 'react'
// Material-ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Comment(props) {
    // states
    const [comment, setComment] = useState("");

    const handleClick = async () => {
        if(comment){
            
        }
    }

    useEffect(() => {
        
    })  

    return (
        <div>
            <div className="comment-act-cnt">
                <TextField
                    id="outlined-basic"
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
