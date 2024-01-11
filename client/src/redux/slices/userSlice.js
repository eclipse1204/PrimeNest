import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    processStart: (state) => {
      state.loading = true;
    },
    processSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    processFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {processStart, processSuccess, processFailure, removeSuccess} = userSlice.actions;
export default userSlice.reducer;
