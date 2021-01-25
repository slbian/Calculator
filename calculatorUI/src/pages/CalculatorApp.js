import React, { useEffect, useContext } from 'react'; // useState, useReducer
import styled from 'styled-components';

import ReactNotifications, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import socketIOClient from 'socket.io-client';

import './CalculatorApp.css';
import { mountCalculator, setUsers } from '../state/actions';
import { Store } from '../state/store';
import Calculator from '../components/calculator/Calculator';
import getActiveUser from '../api/getActiveUser';
import getScoreboardUsers from '../api/getScoreboardUsers';
import getAllThemes from '../api/getAllThemes';
import history from '../state/history';
import Logout from '../components/Logout';
import Profile from '../components/Profile';
import Scoreboard from '../components/Scoreboard';
import ThemePicker from '../components/ThemePicker';
import fish from '../images/fish_midnight.png';

// TODO: memoization, add different emojis, change eval, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer, refactor to useContext, styled components, add styling to database, authentication w argon2, layered route/controller/service/data access object API, live data, 

// error message in state
// style login page, make sure it has messages (invalid credentials) - or different error like network error (force by shutting down server)
// bring in that kind of error for the calculator, like if backend goes down while someone tries to evaluate
// logout button - just push to login page, and clear local storage
// add profile page
// cleanup all logs, make sure organized
// background-image: url(${props => props.themePath});
const StyledDiv = styled.div`
  background-image: url(${fish});
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  
  .header {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: ${props => props.secondaryColor};
    text-transform: lowercase;
    font-weight: 500;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 50px;
    text-shadow: 1px 1px 1px white;
  }
  .mainpanel {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  .notification-item {
    background-color: ${props => (props.notificationType==='login' ? 'green' : 'red')};
    box-shadow: unset;
    justify-content: center;
    align-items: center;
    height: 110px;
    width: 300px;
  }
  .sidepanel {
    background-color: ${props => props.secondaryColor};
    display: flex;
    justify-content: right;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    height: 100vh;
  }
  .profileConfig {
    width: 230px;
    height: ${props => (props.isOpen ? '110px' : '0px')};
    transition: all 0.5s;
  }
`;

const StyledButton = styled.button`
  border-radius: 20px 20px 20px 20px;
  background-color: skyblue;
  border: none;
  height: auto;
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
  outline: none;
  width: 200px;
  margin: 5px;

  :active {
    box-shadow: none;
  }
  ::selection {
    background: transparent;
  }
`;

export default function CalculatorApp() {
  const { state, dispatch } = useContext(Store);

  async function mount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const activeUserResponse = await getActiveUser(); // calling API
      const allUsersResponse = await getScoreboardUsers();
      const allThemesResponse = await getAllThemes(); // return [ {id: 1, color: 'tomato}...
      
      if (
        activeUserResponse &&
        allUsersResponse &&
        activeUserResponse.data &&
        allUsersResponse.data &&
        allThemesResponse
      ) {
        dispatch(
          mountCalculator({
            activeUser: activeUserResponse.data,
            users: allUsersResponse.data,
            themes: allThemesResponse.data
          })
        );

      } else {
        console.log('CALCULATOR MOUNTING FAILED');
      }
    } else {
      console.log('MOUNT: no token');
      history.push('/login');
    }
  }

  useEffect(() => {
    mount();
    const token = window.localStorage.getItem('token');
    const socket = socketIOClient('http://localhost:3002',{
      query: `auth_token=${token}`,
      withCredentials: true,
    }); // looking at port 3003 (hacky way) // TODO: PORT environment variable
    // console.log(socket)
    socket.on('new-connection', user => {
      // console.log('connection socket user = ', {user, type: 'login'})
      store.addNotification({
        // content: MyNotification(user, "login"),
        title: 'login',
        message: user[0].username,
        type: 'success',
        container: 'top-left',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
          duration: 3000, 
          pauseOnHover: true
        }
      })
    }); 

    socket.on('disconnection', user => {
      // console.log('disconnection socket user = ', {user, type: 'logout'})
      store.addNotification({
        // content: MyNotification(user, "logout"),
        title: 'logout',
        message: user[0].username,
        type: 'default',
        container: 'top-left',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
          duration: 3000, 
        }
      })
    }); 

    socket.on('update-scoreboard', data => {
      // data is array of all the active users
      dispatch(setUsers(data.users)); 
    }); 

    return () => socket.disconnect();
  //eslint-disable-next-line
  }, []); // [] means can only get called once 

  if (!state || !state.activeUser || !state.users || !state.themes) {
    return null;
  }

  function handleWeatherRequest(event) {
    event.preventDefault();
    history.push('/weather');
  }

  return (   
    <div>
    <ReactNotifications />
    <StyledDiv
      isOpen={state.profileConfigOpen}
      themePath={state.activeUser.theme.themePath}
      secondaryColor={state.activeUser.theme.secondaryColor}
    >
      <div className="mainpanel">
      <StyledButton type="button" onClick={handleWeatherRequest}>
          What's the weather today?
      </StyledButton>
        <div>
          <h1 className="header">Welcome to {state.activeUser.username}'s calculator!</h1>
        </div>  
        <div>
          <Calculator />
        </div>
      </div>
      <div className="sidepanel">
        <div className="profile">
          <Profile username={state.activeUser.username} score={state.activeUser.score} />
        </div>
        <div className="profileConfig">
          <ThemePicker />
          <Logout />
        </div>
        <div className="scoreboard">
          <Scoreboard users={state.users} />
        </div>
      </div>
    </StyledDiv>
    </div>
  );
}

// function MyNotification(user, type) {
//   return (
//     // <div style={{
//     //   backgroundColor: type==="login" ? 'green' : 'red',
//     //   borderRadius: 5,
//     // }}>
//     //   <h4>{user[0].username}</h4>
//     //   <p>{type}</p>
//     // </div>
//     <StyledDiv notificationType={type}>
//       <div className='notification-item'>
//         <div>
//           <h4>{user[0].username}</h4>
//           <p>{type}</p>
//         </div>
//       </div>
//     </StyledDiv>
//   )
// }

