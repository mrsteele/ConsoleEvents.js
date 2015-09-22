# ConsoleEvents.js
Listen to the console

### What is ConsoleEvents.js?

ConsoleEvents.js allows you to listen to the console for whenever something happens.
This is done by wrapping around the original console and firing events between console commands.

### How do I listen tot he console?

Easy!

```
console.on("log", function (msg) {
    alert('The console says: ' + msg);
});
```

### Why does only the log function work right now?

I only made this in 30 minutes, I plan to do more with this but as of right now it is a proof of concept. If you want to do more with it feel free to do a pull request :).
