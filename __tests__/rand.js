import ArcArray from "../index.js";

describe('ArcArray rand', () => {
    it('Should return a random item', () => {
        let testArray = new ArcArray(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);

        let valuesFound = [];
        let allValuesFound = false;
        let sequentialRuns = 0;

        while(!allValuesFound) {
            sequentialRuns++;
            const randValue = testArray.rand();
            if(!valuesFound.includes(randValue)){
                valuesFound.push(randValue);
            }
            let allFound = true;
            for(let i=1;i<=testArray.length;i++) {
                if(!valuesFound.includes(i)) {
                    allFound = false;
                    break;
                }
            }
            allValuesFound = allFound;
        }

        expect(sequentialRuns).not.toEqual(testArray.length);
    });
});
