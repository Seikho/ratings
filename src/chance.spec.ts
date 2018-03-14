import * as elo from '../src/chance'
import { expect } from 'chai'

// TODO: Add more tests...

describe('chance tests', () => {
  it('will change ratings', () => {
    for (const fixture of fixtures) {
      const { inWhite, inBlack, result } = fixture
      const chance = elo.chance(inWhite, inBlack)
      const { white, black } = elo.adjustment(inWhite, inBlack, result)
      const homeIsGreater = inWhite > inBlack
      const awayIsGreater = inBlack > inWhite
      const ratingsSame = inWhite === inBlack

      if (result !== 0) {
        expect(white).to.not.equal(inWhite)
        expect(black).to.not.equal(inBlack)
      }

      if (result === 0) {
        expect(white).to.not.equal(inWhite)
        expect(black).to.not.equal(inBlack)
      }
    }
  })
})

type Fixture = {
  inWhite: number
  inBlack: number
  result: elo.Result
}

const fixtures: Fixture[] = [
  { inWhite: 1500, inBlack: 1600, result: 1 },
  { inWhite: 1500, inBlack: 1600, result: -1 }
]
