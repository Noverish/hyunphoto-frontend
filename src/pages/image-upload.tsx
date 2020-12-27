import React, { useCallback, useState } from 'react';
import { uploladApi } from 'src/api/upload';
import { UploadImageList } from 'src/components';

export default function ImageUploadPage() {
  const [fileList, setFileList] = useState(null as FileList | null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  }, []);

  const onUpload = useCallback(() => {
    if (!fileList) {
      return;
    }

    const promises = Array.from({ length: fileList.length }, (_, i) => uploladApi(fileList[i], (ratio: number) => {
      console.log(fileList[i].name, ratio);
    }));

    Promise.all(promises)
      .then(() => alert('done'));
  }, [fileList]);

  return (
    <>
      <div className="input-group mb-3">
        <input type="file" className="form-control" onChange={onChange} multiple accept="image/*" />
        <button type="button" className="btn btn-primary" onClick={onUpload}>업로드</button>
      </div>
      {fileList && <UploadImageList fileList={fileList} />}
    </>
  );
}
