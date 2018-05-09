# cssme

Library to load CSS from JS

1. Install

```npm install cssme```

2. Usage

```javascript
var cssme = require('cssme');

cssme.load({
  'body': {
    'div, p': {
      color: 'red',
      '&:first-child': {
        'font-style': 'italic'
      }
    }
  }
});
```

3. Run tests
  * First start server with `npm run dev`
  * In a separate window run `npm run test`