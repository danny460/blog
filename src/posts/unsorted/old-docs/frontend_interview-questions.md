---
id: frontend_interview-questions
title: Interview questions
sidebar_label: Interview questions
---

## HTML

### What is the difference between `script`, `script async` and `script defer`? When to use what?

Before the browser can render a page, it has to build the DOM tree by parsing the HTML markup. Whenever the parser encounters a script it has to fetch and execute it before it can continue parsing the HTML. `async` and `defer` provide different behaviours:

- `<script>`: HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
- `<script async src=...>`: The script will be fetched in parallel to HTML parsing and **executed as soon as it is available** (potentially before HTML parsing completes). When there are multiple async scripts, the order of exectution is not guranteed (cuz ASAP). You can use `async` when the script is independent of any of other scripts on the page, for example: analytics.
- `<script defer src=...>`: The scsript will be fetched in parallel to HTML and **executed when the page has finished parsing**. Deferred scripts are guranteed to execute in the order they appear in the document. Use `defer` when a script relies on fully-parsed DOM. There's not much difference compare to putting a normal `<script>` at the end of `<body>`.

> **Note:** `async`/`defer` are ignored if the script tag has no `src` attribute.

See:

- https://stackoverflow.com/questions/10808109/script-tag-async-defer

## JavaScript

### What is `Symbol` in javascript? And what would you use it for?

Symbol value represents a unique identifier. Every symbol value returend from `Symbol()` is guranteed to be unique.

```js
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(typeof id1); // "symbol"
console.log(id1.toString()); // "Symbol(id)"
console.log(id1 == id2); // false
console.log(id1 === id2); // false
```

**Note**: the data type `symbol` is a **primitive data type**.

#### What to use it for?

##### Hidden properties

##### System symbol

See:

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

### Why is it needed to wrap IIFE with parentheses? Why doesn't `function(){}()` work?

`function(){}()` doesn't work because it is parsed as a `FunctionDeclaration`. Beacuse `FunctionDeclaration` and `FunctionExpression` have the same syntax, except that the identifier (function name) is optional for a `FunctionExpression`. The only way for parser to decide which one the parse to is based on the context.

Because parentheses (formely, the **grouping operator**), can only surround expression, there is no ambiguity for the function expression to work.

And you don't care about the return value, you can actually write IIFE without parentheses:

```js
!(function () {})(); // or with ~,+,-,typeof,delete,void
```

Similar to parentheses, these operator can only be applied on expressions.

See:

- https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function
- https://stackoverflow.com/questions/1634268/explain-the-encapsulated-anonymous-function-syntax

## Trick Questions

### What is a potential pitfall with using `typeof bar === 'object'` to determine if bar is an object?

The main pitfull here is that when `bar` is `null`, the expression still evaluates to `true`. Thus to check if bar is an object using with this piece of code, one must first check for `null` value:

```js
bar !== null && typeof bar === 'object';
```

And to be through with the answer, there are two other points worth mention.

First, the above statement would return `false` if bar is a function. In most cases, this is the desired behavior, but in situation you want function to pass the test:

```js
bar !== null && ( typeof bar === 'object' || tyepof bar === 'function')
```

Second, the above statement would return `true` if bar is an array. Similarly, this is often desired, but incase you don't want array to be included, you can add:

```js
// ES5
Array.isArray(bar);
// alternative
toString.call(bar) === '[object Array]';
```

### What is the scope of `a` and `b` when using `var a = b = 0` inside a function?

There is a pitfall here, which could be overlooked by some. Consider this example with an IIFE.

```js
(function () {
  var a = (b = 3);
})();

console.log(typeof a === 'undefined'); // true
console.log(typeof b === 'undefined'); // false
```

Variable b is defined outside of the function scope. How did this happen?

Turns out, the expression `var a = b = 0` is shorthand for:

```js
b = 0;
var a = b;
```

Here `b` ends up being a global variable. This is the behaviour even for `let` and `const`
