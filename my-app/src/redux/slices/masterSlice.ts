import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PUM = {
  type: "error" | "success" | "normal"
  message: string
}

type masterState = {
  PUM: PUM | null
};

const initialState: masterState = {
  PUM: null
};

const master = createSlice({
  name: "master",
  initialState,
  reducers: {
    setMassage(state, action: PayloadAction<PUM>){
      state.PUM = action.payload
    },
    clearMassage(state){
      state.PUM = null
    }
  },
});

export const actions = master.actions;
export default master
