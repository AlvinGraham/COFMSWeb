import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'About' } });
  }, []);
  return (
    <div id="about-div">
      <div className="left">
        <h2>Thank You for Visiting COFMSWeb!</h2>
        <p>
          COFMSWeb (short for Correlation of Forces and Means Web) is an
          application that spent over a decade as just an idea. As part of a US
          Infantry Division Plans cell the developer and his team spent
          significant time conducting quantitative comparison of conventional
          armed forces using a spreadsheet based ratio analysis tool. There was
          alot of discussion about how useful a web or desktop application would
          be, and this application seeks to start an understanding of the
          answer.
        </p>
        <p>
          COFMSWeb uses data from a 2015 version of the Force Ratio Calculator
          spreadsheet for unit Force Equivalent (FE) values, mission types, and
          loss estimates. As such, the data set is limited to that to force
          structures of that era, but the abillity to add new units with user
          defined FEs is available in this application. Determining the FE of
          any given unit is both an art and a science and it is not the
          developers intent to challenge the values in the curretn dataset (they
          were used for years to good effect). The science in determining FEs is
          available to the developer but is beyond the scope of this project and
          in fact probably deserves it's own application. The structure of the
          database is built as to be extensible on the back end to new data sets
          for more modern force structures, expanded mission sets, and loss
          estimate calculations.
        </p>
        <p>
          The target audience of this application is armed force maneuver staff
          officers preparing for constructive exercises. Please enjoy the app
          and provide constructive feedback if you are so inclined.{' '}
        </p>
        <img
          src="src/components/AboutPage/images/redBulls.jpeg"
          alt="Red Bulls Attack!"
        />
      </div>
      <div className="right">
        <h2>What's next for COFMSWeb?</h2>
      </div>
    </div>
  );
}

export default AboutPage;
