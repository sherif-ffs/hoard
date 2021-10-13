require('dotenv').config();
import express = require('express');
import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import bodyParser = require('body-parser');
const cors = require('cors');
import bcrypt from 'bcryptjs';
import User from './models/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'asdfghjk123983425098312knaasdoihadsb';
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

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('req.body: ', req.body);
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' });
  }
  console.log('user: ', user);
  if (user) {
    // success
    const token = jwt.sign(
      {
        id: user._id,
        username: user.email,
      },
      JWT_SECRET
    );
    return res.json({ status: 'ok', data: token });
  }
  return res.json({ status: 'error', error: 'Invalid username/password' });
});

app.post('/api/register', async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      email: username,
      password: password,
      name: 'sherif',
      role: '',
      twitter: '',
      github: '',
      portfolio: '',
      colections: [],
    });
    res.json({ status: 'ok' });
    console.log('response: ', response);
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate key
      console.log('error: ', error);
      res.json({ status: 'error', error: 'email already in use' });
    } else {
      throw error;
    }
  }
});

import itemsRoute from './routes/itemsRoute';
import user from './models/user';
app.use('/items', itemsRoute);

app.listen(5000, () => console.log('Server running'));
