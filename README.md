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

### new ArcArray(...args)
Create a new `ArcArray` object. Requires `new`

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

###ArcArray.wrap(array:Array)
Accept an array, and if it is already an ArcArray return the same object, otherwise create a new ArcArray utilizing the passed in array

##Testing
```
npm test
```
