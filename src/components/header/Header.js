import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";

const HeaderContainer = styled("div")({
  position: "relative",
  marginTop: 60,
});

const HeaderTitles = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "Lora, serif",
  color: "#444",
});

const HeaderTitleSm = styled(Typography)({
  position: "absolute",
  top: "18%",
  fontSize: 20,
});

const HeaderTitleLg = styled(Typography)({
  position: "absolute",
  top: "20%",
  fontSize: 100,
  "@media (max-width: 600px)": {
    fontSize: 60,
  },
});

const HeaderImg = styled("img")({
  width: "100%",
  height: 450,
  marginTop: 80,
  objectFit: "cover",
});

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitles>
        <HeaderTitleLg variant="h1">BLOG</HeaderTitleLg>
      </HeaderTitles>
      <HeaderImg
        src="https://i.pinimg.com/originals/66/44/b3/6644b34c91f57f8d40a4eaa94e3cb797.png"
        alt=""
      />
    </HeaderContainer>
  );
};

export default Header;
