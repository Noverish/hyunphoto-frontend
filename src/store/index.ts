import { combineReducers } from '@reduxjs/toolkit';
import * as imageUpload from './image-upload';

export const rootReducer = combineReducers({
  imageUpload: imageUpload.reducer,
});

export const RootActions = {
  imageUpload: imageUpload.actions,
}

export type RootState = ReturnType<typeof rootReducer>;
