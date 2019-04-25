# JavaScript

## Core

### Understant prototypical inheritance

## Standard built-in objects

### Map
The map holds key-value pairs and **remembers the original insertion order of the keys**. Any value (objects or primitive values) can be used the key or value.
#### Syntax
```js
new Map([interable])
```
the parameter can be an Array or other iterable object whose element are key-value pairs.
#### Key equality
Key equality is based on **sameValueZero alogrithm**. So `NaN` is considered the same to another `NaN`, even though `NaN !== NaN`. Also, the values `-0` and `+0` are considered the same as well, unlike the sameValue alogrithmn exposed through `Object.is` method in ES6.
#### Map vs Object
Objects have been used as Maps historically; however, there are important differences that make using a Map preferable in certain cases:
- Map is **`iterable`** so it can be iterated directly. 
- Map maintains insertion order.
- Map can use anything for key and value, while the key for `Object` can only be `String` or `Symbol`.
- You can get size of Map easily use `Map.size` property.
- Map performs better in scenarios involving frequent addition, removal of key pairs.
#### Example usages
**forEach**
```js
var myMap = new Map([['key1', 'val1'],['key2', 'val2']])
myMap.forEach((key, val, map) => console.log(key, val, map));
```
**relation with array**
```js
var kvArr = [['key1', 'val1'],['key2', 'val2']]
var myMap = new Map(kvArr)
console.log([...myMap]) // back to the array
console.log(Array.from(myMap)) // also works
```
**cloning**
```js
var original = new Map([[1, 'one']])
var clone = new Map(original)
console.log(clone === original) //false. shallow comparison
```
**merging**
```js
var mapOne = new Map([[1, 'one']])
var mapTwo = new Map([[2, 'two']])
var merged = new Map([...mapOne, ...mapTwo])
```


**See**:
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality)





