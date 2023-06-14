// react imports
import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// material ui imports
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";

// image imports
import image1 from "./assets/1.jpg";
import image2 from "./assets/2.jpg";
import image3 from "./assets/3.jpg";
import image4 from "./assets/4.jpg";
import image5 from "./assets/5.jpg";

// imports for image slider
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

// css imports
import "./Login.css";

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
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { login } = useContext(AuthContext);
  const classes = useStyle();
  const navigation = useNavigate();

  const HandleLogin = async () => {
    setLoading(true);
    setError("");

    await login(email, password)
      .then((userCredential) => {
        setLoading(false);
        navigation("/");
      })
      .catch((error) => {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 4000);
        return;
      });
  };

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
              <Slide index={0}>
                <Image className="slider-img" src={image1} />
              </Slide>
              <Slide index={1}>
                <Image className="slider-img" src={image2} />
              </Slide>
              <Slide index={2}>
                <Image className="slider-img" src={image3} />
              </Slide>
              <Slide index={3}>
                <Image className="slider-img" src={image4} />
              </Slide>
              <Slide index={4}>
                <Image className="slider-img" src={image5} />
              </Slide>
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
            {error !== "" && (
              <Alert severity="error" className={classes.alert}>
                {error}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              label="Email"
              type="email"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              variant="standard"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <CardActions>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={HandleLogin}
              >
                Login
              </Button>
            </CardActions>
          </CardContent>
        </Card>
        <div className={classes.haveanaccount}>
          Don't Have an account?
          <Link style={{ textDecoration: "none" }} to="/signup">
            &nbsp;Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
