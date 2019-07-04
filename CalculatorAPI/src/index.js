import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import '../node_modules/dotenv/config';
import Memory from './Memory';

const PORT = process.env.PORT;
const app = express();

const memory = new Memory();
// middleware
app.use(cors());

// routes
app.get('/all-users', (req, res) => {
  res.json(memory.cache);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
