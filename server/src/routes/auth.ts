import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/user';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/logout', (req: any, res) => {
  try {
    req.logout();
    req.session.destroy();
    const responseData = {
      authenticated: req.isAuthenticated(),
    };
    return res.send({ status: 'ok', data: responseData });
  } catch (error: any) {
    res.json({ status: 'error', error: error.message });
  }
});

router.post('/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      status: 'ok',
      data: {
        authenticated: true,
      },
    });
  } else {
    return res.json({
      status: 'error',
      data: {
        authenticated: false,
      },
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user) {
    // Handle Error
    if (err)
      return res.json({ status: 'error', error: 'something went wrong' });

    if (!user) return res.json({ status: 'error', error: 'user not found' });

    req.login(user, function (err) {
      if (err)
        return res.json({ status: 'error', error: 'something went wrong' });

      console.log('req.isAuthenticated(): ', req.isAuthenticated());
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET as string
      );

      const responseData = {
        token: token,
        user: user,
        authenticated: req.isAuthenticated(),
      };
      return res.json({ status: 'ok', data: responseData });
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
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
      collections: [],
    });
    console.log('response: ', response);
    res.json({ status: 'ok', data: 'user registered successfully' });
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate key
      res.json({ status: 'error', error: 'email already in use' });
    } else {
      res.json({ status: 'error', error: error.message });
      throw error;
    }
  }
});

router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res.json({ status: 'error', error: 'no users found' });
    }
    res.json({ status: 'ok', data: allUsers });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});

module.exports = router;
