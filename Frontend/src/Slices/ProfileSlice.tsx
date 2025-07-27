import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem, removeItem } from "../Services/LocalStrogeService"; // Ensure removeItem is imported
import { updateProfile } from "../Services/ProfileService";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    ChangeProfile: (state, action) => {
      state = updateProfile(action.payload);
      return action.payload;
    },
    setProfile: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { ChangeProfile, setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
