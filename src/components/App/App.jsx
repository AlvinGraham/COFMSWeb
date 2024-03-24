import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Admin from '../Admin/Admin';
import AdminProtectedRoute from '../AdminProtectedRoute/AdminProtectedRoute';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect
            exact
            from="/"
            to="/home"
          />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            exact
            path="/about">
            <AboutPage />
          </Route>

          <ProtectedRoute
            exact
            path="/user">
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/main">
            <Main />
          </ProtectedRoute>

          <Route
            exact
            path="/login">
            <Login />
          </Route>

          <Route
            exact
            path="/registration">
            <Register />
          </Route>

          <Route
            exact
            path="/home">
            <Home />
          </Route>

          <AdminProtectedRoute
            exact
            path="/admin">
            <Admin />
          </AdminProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
