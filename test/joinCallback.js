var tap = require('tap');
var ArcArray = require('../');

//Test quickFilter
tap.test('ArcArray.joinCallback',function(_test){

    //Check shortcut for empty array (should always return an empty string)
    let testArray = new ArcArray();
    _test.equal(testArray.joinCallback(()=>{}),'');

    testArray = new ArcArray(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);

    //Should only accept a callback
    _test.throws(function(){
        testArray.joinCallback('STRING');
    },TypeError);

    //Default comma
    _test.equal(testArray.joinCallback(fizzbuzz),'fizzbuzz,1,2,fizz,4,buzz,fizz,7,8,fizz,buzz,11,fizz,13,14,fizzbuzz');

    //Or a different string
    _test.equal(testArray.joinCallback(fizzbuzz,' '),'fizzbuzz 1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz');

    _test.end();
});

function fizzbuzz(_val,_index){
    return ((_index%3 === 0 ? 'fizz' : '')+(_index%5 === 0 ? 'buzz' : '')) || _val;
}