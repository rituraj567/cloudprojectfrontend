import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../Account";
import Post from "./post/Post";
const PostDiv = styled("div")({
  flex: 9,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "20px",
  justifyContent: "center",
});
function Posts(props) {
  const searchString = props.searchString;
  console.log(searchString);
  const [posts, setBlogPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();
  const { getSession } = useContext(AccountContext);
  const [session, setSession] = useState();
  const [userInfo, setUserInfo] = useState();
  console.log("user", userInfo);
  const token = localStorage.getItem("token");
  const fetchPosts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/posts/`,
      {
        headers: { Authorization: token },
      }
    );

    const filteredPosts = response.data?.posts.filter((post) =>
      post?.title?.toLowerCase().includes((searchString ?? "").toLowerCase())
    );

    const session = await getSession();

    setSession(session);

    console.log("session=>", session);
    setBlogPosts(filteredPosts);
    setUserInfo({
      userId: session?.idToken?.payload["cognito:username"],
      firstName: session?.idToken?.payload?.given_name,
      lastName: session?.idToken?.payload?.family_name,
      emailId: session?.idToken?.payload?.email,
    });
    console.log("user=>", userInfo);
    console.log("post", posts);
  };

  useEffect(() => {
    fetchPosts();
  }, [searchString]);

  // const { userId, emailId, firstName, lastName } = userInfo;
  const handleCreatePost = async () => {
    const id = Math.floor(Math.random() * 1000000).toString();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const datePosted = `${year}-${month}-${day}`;

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/post/`,
      {
        userId: userInfo?.userId,
        id,
        title,
        content,
        tags,
        author:userInfo?.firstName,
        emailId: userInfo?.emailId,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        image,
        datePosted,
        comments,
      },
      {
        headers: { Authorization: token },
      }
    );

    console.log("create post response", response.data);
    setOpen(false);
    setTitle("");
    setContent("");
    setTags("");
    setImageUrl("");
    fetchPosts();
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ marginBottom: "2rem" }}
          onClick={() => setOpen(true)}
        >
          Create Post
        </Button>
      </div>
      <PostDiv>
        {posts.length > 0 &&
          posts.map((post) => <Post post={post} userInfo={userInfo} />)}
        {filteredPosts.length > 0 &&
          filteredPosts.map((post) => <Post post={post} userInfo={userInfo} />)}
      </PostDiv>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Post</DialogTitle>
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
          <Button onClick={handleCreatePost}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Posts;
