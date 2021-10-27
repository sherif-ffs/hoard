/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
const router = express.Router();
import Collection from '../models/collection';

// create collection
router.post('/create-collection', async (req, res) => {
  const { collection } = req.body;
  try {
    // const testCollection = {
    //   userId: '6168f2afa637c24d925af746',
    //   title: 'Third Test Collection',
    //   description: 'My Third Collection',
    //   tags: null,
    //   items: [],
    //   likes: 0,
    //   isPrivate: false,
    // };
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
    console.log('id: ', id);
    const collections = await Collection.find({ userId: id });
    res.send({ status: 'ok', data: collections });
  } catch (err) {
    res.send({ status: 'error', error: err });
  }
});

// fetch all collections

module.exports = router;
