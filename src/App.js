import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import componentQueries from 'react-component-queries';
import {EmptyLayout, LayoutRoute, MainLayout, ProtectedRoute} from 'components/Layout';
import GAListener from 'components/GAListener';
import React from 'react';
import {STATE_LOGIN, STATE_SIGNUP} from 'components/AuthForm';

// pages
import AuthPage from 'pages/AuthPage';
import DashboardPage from 'pages/DashboardPage';
import UsersPage from 'pages/UsersPage';
import UserPage from 'pages/UserPage';

import './styles/reduction.css';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <ProtectedRoute
              exact
              path="/dashboard"
              layout={MainLayout}
              component={DashboardPage}
            />
            <ProtectedRoute
              exact
              path="/users"
              layout={MainLayout}
              component={UsersPage}
            />
            <ProtectedRoute
              exact
              path="/user/:id"
              layout={MainLayout}
              component={UserPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
