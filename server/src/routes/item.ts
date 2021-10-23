import express from 'express';
const router = express.Router();
import Item from '../models/item';

/**
 *   const item = {
    name: itemName,
    author: email,
    userId: _id,
    description,
    url,
    tags: [{ name: 'typography' }],
    likes: 0,
    isPrivate: false,
    collectionId: '',
  };
 */
router.post('/create-item', async (req, res) => {
  const {
    name,
    author,
    userId,
    description,
    url,
    tags,
    isPrivate,
    collectionId,
    likes,
  } = req.body;
  const { item } = req.body;
  console.log('item: ', item);
  console.log('req.body: ', req.body);
  try {
    const response = await Item.create(item);
    console.log('response: ', response);
    res.json({ status: 'ok', data: 'item created successfully' });
  } catch (error: any) {
    res.json({ status: 'error', error: error.message });
    throw error;
  }

  // const response = await Item.create({
  //   userId: '6168f2afa637c24d925af746',
  //   name: 'first item',
  //   description: 'brief description',
  //   author: 'steve',
  //   collectionId: null,
  //   url: 'https://fonts.ilovetypography.com/category/sans-serif',
  //   image: null,
  //   tags: [],
  //   likes: 0,
  //   uploadedAt: new Date(),
  //   isPrivate: false,
  // });
  // console.log('response: ', response);
});

module.exports = router;
