import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlbumDetail, AlbumPreview } from "src/models";

type State = {
  previews: AlbumPreview[];
  detail: AlbumDetail | null;
};

const initialState = {
  previews: [],
  detail: null,
} as State;

const slice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<State>) => payload,
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({ ...state, ...payload }),
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
