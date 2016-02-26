import * as chance from '../src/chance';
import * as chai from 'chai';
const expect = chai.expect;

describe('chance tests', () => {
   it('will change ratings', () => {
       testScores.forEach(s => {
           let result = chance.adjustment(s[0], s[1], s[2], s[3]);
           let homeIsGreater = s[0] > s[1];
           let awayIsGreater = s[1] > s[0];
           let ratingsAreSame = s[0] === s[1];
                     
           if (s[2] !== 0) {
               expect(result.home).to.not.equal(s[0]);
               expect(result.away).to.not.equal(s[1]);
           }
           
           if (s[2] === 0 && (homeIsGreater || awayIsGreater)) {
               expect(result.home).to.not.equal(s[0]);
               expect(result.away).to.not.equal(s[1]);
           }
       });
   });
});


let testScores: Array<any> = [
    [1500, 1600, 1, {}],
    [1500, 1600, -1, {}]
]