import qs from 'query-string';
import { AlbumPreview } from 'src/models';

interface Props {
  preview: AlbumPreview;
}

export default function AlbumPreviewComp(props: Props) {
  const { preview } = props;

  const thumbnail = qs.stringifyUrl({
    url: preview.thumbnail,
    query: { w: 300, h: 300 },
  })

  return (
    <div className="album-preview mb-2">
      <div className="ratio ratio-1x1 rounded-3" style={{ overflow: 'hidden' }}>
        <img src={thumbnail} alt={preview.name} />
      </div>
      <div className="title">{preview.name}</div>
      <div className="title" style={{ fontSize: '12px' }}>항목 000개</div>
    </div>
  )
}
