import is from 'arc-is';

class ArcArray extends Array {
    //Iterate through the array, call the callback passing in the value join the returned values (I may want to check to see if the return val is a string?)
    joinCallback(_callback,_separator){
        //If it's not empty, ensure our argument is correct
        if(is(_callback) !== 'function'){
            throw new TypeError('ArcArray.joinCallback requires a valid callback to be passed in');
        }

        //Don't bother if the array is empty
        if(!this.length){
            return '';
        }

        //Normalize the separator
        _separator = (is(_separator) === 'string' ? _separator : ',');

        //Join
        var joined = '';
        for(let i=0;i<this.length;i++){
            joined = joined+(!i ? _callback(this[i],i) : _separator+_callback(this[i],i));
        }
        return joined;
    }

    shuffle() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }

    rand() {
        return this[Math.floor(Math.random() * this.length)]
    }

    async pMap(_f) {
        return Promise.all(this.map(_f))
    }

    //This is our format for evaluating named prototypes
    toString(){
        return '[object '+this.constructor.name+']';
    }

    //A static method to allow a native shortcut: so [].arc() would return an ArcArray
    static bindNative(){
        Object.defineProperty(Array.prototype,'arc',{
            enumerable: false,
            configurable: false,
            writable: false,
            value: function(){
                var $this = this;
                if(is($this,true) !== 'ArcArray'){
                    if($this.length === 1){
                        var NewArray = new ArcArray();
                        NewArray.push($this[0]);
                        return NewArray;
                    }
                    return new ArcArray(...$this);
                }
                return $this;
            }
        });
    }

    static wrap(_array){
        if(is(_array,true) === 'ArcArray'){
            return _array;
        }
        else if(is(_array) === 'array'){
            if(_array.length === 1){
                const NewArray = new ArcArray();
                NewArray.push(_array[0]);
                return NewArray;
            }
            return new ArcArray(..._array);
        }
        else{
            throw new TypeError('Cannot wrap value, valid array expected');
        }
    }
}

export default ArcArray;