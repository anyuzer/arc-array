"use strict";
var is = require('arc-is');
var Check = require('arc-check');

class ArcArray extends Array {
    //Pretty much a polyfill of forEach, except here I replaced the array reference (3rd arg) with a break function.
    each(_f,_thisArg){
        if (typeof _f !== "function") {
            throw new TypeError(callback+' is not a function');
        }

        //Declare
        var $this,key,length,Obj,eachBreak;

        //Our contextual this (for the callback)
        $this = _thisArg || this;

        //This is mostly based on the polyfill (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
        key = 0;
        Obj = Object(this);
        length = Obj.length >>> 0;

        //Iterate (obviously)
        while(key<length){
            let val;
            if(key in Obj){
                val = Obj[key];
                _f.call($this,val,key,_break);
            }
            key++;
            if(eachBreak){
                break;
            }
        }

        function _break(){
            eachBreak = true;
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
        this.filter(C);
    }

    //This should peform a resolved deep copy, but I need to write some tests against it
    copy(){
        var $target = (is(arguments[arguments.length-1]) === 'boolean' ? [] : this);
        return _copy($target).arc();
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
                $this = new ArcArray(...$this);
                return $this;
            }
        });
    }
}

module.exports = ArcArray;


function _copy(_obj){
    var copier = {'object':copyObject,'array':copyArray,'date':copyDate,'regExp':copyRegExp},
        circleCache = {'array':[],'object':[]},
        $return = copyArray(_obj);

    circleCache = null;
    return $return;

    function checkCircle(_ref,_type){
        var i,$ref;
        for(i=0;i<circleCache[_type].length;i++){
            if(circleCache[_type][i].ref === _ref){
                $ref = circleCache[_type][i].copy;
                break;
            }
        }
        if($ref === undefined){
            $ref = copier[_type](_ref);
        }
        return $ref;
    }

    function copyObject(_obj){
        var type,prop,
            newObj = {};

        circleCache.object.push({'ref':_obj,'copy':newObj});

        for(prop in _obj){
            if(_obj.hasOwnProperty(prop)){
                if(_obj[prop] !== _obj){
                    type = is(_obj[prop]);
                    newObj[prop] = (copier[type] ? checkCircle(_obj[prop],type) : _obj[prop]);
                }
                else{
                    newObj[prop] = newObj;
                }
            }
        }
        return newObj;
    }

    function copyArray(_array){
        var type,i,
            newArray = [];

        circleCache.array.push({'ref':_array,'copy':newArray});

        for(i=0;i<_array.length;i++){
            if(_array[i] !== _array){
                type = is(_array[i]);
                newArray.push((copier[type] ? checkCircle(_array[i],type) : _array[i]));
            }
            else{
                newArray.push(newArray);
            }
        }
        return newArray;
    }

    function copyDate(_date){
        return new Date(_date.getTime());
    }

    function copyRegExp(_regExp){
        return new RegExp(_regExp);
    }
}