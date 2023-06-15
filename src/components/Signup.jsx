// react imports
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

// css imports
import "./Signup.css";

// material ui imports
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SignupGlasses from "./assets/signup_glasses.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//context imports
import { AuthContext } from "../Context/AuthContext";

// firebase imports
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// css in form of makeStyle
const useStyles = makeStyles((theme) => ({
  signupText: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  alert: {
    marginTop: "8px",
    fontSize: "20px",
  },
  termsandcondition: {
    textAlign: "center",
    color: "grey",
  },
  haveanaccount: {
    textAlign: "center",
    marginTop: "2px",
  },

  uploadprogress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9b59b6",
    height : "34px",
    width : "91%",
    borderRadius : "5px",
    fontSize: "1rem",
    fontWeight : "bold",
    color : "white"
  },
}));

export default function Signup() {
  
  const classes = useStyles(); // Through this we can access all the css of use style.

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const { signup } = useContext(AuthContext);

  // on click of Sign-up button
  const handleClick = async () => {
    if (file === null) {
      setError("Please upload a profile image first");
      setTimeout(() => {
        setError("");
      }, 4000); // error remove from display after some time
      return;
    }

    try {
      // For the signup for user
      setError("");
      setLoading(true);
      const userObj = await signup(email, password);
      const uid = userObj.user.uid;
      console.log(uid);
      setLoading(false);

      // for storing the profile picture in FireStorage
      setUploadProgress(2)  
      const storageRef = ref(storage, `/users/${uid}/ProfileImage`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress updates or other snapshot changes
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);  // for displaying the uploading percentage
        },
        (error) => {
          // Handle unsuccessful upload
          setError(error);
          setTimeout(() => {
            setError("");
          }, 4000);
          setLoading(false);
          return;
        },
        async () => {
          // Handle successful upload
          console.log("Upload completed!");

          // Get the download URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Download URL:", downloadURL);

            // Store the download URL in the database
            const userRef = doc(db, "users", uid);
            await setDoc(
              userRef,
              {
                Fullname: name,
                userID: uid,
                emailID: email,
                profileImage: downloadURL,
                timestamp: serverTimestamp(),
              },
              { merge: true }
            );
            navigation("/login");
          } catch (error) {
            console.error(
              "Error getting download URL or storing it in the database:",
              error
            );
          }
        }
      );
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 4000);
      setLoading(false);
    }
  };

  return (
    <div className="signup-cnt">
      <div className="signup-card">
        <Card variant="outlined">
          <div className="Signup-img">
            <img src={SignupGlasses} alt=" " className="image" />
          </div>
          <CardContent>
            <div
              className="signuptxt-cnt"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="subtitle" className={classes.signupText}>
                Signup to Memas
              </Typography>
            </div>
            {error !== "" && (
              <Alert severity="error" className={classes.alert}>
                {error}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              label="Name"
              type="text"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Email"
              type="email"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="Password"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {uploadProgress === 0 ? (
              <Box m={2}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth={true}
                  color="secondary"
                  component="label"
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  {/* here the input is wraps in the button called upload */}
                  Upload profile picture
                </Button>
              </Box>
            ) : (
              <Box m={2} className={classes.uploadprogress}>
                <div className="upload">
                  Uploading {uploadProgress.toFixed(0)}%
                </div>
              </Box>
            )}

            <CardActions>
              <Button
                variant="contained"
                fullWidth={true}
                disabled={loading} // while loading is true button don't work
                onClick={handleClick}
              >
                Sign Up
              </Button>
            </CardActions>
            <div variant="subtitle" className={classes.termsandcondition}>
              All the terms and conditions apply
            </div>
          </CardContent>
        </Card>
        <div className={classes.haveanaccount}>
          Having an account?&nbsp;
          <Link style={{ textDecoration: "none" }} to="/login">
            {/* For navigating to the login page */}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
