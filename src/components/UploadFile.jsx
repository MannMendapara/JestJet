// react imports
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// material ui imports
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LinearProgress from "@mui/material/LinearProgress";
// firebase imports
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";

function UploadFile(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (file) => {

    if (file === null) {
      setError("Please select a file first");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (file.size / (1024 * 1024) > 100) {
      setError("File size is greater than 100 mb");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setLoading(true);
    const uid = uuidv4();
    const storageRef = ref(storage, `/posts/${uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const userRef = doc(db, "posts", uid);
          setDoc(userRef, {
            likes: [],
            comments: [],
            pId: uid,
            pUrl: downloadURL,
            uName: props.user.Fullname,
            uProfile: props.user.profileImage,
            uId: props.user.userID,
            createdAt: serverTimestamp(),
          })
            .then(async () => {
              const userRef = doc(db, "users", props.user.userID);
              updateDoc(userRef, {
                postID:
                  props.user.postID === 0
                    ? [uid]
                    : [...props.user.postID, uid],
              }).then(() => {
                console.log("update is successful") 
                setLoading(false);
              })
            })
            .catch((error) => {
              setError(error);
            });
        } catch (error) {
          setError(error);
        }
      }
    );
  };

  return (
    <>
      {error !== "" && typeof error === "string" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            style={{ display: "none" }}
            onChange={(e) => handleChange(e.target.files[0])}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              disabled={loading}
              style={{ color: "red", border: "1px solid red" }}
              component="span"
            >
              <VideoLibraryIcon></VideoLibraryIcon> &nbsp; Upload Video
            </Button>
          </label>
          {loading && (
            <LinearProgress color="secondary" style={{ marginTop: "3%" }} />
          )}
        </div>
      )}
    </>
  );
}

export default UploadFile;
