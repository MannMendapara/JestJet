// React imports
import React, { useState } from "react";

// Material-ui imports
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LinearProgress from '@mui/material/LinearProgress';

function UploadFile() {
  // States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {error !== "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            style={{ display: "none" }}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              disabled={loading}
              style={{ color: "red", border: "1px solid red" }}
              component="span"  // for toggling the input pop up
            >
              <VideoLibraryIcon></VideoLibraryIcon> &nbsp; Upload Video
            </Button>
          </label>
          {loading && <LinearProgress color="secondary" style={{marginTop:"3%"}} />}
        </div>
      )}
    </>
  );
}

export default UploadFile;
