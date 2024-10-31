import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../lib/axios';

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('api/v1/posts');
            return response.data.data.posts; // Assuming response structure
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue("No response received from the server.");
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk for adding a post
export const addPost = createAsyncThunk(
    'posts/addPost',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('api/v1/posts', data);
            return response.data.data.post; // Assuming response structure
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue("No response received from the server.");
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk for editing a post
export const editPost = createAsyncThunk(
    'posts/editPost',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`api/v1/posts/${id}`, data);
            return response.data.data.post; // Assuming response structure
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue("No response received from the server.");
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk for deleting a post
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`api/v1/posts/${id}`);
            return id; // Returning the deleted post's ID for reference
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue("No response received from the server.");
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Post slice
const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handling fetchPosts
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
        // Handling addPost
            .addCase(addPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload); // Add new post to the list
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
        // Handling editPost
            .addCase(editPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload; // Update the post
                }
            })
            .addCase(editPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
        // Handling deletePost
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter(post => post.id !== action.payload); // Remove the deleted post
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export default postSlice.reducer;
