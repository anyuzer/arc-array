var tap = require('tap');
var Check = require('arc-check');
var ArcArray = require('../');

//Test filter
tap.test('ArcArray.filter',function(_test){
    let testArray = new ArcArray('a',undefined,'b',false,'c','','d',0);

    //Should only accept valid ArcCheck objects
    _test.throws(function(){
        testArray.filter('STRING');
    },TypeError);

    //Create a check for anything that evaluates false
    var CheckFor = new Check();
    CheckFor.addInclude(function(_check){
        return (!_check ? true : false);
    });

    //Filter accordingly (and check that we're returning the original object for chaining
    _test.equal(testArray.filter(CheckFor),testArray);

    //The test array should now be filtered
    _test.same(testArray,['a','b','c','d']);

    _test.end();
});