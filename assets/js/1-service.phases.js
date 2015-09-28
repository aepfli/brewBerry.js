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
        'load': load,
        'init': init,
        'reset': reset
    };

    function init() {
        return new Promise(function (resolve) {
            io.socket.on('brewphases', onIOEvent);
            resolve();
        })
    }

    function reset() {
    }

    function load() {
        phases = {};
        //Subscribe to events
        return new Promise(function (resolve) {
            io.socket.get("/brewphases", {day: brewBerry.brewDay.id}, resolve)
        }).then(function (data) {
                    console.log(data)
                    for (var i in data) {
                        add(data[i]);
                    }
                });

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
        if (obj.verb == 'created') {
            var data = obj.data;
            add(data);
        }
    }

    return publicMethods;
})
();
