import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Signup.css";
import SignupGlasses from "./assets/signup_glasses.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../Context/AuthContext";
import { storage,db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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
}));

export default function Signup() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleClick = async () => {
    if (file === null) {
      setError("Please upload a profile image first");
      setTimeout(() => {
        setError("");
      }, 5000); // error remove from display after some time
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
      const storageRef = ref(storage, `/users/${uid}/ProfileImage`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress updates or other snapshot changes
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          // Handle unsuccessful upload
          setError(error);
          setTimeout(() => {
            setError("");
          }, 5000);
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
              { profileImage: downloadURL },
              { merge: true }
            );
            console.log("Download URL stored in the database!");
            
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
      }, 5000);
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
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
                Upload profile picture
              </Button>
            </Box>
            <CardActions>
              <Button
                variant="contained"
                fullWidth={true}
                disabled={loading}
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
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
