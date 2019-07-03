import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('suppupfs!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
