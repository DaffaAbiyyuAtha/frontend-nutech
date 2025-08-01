import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataProfile: {},
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    datasProfile: (state, action) => {
      state.dataProfile = action.payload;
    },
    removeData: (state) => {
      state.dataProfile = null;
    },
  },
});

export const { datasProfile, removeData } = profile.actions;
export default profile.reducer;
