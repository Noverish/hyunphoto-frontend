import { all } from 'redux-saga/effects';
import * as albumList from './album-list';
import * as albumDetail from './album-detail';
import * as generateThumbnail from './generate-thumbnail';
import * as uploadImages from './upload-images';

export function* rootSaga() {
  yield all([
    ...albumList.sagas,
    ...albumDetail.sagas,
    ...generateThumbnail.sagas,
    ...uploadImages.sagas,
  ]);
}
