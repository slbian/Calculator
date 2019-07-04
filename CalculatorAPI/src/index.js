import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import '../node_modules/dotenv/config';

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('suppupfs!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
