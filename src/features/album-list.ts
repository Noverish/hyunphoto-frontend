import { createAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { albumListApi } from 'src/api';
import { AlbumPreview } from 'src/models';
import { RootActions } from 'src/store';

export const albumListRequest = createAction<undefined>("albumListRequest");

function* fetch() {
  try {
    const previews: AlbumPreview[] = yield call(albumListApi);
    yield put(RootActions.album.update({ previews }));
  } catch (err) {
    alert(err);
  }
}

export const sagas = [
  takeEvery(albumListRequest.type, fetch),
]
