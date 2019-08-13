import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      (localStorage.getItem('_token')) ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default ProtectedRoute;
