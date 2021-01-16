import { createAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { albumDetailApi } from 'src/api';
import { AlbumDetail } from 'src/models';
import { RootActions } from 'src/store';

type AlbumDetailRequestProps = {
  albumId: number;
}

export const albumDetailRequest = createAction<AlbumDetailRequestProps>("albumDetailRequest");

function* fetch({ payload }: ReturnType<typeof albumDetailRequest>) {
  const { albumId } = payload;

  try {
    const detail: AlbumDetail = yield call(albumDetailApi, albumId);
    yield put(RootActions.album.update({ detail }));
  } catch (err) {
    alert(err);
  }
}

export const sagas = [
  takeEvery(albumDetailRequest.type, fetch),
]
