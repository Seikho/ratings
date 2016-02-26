# ratings
Helper module for calculating ELO ratings adjustments and chance

# Installation
```
npm install ratings --save
```

# Usage
```javascript
const ratings = require('ratings');

// or ES6
import ratings from 'ratings';

// Return the chance of victory for the 
ratings.chance(1550 /* home rating */, 1650 /* away rating */);

// Calculate the rating adjustment
ratings.adjustment(1550, 1650, -1);

// Calculate the expected result
ratings.expected(1700, 1500); 
```

# API

## chance
Returns the chance of victory for the higher rated player (`0.00` -> `1.00`)
```javascript
function chance(homeRating: number, awayRating: number): number;

```

## adjustment
See [Options](#options) interface 
Returns the adjusted ratings based on the provided result
Adjustment and score range can be adjusted in options
```javascript
function adjustment(homeRating: number, awayRating: number, result: number, options?: Options): { home: number, away: number };
``` 

## expected
See [Options](#options) interface  
Returns the expected result given the player ratings (`-1.00` -> `1.00`).  
Result range can by modified in options.
```javascript
function expected(homeRating: number, awayRating: number, options?: Options): number;
```

## Options
```javascript
interface Options {
    /** Defaults to 10. Higher values increase the rating adjustments */
    kFactor?: number;
    
    /** Defaults to 1. Sets the upper limit of the score. 
     * Chess scores can be -1, 0 or 1, therefore the default upper limit is 1. */
    scoreUpperLimit?: number;
}
```