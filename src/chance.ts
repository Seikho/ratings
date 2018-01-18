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
  { difference: 799, chance: 0.99 }
]

const K_FACTOR = 10
const DEFAULT_SCORE_LIMIT = 1

/**
 * @returns The chance for the highest rated player to win (0.0 -> 1.0)
 */
export function chance(whiteRating: number, blackRating: number): number {
  const difference = Math.abs(whiteRating - blackRating)
  const chanceRow = CHANCE_TABLE.filter(c => difference <= c.difference)[0]

  return chanceRow ? chanceRow.chance : 1
}

export function expected(whiteRating: number, blackRating: number, options?: Options): number {
  options = options || {}
  const scoreUpperLimit = options.scoreUpperLimit || DEFAULT_SCORE_LIMIT

  const winChance = chance(whiteRating, blackRating)

  return (scoreUpperLimit * 2 * winChance - scoreUpperLimit) * (whiteRating > blackRating ? 1 : -1)
}

/**
 *  1: White,
 * -1: Black,
 *  0: Draw
 */
export type Result = 1 | 0 | -1

export function adjustment(
  whiteRating: number,
  blackRating: number,
  result: Result,
  options?: Options
) {
  options = options || {}
  const kFactor = options.kFactor || K_FACTOR
  const expectedResult = expected(whiteRating, blackRating)
  const ratingChange = Math.abs(kFactor * (result - expectedResult))

  const winner = getWinner(result)
  return adjust(winner, whiteRating, blackRating, ratingChange)
}

enum Winner {
  White,
  Black,
  Draw
}

function adjust(winner: Winner, white: number, black: number, adjustment: number) {
  switch (winner) {
    case Winner.White:
      return {
        white: white + adjustment,
        black: black - adjustment
      }

    case Winner.Black:
      return {
        white: white - adjustment,
        black: black + adjustment
      }

    case Winner.Draw:
      const whiteHigher = white > black
      if (whiteHigher) {
        return {
          white: white - adjustment,
          black: black + adjustment
        }
      }
      return {
        white: white - adjustment,
        black: black + adjustment
      }
  }
}

function getWinner(result: 1 | 0 | -1) {
  return result === 1 ? Winner.White : result === 0 ? Winner.Black : Winner.Draw
}

export interface Options {
  /** K-Factor: Higher value causes larger rating adjustments. Defaults to 10 */
  kFactor?: number

  /** Defaults to 1 (Highest Chess score) */
  scoreUpperLimit?: number
}
