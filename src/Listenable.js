(function (global) {
    "use strict";
    
    if (!global.Listenable) {
        
        var l = function (obj) {
            if (!obj._fire && !obj.on && !obj._events) {
                var key,
                    getType = {},
                    ignored = ["_events", "_originals"],
                    wrapFunction = function (key) {
                        return function () {
                            obj._fire(key, arguments);
                            return obj._originals[key].apply(obj, arguments);
                        };
                    };
                
                obj._events = {};
                obj._originals = {};
                
                for (key in obj) {
                    if (ignored.indexOf(key) === -1) {
                        if (obj[key] && getType.toString.call(obj[key]) === '[object Function]') {
                            obj._originals[key] = obj[key];
                            obj[key] = wrapFunction(key);
                        }
                    }
                }
                
                // fire new events
                obj._fire = function (event, args) {
                    if (obj._events[event]) {
                        var i, events = obj._events[event];
                        for (i = 0; i < events.length; i += 1) {
                            events[i].apply(obj, args);
                        }
                    }
                };
                
                obj.on = function (event, callback) {
                    if (!this._events[event]) {
                        this._events[event] = [];
                    }

                    this._events[event].push(callback);
                };
                
                // Listen for property changes
                Object.observe(obj, function(changes) {
                    changes.forEach(function(change) {
                        obj._fire(change.name, [change.oldValue]);
                    });
                });
            }
        };
        
        global.Listenable = l;
    }
}(typeof window !== "undefined" ? window : this));