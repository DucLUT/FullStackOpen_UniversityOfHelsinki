import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog);
  dispatch(addBlog(newBlog));
};

export const likeBlog = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.update(blog.id, {
    ...blog,
    likes: blog.likes + 1,
  });
  dispatch(updateBlog(updatedBlog));
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch(removeBlog(id));
};

export default blogSlice.reducer;