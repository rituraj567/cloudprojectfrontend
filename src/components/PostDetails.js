import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../Account";
import ErrorPage from "../pages/ErrorPage";
import { NavigationBar } from "./navBar/NavigationBar";

const SinglePost = styled(Box)({
  flex: 9,
  marginTop: "3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SinglePostWrapper = styled(Box)({
  padding: 20,
  paddingRight: 0,
  width: "100%",
});

const SinglePostImg = styled("img")({
  width: "100%",
  height: 300,
  borderRadius: 5,
  objectFit: "cover",
});

const SinglePostTitle = styled(Typography)({
  textAlign: "center",
  margin: "10px",
  fontSize: "28px",
  fontFamily: "Lora, sans-serif",
});

const SinglePostEdit = styled(Box)({
  float: "right",
  fontSize: "16px",
});

const SinglePostIcon = styled(IconButton)({
  marginLeft: "10px",
  cursor: "pointer",
});

const SinglePostInfo = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
  color: "#be9656",
  fontFamily: '"Varela Round", Arial, Helvetica, sans-serif',
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const SinglePostAuthor = styled("b")({
  marginLeft: "5px",
});

const SinglePostDesc = styled(Typography)({
  color: "#666",
  fontSize: "18px",
  lineHeight: "25px",
});

export default function PostDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getSession } = useContext(AccountContext);
  const [session, setSession] = useState();

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(state.post);
  const [userInfo, setUserInfo] = useState(state.userInfo);

  const [commentOpen, setCommentOpen] = useState(false);
  console.log(post);
  const [title, setTitle] = useState(post?.title ? post.title : "");
  const [content, setContent] = useState(post?.content ? post.content : "");
  const [tags, setTags] = useState(post?.tags ? post.tags : "");
  const [image, setImageUrl] = useState(post?.image ? post.image : "");
  const [comments, setComments] = useState(post?.comments ? post.comments : []);
  console.log("comments", comments);
  const token = localStorage.getItem("token");
  const id = state.post.id;

  const handleDeletePost = async () => {
    console.log("id=>", id);
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}/post/`, {
        headers: {
          Authorization: token
        },
        data: {
          id: id
        }
      });
    

    console.log("delete res", response.data);
    navigate("/");
  };

  const fetchPost = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/postid/`,
      {
        id,
      },
      {
        headers: { Authorization: token },
      }
    );
    console.log("response", response.data.post);
    setPost(response.data.post);
    const session = await getSession();

    setSession(session);
    console.log("session", session);

    setUserInfo({
      userId: session?.idToken?.payload["cognito:username"],
      firstName: session?.idToken?.payload?.given_name,
      lastName: session?.idToken?.payload?.family_name,
      emailId: session?.idToken?.payload?.email,
    });
    console.log("userInfo", userInfo?.userId);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleEditPost = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const datePosted = `${year}-${month}-${day}`;

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_SERVER}/post/`,
      {
        userId: userInfo?.userId,
        id,
        title,
        content,
        tags,
        emailId: userInfo?.emailId,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        image,
        author: userInfo?.firstName,
        datePosted,
        comments,
      },
      {
        headers: { Authorization: token },
      }
    );

    console.log("update post response", response.data);
    setPost({
      id,
      title,
      content,
      tags,
      image,
      datePosted,
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      emailId: userInfo?.emailId,
      author: userInfo?.firstName,
      comments,
      userId: userInfo?.userId,
    });
    setOpen(false);
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <NavigationBar />
          <SinglePost>
            <SinglePostWrapper>
              <SinglePostImg src={post?.image} alt={post?.name} />
              <SinglePostTitle variant="h1">
                {post?.title}
                {userInfo?.userId === post?.userId ? (
                  <SinglePostEdit>
                    <SinglePostIcon
                      color="primary"
                      onClick={() => setOpen(true)}
                    >
                      <Edit />
                    </SinglePostIcon>
                    <SinglePostIcon
                      color="error"
                      onClick={() => handleDeletePost()}
                    >
                      <Delete />
                    </SinglePostIcon>
                  </SinglePostEdit>
                ) : null}
              </SinglePostTitle>
              <SinglePostInfo>
                <span>Date Posted: {post.datePosted}</span>
              </SinglePostInfo>
              <SinglePostInfo>
                <span>Tags: {post.tags}</span>
              </SinglePostInfo>
              <SinglePostInfo>
                <span>
                  Author: {post.author}
                </span>
              </SinglePostInfo>
              <SinglePostDesc>{post.content}</SinglePostDesc>
            </SinglePostWrapper>
          </SinglePost>
          <Card maxWidth="sm">
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Edit Post</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="content"
                  label="Content"
                  type="text"
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="tags"
                  label="Tags"
                  type="text"
                  fullWidth
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="image"
                  label="Image (mention the Image URL)"
                  type="text"
                  fullWidth
                  value={image}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleEditPost}>Edit</Button>
              </DialogActions>
            </Dialog>
          </Card>
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
