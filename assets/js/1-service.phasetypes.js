/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.services = brewBerry.services || {}
brewBerry.services.phasetypes = (function () {
    var types = {};
    var onPhaseAdded = {};
    var publicMethods = {
        'onAdded': onAdded,
        'load': load
    };

    function init() {
    }

    function load() {
        //Subscribe to events
        io.socket.on('brewphasetypes', onIOEvent);
        io.socket.get("/brewphasetypes", function (data) {
            this.sensors = {};
            console.log(data);
            if (data !== undefined) {
                for (var i = 0; i < data.length; i++) {
                    add(data[i]);
                }
            }
        });
    }

    function onAdded(name, action, recursive) {
        onPhaseAdded[name] = action;
        if (recursive) {
            for (var type in types) {
                console.log(type, types[type])
                onPhaseAdded[name](types[type]);
            }
        }
    }

    function add(data) {
        types[data.id] = data;
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

    $(init)
    return publicMethods;
})
();
