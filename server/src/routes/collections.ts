/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import Collection from '../models/collection';
import { addItemToCollection, removeItemFromCollection } from '../utils';
const objectId = require('mongodb').ObjectID;

const router = express.Router();

// create collection
router.post('/create-collection', async (req, res) => {
  const { collection } = req.body;
  try {
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
    const collections = await Collection.find({ userId: id });
    res.send({ status: 'ok', data: collections });
  } catch (err) {
    res.send({ status: 'error', error: err });
  }
});

// fetch collection by collectionID
router.get('/collection-by-collection-id', async (req, res) => {
  try {
    const id = req.query.id as string;
    const collection = await Collection.find({ _id: new objectId(id) });
    res.send({ status: 'ok', data: collection });
  } catch (err) {
    res.send({ status: 'error', error: err });
  }
});

// fetch all collections
router.get('/collections', async (req, res) => {
  try {
    const collections = await Collection.find();
    if (!collections) {
      return res.json({ status: 'error', error: 'no collections found' });
    }
    res.json({ status: 'ok', data: collections });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});

// add item to collection
router.post('/add-item-to-collection', async (req, res) => {
  const id = req.body.id;
  const item = req.body.item;
  try {
    addItemToCollection([id], item);
    res.json({ status: 'ok', data: 'item added' });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});

// remove item from collections
router.post('/remove-item-from-collection', async (req, res) => {
  const collectionId = req.body.collectionId;
  const item = req.body.item;

  try {
    removeItemFromCollection(item, collectionId);
    res.json({ status: 'ok', data: 'item removed' });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});

// check if item is included in collection
/**
 * itemId
 * collectionId
 */
router.get('/check-if-item-is-in-collection', async (req, res) => {
  //
  const itemId = req.query.itemId as string;
  const collectionId = req.query.collectionId as string;

  try {
    const collection = await Collection.find({
      _id: new objectId(collectionId),
    });
    const items =
      collection &&
      collection[0] &&
      collection[0].items &&
      collection[0].items.map((item) => item._id);
    // console.log('collection: ', collection);
    // console.log('items: ', items);

    const itemIds = items && !!items.length && items.map((id) => id.toString());
    console.log('itemId: ', itemId);
    console.log('itemIds: ', itemIds);
    const includes = itemIds && itemIds.includes(itemId);
    // const includes = items.includes(itemId);
    console.log('includes: ', includes);
    res.json({ status: 'ok', data: includes });
  } catch (error) {
    return res.json({ status: 'error', error: error });
  }
});
module.exports = router;
