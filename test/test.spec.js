'use strict';

require('babel-register');
const {expect} = require('chai');
const cssme = require('../src/index');

describe('cssme: tests', function () {
  it('Single', async function () {
    const result = cssme.stringify({
      'body': {
        color: 'red'
      }
    });
    expect(result).to.equal('body{color:red;}');
  });

  it('Nested', async function () {
    const result = cssme.stringify({
      'body': {
        'div': {
          color: 'red'
        }
      }
    });
    expect(result).to.equal('body div{color:red;}');
  });
});