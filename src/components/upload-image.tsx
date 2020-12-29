import cs from 'classnames';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootActions, RootState } from 'src/store';
import './upload-image.scss';

interface Props {
  file: File;
}

export default function UploadImage({ file }: Props) {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.main.statusList[file.name]);

  const onClick = useCallback(() => {
    dispatch(RootActions.main.update({ selectedFile: file }));
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
