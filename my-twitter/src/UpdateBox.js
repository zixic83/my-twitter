import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateBox({ updatePost,id,text,setShowBox,showBox }) {
  const [updateText, setUpdateText] = useState(text);

  function handleSubmit() {
    updatePost(id, updateText);
    setShowBox(false);
  }

  return (
    <div>
      <Dialog open={showBox} onClose={() => setShowBox(false)}>
        <DialogTitle>Update Tweet</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            type="text"
            rows={5}
            multiline
            variant="outlined"
            //https://stackoverflow.com/questions/44671082/how-do-i-programatically-fill-input-field-value-with-react
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            sx={{
              width: 500,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBox(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
