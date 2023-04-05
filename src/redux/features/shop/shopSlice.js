import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
};

export const shopData = createAsyncThunk("auth/shopData", async (data) => {
  try {
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(shopData.pending, (state) => {
        state.isLogin = false;
      })
      .addCase(shopData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLogin = true;
      })
      .addCase(shopData.rejected, (state) => {
        state.isLogin = false;
      });
  },
});

export default shopSlice.reducer;
