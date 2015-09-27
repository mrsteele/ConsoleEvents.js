# observe.js
True observations

### What is observe.js?

observe.js allows you to listen to any object for whenever any changes occur, as well as when any function fires.
This is done by wrapping around the original object and firing events between commands.

### How do I listen to an object?

Easy!

```
// first apply the listener...
observe(console)

// then wait for events...
console.on("log", function (msg) {
    alert('The console says: ' + msg);
});
```

You can also listen to property changes with the native `Object.observe`!

```
// the object to listen to
var test = {msg: "hello"};

// apply the listener
observe(test);

/// listen to the property name to observe changes
test.on("msg", function (oldValue) {
    alert("'msg' changed from '" + oldValue + '" to '" + test.msg + "'!");
});

```

### I wanna contribute

Yes please! Pull request and code away!
