import ArcArray from "../index.js";

function fizzbuzz(_val,_index){
    return ((_index%3 === 0 ? 'fizz' : '')+(_index%5 === 0 ? 'buzz' : '')) || _val;
}

//Test joinCallback
describe('ArcArray.joinCallback', () => {
    it('should call a callback function, and join the returned results together', () => {
        //Check shortcut for empty array (should always return an empty string)
        let testArray = new ArcArray();
        expect(testArray.joinCallback(()=>{})).toEqual('');

        testArray = new ArcArray(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);

        //Default comma
        expect(testArray.joinCallback(fizzbuzz)).toEqual('fizzbuzz,1,2,fizz,4,buzz,fizz,7,8,fizz,buzz,11,fizz,13,14,fizzbuzz');

        //Or a different string
        expect(testArray.joinCallback(fizzbuzz,' ')).toEqual('fizzbuzz 1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz');
    });

    it('should throw an error if a non function is passed in as the callback', () => {
        let testArray = new ArcArray();
        expect(() => {
            testArray.joinCallback('');
        }).toThrow('ArcArray.joinCallback requires a valid callback to be passed in');
    })
});