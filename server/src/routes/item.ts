/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
const router = express.Router();
import Item from '../models/item';
const objectId = require('mongodb').ObjectID;
const puppeteer = require('puppeteer');
const fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

const scrapeImageFromUrl = async (url: string) => {
  // open the browser and prepare a page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
    width: 1280,
    height: 800,
  });

  await page.goto(url);
  await page.screenshot({
    path: './thumbnail.png',
  });
  // close the browser
  await browser.close();
};

// Create Item
router.post('/create-item', async (req, res) => {
  const { item } = req.body;
  let realItem;
  scrapeImageFromUrl(item.url).then(() => {
    const base64str = base64_encode('./thumbnail.png');
    console.log('base64str: ', base64str);
    realItem = {
      ...item,
      image: base64str,
    };
    try {
      Item.create(realItem);
      res.json({ status: 'ok', data: 'item created successfully' });
    } catch (error: any) {
      res.json({ status: 'error', error: error.message });
      throw error;
    }
    console.log('realItem: ', realItem);
  });

  // const image = '../../thumbnail.png';
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
