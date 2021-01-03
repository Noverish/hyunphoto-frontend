import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  files: File[];
  statusList: {[name: string]: number};
  selectedFile: File | null;
};

const initialState = {
  files: [],
  statusList: {},
  selectedFile: null,
} as State;

const slice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<State>) => payload,
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({ ...state, ...payload }),
    setFiles: (state: State, { payload }: PayloadAction<File[]>) => {
      state.files = payload;
      const newStatusList: State['statusList'] = {};
      for(const file of payload) {
        newStatusList[file.name] = state.statusList[file.name];
      }
      state.statusList = newStatusList;
    },
    updateStatusList: (state: State, { payload }: PayloadAction<{ name: string, status: number }>) => {
      state.statusList[payload.name] = payload.status
    },
    deleteFile: (state: State, { payload }: PayloadAction<File>) => {
      state.files = state.files.filter(v => v !== payload);
      state.selectedFile = null;
      delete state.statusList[payload.name];
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
