import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ForceList from './ForceList/ForceList';
import './Main.css';
import PlanningRatios from './PlanningRatios/PlanningRatios';
import MissionDisplay from './MissionDisplay/MissionDisplay';
import ResultsGraph from './ResultsGraph/ResultsGraph';

function Main(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const missionData = useSelector((store) => store.missions.mission);
  const missionsList = useSelector((store) => store.missions.missionList);
  const results = useSelector((store) => store.missions.results);

  console.log('MAIN PROPS', props.length);

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Main' } });
    dispatch({ type: 'GET_BLUE_FORCES', payload: user.id });
    dispatch({ type: 'GET_RED_FORCES', payload: user.id });
    dispatch({ type: 'GET_UNITS' });
    dispatch({ type: 'GET_MISSION_LIST' });
    dispatch({ type: 'GET_MISSION', payload: user.id });
    dispatch({ type: 'GET_RESULTS', payload: user.id });
  }, []);
  return (
    <div id="main-div">
      <div className="top">
        <div className="test-box force-display">
          <h2>Friendly Forces</h2>
          <ForceList affiliation="blue" />
          <h5>
            Friendly Force Equivalent (FE) Total:{' '}
            {(+results.blue_total_fe).toFixed(2)}
          </h5>
        </div>
        <div className="test-box result-display">
          <h2>Force Comparison</h2>
          {/* {JSON.stringify(results)
            .split(',')
            .map((ele, index) => (
              <p key={index}>{ele}</p>
            ))} */}
          {!results.loading && (
            <div id="results-graph">
              <ResultsGraph
                data={[
                  Math.round(+results.blue_total_fe),
                  Math.round(+results.red_total_fe),
                ]}
                // data={results}
                width={350}
                height={400}
              />
            </div>
          )}
          <div className="ratios-div">
            <div className="blue-ratio">
              <h6> Friendly to Enemy Ratio</h6>
              {+results.blue_ratio >= 1 ? (
                <h6>{(+results.blue_ratio).toFixed(2)} : 1</h6>
              ) : (
                <h6>1 : {(1 / +results.blue_ratio).toFixed(2)}</h6>
              )}
            </div>
            <div className="red-ratio">
              <h6> Enemy to Friendly Ratio</h6>
              {+results.red_ratio >= 1 ? (
                <h6>{(+results.red_ratio).toFixed(2)} : 1</h6>
              ) : (
                <h6>1 : {(1 / +results.red_ratio).toFixed(2)}</h6>
              )}
            </div>
          </div>
        </div>
        <div className="test-box force-display">
          <h2>Enemy Forces</h2>
          <ForceList affiliation="red" />
          <h5>
            Enemy Force Equivalent (FE) Total:{' '}
            {(+results.red_total_fe).toFixed(2)}
          </h5>
        </div>
      </div>
      <div className="middle">
        <div className="test-box mission-display">
          {!missionData.loading && (
            <MissionDisplay
              affiliation="blue"
              missionData={missionData}
              missionsList={missionsList}
            />
          )}
          {+results.blue_losses ? (
            <h3>{(+results.blue_losses).toFixed(1)}%</h3>
          ) : (
            <h3>N/A (Invalid Mission Combination)</h3>
          )}
        </div>
        <div className="test-box mission-info">
          <h3>
            {'<'}- Mission -{'>'}
          </h3>
          <h3>
            {'<'}- Estimated Losses -{'>'}
          </h3>
        </div>
        <div className="test-box mission-display">
          {!missionData.loading && (
            <MissionDisplay
              affiliation="red"
              missionData={missionData}
              missionsList={missionsList}
            />
          )}
          {+results.red_losses ? (
            <h3>{(+results.red_losses).toFixed(1)}%</h3>
          ) : (
            <h3>N/A (Invalid Mission Combination)</h3>
          )}
        </div>
      </div>
      <div className="bottom">
        <div className="test-box info-display">
          <h2>Instructions</h2>
          <ol>
            <li>Select type of unit from drop down list.</li>
            <li>
              Input number and type. If less than a whole unit use fractions
              (e.g. 1 Btry = .33 Bns).
            </li>
            <li>
              Use comparison of force ratios (graph) and historical planning
              ratios.
            </li>
            <li>
              To calculate damage to each unit, select the friendly and enemy
              mission from the list.
            </li>
          </ol>
          <p>
            <b>Remember:</b> Relative force ratios do NOT necessarily indicate
            the chance for success for either force
          </p>
        </div>
        <div className="test-box export">
          <button>Export to PDF</button>
          <button>Export to CSV</button>
        </div>
        <div className="test-box info-display">
          <h2>Historical Minimum Planning Ratios</h2>
          <PlanningRatios />
        </div>
      </div>
    </div>
  );
}

export default Main;
