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

  it('Double nested', async function () {
    const result = cssme.stringify({
      'body': {
        'div': {
          color: 'red',
          'p': {
            'font-style': 'italic'
          }
        }
      }
    });
    expect(result).to.equal('body div{color:red;}body div p{font-style:italic;}');
  });

  it('Double nested surrounded', async function () {
    const result = cssme.stringify({
      'body': {
        'div': {
          color: 'red',
          'p': {
            'font-style': 'italic'
          },
          'background-color': 'black'
        }
      }
    });
    expect(result).to.equal('body div{color:red;background-color:black;}body div p{font-style:italic;}');
  });

  it('&', async function () {
    const result = cssme.stringify({
      'body': {
        'div': {
          color: 'red',
          '&:hover, &:first-child': {
            'font-style': 'italic'
          }
        }
      }
    });
    expect(result).to.equal('body div{color:red;}body div:hover{font-style:italic;}body div:first-child{font-style:italic;}');
  });

  it('comma separated', async function () {
    const result = cssme.stringify({
      'body': {
        'div, p': {
          color: 'red',
          '&:hover, &:first-child': {
            'font-style': 'italic'
          }
        }
      }
    });
    expect(result).to.equal('body div{color:red;}body p{color:red;}body div:hover{font-style:italic;}body div:first-child{font-style:italic;}body p:hover{font-style:italic;}body p:first-child{font-style:italic;}');
  });
});