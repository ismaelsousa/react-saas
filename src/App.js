import React from 'react';

import { Provider } from 'react-redux';
import Global from 'styles/global';
import store from '~/store';

import Routes from '~/routes/index';

const App = () => (
  <Provider store={store}>
    <>
      <Routes />
      <Global />
    </>
  </Provider>
);

export default App;
