/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
const router = express.Router();
import Collection from '../models/collection';

// create collection
router.post('/create-collection', async (req, res) => {
  try {
    const testCollection = {
      userId: '6168f2afa637c24d925af746',
      title: 'Second Test Collection',
      description: 'My Second Collection',
      tags: null,
      items: [],
      likes: 0,
      isPrivate: false,
    };
    const res = await Collection.create(testCollection);
    console.log('res; ', res);
  } catch (err) {
    res.send({ status: 'error', error: err });
  }
});

// fetch collections by user

// fetch all collections

module.exports = router;
