import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import CardComponent from "./Card";
import axios from "axios";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Posts() {
  const [posts, setBlogPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImageUrl] = useState("");
  const navigate = useNavigate();
  const fetchPosts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/posts/`
    );
    console.log("posts", response.data);
    setBlogPosts(response.data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    console.log("id", id);
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}/post/`,
      {
        data: { id: `${id}` },
      }
    );

    console.log(response.data);
    fetchPosts();
  };

  console.log("posts", posts);

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
        id,
        title,
        content,
        tags,
        image,
        datePosted,
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
    <Container maxWidth="sm" sx={{ marginTop: "4rem" }}>
      <Button
        variant="contained"
        size="large"
        sx={{ marginBottom: "2rem" }}
        onClick={() => setOpen(true)}
      >
        Create Post
      </Button>
      {posts.length > 0 &&
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card maxWidth="sm">
              <CardMedia
                sx={{ height: 140 }}
                image={post.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                {post.tags ? <Button size="small">{post.tags}</Button> : null}
                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/post/${post.id}`, {
                      replace: false,
                      state: {
                        post: post,
                      },
                    })
                  }
                >
                  Read More
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>{" "}
          </div>
        ))}
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
    </Container>
  );
}

export default Posts;
