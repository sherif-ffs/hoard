import fs from 'fs';
import puppeteer from 'puppeteer';
import Collection from './models/collection';
const objectId = require('mongodb').ObjectID;

export function base64_encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

export const scrapeImageFromUrl = async (url: string) => {
  // if screenshots directory is not exist then create one
  if (!fs.existsSync('./screenshots')) {
    fs.mkdirSync('./screenshots');
  }

  // open the browser and prepare a page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
    width: 1280,
    height: 800,
  });

  const ImageID = new Date().getTime().toString(36);
  const loc = `./screenshots/${ImageID}.png`;
  await page.goto(url);
  await page.screenshot({
    path: loc,
  });

  // close the browser
  await browser.close();
  console.log(`✅ - (${url})`);
  return ImageID;
};

// Add Item To Collection
export const addItemToCollection = async (
  collectionIds: Array<string>,
  item: any
) => {
  collectionIds.forEach(async (collectionId) => {
    const res = await Collection.updateOne(
      {
        _id: new objectId(collectionId),
      },
      { $push: { items: item } }
    );
    console.log('res: ', res);
  });
};

export const removeItemFromCollection = async (itemToDelete: any, id: any) => {
  const { collections } = itemToDelete[0];
  if (collections && !!collections.length) {
    const collectionIds = collections.map((c) => c.id.toString());
    collectionIds.forEach(async (collectionId) => {
      const res = await Collection.updateOne(
        {
          _id: new objectId(collectionId),
        },
        { $pull: { items: { _id: new objectId(id) } } }
      );
      console.log('res: ', res);
    });
  }
};
