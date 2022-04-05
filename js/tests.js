const chai = window.chai;
const expect = chai.expect;

describe('calcAverage', () => {
    it('Should calculate the average of the subjects', () => {
        let results = {
            data: [{
                Algebra: "92",
                Calculus: "78",
                Databases: "67",
                Programming: "65"
            },
            {
                Algebra: "53",
                Calculus: "93",
                Databases: "10",
                Programming: "43"
            },
            {
                Algebra: "50",
                Calculus: "67",
                Databases: "88",
                Programming: "72"
            }]
        }
        expect(calcAverage(results, 0)).to.deep.equal(75.5);
        expect(calcAverage(results, 1)).to.deep.equal(49.8);
        expect(calcAverage(results, 2)).to.deep.equal(69.3);
    })
})

describe('getGrade', () => {
    it('Should convert mark to grade between A to F', () => {
        expect(getGrade(90)).to.deep.equal('A');
        expect(getGrade(65)).to.deep.equal('C');
        expect(getGrade(3)).to.deep.equal('F');
    })
})