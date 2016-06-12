var tap = require('tap');
var ArcArray = require('../');

//Test quickFilter
tap.test('ArcArray.quickFilter',function(_test){
    let testArray = new ArcArray('a','b','c','d');

    //Should only accept an array of values
    _test.throws(function(){
        testArray.quickFilter('STRING');
    },TypeError);

    //Automatically filter values 'a' & 'c' (and check we're returning the original array this)
    _test.equal(testArray.quickFilter(['a','c']),testArray);

    //The test array should now be filtered
    _test.same(testArray,['b','d']);

    _test.end();
});