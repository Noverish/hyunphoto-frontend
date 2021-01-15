import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateThumbnail } from 'src/features/generate-thumbnail';
import { UploadFile, UploadFileStatus } from 'src/models';
import { RootActions } from 'src/store';
import './upload-image.scss';

interface Props {
  file: UploadFile;
}

function renderFront(file: UploadFile) {
  switch (file.status) {
    case UploadFileStatus.FILE_LOADING:
      return (
        <div className="spinner-container">
          <div className="spinner-border slow" role="status" />
        </div>
      )
    case UploadFileStatus.IMAGE_CONVERTING:
      return (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )
    case UploadFileStatus.READY:
      return undefined;
    case UploadFileStatus.UPLOADING:
      return (file.progress !== 100)
        ? (
          <div className="dim">
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: `${file.progress || 0}%` }} />
            </div>
          </div>
        ) : (
          <div className="dim">
            <i className="fas fa-check position-absolute top-50 start-50 translate-middle" style={{ color: '#82c91e', fontSize: '36px' }}></i>
          </div>
        )
  }
}

export default function UploadImage({ file }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (file.status === UploadFileStatus.FILE_LOADING) {
      dispatch(generateThumbnail({ file }));
    }
  }, [dispatch, file]);

  const onClick = useCallback(() => {
    dispatch(RootActions.imageUpload.update({ selectedFile: file }));
  }, [dispatch, file]);

  return (
    <div className="upload-image ratio ratio-1x1" onClick={onClick}>
      {renderFront(file)}
      <canvas id={btoa(file.file.name)} />
    </div>
  )
}
