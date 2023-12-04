import { configureStore, createSlice } from "@reduxjs/toolkit";

const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
const user = { userId: "" };
const admin = { adminId: "" };

const serverSlice = createSlice({
  name: "serverUrl",
  initialState: serverURL,
});

const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    saveUserId(state, action) {
      state.userId = action.payload?.userId;
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: admin,
  reducers: {
    saveAdminId(state, action) {
      state.adminId = action.payload?.adminId;
    },
  },
});

export const { saveUserId } = userSlice.actions;
export const { saveAdminId } = userSlice.actions;

const store = configureStore({
  reducer: {
    url: serverSlice.reducer,
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});
export default store;
