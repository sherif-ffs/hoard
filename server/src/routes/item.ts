/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
const router = express.Router();
import Item from '../models/item';
const objectId = require('mongodb').ObjectID;

const scrapeUrl = async (url: string) => {
  //
};

// Create Item
router.post('/create-item', async (req, res) => {
  const { item } = req.body;
  try {
    Item.create(item);
    res.json({ status: 'ok', data: 'item created successfully' });
  } catch (error: any) {
    res.json({ status: 'error', error: error.message });
    throw error;
  }
});

// Delete Item
router.post('/delete-item', async (req, res) => {
  const id = req.body.id;
  console.log('id: ', id);
  try {
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
