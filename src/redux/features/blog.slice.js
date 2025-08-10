import { serverURL } from "@/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all blogs
export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAll",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverURL}/blog/all-blogs/?search=${searchQuery}`
      );
      return data.blogs; // Adjust based on your API's actual response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
