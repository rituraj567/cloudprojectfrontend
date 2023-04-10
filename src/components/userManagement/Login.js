import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Account";

const StyledLink = styled(Link)({
  color: "#3498db",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const LoginContainer = styled("div")({
  height: "calc(100vh)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background:
    'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("https://images.unsplash.com/photo-1501696461415-6bd6660c6742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")',
  backgroundSize: "cover",
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate, errorMessage, setErrorMessage } =
    useContext(AccountContext);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    authenticate(email, password)
      .then((data) => {
        console.log(`Logged in!`, data);
        setErrorMessage("");
        
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };

  return (
    <LoginContainer>
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
          id="email"
          label="Email"
          sx={{ width: "70%", marginBottom: "1rem" }}
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <FormControl sx={{ width: "70%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            required
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
            onChange={handlePasswordChange}
          />
        </FormControl>
        {errorMessage}
        <p style={{ color: "#2c3e50" }}>
          Not registered? Click <StyledLink to="/register">Register</StyledLink>
        </p>
        <Button
          variant="outlined"
          size="large"
          sx={{ marginTop: "1rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </LoginContainer>
  );
}
