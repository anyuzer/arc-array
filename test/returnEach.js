var tap = require('tap');
var ArcArray = require('../');

//Test each iterator
tap.test('ArcArray.returnEach',function(_test){
    let testArray = new ArcArray('a','b','c','d');

    //If each does not receive a valid function, throw a TypeError
    _test.throws(function(){
        testArray.returnEach('STRING');
    },TypeError);

    //Ensure the iteration behaves as expected
    testArray.returnEach(function(_index,_value){
        switch(_index){
            case 0: _test.equal(_value,'a');    break;
            case 1: _test.equal(_value,'b');    break;
            case 2: _test.equal(_value,'c');    break;
            case 3: _test.equal(_value,'d');    break;
        }
    });

    //Ensure break behaves as expected
    let count = 0;
    testArray.returnEach(function(_i,_v){
        if(_i === 2){
            return false;
        }
        count++;
    });
    _test.equal(count,2);

    //Test joining based on return
    var joined = testArray.returnEach(function(_index,_value,_lastReturn){
        _lastReturn += _value;
        return _lastReturn;
    },'');
    _test.equal(joined,'abcd');

    //Test a modified array by reference
    var evenVals = testArray.returnEach(function(_index,_value,_even){
        if(_index%2 === 0){
            _even.push(_value);
        }
    },[]);
    _test.same(evenVals,['a','c']);

    //Test turning off break...
    let count2 = 0;
    testArray.returnEach(function(_i,_v){
        count2++;
        if(_i === 2){
            return false;
        }
    },[],false);
    _test.equal(count2,4);

    //End
    _test.end();
});