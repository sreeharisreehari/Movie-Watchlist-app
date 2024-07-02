
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../services/baseurl';

// Async thunk to handle the API call
export const addmovies = createAsyncThunk(
  '/movies/add',
  async (MovieesData, { rejectWithValue }) => {
    try {
      const { reqbody, reqheader } = MovieesData;
      const response = await axios.post(`${BASE_URL}/movies/add`, reqbody, { headers: reqheader });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const fetchAllMovies = createAsyncThunk(
    '/movies/view',
    async (_, { rejectWithValue }) => {
      try {
        const reqheader = {
          'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BASE_URL}/movies/view`,{ headers: reqheader }); 
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  // Async thunk to handle the API call for updating a movie
export const updatemovie = createAsyncThunk(
    '/movie/edit/',
    async (MovieesData, { rejectWithValue }) => {
      try {
        const { id, reqbody, reqheader } = MovieesData;
        const response = await axios.put(`${BASE_URL}/movie/edit/${id}`, reqbody, { headers: reqheader });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const movieSlice = createSlice({
    name: 'films',
    initialState: {
      films: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
         // Handle addMovies actions
      .addCase(addmovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addmovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films.push(action.payload);
      })
      .addCase(addmovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle fetchMovies actions
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle updateMovie actions
      .addCase(updatemovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatemovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.films.findIndex((film) => film.id === action.payload.id);
        if (index !== -1) {
          state.films[index] = action.payload;
        }
      })
      .addCase(updatemovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
