import { all } from 'redux-saga/effects';
import * as generateThumbnail from './generate-thumbnail';

export function* rootSaga() {
  yield all([
    ...generateThumbnail.sagas,
  ]);
}
