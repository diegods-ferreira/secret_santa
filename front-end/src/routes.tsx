import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import SecretSanta from './pages/SecretSanta';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={SecretSanta} path="/secret-santa/:id" />
    </BrowserRouter>
  );
}

export default Routes;