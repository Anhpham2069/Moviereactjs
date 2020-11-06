import React, { lazy, Suspense } from 'react';
import { Skeleton } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as api from "./services/login-sv";

const HomeComponent = lazy(() => import('./pages/home'));
const UpcomingComponent = lazy(() => import('./pages/up-coming'));
const SearchComponent = lazy(() => import('./pages/search'));
const DetailComponent = lazy(() => import('./pages/detail'));
const LoginComponent = lazy(() => import('./pages/login'));

const PrivateRouter = ({children, ...rest}) => {
  const isAuthenticated = api.isLogin();
  return (
    <Route 
      {...rest}
      render={({location}) => 
        isAuthenticated ? (children) : (
        <Redirect  
          to={{
            pathname: "/login",
            state: { from: location}
          }}
        />
        )
      }
    />
  )
}
const LoginedRoute = ({ children, ...rest }) => {
  const isLoginUser = api.isLogin();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoginUser ? (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location }
            }}
          />
        ) : (children)
      }
    />
  );
}

const Movies = () => {
  return(
    <Router>
      <Suspense
        fallback={<Skeleton active />}
      >
        <Switch>
          <PrivateRouter path="/home">
            <HomeComponent />
          </PrivateRouter>
          <PrivateRouter path="/up-coming">
            <UpcomingComponent />
          </PrivateRouter>
          <PrivateRouter path="/search">
            <SearchComponent />
          </PrivateRouter>
          {/* localhost:3000/movie/batman~100 */}
          <PrivateRouter path="/movie/:name~:id">
            <DetailComponent/>
          </PrivateRouter>
          <isLoginedRouter path="/login">
            <LoginComponent />
          </isLoginedRouter>
          <Route exact path="/">
            <HomeComponent/>
          </Route>
          
        </Switch>
      </Suspense>
    </Router>
  )
}
export default Movies;