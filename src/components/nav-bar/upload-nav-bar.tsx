import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  title: string;
}

export default function UploadNavBar(props: Props) {
  const { title } = props;
  const history = useHistory();

  return (
    <nav>
      <div className="nav-btn" onClick={history.goBack}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div>
        <span className="nav-title">{title}</span>
        <span>&nbsp;에 업로드</span>
      </div>
    </nav>
  )
}
