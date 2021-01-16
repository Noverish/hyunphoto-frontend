import qs from 'query-string';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AlbumPreview } from 'src/models';
import { album_detail_func } from 'src/utils/routes';

interface Props {
  preview: AlbumPreview;
}

export default function AlbumPreviewComp(props: Props) {
  const { preview } = props;
  const history = useHistory();

  const thumbnail = qs.stringifyUrl({
    url: preview.thumbnail,
    query: { w: 300, h: 300 },
  })

  const onClick = useCallback(() => {
    history.push(album_detail_func(preview.id))
  }, [history, preview]);

  return (
    <div className="album-preview mb-2" onClick={onClick}>
      <div className="ratio ratio-1x1 rounded-3" style={{ overflow: 'hidden', background: '#aaaaaa' }}>
        <img src={thumbnail} alt={preview.name} />
      </div>
      <div className="title">{preview.name}</div>
      <div style={{ fontSize: '12px', color: '#777777' }}>항목 000개</div>
    </div>
  )
}
