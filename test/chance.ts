import * as chance from '../src/chance'
import { expect } from 'chai'

// TODO: Add more tests...

describe('chance tests', () => {
  it('will change ratings', () => {
    for (const fixture of fixtures) {
      const { inWhite, inBlack, result, opts } = fixture
      const { white, black } = chance.adjustment(inWhite, inBlack, result, opts)
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
  result: chance.Result
  opts: chance.Options
}

const fixtures: Fixture[] = [
  { inWhite: 1500, inBlack: 1600, result: 1, opts: {} },
  { inWhite: 1500, inBlack: 1600, result: -1, opts: {} }
]
