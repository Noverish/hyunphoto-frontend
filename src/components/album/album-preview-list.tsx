import { useMemo } from 'react';
import { AlbumPreview } from 'src/models'
import AlbumPreviewComp from './album-preview';

interface Props {
  previews: AlbumPreview[];
}

export default function AlbumPreviewListComp(props: Props) {
  const { previews } = props;

  const comps = useMemo(() => (
    previews.map((preview, i) => (
      <div key={preview.name + i} className="col">
        <AlbumPreviewComp preview={preview} />
      </div>
    ))
  ), [previews]);

  return (
    <div className="album-preview-list row row-cols-2 g-2 p-2">
      {comps}
    </div>
  )
}
