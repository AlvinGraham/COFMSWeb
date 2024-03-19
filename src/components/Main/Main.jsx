import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Main.css';

function Main(props) {
  return (
    <div id="main-div">
      <div className="top">
        <div className="test-box force-display">
          <h2>Friendly Forces</h2>
        </div>
        <div className="test-box result-display">
          <h2>Force Comparison</h2>
        </div>
        <div className="test-box force-display">
          <h2>Enemy Forces</h2>
        </div>
      </div>
      <div className="middle">
        <div className="test-box mission-display">
          <h2>Friendly Mission</h2>
        </div>
        <div className="test-box mission-info">
          <h2>Mission Info</h2>
        </div>
        <div className="test-box mission-display">
          <h2>Enemy Mission</h2>
        </div>
      </div>
      <div className="bottom">
        <div className="test-box info-display">
          <h2>Instructions</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex
            nec nulla finibus lobortis. Cras in risus leo. Quisque dapibus
            facilisis magna, et pharetra nunc elementum pellentesque. Mauris at
            lectus lobortis ligula ullamcorper luctus sit amet quis eros. Fusce
            porttitor nec lacus sed euismod.
          </p>
        </div>
        <div className="test-box export">
          <button>Export to PDF</button>
          <button>Export to CSV</button>
        </div>
        <div className="test-box info-display">
          <h2>Historical Planning Ratios</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex
            nec nulla finibus lobortis. Cras in risus leo. Quisque dapibus
            facilisis magna, et pharetra nunc elementum pellentesque. Mauris at
            lectus lobortis ligula ullamcorper luctus sit amet quis eros. Fusce
            porttitor nec lacus sed euismod.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
