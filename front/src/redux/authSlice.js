import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authHeaders: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthHeaders: (state, action) => {
      state.authHeaders = action.payload;
    },
    clearAuthHeaders: (state) => {
      state.authHeaders = null;
    },
  },
});

export const { setAuthHeaders, clearAuthHeaders } = authSlice.actions;
export default authSlice.reducer;