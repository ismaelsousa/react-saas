import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import store from '~/store';


const GuestRout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!store.getState().auth.signedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);


GuestRout.propTypes = {
  component: PropTypes.func.isRequired,

};

export default GuestRout;
