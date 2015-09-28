/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.services = brewBerry.services || {}
brewBerry.services.temps = (function () {
    var sensors = {};
    var temps = {};
    var onSensorAddedMethods = {};
    var onTempAddedMethods = {};
    var publicMethods = {
        'onAdded': onAdded,
        "onTempAdded": listenOnTempAdded,
        'sensors': sensors,
        'load': load,
        'init': init,
        'reset': reset
    };

    function init() {
        return new Promise(
                function (resolve) {
                    io.socket.on('sensors', onIOEvent);
                    io.socket.on('temps', tempsEvent);
                    io.socket.get("/sensors", resolve)
                }
        ).then(
                function (data) {
                    console.log(data);
                    if (data !== undefined) {
                        for (var i = 0; i < data.length; i++) {
                            add(data[i]);
                        }
                    }
                }
        )

    }

    function reset() {

    }

    function load() {
        for (var i in  sensors) {
            var query = {
                where: {
                    sensor: sensors[i].id,
                    brewTime: {">": brewBerry.brewDay.brewStart}
                },
                limit: 2000
            };
            if (brewBerry.brewDay.brewEnd !== undefined) {
                query.where.brewTime["<"] = brewBerry.brewDay.brewEnd;
            }
            io.socket.get("/temps", query, function (data) {
                console.log("foooooo")
                console.log(data);
                console.log(query);
                if (data !== undefined) {
                    for (var i = 0; i < data.length; i++) {
                        addTemp(data[i]);
                    }
                }
            });
        }
    }

    function onAdded(name, action, recursive) {
        onSensorAddedMethods[name] = action;
        if (recursive) {
            for (var i in  sensors) {
                onSensorAddedMethods[name](sensors[i]);
            }
        }
    }

    function listenOnTempAdded(name, action, recursive) {
        onTempAddedMethods[name] = action;
        if (recursive) {
            for (var i in  temps) {
                try {
                    console.log(i)
                    onTempAddedMethods[name](temps[i]);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }

    function add(data) {
        console.log(data)
        var key = data.id;
        sensors[key] = data;

        for (var meth in onSensorAddedMethods) {
            try {
                onSensorAddedMethods[meth](data);
            } catch (e) {
                console.log(e)
            }
        }
    }

    function onIOEvent(obj) {
        console.log(onIOEvent);
        if (obj.verb == 'created') {
            var data = obj.data;
            add(data);
        }
    }

    function addTemp(data) {
        temps[data.id] = data;
        for (var meth in onTempAddedMethods) {
            onTempAddedMethods[meth](data);
        }
    }

    function tempsEvent(obj) {
        if (obj.verb == 'created') {
            var data = obj.data;
            addTemp(data);
        }
    }

    return publicMethods;
})
();
