import cs from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import './upload-image.scss';

interface Props {
  file: File;
}

export default function UploadImage({ file }: Props) {
  const status = useSelector((state: RootState) => state.main.statusList[file.name]);

  return (
    <div className="upload-image ratio ratio-1x1">
      <canvas id={btoa(file.name)} />
      <div className={cs("spinner-container", { 'd-none': status === 2 })}>
        <div className={cs("spinner-border", { slow: !status, 'text-primary': status === 1 })} role="status" />
      </div>
    </div>
  )
}
