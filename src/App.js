import React, { Fragment, useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storageIsLoggedIn = localStorage.getItem('isLoggedIn')

    if (storageIsLoggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])
  const loginHandler = (email, password) => {
    // We should of course check email and password - DEMO
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </Fragment>
  );
}

export default App;
