import React, { useMemo } from 'react';
import { UploadFile } from 'src/models';
import UploadImage from './upload-image';

interface Props {
  files: UploadFile[];
}

export default function UploadImageList({ files }: Props) {
  const imgs = useMemo(() => (
    files.map((file) => (
      <div key={file.file.name} className="col">
        <UploadImage file={file} />
      </div>
    ))
  ), [files]);

  return (
    <div className="row row-cols-3 g-2">
      {imgs}
    </div>
  )
}
