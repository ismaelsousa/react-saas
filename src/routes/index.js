import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import history from './history';


import Main from '~/pages/Main';
import SignUp from '~/pages/Auth/SignUp';
import SignIn from '~/pages/Auth/SignIn';
import PrivateRoute from './private';
import GuestRoute from './guest';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <GuestRoute path="/signin" component={SignIn} />
      <GuestRoute path="/signup" component={SignUp} />
      <PrivateRoute path="/" exact component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
