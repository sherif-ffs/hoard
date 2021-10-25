import fs from 'fs';
import puppeteer from 'puppeteer';

export function base64_encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

export const scrapeImageFromUrl = async (url: string) => {
  // open the browser and prepare a page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
    width: 1280,
    height: 800,
  });

  await page.goto(url, { waitUntil: 'load', timeout: 0 });
  await page.screenshot({
    path: './thumbnail.png',
    type: 'jpeg',
    quality: 100,
  });
  // close the browser
  await browser.close();
};
