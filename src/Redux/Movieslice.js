import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../services/baseurl';



// to handle adding movies
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


// to get all movies
export const fetchAllMovies = createAsyncThunk(
  'movies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const reqheader = {
        'Content-Type': 'application/json',
      };
      const response = await axios.get(`${BASE_URL}/movies/view`, { headers: reqheader }); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// to edit movies
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


// delete movie
export const deleteMovie = createAsyncThunk(
  '/movie/remove/',
  async (id, { rejectWithValue, dispatch }) => {

    try {
      const reqheader = { "Content-Type": "application/json" };
      const response = await axios.delete(`${BASE_URL}/movie/remove/${id}`, { headers: reqheader });

      dispatch(fetchAllMovies());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// add reviews
export const addReviewss = createAsyncThunk(
  '/reviews/add',
  async (ReviewsData, { rejectWithValue }) => {
    try {
      const { reqbody, reqheader } = ReviewsData;
      const response = await axios.post(`${BASE_URL}/reviews/add`, reqbody, { headers: reqheader });
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

      // to handle add actions
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


      // to handle fetchmovies actions
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

  
      // to handle update movie actions
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
      })


      // to handle delete movie actions
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = state.films.filter(film => film.id !== action.meta.arg);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

  
      // to handle add reviews actions
      .addCase(addReviewss.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReviewss.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films.push(action.payload);
      })
      .addCase(addReviewss.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
