import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  statusList: {[name: string]: number};
  selectedFile: File | null;
};

const initialState = {
  statusList: {},
  selectedFile: null,
} as State;

const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<State>) => payload,
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({ ...state, ...payload }),
    updateStatusList: (state: State, { payload }: PayloadAction<{ name: string, status: number }>) => { state.statusList[payload.name] = payload.status },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
