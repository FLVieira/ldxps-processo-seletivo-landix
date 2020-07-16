import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '~/pages/Home';
import SellersRegister from '~/pages/SellersMaintenance';
import ClientsRegister from '~/pages/ClientsMaintenance';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />

      <Route exact path="/home" component={Home} />

      <Route exact path="/sellers/register" component={SellersRegister} />

      <Route exact path="/sellers/edit/:id" component={SellersRegister} />

      <Route exact path="/clients/register" component={ClientsRegister} />

      <Route exact path="/clients/edit/:id" component={ClientsRegister} />
    </Switch>
  );
}
