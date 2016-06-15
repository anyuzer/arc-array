"use strict";
var is = require('arc-is');
var Check = require('arc-check');

class ArcArray extends Array {
    //Pretty much a polyfill of forEach, except here I replaced the array reference (3rd arg) with a break function.
    //(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
    each(_f,_thisArg){
        if(is(_f) !== "function") {
            throw new TypeError('argument is not a function');
        }

        //Declare
        var $this,key,length,Obj,eachBreak;

        //Our contextual this (for the callback)
        $this = _thisArg || this;

        //Readibly polyfillian
        key = 0;
        Obj = Object(this);
        length = Obj.length >>> 0;

        //Iterate (obviously)
        while(key<length){
            let val;
            if(key in Obj){
                val = Obj[key];
                if(_f.call($this,val,key,this) === false){
                    break;
                }
            }
            key++;
        }
    }

    //If a value in the array checks true, it will be removed
    filter(_Check){
        if(is(_Check,true) !== 'ArcCheck'){
            throw new TypeError('ArcArray.filter expects a valid ArcCheck object to check against');
        }
        var $this,its,index;

        $this = this;
        its = this.length;
        index = 0;

        for(var i=0;i<its;i++){
            if(_Check.val($this[index])){
                $this.splice(index,1);
            }
            else{
                index++;
            }
        }
        return this;
    }

    //Pass an array in [false,undefined,"SEVEN"] and any index that has a value that matches one of these will be removed
    quickFilter(_excludeVals){
        if(is(_excludeVals) !== 'array'){
            throw new TypeError('ArcArray.quickFilter expects a valid array of values to check against');
        }
        var C = new Check();
        C.addInclude(function(_val){
            //This will be called against the values, if the value exists it 'can' have it, we return true, so the check will pass, telling us we want to remove it.
            return (_excludeVals.indexOf(_val) !== -1 ? true : false);
        });
        return this.filter(C);
    }

    //Iterate through the array, call the callback passing in the value join the returned values (I may want to check to see if the return val is a string?)
    joinCallback(_callback,_separator){
        //Don't bother if the array is empty
        if(!this.length){
            return '';
        }

        //If it's not empty, ensure our argument is correct
        if(is(_callback) !== 'function'){
            throw new TypeError('ArcArray.joinCallback requires a valid callback to be passed in');
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
                    $this = new ArcArray(...$this);
                }
                return $this;
            }
        });
    }
}

module.exports = ArcArray;