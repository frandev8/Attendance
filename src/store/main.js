import { configureStore, createSlice } from "@reduxjs/toolkit";

const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const serverSlice = createSlice({
  name: "serverUrl",
  initialState: serverURL,
});

const store = configureStore({
  reducer: { url: serverSlice.reducer },
});

export default store;
