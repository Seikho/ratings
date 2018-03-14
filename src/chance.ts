const K_FACTOR = 32

/**
 * @returns The odds for each player to win
 */
export function chance(whiteRating: number, blackRating: number) {
  const wr = Math.pow(10, whiteRating / 400) * 1000
  const br = Math.pow(10, blackRating / 400) * 1000

  return {
    white: Math.round(wr / (wr + br) * 1000) / 1000,
    black: Math.round(br / (wr + br) * 1000) / 1000
  }
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
  kFactor?: number
) {
  kFactor = kFactor || K_FACTOR

  const winner = getWinner(result)
  const { white, black } = adjust(winner, whiteRating, blackRating, kFactor)

  return {
    white: Math.round(white),
    black: Math.round(black)
  }
}

enum Winner {
  White,
  Black,
  Draw
}

function adjust(winner: Winner, white: number, black: number, k: number) {
  const odds = chance(white, black)
  const whiteShift = winner === Winner.Draw ? 0.5 : winner === Winner.White ? 1 : 0
  const blackShift = winner === Winner.Draw ? 0.5 : winner === Winner.Black ? 1 : 0

  return {
    white: white + k * (whiteShift - odds.white),
    black: black + k * (blackShift - odds.black)
  }
}

function getWinner(result: 1 | 0 | -1) {
  return result === 1 ? Winner.White : result === 0 ? Winner.Draw : Winner.Black
}
