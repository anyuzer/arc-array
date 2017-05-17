const tap = require('tap');
const is = require('arc-is');
const ArcArray = require('../');

//Test native casting, and toString
tap.test('ArcArray.wrap',function(_test){
    _test.throws(function(){
        ArcArray.wrap('STRING');
    },TypeError);

    let testArray = ['a','b'];
    let wrapResult = ArcArray.wrap(testArray);
    _test.equal(is(wrapResult,true),'ArcArray');
    _test.same(testArray,wrapResult);
    _test.equal(wrapResult,ArcArray.wrap(wrapResult));

    const testArray2 = ['a'];
    wrapResult = ArcArray.wrap(testArray2);
    _test.equal(is(wrapResult,true),'ArcArray');
    _test.same(testArray2,wrapResult);
    _test.equal(wrapResult,ArcArray.wrap(wrapResult));

    _test.end();
});