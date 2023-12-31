import React, { useState, useContext,useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { UserContext } from "./UserContext";

function SettingForm({ setOpen, open, currentName, currentAvatar }) {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentAvatar);

  const { updateUser, setUser } = useContext(UserContext);

  async function handleSubmit() {
    // handle, avatar
    const updatedUser = await updateUser(name, avatar);
    setUser({ name: updatedUser.data.name, avatar: updatedUser.data.avatar });

    setOpen(false);
  }

/*   useEffect(() => {
    const func = async () => {
      const currentUser = await axios.get(`http://localhost:5000/user`);
      setName(currentUser.data[0].name);
      setAvatar(currentUser.data[0].avatar);
    };
    func();
  }, []); */



  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Profile Settings</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Handle"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={currentName}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Avatar"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={currentAvatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingForm;
