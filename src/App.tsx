import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ImagePreviewModal } from './components';
import * as pages from './pages';
import * as routes from './utils/routes';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path={routes.login} component={pages.LoginPage} />

        <Route exact path={routes.album_list} component={pages.AlbumListPage} />
        <Route exact path={routes.album_detail} component={pages.AlbumDetailPage} />
        <Route exact path={routes.album_upload} component={pages.ImageUploadPage} />
        
        <Route><Redirect to={routes.album_list} /></Route>
      </Switch>
      <ImagePreviewModal />
    </>
  )
}
