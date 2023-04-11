import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Account from "../../Account";
import { UserPool } from "../UserPool";
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAZSP7P3J2S223FFGJ",
  secretAccessKey: "RSeNEGapoxXnFrE424cBRbrbtr+lqF+JjL54hmhF",
  sessionToken: "",
});
const StyledLink = styled(Link)({
  color: "#3498db",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const RegisterContainer = styled("div")({
  height: "calc(100vh)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background:
    'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.unsplash.com/photo-1474533883693-59a44dbb964e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
  backgroundSize: "cover",
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const handleRegister = async () => {
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "given_name", Value: firstName }),
      new CognitoUserAttribute({ Name: "family_name", Value: lastName }),
    ];

    await UserPool.signUp(
      email,
      password,
      attributeList,
      null,
      async (err, result) => {
        if (err) {
          console.log(err);
          setErrorMessage(err.message);
          return;
        }
        console.log("result", result);

        setSuccessMessage(
          "Successfully registered, please login with your credentials"
        );
        setEmail("");
        setPassword("");
        setErrorMessage("");
      }
    );
  };

  return (
    <Account>
      <RegisterContainer>
        <Typography variant="h2" gutterBottom>
          Welcome to the App
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            width: "100%",
          }}
        >
          <TextField
            id="firstName"
            label="FirstName"
            sx={{ width: "70%", marginBottom: "1rem" }}
            variant="outlined"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
          <TextField
            id="lastName"
            label="LastName"
            sx={{ width: "70%", marginBottom: "1rem" }}
            variant="outlined"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
          <TextField
            id="email"
            label="Email"
            sx={{ width: "70%", marginBottom: "1rem" }}
            variant="outlined"
            value={email}
            required
            onChange={handleEmailChange}
          />
          <FormControl sx={{ width: "70%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              required
              onChange={handlePasswordChange}
            />
          </FormControl>
          {errorMessage}
          {successMessage}
          <p style={{ color: "#2c3e50" }}>
            Already a registered user? Click{" "}
            <StyledLink to="/login">Log In</StyledLink>
          </p>
          <Button
            variant="outlined"
            size="large"
            sx={{ marginTop: "1rem" }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </RegisterContainer>
    </Account>
  );
}
