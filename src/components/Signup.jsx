import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Signup.css";
import SignupGlasses from "./assets/signup_glasses.jpg";
// import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { CenterFocusStrong } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
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
  const classes = useStyle();

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
            {true && (
              <Alert severity="error" className={classes.alert}>
                email has been already registered
              </Alert>
            )}
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="standard-basic"
              label="email"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <Box m={2}>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth={true}
                color="secondary"
                component="label"
              >
                <input type="file" accept="image/*" hidden />
                Upload profile picture
              </Button>
            </Box>
            <div variant="subtitle" className={classes.termsandcondition}>
              All the terms and conditions apply
            </div>
          </CardContent>
        </Card>
        <div className={classes.haveanaccount}>
          Having an account?
          <Link style={{ textDecoration: "none" }} to="">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
