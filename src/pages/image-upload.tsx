import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadImageList } from 'src/components';
import { RootActions, RootState } from 'src/store';

export default function ImageUploadPage() {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.imageUpload.files);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      dispatch(RootActions.imageUpload.setFiles(Array.from(fileList)))
    }
  }, [dispatch]);

  const onClick = useCallback(() => {
    document.getElementById('file-input')?.click();
  }, []);

  const onUpload = useCallback(() => {
    // if (!fileList) {
    //   return;
    // }

    // const promises = Array.from({ length: fileList.length }, (_, i) => uploladApi(fileList[i], (ratio: number) => {
    //   console.log(fileList[i].name, ratio);
    // }));

    // Promise.all(promises)
    //   .then(() => alert('done'));
  }, []);

  return (
    <>
      <div className="input-group mb-2 d-flex">
        <button type="button" className="btn btn-outline-secondary" onClick={onClick}>파일 선택</button>
        <input id="file-input" type="file" className="form-control" onChange={onChange} multiple accept="image/*" style={{ display: 'none' }}/>
        <span className="input-group-text" style={{ flex: '1' }}>{files.length}개 파일 선택됨</span>
        <button type="button" className="btn btn-primary" onClick={onUpload}>업로드</button>
      </div>
      {files && <UploadImageList files={files} />}
    </>
  );
}
