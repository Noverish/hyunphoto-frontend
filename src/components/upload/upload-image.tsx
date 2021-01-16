import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateThumbnailAction } from 'src/features/generate-thumbnail';
import { UploadFile } from 'src/models';
import { RootActions, RootState } from 'src/store';
import './upload-image.scss';

interface Props {
  file: UploadFile;
}

function renderFront(file: UploadFile, isUploading: boolean) {
  if (!isUploading) {
    if (!file.dataURL) {
      return (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )
    } else {
      return undefined;
    }
  } else {
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

function FileTypeIcon({ file }: Props) {
  if (!file.file.type.startsWith('video')) {
    return <></>;
  }

  return (
    <div className="file-type-icon">
      <div>
        <i className="fas fa-video"></i>
      </div>
    </div>
  )
}

export default function UploadImage({ file }: Props) {
  const dispatch = useDispatch();
  const isUploading = useSelector((state: RootState) => state.imageUpload.isUploading);

  useEffect(() => {
    if (!file.dataURL) {
      dispatch(generateThumbnailAction({ file }));
    }
  }, [dispatch, file]);

  const onClick = useCallback(() => {
    dispatch(RootActions.imageUpload.update({ selectedFile: file }));
  }, [dispatch, file]);

  return (
    <div className="upload-image ratio ratio-1x1" onClick={onClick}>
      {renderFront(file, isUploading)}
      {file.dataURL && <img src={file.dataURL} alt={file.file.name} />}
      <FileTypeIcon file={file} />
    </div>
  )
}
