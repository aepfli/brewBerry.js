/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.services = brewBerry.services || {}
brewBerry.services.tempservice = (function () {
    var sensors = {};
    var onSensorAddedMethods = {};
    var onTempAddedMethods = {};
    var publicMethods = {
        'listenOnSensorAdded': listenOnSensorAdded,
        'listenOnTempAdded': listenOnTempAdded,
        'sensors': sensors,
        'loadSensors': loadSensors
    };

    function init() {
        console.log("init services")
        //Subscribe to events
        io.socket.on('temps', tempsEvent);
        io.socket.on('sensors', sensorEvent);
    }

    function loadSensors() {
        console.log("loadSensors")
        io.socket.get("/sensors", function (data) {
            this.sensors = {};
            console.log(data);
            if (data !== undefined) {
                for (var i = 0; i < data.length; i++) {
                    addSensor(data[i]);
                }
            }
        });
    }

    function listenOnSensorAdded(name, action, recursive) {
        onSensorAddedMethods[name] = action;
        if (recursive) {
            for (var i = 0; i < sensors.length; i++) {
                onSensorAddedMethods[name].call(sensors[i]);
            }
        }
    }

    function listenOnTempAdded(name, action, recursive) {
        onTempAddedMethods[name] = action;
        if (recursive) {
            for (var i = 0; i < sensors.length; i++) {
                onTempAddedMethods[name].call(sensors[i]);
            }
        }
    }

    function addSensor(data) {
        console.log(data)
        var key = data.id;
        sensors[key] = data;
        io.socket.get("/temps", {sensor: key, brewTime: {">": new Date()}}, function (resData) {
            console.log(resData);
        });

        for (var meth in onSensorAddedMethods) {
            console.log(meth, onSensorAddedMethods[meth])
            onSensorAddedMethods[meth](data);
        }
    }

    function addTemp(data) {

        for (var meth in onTempAddedMethods) {
            console.log(meth, onTempAddedMethods[meth])
            onTempAddedMethods[meth](data);
        }
    }

    function sensorEvent(obj) {
        console.log(sensorEvent);
        if (obj.verb == 'created') {
            var data = obj.data;
            addSensor(data);
        }
    }

    function tempsEvent(obj) {
        if (obj.verb == 'created') {
            var data = obj.data;
            addTemp(data);
        }
    }

    $(init);

    return publicMethods;
})
();
