import express from 'express';
import Item from '../models/item';

const router = express.Router();

// get all
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// create item
router.post('/', async (req, res) => {
  const item = new Item({});
});

export default router;
