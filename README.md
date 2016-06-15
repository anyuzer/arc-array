# arc-array [![Build Status](https://travis-ci.org/anyuzer/arc-array.svg?branch=master)](https://travis-ci.org/anyuzer/arc-array)
An array convenience subclass for javascript.

## Install

```
$ npm install arc-array --save
```


## Features
* each() with break functionality
* complex evaluation filtering (using ArcCheck)
* quick filtering
* callback based join
* native convenience binding (if desired)
* extends native array so should be compatible


## Basic Usage

The following example creates a new ArcArray, filters out empty and false values and iterates to a specific value before breaking

```js
var ArcArray = require('arc-array');

//Equivalent to ['a','','b',false,'c']
var someArray = new ArcArray('a','','b',false,'c');

//Filter out '' and false values
someArray.quickFilter(['',false]);

//Loop through the array
someArray.each(function(_value,_index){
    if(_value === 'b'){
        //Break when we hit the value 'b'
        return false;
    }
});
```

## API

### new ArcArray(...args)
Create a new `ArcArray` object. Requires `new`

### .each(callback:Function [,thisContext:Object])

Loop over an array, calling callback each iteration. Break when false is explicitly returned.

**callback** is a required function that is called with 3 arguments passed in
* value: the value of the current index being iterated over
* index: the index of the current iteration
* array: the reference to the original ArcArray object

**thisContext** is an optional object that will be available inside of the callback as 'this' if set, otherwise defaulting to the original array object
```js
//Example of breaking each
var items = new ArcArray('a','b','c');
items.each(function(_value,_index,_array){
   if(_value === 'b'){
        return false; //Return explicit false to break
   }
});
```

### .quickFilter(values:Array)
Filter out values in array that match values in passed in array. Returns original ArcArray

**values** is an array of values that are compared against individual values in the array. If a match is found, the value in the array is automatically removed.
```
//Example of quickFilter
var items = new ArcArray('a','b','c');
items.quickFilter(['b']); //items is reduced to ['a','c']
```

### .filter(filter:ArcCheck)
Use an ArcCheck object to perform complex evaluation on a value to decide whether or not it should be removed (see ArcCheck for more details on use). Returns original ArcArray.

### .joinCallback(callback:Function [, separator:String])
Create a string based on the returned values from a callback on each index of an array.

**callback** is a function that receives each value of the array, and is expected to return a value that will be used to create the joined string.

```
//Example of joinCallback
var items = new ArcArray('item1','item2','item3');
var string = items.joinCallback(function(_val){
    return '<li>'+_val+'</li>'
},'');

//String returned is: <li>item1</li><li>item2</li><li>item3</li>
```

###ArcArray.nativeBind()
This is a static method that binds a method to the native global array prototype that transforms any array into an ArcArray object. This has a global effect and should be used carefully.

```
ArcArray.nativeBind();
var items = [1,'a','b',false].arc(); //This returns an ArcArray object
```

##Testing
```
npm test
```
