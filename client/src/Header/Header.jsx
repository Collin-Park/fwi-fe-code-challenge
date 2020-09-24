import React from 'react';

import './Header.scss';
import { ReactComponent as CloudColor } from './cloud-color.svg';
import { ReactComponent as CloudEffects } from './cloud-effects.svg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => (
  <header id="main-header" className="header">
    <div className="logo mr-2">
      <CloudColor className="logo__color" />
      <CloudEffects className="logo__effects" />
    </div>
    <h1 className="header__title text-nowrap">FWI Poker Challenge</h1>

    <ul className="d-flex list-unstyled h-100 align-items-center m-0 justify-content-end w-75">
      <li>
        <Link to="/create" className="mx-2">
          Create
        </Link>
      </li>
      <li>
        <Link to="/" className="mx-2">
          Show all
        </Link>
      </li>
    </ul>
  </header>
);

export default Header;
