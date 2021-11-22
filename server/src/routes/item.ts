/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';

import Item from '../models/item';

const router = express.Router();
const fs = require('fs');
const utils = require('util');
const objectId = require('mongodb').ObjectID;
const { uploadFile, getFileStream } = require('../s3');

const unlinkFile = utils.promisify(fs.unlink);

import {
  scrapeImageFromUrl,
  addItemToCollection,
  removeItemFromAllCollections,
} from '../utils';

router.get('/images/:id', (req, res: any) => {
  const ImageID = req.params.id;
  const readStream = getFileStream(ImageID);

  readStream.pipe(res);
});

// Create Item
router.post('/create-item', async (req, res) => {
  const { item } = req.body;
  let realItem;
  scrapeImageFromUrl(item.url).then(async (response) => {
    const { ImageID, pageTitle } = response;
    await uploadFile(`./screenshots/${ImageID}.png`);
    await unlinkFile(`./screenshots/${ImageID}.png`);
    item.name = pageTitle;
    realItem = {
      ...item,
      imageID: ImageID,
    };
    try {
      const newItem = await Item.create(realItem);

      const { collections } = newItem;
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
    removeItemFromAllCollections(itemToDelete, id);
    await Item.deleteOne({ _id: new objectId(id) });
    res.json({ status: 'ok', data: 'item deleted successfully' });
  } catch (error: any) {
    res.json({ status: 'error', error: error.message });
    throw error;
  }
});

// Fetch all Items
router.get('/items', async (req, res) => {
  const limit = Number(req.query.limit);
  try {
    const items = await Item.find().limit(limit);
    if (!items) {
      return res.json({ status: 'error', error: 'no items found' });
    }
    res.json({ status: 'ok', data: items });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});

module.exports = router;
