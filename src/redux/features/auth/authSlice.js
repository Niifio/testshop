import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  users: null,
  login: "",
  isLogin: false,
  isLoading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      return authService.register(user);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getData = createAsyncThunk("auth/getData", async (thunkAPI) => {
  try {
    return authService.getData();
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      return authService.updateUser(userData);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk("auth/deleteUser", async (id) => {
  try {
    return authService.deleteUser(id);
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLogin = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login = action.payload;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLogin = false;
      });
  },
});

export default authSlice.reducer;
