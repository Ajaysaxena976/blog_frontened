import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import toast from "react-hot-toast";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { fetchAllBlogs } from "../redux/features/blog.slice";
import { serverURL } from "@/constant";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, id }) {
    const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${serverURL}/blog/delete-blog/${id}`
      );

      setOpen(false);
       dispatch(fetchAllBlogs());
      
    } catch (err) {
      toast.error("error while deleteing");
      console.log("this is error in catch")
      console.log(err)
    }
  };

   

  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this blog post?  
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
