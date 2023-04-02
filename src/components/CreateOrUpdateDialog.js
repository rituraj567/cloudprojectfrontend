import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
function CreateOrUpdateDialog({ post, callback, isCreate, open, setOpen }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [tags, setTags] = useState(post ? post.tags : "");
  const [image, setImageUrl] = useState(post ? post.image : "");

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isCreate ? "Create Post" : "Edit Post"}</DialogTitle>
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
          {isCreate ? (
            <Button onClick={() => callback()}>Create</Button>
          ) : (
            <Button onClick={() => callback()}>Update</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateOrUpdateDialog;
