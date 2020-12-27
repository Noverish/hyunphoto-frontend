import React, { useCallback, useMemo, useState } from 'react'
import { uploladApi } from 'src/api/upload';
import { sizeToString } from 'src/utils';

export default function VideoUploadPage() {
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

  const fileElements = useMemo(() => (
    (fileList)
      ? Array.from({ length: fileList.length }, (_, i) => (
        <div key={fileList[i].name}>{fileList[i].name} - {sizeToString(fileList[i].size)}</div>
      ))
      : undefined
  ), [fileList]);

  return (
    <>
      <div className="input-group mb-3">
        <input type="file" className="form-control" multiple accept="video/*" onChange={onChange}/>
        <button type="button" className="btn btn-primary" onClick={onUpload}>업로드</button>
      </div>
      {fileElements}
    </>
  )
}