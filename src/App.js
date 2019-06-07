import React from 'react';
import AppContainer from './components/DesignComponents/AppStyles'

import UserList from './components/UserComponents/UserList'
import Register from './components/SharedComponents/Register'
const App = () => {
  return (
    <AppContainer>
      <Register add/>
      <UserList />
    </AppContainer>
  )
}

export default App;
