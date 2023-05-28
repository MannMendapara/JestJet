import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Login.css";
import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'
import image4 from './assets/4.jpg'
import image5 from './assets/5.jpg'
// import SignupGlasses from "./assets/signup_glasses.jpg";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
// import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

export default function Login() {
  const classes = useStyle();

  return (
    <div className="Login-cnt">
      <div className="slider-card">
        <div className="slider-wrapper" variant="outlined">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={5}
            isPlaying={true} // Set isPlaying to true for auto slide
            interval="2800"
          >
            <Slider>
              <Slide index={0}><Image className="slider-img" src={image1}/></Slide>
              <Slide index={1}><Image className="slider-img" src={image2}/></Slide>
              <Slide index={2}><Image className="slider-img" src={image3}/></Slide>
              <Slide index={3}><Image className="slider-img" src={image4}/></Slide>
              <Slide index={4}><Image className="slider-img" src={image5}/></Slide>
            </Slider>
          </CarouselProvider>
      </div>
      </div>

      <div className="Login-card">
        <Card variant="outlined">
          <CardContent>
            <div
              className="signuptxt-cnt"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="subtitle" className={classes.signupText}>
                Login to Memas
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
              label="Password"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <CardActions>
              <Button variant="contained" fullWidth={true}>
                Login
              </Button>
            </CardActions>
          </CardContent>
        </Card>
        <div className={classes.haveanaccount}>
          Don't Have an account?
          <Link style={{ textDecoration: "none" }} to="">
            &nbsp;Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
