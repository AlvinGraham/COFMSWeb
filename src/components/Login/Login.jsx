import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import './Login.css';

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);

  function loginBtnClk(event) {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });

      setUsername('');
      setPassword('');
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Login' } });
    dispatch({ type: 'UNSET_USER' });
  }, []);

  useEffect(() => {
    !user.loading && history.push('/main');
  }, [user.loading]);

  return (
    <div id="login-div">
      <form>
        <div className="entry">
          <label htmlFor="username">USERNAME:</label>
          <input
            name="username"
            id="username"
            value={username}
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="entry">
          <label htmlFor="password">PASSWORD:</label>
          <input
            name="password"
            id="password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </form>
      <button onClick={loginBtnClk}>LOGIN</button>
      {!user.id && (
        <button
          onClick={() => {
            history.push('/registration');
          }}>
          New User Registration
        </button>
      )}
      {errors.loginMessage && (
        <h3
          className="alert"
          role="alert">
          {errors.loginMessage}
        </h3>
      )}
    </div>
  );
}

export default Login;
