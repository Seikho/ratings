/**
 * @returns The odds for each player to win
 */
export declare function chance(whiteRating: number, blackRating: number): {
    white: number;
    black: number;
};
/**
 *  1: White,
 * -1: Black,
 *  0: Draw
 */
export declare type Result = 1 | 0 | -1;
export declare function adjustment(whiteRating: number, blackRating: number, result: Result, kFactor?: number): {
    white: number;
    black: number;
    shift: {
        white: number;
        black: number;
    };
};
