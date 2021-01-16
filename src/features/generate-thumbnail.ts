import { createAction } from '@reduxjs/toolkit';
import { actionChannel, call, fork, put, take } from 'redux-saga/effects';
import { IMAGE_THREAD_NUM } from 'src/envs';
import { UploadFile } from 'src/models';
import { RootActions } from 'src/store';
import { getThumbnailFromFile } from 'src/utils';

type GenerateThumbnailActionParams = {
  file: UploadFile;
}

export const generateThumbnailAction = createAction<GenerateThumbnailActionParams>("generateThumbnail");

function* process(chan: any) {
  while (true) {
    const { payload }: ReturnType<typeof generateThumbnailAction> = yield take(chan)
    const { file } = payload;

    const dataURL = yield call(getThumbnailFromFile, file.file);
    yield put(RootActions.imageUpload.updateFile({ origin: file, update: { dataURL } }));
  }
}

function* watch() {
  const chan: any = yield actionChannel(generateThumbnailAction.type);

  for (let i = 0; i < IMAGE_THREAD_NUM; i++) {
    yield fork(process, chan)
  }
}

export const sagas = [
  watch(),
];
