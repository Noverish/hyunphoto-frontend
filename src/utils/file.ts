import { THUMBNAIL_SIZE } from "src/envs";

export function fileToObjectURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (result === null) {
        reject(new Error("ERROR CODE 235839"));
      } else if (typeof result === 'string') {
        reject(new Error("ERROR CODE 083520"));
      } else {
        const blob = new Blob([result], {type: file.type});
        resolve(URL.createObjectURL(blob));
      }
    }
    reader.readAsArrayBuffer(file);
  })
}

function generateThumbnail(source: CanvasImageSource, originWidth: number, originHeight: number) {
  const canvas = document.createElement('canvas');
  canvas.width = THUMBNAIL_SIZE;
  canvas.height = THUMBNAIL_SIZE;

  const scale = Math.max(canvas.width / originWidth, canvas.height / originHeight);
  const x = (canvas.width / 2) - (originWidth / 2) * scale;
  const y = (canvas.height / 2) - (originHeight / 2) * scale;

  canvas.getContext('2d')?.drawImage(source, x, y, originWidth * scale, originHeight * scale);
  const dataURL = canvas.toDataURL();
  canvas.remove();
  return dataURL;
}

function getThumbnailFromImageObjectURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const imageElement = document.createElement("img");
    imageElement.onload = () => {
      resolve(generateThumbnail(imageElement, imageElement.width, imageElement.height));
    }
    imageElement.src = url;
  })
}

// from https://codepen.io/aertmann/pen/mAVaPx
function getThumbnailFromVideoObjectURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const timeupdate = () => {
      if (snapImage()) {
        video.removeEventListener('timeupdate', timeupdate);
        video.pause();
      }
    };
    video.addEventListener('loadeddata', () => {
      if (snapImage()) {
        video.removeEventListener('timeupdate', timeupdate);
      }
    });
    const snapImage = function () {
      const dataURL = generateThumbnail(video, video.videoWidth, video.videoHeight);
      if (dataURL.length > 100000) {
        resolve(dataURL);
        return true;
      }
      return false;
    };
    video.addEventListener('timeupdate', timeupdate);
    video.preload = 'metadata';
    video.src = url;
    // Load video in Safari / IE11
    video.muted = true;
    video.playsInline = true;
    video.play();
  })
}

export async function getThumbnailFromFile(file: File) {
  const url = await fileToObjectURL(file);

  if (file.type.startsWith('image')) {
    return getThumbnailFromImageObjectURL(url);
  } else if (file.type.startsWith('video')) {
    return getThumbnailFromVideoObjectURL(url);
  } else {
    throw new Error("ERROR CODE 550783");
  }
}
