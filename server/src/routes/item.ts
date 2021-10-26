/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
const router = express.Router();
import Item from '../models/item';
const objectId = require('mongodb').ObjectID;
import {
  base64_encode,
  scrapeImageFromUrl,
  addItemToCollection,
  removeItemFromCollection,
} from '../utils';

// Create Item
router.post('/create-item', async (req, res) => {
  const { item } = req.body;
  let realItem;
  scrapeImageFromUrl(item.url).then(async () => {
    const base64str = base64_encode('./thumbnail.png');
    realItem = {
      ...item,
      image: base64str,
    };
    try {
      const newItem = await Item.create(realItem);

      const { collections } = newItem;
      console.log('newItem: ', newItem);
      if (collections && !!collections.length) {
        const collectionIds = collections.map((c) => c.id);
        addItemToCollection(collectionIds, newItem);
      }
      res.json({ status: 'ok', data: 'item created successfully' });
    } catch (error: any) {
      res.json({ status: 'error', error: error.message });
      throw error;
    }
  });
});

// Delete Item
router.post('/delete-item', async (req, res) => {
  const id = req.body.id;
  try {
    const itemToDelete = await Item.find({ _id: id });
    removeItemFromCollection(itemToDelete, id);
    const result = await Item.deleteOne({ _id: new objectId(id) });
    console.log('result: ', result);
    res.json({ status: 'ok', data: 'item deleted successfully' });
  } catch (error: any) {
    res.json({ status: 'error', error: error.message });
    throw error;
  }
});

// Fetch all Items
router.get('/items', async (req, res) => {
  try {
    const allItems = await Item.find();
    if (!allItems) {
      return res.json({ status: 'error', error: 'no items found' });
    }
    res.json({ status: 'ok', data: allItems });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});

module.exports = router;
