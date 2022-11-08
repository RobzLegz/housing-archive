import { createSlice } from "@reduxjs/toolkit";
import { Estate } from "../../interfaces/estate";
import { RdxPayload } from "../../types/reduxPayload";

export interface AppInfo {
  results: Estate[] | null;
}

const initialState: AppInfo = {
  results: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setResults: (state, action: RdxPayload<Estate[]>) => {
      state = {
        ...state,
        results: action.payload,
      };

      return state;
    },
  },
});

export const { setResults } = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
