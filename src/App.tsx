import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NavBar } from './components';
import * as pages from './pages';
import * as routes from './utils/routes';

export default function App() {
  return (
    <>
      <NavBar />
      <div className="p-2">
        <Switch>
          <Route path={routes.image_upload} component={pages.ImageUploadPage} />
          <Route path={routes.video_upload} component={pages.VideoUploadPage} />
          <Route><Redirect to={routes.image_upload} /></Route>
        </Switch>
      </div>
    </>
  )
}
