import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

import Header from './components/Header';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
    </Router>
  );
}

export default App;
