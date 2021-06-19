import React, { useState } from 'react';
import Login from './containers/Login/Login'

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <p>dashboard</p>}
    </div>
  );
}

export default App;
