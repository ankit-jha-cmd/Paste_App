import { createSlice } from "@reduxjs/toolkit";

export const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    paste: localStorage.getItem("paste")
      ? JSON.parse(localStorage.getItem("paste"))
      : [],
  },
  reducers: {
    createNewPaste: (state, action) => {
      state.paste.push(action.payload);
      localStorage.setItem("paste", JSON.stringify(state.paste));
    },
    updatePaste: (state, action) => {
      const ind = state.paste.findIndex(
        (i) => i.pasteId === action.payload.pasteId,
      );
      if (ind >= 0) {
        state.paste[ind].title = action.payload.title;
        state.paste[ind].body = action.payload.body;
        localStorage.setItem("paste", JSON.stringify(state.paste));
      }
    },
    deletePaste: (state, action) => {
      const ind = state.paste.findIndex(
        (i) => i.pasteId === action.payload.pasteId,
      );
      if (ind >= 0) {
        state.paste.splice(ind, 1);
        localStorage.setItem("paste", JSON.stringify(state.paste));
      }
    },
    deleteAllPastes: (state) => {
      state.paste = [];
      localStorage.removeItem("paste");
    },
  },
});

export const { createNewPaste, updatePaste, deletePaste, deleteAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
