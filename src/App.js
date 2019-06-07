import React from 'react';
import AppContainer from './components/DesignComponents/AppStyles'

import UserList from './components/UserComponents/UserList'
import Register from './components/SharedComponents/Register'
import Login from './components/SharedComponents/Login'
const App = () => {
  return (
    <AppContainer>
      <Register add/>
      <Login />
      <UserList />
    </AppContainer>
  )
}

export default App;
