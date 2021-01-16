import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import './nav-bar.common.scss';

interface Props {
  title: string;
  onUploadClick?: () => void;
}

export default function BackNavBar(props: Props) {
  const { title, onUploadClick } = props;
  const history = useHistory();

  const onUpload = useCallback(() => {
    onUploadClick?.();
  }, [onUploadClick]);

  return (
    <nav>
      <div className="nav-btn" onClick={history.goBack}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className="nav-title">{title}</div>
      <div className="nav-btn ms-auto" onClick={onUpload}>
        <i className="fas fa-cloud-upload-alt"></i>
      </div>
    </nav>
  )
}
