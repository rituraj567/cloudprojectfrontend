import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function PostDetails() {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  console.log("state", state);
  const [post, setPost] = useState(state.post);
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [tags, setTags] = useState(post ? post.tags : "");
  const [image, setImageUrl] = useState(post ? post.image : "");
  const id = post.id;

  const handleEditPost = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const datePosted = `${year}-${month}-${day}`;

    const response = await axios.put(
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

    console.log("update post response", response.data);
    setPost({ id, title, content, tags, image, datePosted });
    setOpen(false);
  };

  return (
    <Card maxWidth="sm">
      <CardMedia sx={{ height: 140 }} image={post.image} title={post.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {new Date(post.datePosted).toLocaleString()}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {post.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tags: {post.tags}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Likes: {post.likes}
        </Button>
        <Button size="small" color="primary">
          Comments: {post.comments}
        </Button>
      </CardActions>
      <Button
        variant="contained"
        size="large"
        sx={{ marginBottom: "2rem" }}
        onClick={() => setOpen(true)}
      >
        Edit Post
      </Button>
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
          <Button onClick={handleEditPost}>Edit</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
