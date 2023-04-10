import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const PostContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
  width: 350,
  alignItems: "center",
  margin: "0px 25px 40px 25px",
  borderRadius: 7,
});

const PostImage = styled(CardMedia)({
  height: 280,
  borderRadius: 7,
});

const PostInfo = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const PostCategory = styled(Typography)({
  fontFamily: "Varela Round, Arial, Helvetica, sans-serif",
  fontWeight: 400,
  fontSize: 11,
  color: "#be9656",
  lineHeight: 1.3,
  marginTop: 15,
  marginRight: 10,
  cursor: "pointer",
});

const PostTitle = styled(Typography)({
  fontFamily: "Josefin Sans, Arial, Helvetica, sans-serif",
  fontSize: 24,
  fontWeight: 900,
  marginTop: 15,
  cursor: "pointer",
});

const PostDate = styled(Typography)({
  fontFamily: "Lora, serif",
  fontStyle: "italic",
  fontSize: 13,
  fontWeight: 400,
  color: "#999999",
  marginTop: 15,
});

const PostDescription = styled(Typography)({
  fontFamily: "Varela Round, Arial, Helvetica, sans-serif",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.6,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1rem",
  color: "#444444",
  marginTop: 15,
});

export default function Post(props) {
  const { image, title, content, tags,author  } = props.post;
  
  const navigate = useNavigate();
  console.log("userInfo", props.userInfo);
  const MAX_LENGTH = 100;
  const ELLIPSIS = "...";
  function shortenText(text) {
    if (text.length <= MAX_LENGTH) {
      return text;
    }
    return text.substring(0, MAX_LENGTH) + ELLIPSIS;
  }

  return (
    <PostContainer
      sx={{ cursor: "pointer" }}
      onClick={() =>
        navigate(`/post/${props.post.id}`, {
          replace: false,
          state: {
            post: props.post,
            userInfo: props.userInfo,
          },
        })
      }
    >
      <PostImage component="img" src={image} alt={title} />
      <PostInfo>
        <div>
          <PostCategory variant="body1">
            <Link className="link" to="/posts?cat=Music">
              {tags}
            </Link>
          </PostCategory>
        </div>
        <PostTitle variant="h5">{title}</PostTitle>
        <p>Author: {author}</p>
        <hr />
      </PostInfo>
      <PostDescription variant="body1">{shortenText(content)}</PostDescription>
    </PostContainer>
  );
}
