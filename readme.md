# ratings
Helper module for calculating ELO ratings adjustments and chance

# Installation
```sh
> npm install ratings --save
> yarn add ratings
```

# Usage
```javascript
const elo = require('ratings')

// or ES6
import * as elo from 'ratings'

// Return the chance of victory for the
elo.chance(1550 /* home rating */, 1650 /* away rating */);

// Calculate the rating adjustment
elo.adjustment(1550, 1650, -1)
```

# API

## chance
Returns the expected chance of victory for each player (`0.00` -> `1.00`)
```ts
interface Chance {
    // Percentages in 0.00 -> 1.00
    white: number
    black: number
}
function chance(whiteRating: number, blackRating: number): Chance

```

## adjustment
See [Options](#options) interface
Returns the adjusted ratings based on the provided result
Adjustment and score range can be adjusted in options
```ts

// 1: White win, 0: Draw, -1: Black win
type Result = 1 | 0 | -1

interface Adjustment {
    // Ratings after adjustment:
    white: number
    black: number

    // Rating shift applied
    shift: {
        white: number
        black: number
    }
}

function adjustment(whiteRating: number, blackRating: number, result: Result, kFactor: number = 32): Adjustment
```