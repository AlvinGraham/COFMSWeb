import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Home.css';

function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Home' } });
  }, []);
  return (
    <div id="home-div">
      <div className="left">
        <h1>COFMSWeb 1.0</h1>
        <p>Welcome to COFMSWeb!</p>
        <p>
          &nbsp; COFMSWeb (Correlation Of Forces and MeanS - Web Implementation)
          is a fullstack application based on a US Army force ratio calculator.
          It allows military staff planners to analyze relative force ratios and
          determine likelihood of mission success based on correlations of
          quantitative conventional combat power of opposing forces. Users have
          access to a pre-defined array of conventional forces and
          administrative users have the ability to add, modify, or delete
          existing forces. Comparisons are displayed graphically and can be
          exported to PDF for inclusion in other applications or briefing
          products.
        </p>
        <p>
          &nbsp; When you are ready to get started, click the login button, or
          use the menu at the top right to register if you are a new user!
        </p>
        <img src="/images/staff.jpg" />
      </div>
      <div className="right">
        <img
          src="/images/tank.jpeg"
          alt="Army Tank"
        />
        <button
          id="loginButton"
          onClick={() => {
            history.push('/login');
          }}>
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Home;
