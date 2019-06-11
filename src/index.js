import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './components/DesignComponents/theme'
import GlobalStyle from './components/DesignComponents/GlobalStyle'

import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ThemeProvider>, 
  document.getElementById('root'));
