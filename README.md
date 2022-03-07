# arc-array [![Build Status](https://travis-ci.org/anyuzer/arc-array.svg?branch=master)](https://travis-ci.org/anyuzer/arc-array)
An array convenience subclass for javascript.

## Install

```
$ npm install arc-array --save
```


## Features
* callback based join
* native convenience binding (if desired)
* extends native array so should be compatible


## API

### static ArcArray.wrap(array:Array)
Accept an array, and if it is already an ArcArray return the same object, otherwise create a new ArcArray utilizing the passed in array

### new ArcArray(...args)
Create a new `ArcArray` object. Requires `new`

### .shuffle()
Shuffles an array in place. 

### .rand()
Returns a random element from the array

### async .pMap(async callable)
Iterates over an array like a map, but treating each callable as async, awaits for all to resolve like a Promise.all

```js

const someArray = ArcArray.wrap([1,2,3]);
const someResolvedResponse = await someArray.pMap(async (val) => { 
    const response = await someRemoteCall(val);
    return response;
})
```

### .joinCallback(callback:Function [, separator:String])
Create a string based on the returned values from a callback on each index of an array.

**callback** is a function that receives each value of the array, and is expected to return a value that will be used to create the joined string.

```js
//Example of joinCallback
const items = new ArcArray('item1','item2','item3');
const string = items.joinCallback(function(_val){
    return '<li>'+_val+'</li>'
},'');

//String returned is: <li>item1</li><li>item2</li><li>item3</li>
```

## Testing
```
npm test
```
