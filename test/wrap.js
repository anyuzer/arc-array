var tap = require('tap');
var is = require('arc-is');
var ArcArray = require('../');

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
    _test.end();
});