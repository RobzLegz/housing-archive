import { createSlice } from "@reduxjs/toolkit";
import { Estate } from "../../interfaces/estate";
import { RdxPayload } from "../../types/reduxPayload";

export interface AppInfo {
  results: Estate[][] | null;
  page: number;
  count: number;
  limit: number;
  lastReq: string | null;
}

const initialState: AppInfo = {
  results: null,
  page: 1,
  count: 0,
  limit: 50,
  lastReq: null,
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
    setPage: (state, action: RdxPayload<number>) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    setLimit: (state, action: RdxPayload<number>) => {
      return {
        ...state,
        limit: action.payload,
      };
    },
    setCount: (state, action: RdxPayload<number>) => {
      return {
        ...state,
        count: action.payload,
      };
    },
    setLastReq: (state, action: RdxPayload<string>) => {
      return {
        ...state,
        lastReq: action.payload,
      };
    },
    loadMoreRdx: (state, action: RdxPayload<Estate[]>) => {
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

      if (!state.results) {
        return {
          ...state,
          results: groups,
        };
      }

      return {
        ...state,
        results: [...state.results, ...groups],
      };
    },
  },
});

export const {
  setResults,
  setPage,
  loadMoreRdx,
  setCount,
  setLastReq,
  setLimit,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
