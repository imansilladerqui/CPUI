import {STATE_LOGIN, STATE_SIGNUP} from 'components/AuthForm';
import GAListener from 'components/GAListener';
import {EmptyLayout, LayoutRoute, MainLayout, ProtectedRoute} from 'components/Layout';
import AlertPage from 'pages/AlertPage';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
import BadgePage from 'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import ButtonPage from 'pages/ButtonPage';
import CardPage from 'pages/CardPage';
import ChartPage from 'pages/ChartPage';
// pages
import DashboardPage from 'pages/DashboardPage';
import DropdownPage from 'pages/DropdownPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ModalPage from 'pages/ModalPage';
import ProgressPage from 'pages/ProgressPage';
import TablePage from 'pages/TablePage';
import TypographyPage from 'pages/TypographyPage';
import WidgetPage from 'pages/WidgetPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import './styles/reduction.css';

const getBasename = () => {
  console.log(`/${process.env.PUBLIC_URL.split('/').pop()}`);
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
              path="/login-modal"
              layout={MainLayout}
              component={AuthModalPage}
            />
            <ProtectedRoute
              exact
              path="/dashboard"
              layout={MainLayout}
              component={DashboardPage}
            />
            <ProtectedRoute
              exact
              path="/buttons"
              layout={MainLayout}
              component={ButtonPage}
            />
            <ProtectedRoute
              exact
              path="/cards"
              layout={MainLayout}
              component={CardPage}
            />
            <ProtectedRoute
              exact
              path="/widgets"
              layout={MainLayout}
              component={WidgetPage}
            />
            <ProtectedRoute
              exact
              path="/typography"
              layout={MainLayout}
              component={TypographyPage}
            />
            <ProtectedRoute
              exact
              path="/alerts"
              layout={MainLayout}
              component={AlertPage}
            />
            <ProtectedRoute
              exact
              path="/tables"
              layout={MainLayout}
              component={TablePage}
            />
            <ProtectedRoute
              exact
              path="/badges"
              layout={MainLayout}
              component={BadgePage}
            />
            <ProtectedRoute
              exact
              path="/button-groups"
              layout={MainLayout}
              component={ButtonGroupPage}
            />
            <ProtectedRoute
              exact
              path="/dropdowns"
              layout={MainLayout}
              component={DropdownPage}
            />
            <ProtectedRoute
              exact
              path="/progress"
              layout={MainLayout}
              component={ProgressPage}
            />
            <ProtectedRoute
              exact
              path="/modals"
              layout={MainLayout}
              component={ModalPage}
            />
            <ProtectedRoute
              exact
              path="/forms"
              layout={MainLayout}
              component={FormPage}
            />
            <ProtectedRoute
              exact
              path="/input-groups"
              layout={MainLayout}
              component={InputGroupPage}
            />
            <ProtectedRoute
              exact
              path="/charts"
              layout={MainLayout}
              component={ChartPage}
            />
            <ProtectedRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
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
