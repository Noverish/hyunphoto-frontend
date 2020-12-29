import cs from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootActions, RootState } from 'src/store';
import { fileToDataURL } from 'src/utils';
import './image-preview-modal.scss';

export default function ImagePreviewModal() {
  const dispatch = useDispatch();
  const file = useSelector((state: RootState) => state.main.selectedFile);
  const [show, setShow] = useState(false);
  const [dataURL, setDataURL] = useState('');

  useEffect(() => {
    if (file) {
      setShow(true);
      fileToDataURL(file)
        .then(setDataURL)
    }
  }, [file]);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  const onTransitionEnd = useCallback(() => {
    if (file && !show) {
      dispatch(RootActions.main.update({ selectedFile: null }));
      setDataURL('');
    }
  }, [dispatch, file, show]);

  if (!file) {
    return <></>;
  }

  const img = dataURL && <img src={dataURL} alt={file.name} />;
  const spinner = dataURL || <div className="spinner-border text-danger" role="status" />;

  return (
    <>
      <div className={cs('my-modal-backdrop', { show })} onClick={onClose} onTransitionEnd={onTransitionEnd} />
      <div className={cs('my-modal-dialog', { show })}>
        {dataURL ? img : spinner}
      </div>
    </>
  )
}

