require('dotenv').config();
import express = require('express');
import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import bcrypt from 'bcryptjs';
import User from './models/user';
import jwt from 'jsonwebtoken';
const cors = require('cors');
import passport from 'passport';
// const initializePassport = require('./passport-config');
import flash from 'express-flash';
import session from 'express-session';

const app = express();

// Passport Config
require('./config/passport')(passport);

const username = 'selmetwa';
const cluster = 'cluster0.eauvk';
const dbname = 'myFirstDatabase';
const password = process.env.PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Connect to MongoDB
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
app.use(flash());
app.use(
  session({
    secret: JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, 'static')));

app.post('/api/logout', (req, res) => {
  //
  req.logout();
  res.json({ status: 'ok', data: 'you have been logged out' });
});

app.post('/api/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    // Handle Error
    if (err)
      return res.json({ status: 'error', error: 'something went wrong' });

    if (!user) return res.json({ status: 'error', error: 'user not found' });

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
  })(req, res, next);
});
// app.post(
//   '/api/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   })
// );
// app.post('/api/login', async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email }).lean();
//   console.log('email: ', email);
//   console.log('user: ', user);
//   if (!user) {
//     return res.json({ status: 'error', error: 'Invalid email/password' });
//   }

//   const token = jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//     },
//     JWT_SECRET as string
//   );

//   const responseData = {
//     token,
//     user,
//   };
//   return res.json({ status: 'ok', data: responseData });
// });

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

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  //
}

app.listen(5000, () => console.log('Server running'));
