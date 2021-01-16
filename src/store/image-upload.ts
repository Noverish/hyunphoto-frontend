import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadFile } from "src/models";

type State = {
  files: UploadFile[];
  selectedFile: UploadFile | null;
  isUploading: boolean;
};

const initialState = {
  files: [],
  selectedFile: null,
  isUploading: false,
} as State;

const slice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<State>) => payload,
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({ ...state, ...payload }),
    setFiles: (state: State, { payload }: PayloadAction<File[]>) => {
      state.files = payload.map((file) => ({ file, dataURL: '', progress: 0 }))
    },
    updateFile: (state: State, { payload }: PayloadAction<{ origin: UploadFile, update: Partial<UploadFile> }>) => {
      const index = state.files.findIndex(v => v.file === payload.origin.file);
      state.files[index] = { ...payload.origin, ...payload.update };
    },
    deleteFile: (state: State, { payload }: PayloadAction<UploadFile>) => {
      state.files = state.files.filter(v => v.file !== payload.file);
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
