require('dotenv').config();
import express = require('express');
import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import bodyParser = require('body-parser');
import bcrypt from 'bcryptjs';
import User from './models/user';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
const cors = require('cors');

const app = express();

const username = 'selmetwa';
const cluster = 'cluster0.eauvk';
const dbname = 'myFirstDatabase';
const password = process.env.PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

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
  const { email } = req.body;
  const user = await User.findOne({ email }).lean();
  console.log('email: ', email);
  console.log('user: ', user);
  if (!user) {
    return res.json({ status: 'error', error: 'Invalid email/password' });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET as string
  );

  const responseData = {
    token,
    user,
  };
  return res.json({ status: 'ok', data: responseData });
});

app.post('/api/register', async (req, res) => {
  const { email, password: plainTextPassword, name } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      email: email,
      password: password,
      name: name,
      role: '',
      twitter: '',
      github: '',
      portfolio: '',
      colections: [],
    });
    console.log('response: ', response);
    res.json({ status: 'ok' });
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate key
      res.json({ status: 'error', error: 'email already in use' });
    } else {
      throw error;
    }
  }
});

import itemsRoute from './routes/itemsRoute';

app.use('/items', itemsRoute);
app.listen(5000, () => console.log('Server running'));
