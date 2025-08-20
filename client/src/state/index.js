import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light"; // checking and assinging the value of state
    },
  },
});

// export the actions and the state

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
