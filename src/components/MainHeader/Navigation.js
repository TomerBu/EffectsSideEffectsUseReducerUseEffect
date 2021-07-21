import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';
import styles from './Navigation.module.css';

const Navigation = () => {
  //accepts the value returned from react getContext (in the store)
  const ctx = useContext(AuthContext)
  return (
    <nav className={styles.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
