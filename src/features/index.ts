import { all } from 'redux-saga/effects';
import * as generateThumbnail from './generate-thumbnail';
import * as uploadImages from './upload-images';

export function* rootSaga() {
  yield all([
    ...generateThumbnail.sagas,
    ...uploadImages.sagas,
  ]);
}
