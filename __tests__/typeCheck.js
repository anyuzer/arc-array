import is from 'arc-is';
import ArcArray from "../index.js";

describe('ArcArray typeCheck', () => {
    it('Should pass a check as a native Array, or when strictly cast as an ArcArray', () => {
        let testArray = new ArcArray('a','b');
        expect(is(testArray)).toEqual('array');
        expect(is(testArray,true)).toEqual('ArcArray');
    });
});
