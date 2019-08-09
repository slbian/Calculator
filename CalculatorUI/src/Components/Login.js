import React, { useContext } from 'react';
import { Store } from '../state/store';
import { clearScreen, setLoginText, setActiveUser } from '../state/actions';
import postLogin from '../api/postLogin';

export default function Login() {
  const { state, dispatch } = useContext(Store);

  return (
    <div className="login">
      LOGIN:
      <input value={state.loginText} onChange={handleChangeLogin} />
      <button type="button" onClick={handleLoginRequest}>
        login
      </button>
    </div>
  );

  // text in login box
  function handleChangeLogin(event) {
    const text = event.target.value;
    dispatch(setLoginText(text));
  }

  async function handleLoginRequest() {
    const activeUser = await postLogin(state.loginText);
    dispatch(setActiveUser(activeUser.data));
    dispatch(setLoginText(''));
    dispatch(clearScreen());
  }
}
