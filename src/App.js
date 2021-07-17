import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context';

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
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, logoutHandler: logoutHandler}}>
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider >
  );
}

export default App;
