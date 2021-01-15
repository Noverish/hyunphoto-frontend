import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadImageList } from 'src/components';
import { uploadImagesAction } from 'src/features/upload-images';
import { UploadFile, UploadFileStatus } from 'src/models';
import { RootActions, RootState } from 'src/store';

function UploadStatusBar() {
  const dispatch = useDispatch();
  const files: UploadFile[] = useSelector((state: RootState) => state.imageUpload.files);

  const totalNum = files.length;
  const completeNum = files.filter(v => v.progress === 100).length;
  const ratio = completeNum / totalNum * 100;

  const onReset = useCallback(() => {
    dispatch(RootActions.imageUpload.update({ files: [] }))
  }, [dispatch]);

  return (
    <div className="input-group mb-2 d-flex">
      <div className="input-group-text position-relative text-white" style={{ flex: '1', background: `linear-gradient(90deg, #0d6efd ${ratio}%, white ${ratio}%)` }}>
        {completeNum}/{totalNum}
      </div>
      <button type="button" className="btn btn-outline-primary" onClick={onReset}>초기화</button>
    </div>
  )
}

function FileSelectBar() {
  const dispatch = useDispatch();
  const files: UploadFile[] = useSelector((state: RootState) => state.imageUpload.files);

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
    dispatch(uploadImagesAction())
  }, [dispatch]);

  return (
    <div className="input-group mb-2 d-flex">
      <button type="button" className="btn btn-outline-secondary" onClick={onClick}>파일 선택</button>
      <input id="file-input" type="file" className="form-control" onChange={onChange} multiple accept="image/*" style={{ display: 'none' }} />
      <span className="input-group-text" style={{ flex: '1' }}>{files.length}개 파일 선택됨</span>
      <button type="button" className="btn btn-primary" onClick={onUpload} disabled={files.length === 0}>업로드</button>
    </div>
  )
}

export default function ImageUploadPage() {
  const files: UploadFile[] = useSelector((state: RootState) => state.imageUpload.files);
  const isUploading = files[0]?.status === UploadFileStatus.UPLOADING;

  const topBar = (!isUploading) ? <FileSelectBar /> : <UploadStatusBar />;

  return (
    <>
      {topBar}
      {files && <UploadImageList files={files} />}
    </>
  );
}
