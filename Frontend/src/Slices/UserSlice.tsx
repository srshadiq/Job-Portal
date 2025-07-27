import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem, removeItem } from "../Services/LocalStrogeService"; // Ensure removeItem is imported

const UserSlice = createSlice({
  name: "user",
  initialState: getItem("user"),
  reducers: {
    setUser: (state, action) => {
      setItem("user", action.payload);
      state = action.payload; // Directly use the payload instead of reading from localStorage again
      return state;
    },
    removeUser: (state) => {
      removeItem("user"); // Clear the user data from localStorage
      state = null;
      return state;
    },
  },
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
