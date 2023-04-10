import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const goTologin = () => {
    navigate("/login");
  };
  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "5rem" }}>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Welcome to Blog App
      </Typography>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div>
          <Button
            variant="contained"
            onClick={goTologin}
            sx={{ marginRight: "2rem" }}
          >
            Login
          </Button>
          <Button Button variant="contained" onClick={goToRegistration}>
            Register
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Main;
