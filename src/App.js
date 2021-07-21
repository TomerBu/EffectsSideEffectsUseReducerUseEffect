import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { Fragment, useContext } from 'react';
import AuthContext from './components/store/auth-context';

function App() {
  const ctx = useContext(AuthContext)
  return (
    <Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login onLogin={ctx.loginHandler} />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </Fragment>
  );
}

export default App;
