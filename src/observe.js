(function (global) {
    "use strict";

    var methodName = "observe";

    // only apply if not applied already
    if (!global[methodName]) {

        /**
         * Observes changes to object properties, as well as 
         * listens to when any function is called.
         * @param {Object} obj - Any object that needs to be listened to.
         */
        global[methodName] = function (obj) {
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

                // grab functions and listen on them
                for (key in obj) {
                    if (ignored.indexOf(key) === -1) {
                        if (obj[key] && getType.toString.call(obj[key]) === '[object Function]') {
                            obj._originals[key] = obj[key];
                            obj[key] = wrapFunction(key);
                        }
                    }
                }

                /**
                 * Fires off new events internally.
                 * @param {String} event - The event name (property name or function name).
                 * @param {Object[]} args - An array of arguments.
                 */
                obj._fire = function (event, args) {
                    if (obj._events[event]) {
                        var i, events = obj._events[event];
                        for (i = 0; i < events.length; i += 1) {
                            events[i].apply(obj, args);
                        }
                    }
                };

                /**
                 * Sets up a listener event.
                 * @param {String} event - The event to listen for.
                 * @param {function} callback - The callback fired after event occurs.
                 */
                obj.on = function (event, callback) {
                    if (!this._events[event]) {
                        this._events[event] = [];
                    }

                    this._events[event].push(callback);
                };

                /**
                 * Observes default changes on the object.
                 */
                Object.observe(obj, function (changes) {
                    changes.forEach(function (change) {
                        obj._fire(change.name, [change.oldValue]);
                    });
                });

            }
        }; // end global[methodName]
    }
}(typeof window !== "undefined" ? window : this));
