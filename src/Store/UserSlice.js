import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../lib/axios'
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const request = await axios.post('api/v1/users/login', data);
            const user = request.data.data.user;        
            localStorage.setItem("user", JSON.stringify(user));
            return request.data;
        } catch (error) {
            // If the API throws an error, reject with the error response
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                return rejectWithValue("No response received from the server.");
            } else {
                // Something happened in setting up the request that triggered an Error
                return rejectWithValue(error.message);
            }
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;

                // If the error was rejected with value, it comes from rejectWithValue
                if (action.payload) {
                   
                    state.error = action.payload.errors?.credentials || action.payload;
                } else {
                    state.error = action.error.message;
                }
                
                console.log(action); // Logging the full action for debugging
            });
    }
});

export default userSlice.reducer;
