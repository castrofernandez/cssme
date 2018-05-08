'use strict';

class CSSMe {
  load(rules = {}) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = this.stringify(rules);
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  stringify(rules = {}) {
    const output = [];
    const stack = this.getEmptyStack(rules);

    let current, rule, value, selector;

    while (stack.length > 0) {
      current = stack.shift();

      for (rule in current.rules) {
        value = current.rules[rule];

        if (this.isObject(value)) {
          stack.push({
            rules: value,
            nestedSelectors: current.nestedSelectors.concat(rule)
          });
        } else {
          selector = this.getSelector(current.nestedSelectors);
          output[selector] = output[selector] || [];
          output[selector].push({
            property: rule,
            value: value
          });
        }
      }
    }

    return this.formatOutput(output);
  }

  getEmptyStack(rules) {
    return [{
      rules: rules,
      nestedSelectors: []
    }];
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

  getSelector(nestedSelectors) {
    return nestedSelectors.join(' ');
  }

  isObject(obj) {
    return obj instanceof Object;
  }
}

module.exports = new CSSMe();
