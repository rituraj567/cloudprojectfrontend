import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../Account";
const Nav = styled("div")({
  width: "100%",
  height: "50px",
  backgroundColor: "white",
  position: "sticky",
  top: 0,
  display: "flex",
  alignItems: "center",
  zIndex: 999,
  fontFamily: "Josefin Sans, sans-serif",
});

const NavLeft = styled("div")({
  flex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const NavIcon = styled(FacebookIcon)({
  fontSize: "20px",
  marginRight: "10px",
  color: "#444",
  cursor: "pointer",
});

const NavCenter = styled("div")({
  flex: 6,
});

const NavList = styled("ul")({
  display: "flex",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  listStyle: "none",
});

const NavListItem = styled("li")({
  marginRight: "20px",
  fontSize: "18px",
  fontWeight: 300,
  cursor: "pointer",
  "&:hover": {
    color: "gray",
  },
});

const NavRight = styled("div")({
  flex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const NavImg = styled("img")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "15px",
  cursor: "pointer",
});

const NavSearchIcon = styled(SearchIcon)({
  fontSize: "18px",
  color: "#666",
  cursor: "pointer",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function NavigationBar({ handleSearchInput }) {
  const [searchName, setSearchName] = useState();
  const { logout, getSession } = useContext(AccountContext);
  const [session, setSession] = useState();
  const [userInfo, setUserInfo] = useState();

  const navigate = useNavigate();

  const fetchUser = async () => {
    const session = await getSession();

    setSession(session);

    console.log("session=>", session);
    setUserInfo({
      userId: session?.idToken?.payload["cognito:username"],
      firstName: session?.idToken?.payload?.given_name,
      lastName: session?.idToken?.payload?.family_name,
      emailId: session?.idToken?.payload?.email,
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Nav>
      <NavLeft>
        <NavIcon />
        <PinterestIcon className="navIcon" />
        <InstagramIcon className="navIcon" />
        <TwitterIcon className="navIcon" />
      </NavLeft>
      <NavCenter>
        <NavList>
          <NavListItem onClick={()=> navigate("/")}>HOME</NavListItem>
          <NavListItem>ABOUT</NavListItem>
          <NavListItem>CONTACT</NavListItem>
          <NavListItem onClick={logout}>LOGOUT</NavListItem>
          <NavListItem
            onClick={() =>
              navigate("/profile", {
                replace: false,
                state: {
                  userInfo: userInfo,
                },
              })
            }
          >
            ACCOUNT
          </NavListItem>
        </NavList>
      </NavCenter>
      <NavRight>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search title"
            onChange={(e) => handleSearchInput(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </NavRight>
    </Nav>
  );
}
