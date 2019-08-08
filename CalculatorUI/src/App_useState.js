// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';

// import Calculator from './components/Calculator';
// import Scoreboard from './components/Scoreboard';
// import Profile from './components/Profile';
// import Login from './components/Login';

// //TODO: styled components, use reducer hook, have a guest user that resets to 0 every time page is refreshed, cleanup/layering, authorization, live data, error handling/defensive programming, testing
// //DONE: database, add useState hooks, refactor to useReducer
// export default function App() {
//   const [displayText, setDisplayText] = useState('');
//   const [isCleared, setIsCleared] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);
//   const [users, setUsers] = useState(null);
//   const [loginText, setLoginText] = useState('');

//   useEffect(() => {
//     if (!users) mount();
//   });

//   if (!users || !activeUser) return <p>Loading calculator...</p>;

//   return (
//     <div className="App">
//       <div className="header">Welcome to {activeUser.username}'s calculator!</div>
//       <div className="mainpanel">
//         <Calculator
//           displayText={displayText}
//           addCharacter={addCharacter}
//           clearScreen={clearScreen}
//           evaluate={evaluate}
//         />
//         <div className="login">
//           <Login
//             loginText={loginText}
//             changeLogin={handleChangeLogin}
//             requestLogin={handleLoginRequest}
//           />
//         </div>
//       </div>
//       <div className="sidepanel">
//         <div className="profile">
//           <Profile username={activeUser.username} score={activeUser.score} />
//         </div>
//         <div className="scoreboard">
//           <Scoreboard users={users} />
//         </div>
//       </div>
//     </div>
//   );

//   function addCharacter(char) {
//     setDisplayText(isCleared ? `${char}` : `${displayText}${char}`);
//     setIsCleared(false);
//   }

//   function clearScreen() {
//     setDisplayText('');
//   }

//   async function evaluate() {
//     try {
//       const evaluatedValue = eval(displayText);
//       if (isCleared || evaluatedValue == undefined) {
//         return;
//       }
//       console.log('before POST. equation:', displayText);
//       const userWithNewScore = await axios.post(
//         `http://localhost:3002/increment-score?username=${activeUser.username}&`,
//         { displayText }
//       );

//       console.log('finished POST. evaluated value: ', evaluatedValue);
//       const newActiveUser =
//         userWithNewScore.data.username === activeUser.username
//           ? {
//               username: activeUser.username,
//               score: userWithNewScore.data.newScore
//             }
//           : activeUser;
//       console.log('active user: ', newActiveUser, '   evaluated value:', evaluatedValue);
//       setDisplayText(evaluatedValue);
//       setIsCleared(true);
//       setActiveUser(newActiveUser);

//       getUsers();
//     } catch (error) {
//       clearScreen();
//       console.log('Eval error');
//     }
//   }

//   async function getUsers() {
//     try {
//       const response = await axios.get('http://localhost:3002/all-users');
//       await setUsers(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(1, error);
//     }
//   }

//   // text in login box
//   function handleChangeLogin(event) {
//     const text = event.target.value;
//     setLoginText(text);
//   }

//   async function postLogin(username) {
//     try {
//       const userObject = await axios.post(`http://localhost:3002/login?username=${username}`);
//       return userObject;
//     } catch (error) {}
//   }

//   async function handleLoginRequest() {
//     const activeUser = await postLogin(loginText);
//     setActiveUser(activeUser.data);
//     setLoginText('');
//     clearScreen();
//   }

//   async function mount() {
//     let users_list = await getUsers();
//     setActiveUser(users_list[0]);
//   }
// }
