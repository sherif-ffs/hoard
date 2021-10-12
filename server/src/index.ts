require('dotenv').config();
import express = require('express');
import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const username = 'selmetwa';
const cluster = 'cluster0.eauvk';
const dbname = 'myFirstDatabase';
const password = process.env.PASSWORD;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(express.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'static')));

app.post('/api/register', async (req, res) => {
  console.log('req.body: ', req.body);
  res.json({ status: 'ok' });
});

import itemsRoute from './routes/itemsRoute';
import testRouter from './testRoute';
app.use('/items', itemsRoute);

app.listen(5000, () => console.log('Server running'));
