import express from 'express';
const router = express.Router();
import Item from '../models/item';

/**
  itemId: number;
  userId: number;
  collectionId: number;
  url: string;
  image?: string | null;
  tags?: Array<TagInterface> | null;
  likes: number;
  isPrivate: boolean;
 */
router.post('/create-item', async (req, res) => {
  const response = await Item.create({
    userId: '6168f2afa637c24d925af746',
    author: 'steve',
    collectionId: null,
    url: 'https://fonts.ilovetypography.com/category/sans-serif',
    image: null,
    tags: [],
    likes: 0,
    uploadedAt: new Date(),
    isPrivate: false,
  });
  console.log('response: ', response);
});

module.exports = router;
