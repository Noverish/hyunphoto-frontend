import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { generateThumbnail } from 'src/features/generate-thumbnail';
import UploadImage from './upload-image';

interface Props {
  fileList: FileList;
}

export default function UploadImageList({ fileList }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    for(let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      dispatch(generateThumbnail({ file }));
    }
  }, [dispatch, fileList]);

  const imgs = useMemo(() => (
    Array.from(fileList).map((file) => (
      <div key={file.name} className="col">
        <UploadImage file={file} />
      </div>
    ))
  ), [fileList]);

  return (
    <div className="row row-cols-3 g-2">
      {imgs}
    </div>
  )
}
