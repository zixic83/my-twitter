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
    <>
      <Dialog
        open={showBox}
        onClose={() => setShowBox(false)}
        PaperProps={{ sx: { borderRadius: "8px" } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
          }}
        >
          Edit Tweet
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            type="text"
            rows={5}
            multiline
            variant="outlined"
            color="info"
            //https://stackoverflow.com/questions/44671082/how-do-i-programatically-fill-input-field-value-with-react
            value={updateText}
            defaultValue={text}
            onChange={(e) => setUpdateText(e.target.value)}
            sx={{
              width: 500,
              marginTop: 0,
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            marginTop: -2,
            marginBottom: 1,
            marginRight: 2,
          }}
        >
          <Button
            variant="outlined"
            style={{
              textTransform: "none",
              color: "#50b7f5",
              borderColor: "#50b7f5",
            }}
            onClick={() => setShowBox(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ textTransform: "none", backgroundColor: "#50b7f5" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
