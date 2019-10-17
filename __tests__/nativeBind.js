const is = require('arc-is');
const ArcArray = require('../');

describe('ArcArray nativeBind', () => {
    it('should extend the native array object with ArcArray methods', () => {
        ArcArray.bindNative();

        let testArray = ['a','b'].arc();
        expect(is(testArray)).toEqual('array');
        expect(is(testArray,true)).toEqual('ArcArray');

        testArray = [1].arc();
        expect(testArray[0]).toEqual(1);

        const sameArray = testArray.arc();
        expect(sameArray).toEqual(testArray);
    });
});

