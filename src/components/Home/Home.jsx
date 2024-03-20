import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Home.css';

function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Home' } });
  }, []);
  return (
    <div id="home-div">
      <div className="left test-box">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex nec
          nulla finibus lobortis. Cras in risus leo. Quisque dapibus facilisis
          magna, et pharetra nunc elementum pellentesque. Mauris at lectus
          lobortis ligula ullamcorper luctus sit amet quis eros. Fusce porttitor
          nec lacus sed euismod. Duis tincidunt lectus vitae sagittis tristique.
          Maecenas ultricies vitae neque sit amet rutrum. Proin nec elit
          pretium, fringilla dui sed, fringilla enim. Aenean nec varius sapien.
          Vivamus molestie eu neque sed ultricies. Nunc imperdiet et turpis
          vitae venenatis. Sed vitae lacus vulputate, scelerisque justo a,
          imperdiet ex. Mauris tortor arcu, mollis id libero id, vehicula
          dignissim lacus. Phasellus fringilla urna ac maximus lacinia. Maecenas
          faucibus velit iaculis, fermentum elit quis, laoreet urna. Mauris
          vitae facilisis risus, a imperdiet mauris. Nullam finibus et ligula
          eget pellentesque. Nullam laoreet et quam accumsan lobortis. Praesent
          quis est id nulla sagittis molestie imperdiet ac dui. Donec congue
          lectus at iaculis tempus. Nam consequat sollicitudin laoreet. Cras
          gravida ex sed ex tincidunt, in pellentesque dui ullamcorper. Nam id
          sodales ipsum. Quisque in felis id nibh blandit convallis. Vestibulum
          eu sodales eros.
        </p>
      </div>
      <div className="right test-box">
        <img
          src="src/components/Home/images/tank.jpeg"
          alt="Army Tank"
        />
        <button id="loginButton">LOGIN</button>
      </div>
    </div>
  );
}

export default Home;
