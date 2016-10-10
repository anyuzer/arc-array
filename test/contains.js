var tap = require('tap');
var ArcArray = require('../');

//Test native casting, and toString
tap.test('ArcArray conatains',function(_test){
    let testArray = new ArcArray('a','b','c');
    _test.equal(testArray.contains('a'),true);
    _test.equal(testArray.contains('z'),false);
    _test.end();
});