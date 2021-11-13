/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import Collection from '../models/collection';

const router = express.Router();

// create collection
router.post('/create-collection', async (req, res) => {
  const { collection } = req.body;
  try {
    const result = await Collection.create(collection);
    console.log('result; ', result);
    res.send({ status: 'ok', data: 'collection created successfully ' });
  } catch (err) {
    res.send({ status: 'error', error: err });
  }
});

// fetch collections by userId
router.get('/collection', async (req, res) => {
  try {
    const id = req.query.id as string;
    const collections = await Collection.find({ userId: id });
    res.send({ status: 'ok', data: collections });
  } catch (err) {
    res.send({ status: 'error', error: err });
  }
});

// fetch all collections
module.exports = router;
router.get('/collections', async (req, res) => {
  try {
    const collections = await Collection.find();
    if (!collections) {
      return res.json({ status: 'error', error: 'no collections found' });
    }
    res.json({ status: 'ok', data: collections });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});
