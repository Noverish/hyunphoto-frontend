import React, { useCallback, useState } from 'react';
import { uploladApi } from './api/upload';
import { UploadImageList } from 'src/components';
import './App.scss';


export default function App() {
  const [fileList, setFileList] = useState(null as FileList | null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  }, []);

  const onUpload = useCallback(() => {
    if (!fileList) {
      console.error('fileList is null!');
      return;
    }

    const file = fileList.item(0);
    if (!file) {
      console.error('file is null!');
      return
    }

    uploladApi(file)
      .then((data) => console.log(data));
  }, [fileList]);

  return (
    <div className="app">
      <h1>HyunPhoto</h1>
      <div className="input-group mb-3">
        <input type="file" className="form-control" onChange={onChange} multiple />
        <button type="button" className="btn btn-primary" onClick={onUpload}>업로드</button>
      </div>
      {fileList && <UploadImageList fileList={fileList}/>}
    </div>
  );
}
