import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialogSlide from "./Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
export function BlogCard(blogData) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  console.log("this is card blog", blogData.data);
  const showData = blogData.data;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleNavigate = (id) => {
  navigate('/add-blog', {
    state: {
      isEdit: true,
      id: id
    }
  });
};
const userId = localStorage.getItem("_id");
// alert(showData.image)
  return (
    <div>
      <Card
        sx={{ maxWidth: 800}}
        className="border-solid border-blue-700 border-2 rounded"
      >
        <CardHeader
         
          title={showData.title}
          subheader={new Date(showData.createdAt).toLocaleString()}
        />
        <CardMedia
  sx={{ height: 194 }}
  image={showData.image}
  title={showData.title}
/>


        <div className="h-[30vh] overflow-y-auto">{showData.description}</div>
         {
          userId== showData.user && <div className="flex justify-end gap-3">
       
         <div onClick={handleClickOpen}>
          <DeleteIcon />
        </div>
        <div onClick={()=>handleNavigate(showData._id)}>
          <EditIcon />
        </div>
       </div>
        }
       


        <AlertDialogSlide open={open} setOpen={setOpen} id={showData._id} />
      </Card>
    </div>
  );
}
