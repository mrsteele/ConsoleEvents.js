(function (global) {
    "use strict";
    
    if (global.console !== undefined) {
        var origConsole = global.console,
            Console = function () {
                this._listeners = {};
            };

        // Fire the events...
        Console.prototype.fire = function (type, msg) {
            if (this._listeners[type]) {
                var i, callbacks = this._listeners[type];
                for (i = 0; i < callbacks.length; i += 1) {
                    callbacks[i](msg);
                }
            }
        };
        
        // Listen for events...
        Console.prototype.on = function (type, callback) {
            if (!this._listeners[type]) {
                this._listeners[type] = [];
            }
            
            this._listeners[type].push(callback);
        };

        // Example (log)
        Console.prototype.log = function (msg) {
            this.fire("log", msg);
            origConsole.log(msg);
        };
        
        // Create the console object over the other.
        global.console = new Console();
    }
}(typeof window !== "undefined" ? window : this));