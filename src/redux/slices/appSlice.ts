import { createSlice } from "@reduxjs/toolkit";
import { Estate } from "../../interfaces/estate";
import { RdxPayload } from "../../types/reduxPayload";

export interface AppInfo {
  results: Estate[][] | null;
}

const initialState: AppInfo = {
  results: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setResults: (state, action: RdxPayload<Estate[]>) => {
      const groupData = action.payload.reduce(
        (group: Record<string, Estate[]>, estate: Estate) => {
          const { kadastrs } = estate;

          group[kadastrs] = group[kadastrs] ?? [];
          group[kadastrs].push(estate);

          return group;
        },
        {}
      );

      let groups: Estate[][] = [];

      for (const groupKey in groupData) {
        const group = groupData[groupKey];

        groups = [...groups, group];
      }

      state = {
        ...state,
        results: groups,
      };

      return state;
    },
  },
});

export const { setResults } = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
