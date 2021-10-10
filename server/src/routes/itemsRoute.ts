import express from 'express';
import Item from '../../models/item';

const router = express.Router();

// get all
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: err.message });
  }
});

// get one
// router.get('/:id', (req, res) => {
//   res.send(req.params.id);
// });

export default router;
