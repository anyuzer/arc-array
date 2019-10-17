const is = require('arc-is');
const ArcArray = require('../');

//Test wrapping an existing array
describe('ArcArray.wrap',function(){
    it('should turn a native array into an ArcArray', () => {
        let testArray = ['a','b'];
        let wrapResult = ArcArray.wrap(testArray);

        expect(is(wrapResult,true)).toEqual('ArcArray');
        expect(testArray).toEqual(wrapResult);
        expect(wrapResult).toBe(ArcArray.wrap(wrapResult));

        const testArray2 = ['a'];
        wrapResult = ArcArray.wrap(testArray2);

        expect(is(wrapResult,true)).toEqual('ArcArray');
        expect(testArray2).toEqual(wrapResult);
        expect(wrapResult).toBe(ArcArray.wrap(wrapResult));
    });
});