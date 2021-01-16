import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "src/components";
import AlbumPreviewList from "src/components/album/album-preview-list";
import { albumListRequest } from "src/features/album-list";
import { AlbumPreview } from "src/models";
import { RootState } from "src/store";

export default function AlbumListPage() {
  const dispatch = useDispatch();
  const previews: AlbumPreview[] = useSelector((state: RootState) => state.album.previews);

  useEffect(() => {
    dispatch(albumListRequest());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <h1 className="m-2">앨범 목록</h1>
      <AlbumPreviewList previews={[...previews, ...previews, ...previews, ...previews]} />
    </>
  )
}
