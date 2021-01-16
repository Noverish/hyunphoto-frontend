import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadFile } from "src/models";
import { RootActions, RootState } from "src/store";

export default function UploadStatusBar() {
  const dispatch = useDispatch();
  const files: UploadFile[] = useSelector((state: RootState) => state.imageUpload.files);

  const totalNum = files.length;
  const completeNum = files.filter(v => v.progress === 100).length;
  const ratio = completeNum / totalNum * 100;

  const onReset = useCallback(() => {
    dispatch(RootActions.imageUpload.update({ files: [], isUploading: false }))
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