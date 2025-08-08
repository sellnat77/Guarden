import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import location, { addLocationParams } from "../../api/location";

export default function AddLocationFormDialog({ token }: { token: string }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addLocation = async (name: string, description: string) => {
    try {
      const newLocation: addLocationParams = {
        name,
        description,
      };
      console.log(token);
      const { data } = await location.add(newLocation, token);
      console.log(data);
    } catch (error) {
      // Handle API errors
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>Add Location</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(
                (formData as FormData).entries(),
              );
              console.log(formJson);
              addLocation(
                formJson.name.toString(),
                formJson.description.toString(),
              );
            },
          },
        }}
      >
        <DialogTitle>New Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new location to your guarden
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="loc-name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="loc-description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
