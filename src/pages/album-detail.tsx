import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { AlbumPictureListComp } from "src/components";
import { albumDetailRequest } from "src/features/album-detail";
import { AlbumDetail } from "src/models";
import { RootState } from "src/store";
import { album_detail_albumId_parse } from "src/utils/routes";

export default function AlbumDetailPage() {
  const dispatch = useDispatch();
  const albumId: number = album_detail_albumId_parse(useRouteMatch());
  const detail: AlbumDetail | null = useSelector((state: RootState) => state.album.detail);

  useEffect(() => {
    dispatch(albumDetailRequest({ albumId }));
  }, [dispatch, albumId]);

  if (!detail) {
    return <></>
  }

  return (
    <>
      <h1 className="m-2">{detail.name}</h1>
      <AlbumPictureListComp urls={detail.pictures} />
    </>
  )
}
