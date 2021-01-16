import { createAction } from '@reduxjs/toolkit';
import { channel } from 'redux-saga';
import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { uploadApi } from 'src/api';
import { UploadFile, UploadFileStatus } from 'src/models';
import { RootActions, RootState } from 'src/store';

export const uploadImagesAction = createAction<undefined>("uploadImages");

const uploadStatusChannel = channel();

function* fetch() {
  const files: UploadFile[] = yield select((state: RootState) => state.imageUpload.files);

  yield put(RootActions.imageUpload.statusToUpload());
  for (const file of files) {
    yield call(uploadApi, file.file, (ratio: number) => {
      uploadStatusChannel.put(RootActions.imageUpload.updateFile({ origin: file, update: { status: UploadFileStatus.UPLOADING, progress: ratio } }));
    });
  }
}

export function* watchUpdateUploadStatus() {
  while (true) {
    const action = yield take(uploadStatusChannel)
    yield put(action)
  }
}

export const sagas = [
  takeEvery(uploadImagesAction.type, fetch),
  watchUpdateUploadStatus(),
];
