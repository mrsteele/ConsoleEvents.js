# Listenable.js
Listen to the console

### What is Listenable.js?

Listenable.js allows you to listen to any object for whenever any function fires.
This is done by wrapping around the original object and firing events between commands.

### How do I listen to an object?

Easy!

```
// first apply the listener...
Listenable(console)

// then wait for events...
console.on("log", function (msg) {
    alert('The console says: ' + msg);
});
```

### I wanna contribute

Yes please! Pull request and code away!
