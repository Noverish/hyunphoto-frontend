import { combineReducers } from '@reduxjs/toolkit';
import * as main from './main';

export const rootReducer = combineReducers({
  main: main.reducer,
});

export const RootActions = {
  main: main.actions,
}

export type RootState = ReturnType<typeof rootReducer>;
