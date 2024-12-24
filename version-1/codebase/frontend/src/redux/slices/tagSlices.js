import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;

// Thunk for getAllTags details
export const getAllTags = createAsyncThunk(
  'auth/getAllTags',
  async (_,{ rejectWithValue }) => {
    try {
    //   const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/tags/get-all-tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
    //   console.log("=====data===in getAllTags=>", data);
      return data;
    } catch (error) {
      console.log("error in getAllTags call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


const tagSlice = createSlice({
  name: 'tagSlice',
  initialState: {
    loading: false,
    error: null,
    allTags: null
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      // Handle getAllTags
      .addCase(getAllTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.allTags = action.payload.data;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default tagSlice.reducer;
