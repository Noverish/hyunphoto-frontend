import { createAction } from '@reduxjs/toolkit';
import { actionChannel, call, fork, put, take } from 'redux-saga/effects';
import { IMAGE_THREAD_NUM, THUMBNAIL_SIZE } from 'src/envs';
import { RootActions } from 'src/store';
import { fileToDataURL } from 'src/utils';

type GenerateThumbnailParams = {
  file: File;
}

export const generateThumbnail = createAction<GenerateThumbnailParams>("generateThumbnail");

function drawToCanvas(dataURL: string, canvas: HTMLCanvasElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      canvas.width = THUMBNAIL_SIZE;
      canvas.height = THUMBNAIL_SIZE;
      const ctx = canvas.getContext('2d');

      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      ctx?.drawImage(img, x, y, img.width * scale, img.height * scale);
      resolve();
      img.remove();
    }
    img.src = dataURL;
  });
}

function* process(chan: any, i: number) {
  while (true) {
    const { payload }: ReturnType<typeof generateThumbnail> = yield take(chan)
    const { file } = payload;

    const dataURL = yield call(fileToDataURL, file);
    yield put(RootActions.imageUpload.updateStatusList({ name: file.name, status: 1 }));

    const canvas = document.getElementById(btoa(file.name)) as HTMLCanvasElement;
    yield call(drawToCanvas, dataURL, canvas);
    yield put(RootActions.imageUpload.updateStatusList({ name: file.name, status: 2 }));
  }
}

function* watch() {
  const chan: any = yield actionChannel(generateThumbnail.type);

  for (let i = 0; i < IMAGE_THREAD_NUM; i++) {
    yield fork(process, chan, i)
  }
}

export const sagas = [
  watch(),
];
