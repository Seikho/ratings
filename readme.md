# ratings
Helper module for calculating ELO ratings adjustments and chance

# installation
```
npm install ratings --save
```

# usage
```javascript
const ratings = require('ratings');

// or ES6
import ratings from 'ratings';

ratings.winChance(1550 /* home rating */, 1650 /* away rating */, -1 /* result*/);
ratings.adjustment(1550, 1650, -1);
```