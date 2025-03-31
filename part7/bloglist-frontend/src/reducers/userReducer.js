import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (user) => (dispatch) => {
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
  dispatch(setUser(user));
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogUser');
  dispatch(clearUser());
};

export default userSlice.reducer;