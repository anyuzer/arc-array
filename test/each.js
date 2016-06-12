var tap = require('tap');
var ArcArray = require('../');

//Test each iterator
tap.test('ArcArray.each',function(_test){
    let testArray = new ArcArray('a','b','c','d');

    //If each does not receive a valid function, throw a TypeError
    _test.throws(function(){
        testArray.each('STRING');
    },TypeError);

    //Ensure the iteration behaves as expected
    testArray.each(function(_value,_index){
        switch(_index){
            case 0: _test.equal(_value,'a');    break;
            case 1: _test.equal(_value,'b');    break;
            case 2: _test.equal(_value,'c');    break;
            case 3: _test.equal(_value,'d');    break;
        }
    });

    //Ensure break behaves as expected
    let count = 0;
    testArray.each(function(_v,_i,_break){
        (_i === 2 ? _break() : count++);
    });
    _test.equal(count,2);

    //End
    _test.end();
});