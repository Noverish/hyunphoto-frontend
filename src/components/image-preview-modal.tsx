import cs from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootActions, RootState } from 'src/store';
import { fileToDataURL } from 'src/utils';
import usePinchZoom from "react-use-pinch-zoom";
import './image-preview-modal.scss';

export default function ImagePreviewModal() {
  const dispatch = useDispatch();
  const file = useSelector((state: RootState) => state.imageUpload.selectedFile);
  const [show, setShow] = useState(false);
  const [dataURL, setDataURL] = useState('');

  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  useEffect(() => {
    if (file) {
      setShow(true);
      fileToDataURL(file)
        .then(setDataURL);
    }
  }, [file, dataURL]);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  const onDelete = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (file) {
      dispatch(RootActions.imageUpload.deleteFile(file));
    }
  }, [dispatch, file]);

  const onTransitionEnd = useCallback(() => {
    if (file && !show) {
      dispatch(RootActions.imageUpload.update({ selectedFile: null }));
      setDataURL('');
    }
  }, [dispatch, file, show]);

  console.log({ file: !!file, show, dataURL: !!dataURL });

  if (!file) {
    return <></>;
  }

  const content = (dataURL)
    ? (
      <div className="image-wrapper">
        <img className="image" src={dataURL} alt={file.name} {...contentProps} />
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

