import { all } from 'redux-saga/effects';
import * as generateThumbnail from './generate-thumbnail';
import * as uploadImages from './upload-images';
import * as listAlbum from './list-album';

export function* rootSaga() {
  yield all([
    ...generateThumbnail.sagas,
    ...uploadImages.sagas,
    ...listAlbum.sagas,
  ]);
}
