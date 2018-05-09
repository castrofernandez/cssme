'use strict';

require('babel-register');
const {expect} = require('chai');
const puppeteer = require('puppeteer');
const cssme = require('../src/index');

describe('cssme: tests', function () {
  // Define global variables
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async function () {
    page = await browser.newPage();

    await page.goto('http://localhost:9000');
  });

  afterEach(async function () {
    await page.close();
  });

  after(async function () {
    await browser.close();
  });

  it('Color', async function () {
    await page.evaluate(() => cssme.load({
      'body': {
        'background-color': 'rgb(255, 255, 255)'
      }
    }));

    expect(await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('background-color'))).to.equal('rgb(255, 255, 255)');
  });

  it('Font-size', async function () {
    await page.evaluate(() => cssme.load({
      'body': {
        'font-size': '43px'
      }
    }));

    expect(await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('font-size'))).to.equal('43px');
  });
});