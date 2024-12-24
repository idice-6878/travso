import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;

// Thunk for add to recent search
export const addToRecentSearch = createAsyncThunk(
    'auth/addToRecentSearch',
    async (searchedId ,{ rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/auth/add-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({searchedId})
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);
        }
  
        const data = await response.json();
        // console.log("=====data===in getUserDetails=>", data)
        return data;
      } catch (error) {
        console.log("error in getUserDetails call thunk", error.message)
        return rejectWithValue(error.message);
      }
    }
  );



// Thunk for add to recent search
export const getRecentSearch = createAsyncThunk(
    'auth/getRecentSearch',
    async (_ ,{ rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/auth/add-search`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);
        }
  
        const data = await response.json();
        // console.log("=====data===in getUserDetails=>", data)
        return data;
      } catch (error) {
        console.log("error in getUserDetails call thunk", error.message)
        return rejectWithValue(error.message);
      }
    }
  );

 


  const searchSlice = createSlice({
    name: 'search',
    initialState: {
      loading: false,
      error: null,
      recentSearch: null
    },
    reducers: {
      resetSearchState: (state) => {
        state.loading = null;
        state.error = null;
        state.recentSearch = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Handle addToRecentSearch
        .addCase(addToRecentSearch.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addToRecentSearch.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(addToRecentSearch.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  

  export const { resetSearchState } = searchSlice.actions;

  export default searchSlice.reducer;