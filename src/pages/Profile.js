import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../components/navBar/NavigationBar";
import ErrorPage from "./ErrorPage";
export default function Profile() {
  const { state } = useLocation();
  const userInfo = state.userInfo;
  console.log("2", userInfo);
  return (
    <div>
      {localStorage.getItem("token") ? (
        <div>
          <NavigationBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "5rem",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Your Profile
            </Typography>
            <TextField
              disabled
              id="outlined-disabled"
              label="First Name"
              sx={{ width: "70%", marginTop: "2rem" }}
              defaultValue={userInfo.firstName}
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Last Name"
              sx={{ width: "70%", marginTop: "2rem" }}
              defaultValue={userInfo.lastName}
            />
            <TextField
              disabled
              id="Email Id"
              label="Email Id"
              sx={{ width: "70%", marginTop: "2rem" }}
              defaultValue={userInfo.emailId}
            />
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
