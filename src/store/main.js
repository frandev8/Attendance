import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getAdminId, getSignUpPersonal, getUserId } from "../../utils/auth";
const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const user = { userId: getUserId() ? getUserId() : "" };
const admin = { adminId: getAdminId() ? getAdminId() : "" };
const register = { personal: JSON.parse(getSignUpPersonal()) };

// server
const serverSlice = createSlice({
  name: "serverUrl",
  initialState: serverURL,
});

// user
const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    saveUserId(state, action) {
      state.userId = action.payload?.userId;
    },
  },
});

// admin
const adminSlice = createSlice({
  name: "admin",
  initialState: admin,
  reducers: {
    saveAdminId(state, action) {
      state.adminId = action.payload?.adminId;
    },
  },
});

const registerSlice = createSlice({
  name: "register",
  initialState: register,
  reducers: {
    savePersonalDetails(state, action) {
      state.personal = action.payload?.personalData;
    },
    savePrivateDetails(state, action) {
      state.private = action.payload?.privateData;
    },
  },
});

export const { saveUserId } = userSlice.actions;
export const { saveAdminId } = adminSlice.actions;
// export const { saveEmployeePersonalDetails, saveEmployeePrivateDetails } =
//   signUpEmployeeSlice.actions;
export const { savePersonalDetails, savePrivateDetails } =
  registerSlice.actions;

const store = configureStore({
  reducer: {
    url: serverSlice.reducer,
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    register: registerSlice.reducer,
  },
});
export default store;
