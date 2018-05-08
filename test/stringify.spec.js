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

  it('Nested with two declarations', async function () {
    const result = cssme.stringify({
      'body': {
        'div': {
          color: 'red',
          background: 'blue'
        }
      }
    });
    expect(result).to.equal('body div{color:red;background:blue;}');
  });

  it('Nested with two rules', async function () {
    const result = cssme.stringify({
      'body': {
        'div': {
          color: 'red',
          background: 'blue'
        },
        'p': {
          'font-style': 'italic'
        }
      }
    });
    expect(result).to.equal('body div{color:red;background:blue;}body p{font-style:italic;}');
  });
});