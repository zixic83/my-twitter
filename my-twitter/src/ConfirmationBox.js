import { React, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

function ConfirmationBox({ setOpen, open, deletePost, id }) {
  function handleSubmit() {
    deletePost(id);
    setOpen(false);
  }

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: 200 } }}
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          boxShadow: "none",
        },
      }}
    >
      <DialogContent>
        <DialogContentText>Delete this tweet?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationBox;
