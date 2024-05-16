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
          loss estimates. As such, the data set is limited to force structures
          of that era, but the abillity to add new units with user defined FEs
          is available in this application. Determining the FE of any given unit
          is both an art and a science and it is not the developers intent to
          challenge the values in the current dataset (they were used for years
          to good effect). The science in determining FEs is available to the
          developer but is beyond the scope of this project and in fact probably
          deserves it's own application. The structure of the database is built
          as to be extensible on the back end to new data sets for more modern
          force structures, expanded mission sets, and loss estimate
          calculations.
        </p>
        <p>
          The target audience of this application is armed force maneuver staff
          officers preparing for constructive exercises. Please enjoy the app
          and provide constructive feedback if you are so inclined.{' '}
        </p>
        <img
          id="red-bull"
          src="/images/redBulls.jpeg"
          alt="Red Bulls Attack!"
        />
      </div>
      <div className="right">
        <h2>What's next for COFMSWeb?</h2>
        <ul className="whats-next">
          <li>Add functionality for PDF Exports.</li>
          <li>Add functionality for CSV Exports of user Force Lists.</li>
          <li>Add functionality for CSV Imports of Unit Lists.</li>
          <li>Improve User Interface Styling</li>
          <li>Streamline back end (compiled code language - C#?)</li>
          <li>Develop desktop application</li>
        </ul>
        <div className="bottom">
          <h3>Developer Notes</h3>
          <p>
            Alvin Graham, the developer of this application is a retired US Army
            and Marine Corps Veteran who enjoys creating technical solutions to
            problems, programming, and bringing order from chaos. He resides in
            Minnesota with his family and can generally be found involved in
            random nerdery. If you have constructive feedback for this
            application, he a can be reached at AlvinGraham777@gmail.com.{' '}
          </p>
          <div className="developer-info">
            <div className="developer-text">
              <p>
                A special thank you goes out to the instructors and staff at
                Prime Digital Academy who enabled me to actualize this
                application. My most heartfelt thank you goes out to the men and
                women I served with, especially those in the 34ID plans cell
                that helped inceptualize this idea and kept it alive; you know
                who you are!
              </p>
            </div>
            <div>
              <img src="/images/dev.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
