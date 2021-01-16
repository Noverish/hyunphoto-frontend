import { combineReducers } from '@reduxjs/toolkit';
import * as imageUpload from './image-upload';
import * as album from './album';

export const rootReducer = combineReducers({
  imageUpload: imageUpload.reducer,
  album: album.reducer,
});

export const RootActions = {
  imageUpload: imageUpload.actions,
  album: album.actions,
}

export type RootState = ReturnType<typeof rootReducer>;
