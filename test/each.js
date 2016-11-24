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
    testArray.each(function(_index,_value){
        switch(_index){
            case 0: _test.equal(_value,'a');    break;
            case 1: _test.equal(_value,'b');    break;
            case 2: _test.equal(_value,'c');    break;
            case 3: _test.equal(_value,'d');    break;
        }
    });

    //Ensure break behaves as expected
    let count = 0;
    testArray.each(function(_i,_v){
        if(_i === 2){
            return false;
        }
        count++;
    });
    _test.equal(count,2);

    //Testing an additional edge case
    count = 0;
    testArray = [1];
    testArray = ArcArray.wrap(testArray);
    
    testArray.each(function(_i,_v){
        count++;
    });

    _test.equal(count,1);

    //End
    _test.end();
});