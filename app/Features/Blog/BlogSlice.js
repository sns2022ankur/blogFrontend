import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT

const initialState = {
    blogs: [],
    responseStatus: "",
    responseMessage: "",
};

export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (blog, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/storeBlog`, blog);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
    try {
        const response = await axios.get(`${baseURL}/fetchAllBlogs`);
        return response.data.blogs;
    } catch (error) {
        return error.response.data.message;
    }
});

export const getBlog = createAsyncThunk(
    "blogs/getBlog", async (blogId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/fetchSingleBlog/${blogId}`);
            return response.data.blog;
        } catch (error) {
            return error.response.data.message;
        }
    });

export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async (blog, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('title', blog.title);
            formData.append('description', blog.description);
            formData.append('file', blog.file);

            const response = await axios.put(`${baseURL}/updateBlog/${blog._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (blogId, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseURL}/deleteBlog/${blogId}`);
            return blogId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Store
            .addCase(createBlog.pending, (state, action) => {
                state.responseStatus = "pending";
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.responseStatus = "success";
                state.responseMessage = "Blog created successfully";
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            })

            // Fetching all
            .addCase(getBlogs.pending, (state, action) => {
                state.responseStatus = "pending";
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.products = action.payload;
                state.responseStatus = "success";
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            })

            // Fetching single
            .addCase(getBlog.pending, (state, action) => {
                state.responseStatus = "pending";
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.products = action.payload;
                state.responseStatus = "success";
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            })

            // Deleting
            .addCase(deleteBlog.pending, (state, action) => {
                state.responseStatus = "pending";
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.responseStatus = "success";
                state.responseMessage = "Blog deleted successfully";
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            })

            // Updating
            .addCase(updateBlog.pending, (state, action) => {
                state.responseStatus = "pending";
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                if (Array.isArray(state.blogs)) {
                    state.blogs = state.blogs.map((blog) =>
                        blog.id === action.payload._id ? action.payload : blog
                    );
                } else {
                    state.blogs = action.payload;
                }
                state.responseStatus = "success";
                state.responseMessage = "Blog updated successfully";
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            });
    },
});

export default blogsSlice.reducer;
