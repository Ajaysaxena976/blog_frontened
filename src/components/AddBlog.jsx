import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { serverURL } from "@/constant";

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const location = useLocation()
  const isEdit = location?.state?.isEdit
  const isEditId = location?.state?.id
useEffect(() => {
  const fetchBlog = async () => {
    if (isEdit && isEditId) {
      try {
        const response = await axios.get(`${serverURL}/blog/get-blog/${isEditId}`);
        console.log("this----------", response);

        // Destructure blog from API response
        const { title, description, image } = response.data.blog;
        
        // Set form data so inputs are pre-filled
        setFormData({ title, description, image });

      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
  };

  fetchBlog();
}, [isEdit, isEditId]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    const id = localStorage.getItem("_id");
    const payload = {
      ...formData,
      user: id,
    };
    try {
      setLoading(true);

     isEdit? (
        await axios.put(
        `${serverURL}/blog/update-blog/${isEditId}`,
        payload
      )
     ):(
        await axios.post(
        `${serverURL}/blog/create-blog/${id}`,
        payload
      )

     )
      toast.success("blog succefully created");
      setLoading(false);
      navigate("/", { state: { userData: payload } });
    } catch (error) {
      console.log(error)
      toast.error("some error found");
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 p-6 border-2 border-solid rounded-lg w-full max-w-md"
      >
        {/* Title */}
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input id="title" value={formData.title} onChange={handleChange} />
          <FormHelperText>Enter your blog title</FormHelperText>
        </FormControl>

        {/* Description */}
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
          <FormHelperText>Write your blog description</FormHelperText>
        </FormControl>

        {/* Image */}
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="image">Image URL</InputLabel>
          <Input id="image" value={formData.image} onChange={handleChange} />
          <FormHelperText>Paste image link</FormHelperText>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          {loading ? "loading" : "Submit Blog"}
        </Button>
      </form>
    </div>
  );
};

export default AddBlog;
