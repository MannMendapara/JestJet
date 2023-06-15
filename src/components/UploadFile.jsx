// React imports
import React, { useState } from "react";

// Material-ui imports
import { Alert, Box } from "@mui/material";

function UploadFile() {
  // States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>{error !== "" ? <Alert severity="error">{error}</Alert> : 
    (<div>
        
    </div>)}
    </>
  );
}

export default UploadFile;
