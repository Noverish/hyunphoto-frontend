import cs from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { image_upload, video_upload } from 'src/utils/routes';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark bg-primary flex-nowrap">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HyunPhoto</Link>
        <div className="d-flex w-100" id="navbarNav">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <Link className={cs("nav-link p-2", { active: location.pathname === image_upload })} to={image_upload}>Image</Link>
            </li>
            <li className="nav-item">
              <Link className={cs("nav-link p-2", { active: location.pathname === video_upload })} to={video_upload}>Video</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
