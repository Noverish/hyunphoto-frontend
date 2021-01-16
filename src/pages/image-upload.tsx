import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { FileSelectBar, UploadImageList, UploadNavBar, UploadStatusBar } from 'src/components';
import { albumDetailRequest } from 'src/features/album-detail';
import { AlbumDetail, UploadFile } from 'src/models';
import { RootState } from 'src/store';
import { album_upload_albumId_parse } from 'src/utils/routes';


export default function ImageUploadPage() {
  const dispatch = useDispatch();
  const albumId: number = album_upload_albumId_parse(useRouteMatch());
  const files: UploadFile[] = useSelector((state: RootState) => state.imageUpload.files);
  const detail: AlbumDetail | null = useSelector((state: RootState) => state.album.detail);
  const isUploading: boolean = useSelector((state: RootState) => state.imageUpload.isUploading);

  const topBar = (isUploading) ? <UploadStatusBar /> : <FileSelectBar />;

  useEffect(() => {
    if (detail?.id !== albumId) {
      dispatch(albumDetailRequest({ albumId }));
    }
  }, [dispatch, detail?.id, albumId]);

  const title = (detail?.id === albumId) ? detail.name : '';

  return (
    <>
      <UploadNavBar title={title} />
      <div className="p-2">
        {topBar}
        {files && <UploadImageList files={files} />}
      </div>
    </>
  );
}
