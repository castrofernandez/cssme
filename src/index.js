'use strict';

class CSSMe {
  stringify(rules = {}, nestedSelectors = []) {
    const output = {};

    this.getCSS(rules, nestedSelectors, output);

    return this.formatOutput(output);
  }

  getCSS(rules = {}, nestedSelectors = [], output = {}) {
    let rule, value;

    for (rule in rules) {
      value = rules[rule];

      if (this.isObject(value)) {
        this.getCSS(value, nestedSelectors.concat(rule), output);
      } else {
        this.setValue(output, nestedSelectors, {
          property: rule,
          value: value
        });
      }
    }
  }

  formatOutput(output) {
    const formatted = [];
    const that = this;

    Object.keys(output).map(function(selector) {
      formatted.push(selector);
      that.formatDeclarations(formatted, output[selector]);
    });

    return formatted.join('');
  }

  formatDeclarations(output, declarations) {
    output.push('{');

    declarations.map(function(declaration) {
      output.push(
        declaration.property,
        ':',
        declaration.value,
        ';'
      );
    });

    output.push('}');
  }

  setValue(output, nestedSelectors, value) {
    const selector = this.getSelector(nestedSelectors);

    if (!output[selector]) {
      output[selector] = [];
    }

    output[selector].push(value);
  }

  getSelector(nestedSelectors) {
    return nestedSelectors.join(' ');
  }

  isObject(obj) {
    return obj instanceof Object;
  }
}

module.exports = new CSSMe();
