import React from 'react';
import {Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
        if (localStorage.getItem('_token')) {
            return <Layout>
                <Component {...props} />
            </Layout>
        } else {
            return <Redirect to="/" />
        }
    }}
  />
);

export default ProtectedRoute;
