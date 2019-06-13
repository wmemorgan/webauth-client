import React from 'react'
import axios from 'axios'
import AppContainer from './components/DesignComponents/AppStyles'

import Routes from './Routes'

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}/api/`

const App = () => {
  return (
    <AppContainer>
      <Routes />
    </AppContainer>
  )
}

export default App;
