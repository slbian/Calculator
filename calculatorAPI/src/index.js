import '../node_modules/dotenv/config';
import bodyParser from 'body-parser';
import cors from '../node_modules/cors/lib';
import executionsRouter from './routes/executions';
import express from '../node_modules/express';
// import socketIo from '../node_modules/socket.io'; // socket.io
// import http from 'http'; // socket.io
import morgan from 'morgan';
import passport from './Passport/jwtStrategy';
import themesRouter from './routes/themes';
import token from './routes/token';
import usersRouter from './routes/users';
import registerRouter from './routes/register';

const PORT = process.env.PORT || 3002;
const app = express();

// const server = http.createServer(app);
// const io = socketIo(server);

// io.on("connection", socket => {
//   console.log("New client connected");

//   //Here we listen on a new namespace called "incoming data"
//   socket.on("incoming data", (data)=>{
//       //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
//      socket.broadcast.emit("outgoing data", {num: data});
//   });

//   //A special namespace "disconnect" for when a client disconnects
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

// server.listen(PORT, () => console.log(`http listening on port ${PORT}`));


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

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
