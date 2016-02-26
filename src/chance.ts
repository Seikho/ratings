const CHANCE_TABLE = [
    { difference: 25, chance: 0.5 },
    { difference: 50, chance: 0.53 },
    { difference: 100, chance: 0.57 },
    { difference: 150, chance: 0.64 },
    { difference: 200, chance: 0.7 },
    { difference: 250, chance: 0.76 },
    { difference: 300, chance: 0.81 },
    { difference: 350, chance: 0.85 },
    { difference: 400, chance: 0.89 },
    { difference: 450, chance: 0.92 },
    { difference: 500, chance: 0.94 },
    { difference: 735, chance: 0.96 },
    { difference: 799, chance: 0.99 },
]

// TODO: Make configurable
const K_FACTOR = 10;
const DEFAULT_SCORE_LIMIT = 1;
/**
 * @returns The chance for the highest rated player to win (0.0 -> 1.0)
 */
export function winChance(homeRating: number, awayRating: number): number {
    let difference = Math.abs(homeRating - awayRating);
    let chanceRow = CHANCE_TABLE.filter(c => difference <= c.difference)[0];
    
    return chanceRow
        ? chanceRow.chance
        : 1;    
}

export function expectedResult(homeRating: number, awayRating: number, options?: Options): number {
    options = options || {};
    let scoreUpperLimit = options.scoreUpperLimit || DEFAULT_SCORE_LIMIT;
    
    let chance = winChance(homeRating, awayRating);
    
    return ((scoreUpperLimit * 2) * chance - scoreUpperLimit) * (homeRating > awayRating ? 1 : -1) 
}

export function adjustment(homeRating: number, awayRating: number, result: number, options?: Options): { home: number, away: number } {
    options = options || {};
    let kFactor = options.kFactor || K_FACTOR;
    let expected = expectedResult(homeRating, awayRating);
    let ratingChange = Math.abs(K_FACTOR * (result - expected));
    
    let isHomeWinner = result > 0;
    let isAwayWinner = result < 0;
    if (isHomeWinner) {
        homeRating += ratingChange;
        awayRating -= ratingChange;
    } else if (isAwayWinner) {
        homeRating -= ratingChange;
        awayRating += ratingChange;
    } else {
        // Draw
        let isHomeHigher = homeRating > awayRating;
        let isAwayHigher = awayRating < awayRating;
        if (isHomeHigher) {
            homeRating -= ratingChange;
            awayRating += ratingChange;
        } else if (isAwayWinner) {
            homeRating += ratingChange;
            awayRating -= ratingChange;
        }
    }
    return {
        home: homeRating,
        away: awayRating
    }
}

export interface Options {
    /** K-Factor: Higher value causes larger rating adjustments. Defaults to 10 */
    kFactor?: number;
    
    /** Defaults to 1 (Highest Chess score) */
    scoreUpperLimit?: number;
}