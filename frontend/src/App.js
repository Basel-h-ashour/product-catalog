import React, { useState } from 'react';
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Dashboard />}
    </div>
  );
}

export default App;
