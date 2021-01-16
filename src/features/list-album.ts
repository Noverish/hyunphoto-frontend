import { createAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { listAlbumApi } from 'src/api';
import { AlbumPreview } from 'src/models';
import { RootActions } from 'src/store';

export const listAlbumRequest = createAction<undefined>("listAlbumAction");

function* fetch() {
  try {
    const previews: AlbumPreview[] = yield call(listAlbumApi);
    yield put(RootActions.album.update({ previews }));
  } catch (err) {
    alert(err);
  }
}

export const sagas = [
  takeEvery(listAlbumRequest.type, fetch),
]
