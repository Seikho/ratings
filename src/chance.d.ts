/**
 * @returns The chance for the highest rated player to win (0.0 -> 1.0)
 */
export declare function chance(whiteRating: number, blackRating: number): number;
export declare function expected(whiteRating: number, blackRating: number, options?: Options): number;
/**
 *  1: White,
 * -1: Black,
 *  0: Draw
 */
export declare type Result = 1 | 0 | -1;
export declare function adjustment(whiteRating: number, blackRating: number, result: Result, options?: Options): {
    white: number;
    black: number;
};
export interface Options {
    /** K-Factor: Higher value causes larger rating adjustments. Defaults to 10 */
    kFactor?: number;
    /** Defaults to 1 (Highest Chess score) */
    scoreUpperLimit?: number;
}
