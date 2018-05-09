'use strict';

class CSSMe {
  load(rules = {}) {
    if (typeof window === 'undefined') {
      return;
    }

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
          rule.split(',').forEach(segment => {
            stack.push({
              rules: value,
              nestedSelectors: this.replaceAmpersand(segment.trim(), current.nestedSelectors)
            });
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

  replaceAmpersand(rule, nestedSelectors) {
    if (!rule.includes('&') || nestedSelectors.length === 0) {
      return nestedSelectors.concat(rule);
    }

    const last = nestedSelectors[nestedSelectors.length - 1];
    const selector = rule.replace(/&/g, last);

    return nestedSelectors.slice(0, -1).concat(selector);
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
