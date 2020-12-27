import React, { useEffect, useRef, useState } from 'react'
import './upload-image.scss';
import { THUMBNAIL_SIZE } from 'src/envs';
import cs from 'classnames';

interface Props {
  file: File;
}

function resizeImg(dataURL: string, canvas: HTMLCanvasElement): Promise<void> {
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

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      if (dataURL) {
        resolve(dataURL.toString());
      } else {
        reject(new Error(`DataURL of '${file.name}' is null`));
      }
    };
    reader.readAsDataURL(file);
  });
}

export default function UploadImage({ file }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fileToDataURL(file)
      .then((dataURL) => {
        return resizeImg(dataURL, canvasRef.current!);
      })
      .then(() => {
        setLoaded(true);
      })
  }, [file]);

  return (
    <div className="upload-image ratio ratio-1x1">
      <canvas ref={canvasRef} />
      <div className={cs("spinner-container", { 'd-none': loaded })}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    </div>
  )
}
