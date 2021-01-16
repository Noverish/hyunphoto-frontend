import cs from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootActions, RootState } from 'src/store';
import { fileToObjectURL } from 'src/utils';
import usePinchZoom from "react-use-pinch-zoom";
import './image-preview-modal.scss';
import { UploadFile } from 'src/models';

export default function ImagePreviewModal() {
  const dispatch = useDispatch();
  const file: UploadFile | null = useSelector((state: RootState) => state.imageUpload.selectedFile);
  const [show, setShow] = useState(false);
  const [objectURL, setObjectURL] = useState('');

  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  useEffect(() => {
    if (file && !objectURL) {
      setShow(true);
      fileToObjectURL(file.file)
        .then(setObjectURL);
    }
  }, [file, objectURL]);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  const onDelete = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (file) {
      dispatch(RootActions.imageUpload.deleteFile(file));
      setShow(false);
    }
  }, [dispatch, file]);

  const onTransitionEnd = useCallback(() => {
    if (file && !show) {
      dispatch(RootActions.imageUpload.update({ selectedFile: null }));
      setObjectURL('');
    }
  }, [dispatch, file, show]);

  if (!file) {
    return <></>;
  }

  const content = (objectURL)
    ? (
      <div className="image-wrapper">
        <img className="image" src={objectURL} alt={file.file.name} {...contentProps} />
        <button type="button" className="btn btn-danger" onClick={onDelete}>목록에서 제외</button>
      </div>
    ) : (
      <div>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    )

  return (
    <div
      className={cs('my-modal-backdrop', { show })}
      onTransitionEnd={onTransitionEnd}
      onClick={onClose}
      {...containerProps}
    >
      {content}
    </div>
  )
}

