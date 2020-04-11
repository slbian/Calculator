import '../node_modules/dotenv/config';
import bodyParser from 'body-parser';
import cors from '../node_modules/cors/lib';
import executionsRouter from './routes/executions';
import express from '../node_modules/express';
import socketIo from '../node_modules/socket.io'; // socket.io
import http from 'http'; // socket.io
import morgan from 'morgan';
import passport from './Passport/jwtStrategy';
import themesRouter from './routes/themes';
import token from './routes/token';
import usersRouter from './routes/users';
import registerRouter from './routes/register';
import jwt from 'jsonwebtoken';

var jwtAuth = require('socketio-jwt-auth');


const PORT = process.env.PORT || 3002;
const app = express();

// Sharon
// const server = http.createServer(app);
// const io = socketIo(server);
  
  // chuck
  // export const socketServer = http.Server(); // create an empty new server
  // export const io = socketIo(socketServer);

  // socketServer.listen(3003, "127.0.0.1", () => { // different port, anyone can listen to it
  //   console.log("UNAUTHENTICATED SOCKET LISTENING ON 3003");
  // });

// const memory = new Memory();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


//routes - if the path is /token, do this. if not, ignore
app.use('/register', registerRouter);
app.use('/token', token);

// ^ public
// single slash means this runs for every route below this - like a wildcard
app.use('/', passport.authenticate('jwt', { session: false }));
// everything below: private - protected route
// request has header and body (where data lives) - header has authentication (token) - we put the token on the header
// req lives thru all of these routes until we send a response - then it dies

app.use('/', (req, res, next) => {
  req.actor = req.user;
  delete req.user;
  next();
});

// if you change secret, all tokens will be nuked
// store token in state for now (then refactor to local storage)

//passport route - must pass passport if u want to do any other route, make sure right person, signed w our secret
// check if user/pass is in right format, if there even is user/pass

app.use('/users', usersRouter);
app.use('/executions', executionsRouter);
app.use('/themes', themesRouter);

// app.listen(PORT, () => console.log(`Listening on port ${PORT}!`)); // pre-sockets listener

// Socket stuff below
const socketServer = http.createServer(app); // new server based on our original express app

// console.log(typeof app)
// console.log("!!!", app)

export const io = socketIo(socketServer, {
  // get past cors
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-auth-token",  // list of acceptable headers
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

// New Authenticate package
io.use((packet, next) => {
  if(!packet.handshake || !packet.handshake.query.auth_token) {
    return;
  }

  try{
    // console.log(packet.handshake.query.auth_token, ">>>");
    const decodedToken = jwt.verify(packet.handshake.query.auth_token, process.env.JWT_SECRET);
    console.log('SUCCESS', decodedToken);

    // TODO
    // log id of the user
    // publish the id of connected people, and show a popup for other users when someone logs in
    // same for when someone logs out
    // query the user from userservice
    // something with next() to pass user object

    next();
  } catch(err) {
    console.log(err);
    next(err);
  }
})

// useful log
io.on("connection", () => {
  console.log("Connected Successfully!");
});

io.on('error', function(err) {
  throw new Error(err);
});

// new server that wraps the app
socketServer.listen(PORT, () => console.log(`Listening on port ${PORT}!`));