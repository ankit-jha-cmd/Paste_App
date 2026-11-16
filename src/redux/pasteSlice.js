import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    paste: localStorage.getItem('paste') ? JSON.parse(localStorage.getItem('paste')) : []

  },
  reducers: {
    createNewPaste: (state, action) => {
      // need to know about state and action and payload.]
      state.paste.push(action.payload)
      localStorage.setItem('paste', JSON.stringify(state.paste))
      toast("Paste created successfully!")
    },
    updatePaste: (state, action) => {
      const index = state.paste.find((i) => i.pasteId === action.payload.pasteId)
    

    },
    viewPaste: (state, action) => {

    },
    deletePaste: (state, action) => {

    },
    deleteAllPastes: (state, action) => {

    }
  }
})

export const { createNewPaste, updatePaste, viewPaste, deletePaste, deleteAllPastes } = pasteSlice.actions

export default pasteSlice.reducer