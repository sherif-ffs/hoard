import express from 'express';
import { IGetTestInformation } from './definitionFile';

const router = express.Router();

// get all
router.get('/', (req, res) => {
  res.send('Success');
});

// get one
router.get('/:id', (req, res) => {
  res.send(req.params.id);
});

// create one
// router.post('/:id', (req, res) => {
//   //
// });

export default router;
// module.exports = router;
