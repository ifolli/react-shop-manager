import React, { useContext } from 'react';
import { Navbar, NavLink } from 'react-bootstrap';

import logo from '../logo.svg';
import UserContext from '../context/UserContext';
import { timeSince } from '../utils';
import { useLastItemUpdateTs } from '../hooks/item';

const Header = () => {
  const user = useContext(UserContext);
  const [lastUpdateTs, _] = useLastItemUpdateTs();
  return (
    <header className='App-header'>
      <img src={logo} className="App-logo" alt="logo" />

      <h1 style={{'flex': '1 0'}}>Shop Management App</h1>

      <Navbar className="justify-content-end">
        <NavLink href="/" className="mx-3">
          View all items
        </NavLink>
        <NavLink href="/add" className="mx-3">
          Add item
        </NavLink>
        <div className="mx-3">
          <span>Welcome, {user.name}</span>
          {lastUpdateTs && (
            <React.Fragment>
              <br /><small>Last update provided {timeSince(new Date(lastUpdateTs))} ago</small>
            </React.Fragment>
          )}
        </div>
      </Navbar>
    </header>
  );
};

export default Header;