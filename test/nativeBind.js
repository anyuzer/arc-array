var tap = require('tap');
var is = require('arc-is');
var ArcArray = require('../');

//Bind ArcArray to the native object
ArcArray.bindNative();

//Test native casting, and toString
tap.test('ArcArray nativeBind',function(_test){
    let testArray = ['a','b'].arc();
    _test.equal(is(testArray),'array');
    _test.equal(is(testArray,true),'ArcArray');

    testArray = [1].arc();
    _test.equal(testArray[0],1);

    const sameArray = testArray.arc();
    _test.equal(sameArray,testArray);

    _test.end();
});