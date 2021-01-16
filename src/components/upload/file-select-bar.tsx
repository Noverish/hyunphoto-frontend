import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImagesAction } from "src/features/upload-images";
import { UploadFile } from "src/models";
import { RootActions, RootState } from "src/store";
import { filterFileList } from "src/utils";

export default function FileSelectBar() {
  const dispatch = useDispatch();
  const files: UploadFile[] = useSelector((state: RootState) => state.imageUpload.files);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = filterFileList(e.target.files);
    dispatch(RootActions.imageUpload.setFiles(fileList));
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
      <input id="file-input" type="file" className="form-control" onChange={onChange} multiple style={{ display: 'none' }} />
      <span className="input-group-text" style={{ flex: '1' }}>{files.length}개 파일 선택됨</span>
      <button type="button" className="btn btn-primary" onClick={onUpload} disabled={files.length === 0}>업로드</button>
    </div>
  )
}
