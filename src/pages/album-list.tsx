import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumPreviewList from "src/components/album/album-preview-list";
import { listAlbumRequest } from "src/features/list-album";
import { AlbumPreview } from "src/models";
import { RootState } from "src/store";

export default function AlbumListPage() {
  const dispatch = useDispatch();
  const previews: AlbumPreview[] = useSelector((state: RootState) => state.album.previews);

  useEffect(() => {
    dispatch(listAlbumRequest());
  }, [dispatch]);

  return (
    <>
      <AlbumPreviewList previews={[...previews, ...previews, ...previews, ...previews]} />
    </>
  )
}
