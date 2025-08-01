import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    selected: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.selected = action.payload;
    },
    clearProduct: (state) => {
      state.selected = null;
    }
  }
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;