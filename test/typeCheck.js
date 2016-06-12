var tap = require('tap');
var is = require('arc-is');
var ArcArray = require('../');

//Test native casting, and toString
tap.test('ArcArray typeCheck',function(_test){
    let testArray = new ArcArray('a','b');
    _test.equal(is(testArray),'array');
    _test.equal(is(testArray,true),'ArcArray');
    _test.end();
});