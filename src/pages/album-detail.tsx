import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AlbumPictureListComp, BackNavBar } from "src/components";
import { albumDetailRequest } from "src/features/album-detail";
import { AlbumDetail } from "src/models";
import { RootState } from "src/store";
import { album_detail_albumId_parse, album_upload_func } from "src/utils/routes";

export default function AlbumDetailPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const albumId: number = album_detail_albumId_parse(useRouteMatch());
  const detail: AlbumDetail | null = useSelector((state: RootState) => state.album.detail);

  useEffect(() => {
    dispatch(albumDetailRequest({ albumId }));
  }, [dispatch, albumId]);

  const onUploadClick = useCallback(() => {
    if (detail) {
      history.push(album_upload_func(detail.id))
    }
  }, [history, detail]);

  if (!detail) {
    return <></>
  }

  return (
    <>
      <BackNavBar title={detail.name} onUploadClick={onUploadClick} />
      <AlbumPictureListComp urls={detail.pictures.slice(0, 10)} />
    </>
  )
}
