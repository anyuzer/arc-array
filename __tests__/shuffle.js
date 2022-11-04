import ArcArray from "../index.js";

describe('ArcArray shuffle', () => {
    it('Should shuffle the array in place', () => {
        let testArray = new ArcArray(1,2,3,4,5,6);
        testArray.shuffle();
        expect(testArray).not.toEqual([1,2,3,4,5,6]);
    });
});
