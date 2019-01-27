# Basic Questions

# Trickier Questions


## What is a potential pitfall with using `typeof bar === 'object'` to determine if bar 
is an object?

In javascript, the following code will log `true`:

```js
let bar = null;
console.log(typeof bar === 'object');
```
Thus to check if bar is an object using with this piece of code, one must first check for `null` value:
```js
bar !== null && typeof bar === 'object'
```

And to be through with the answer, there are two other points worth mention.

First, the above statement would return `false` if bar is a function. In most cases, this is the desired behavior, but in situation you want function to pass the test:
```js
bar !== null && ( typeof bar === 'object' || tyepof bar === 'function')
```

Second, the above statement would return `true` if bar is an array. Similarly, this is often desired, but incase you don't want array to be included, you can add:
```js
// ES5
Array.isArray(bar)
// alternative
toString.call(bar) === '[object Array]'
```

## What is the scope of `a` and `b` when using `var a = b = 0` inside a function?
There is a pitfall here, which could be overlooked by some. Consider this example with an IIFE.
```js
(function(){
  var a = b = 3;
})();

console.log(typeof a === 'undefined'); // true
console.log(typeof b === 'undefined'); // false
```
Variable b is defined outside of the function scope. How did this happen?

This is because in fact, the expression `var a = b = 0` is shorthand for:
```js
b = 0; // same for let and const
var a = b; 
```
Here `b` ends up being a global variable.
