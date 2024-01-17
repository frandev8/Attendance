import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getAdminId, getSignUpPersonal, getUserId } from "../../utils/auth";
const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const user = { userId: getUserId() ? getUserId() : "" };
const admin = { adminId: getAdminId() ? getAdminId() : "" };
const timeOff = { isModalOpen: false, isViewModalOpen: false };
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

// admin
const timeOffSlice = createSlice({
  name: "timeOff",
  initialState: timeOff,
  reducers: {
    closeTimeOffModal(state) {
      state.isModalOpen = false;
    },
    openTimeOffModal(state) {
      state.isModalOpen = true;
    },
    closeViewTimeOffModal(state) {
      state.isViewModalOpen = false;
    },
    openViewTimeOffModal(state) {
      state.isViewModalOpen = true;
    },
  },
});

export const {
  closeTimeOffModal,
  openTimeOffModal,
  closeViewTimeOffModal,
  openViewTimeOffModal,
} = timeOffSlice.actions;
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
    timeOff: timeOffSlice.reducer,
  },
});
export default store;
