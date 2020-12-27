import React, { useEffect, useMemo } from 'react';
import UploadImage from './upload-image';

interface Props {
  fileList: FileList;
}

export default function UploadImageList({ fileList }: Props) {
  useEffect(() => {
  }, []);

  const imgs = useMemo(() => (
    Array.from({ length: fileList.length }, (_, i) => {
      const file = fileList[i];
      return (
        <div key={file.name} className="col">
          <UploadImage file={file} />
        </div>
      )
    })
  ), [fileList]);

  return (
    <div className="row row-cols-3 g-2">
      {imgs}
    </div>
  )
}
