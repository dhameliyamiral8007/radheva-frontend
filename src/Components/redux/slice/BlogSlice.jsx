import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllBlog, fetchBlogById, fetchPopularBlogs } from '../service/BlogService';

// Async thunk for fetching all blogs
export const getAllBlogs = createAsyncThunk(
  'blog/fetchAllBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllBlog();
      return response.Data || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch blogs");
    }
  }
);

// Async thunk for fetching single blog by ID
export const getBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await fetchBlogById(blogId);
      return response.Data || null;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch blog");
    }
  }
);

// Async thunk for fetching popular blogs
export const getPopularBlogs = createAsyncThunk(
  'blog/fetchPopularBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPopularBlogs();
      return response.Data || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch popular blogs");
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    currentBlog: null,
    popularBlogs: [], // Add this for popular blogs
    loading: false,
    popularLoading: false, // Separate loading state for popular blogs
    error: null,
    currentPage: 1,
    blogsPerPage: 3,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // For getAllBlogs
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.blogs = [];
      })
      // For getBlogById
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
        state.error = null;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentBlog = null;
      })
      // For getPopularBlogs
      .addCase(getPopularBlogs.pending, (state) => {
        state.popularLoading = true;
        state.error = null;
      })
      .addCase(getPopularBlogs.fulfilled, (state, action) => {
        state.popularLoading = false;
        state.popularBlogs = action.payload;
        state.error = null;
      })
      .addCase(getPopularBlogs.rejected, (state, action) => {
        state.popularLoading = false;
        state.error = action.payload;
        state.popularBlogs = [];
      });
  },
});

export const { setCurrentPage, clearError, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;