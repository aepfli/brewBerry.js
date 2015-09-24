/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.services = brewBerry.services || {}
brewBerry.services.phase = (function () {
    var phases = {};
    var onPhaseAdded = {};
    var publicMethods = {
        'onAdded': onAdded,
        'load': load
    };

    function init() {
    }

    function load() {
        //Subscribe to events
        io.socket.on('brewphases', onIOEvent);
        io.socket.get("/brewphases", function (data) { });
    }

    function onAdded(name, action, recursive) {
        onPhaseAdded[name] = action;
        if (recursive) {
            for (var phase in phases) {
                onPhaseAdded[name](phases[phase]);
            }
        }
    }

    function add(data) {
        phases[data.id] = data
        for (var meth in onPhaseAdded) {
            onPhaseAdded[meth](data);
        }
    }

    function onIOEvent(obj) {
        console.log("what")
        if (obj.verb == 'created') {
            var data = obj.data;
            add(data);
        }
    }

    $(init)
    return publicMethods;
})
();
