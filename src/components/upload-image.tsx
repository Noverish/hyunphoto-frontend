import cs from 'classnames';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateThumbnail } from 'src/features/generate-thumbnail';
import { RootActions, RootState } from 'src/store';
import './upload-image.scss';

interface Props {
  file: File;
}

export default function UploadImage({ file }: Props) {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.imageUpload.statusList[file.name]);

  useEffect(() => {
    if (!status) {
      dispatch(generateThumbnail({ file }));
    }
  }, [dispatch, file, status]);

  const onClick = useCallback(() => {
    dispatch(RootActions.imageUpload.update({ selectedFile: file }));
  }, [dispatch, file]);

  return (
    <div className="upload-image ratio ratio-1x1" onClick={onClick}>
      <canvas id={btoa(file.name)} />
      <div className={cs("spinner-container", { 'd-none': status === 2 })}>
        <div className={cs("spinner-border", { slow: !status, 'text-primary': status === 1 })} role="status" />
      </div>
    </div>
  )
}
