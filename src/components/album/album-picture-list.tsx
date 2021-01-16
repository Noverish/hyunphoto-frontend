import qs from 'query-string';
import { useMemo } from 'react';

interface Props {
  urls: string[];
}

export default function AlbumPictureListComp(props: Props) {
  const { urls } = props;

  const comps = useMemo(() => (
    urls.map((url) => {
      const newUrl = qs.stringifyUrl({
        url,
        query: { w: 200, h: 200 },
      })

      return (
        <div key={url} className="col">
          <div className="ratio ratio-1x1 ">
            <img src={newUrl} alt={url} loading="lazy" />
          </div>
        </div>
      )
    })
  ), [urls]);

  return (
    <div className="album-picture-list row row-cols-3 g-1 p-1">
      {comps}
    </div>
  )
}
