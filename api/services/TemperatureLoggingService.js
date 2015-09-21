/**
 * Created by sschrottner on 30.11.2014.
 */
var TemperatureService = {

    getAllSensors: function (callback, options) {
        var result = {success: true, error: {}, data: []};
        var sense = require('ds18b20');
        if (sails.config.environment === 'development') {
            Sensors.find(function (err, sensors) {
                callback(ReturnService.createResult(sensors, null));
            })
        } else {
            sense.sensors(function (err, ids) {
                console.log("sensor ids");
                console.log(ids);
                Sensors.findByName(ids, function (err, sensors) {
                    callback(ReturnService.createResult(sensors, err));
                })
            });
        }
    },

    start: function (sensor, callback, opt) {
        var sense = require('ds18b20');
        var options = opt || {};

        var interval = 1000;
        if (interval === 'undefinded') {
            interval = 1000;
        }
        Sensors.findOrCreate({name: sensor}, function (err, s) {
            if (s.running) {
                return callback(ReturnService.createResult(s, err));
            }
            s.running = true;
            s.save(function(err, s2) {
                var oldV = 0;
                if (err != null) {
                    return callback(ReturnService.createResult(s2, err));
                }
                setInterval(function () {
                    if (s.running) {
                        if (sails.config.environment === 'development') {
                            var f = 1;
                            var value = Math.random() * 5;
                            if (Math.random() > 0.5) {
                                f = -1;
                            }
                            value = oldV + (value * f);
                            oldV = value;
                            TemperatureService.createTemp(value, s)
                        } else {
                            sense.temperature(s.name, function (err, value) {
                                TemperatureService.createTemp(value, s)
                            })
                        }
                    } else {
                        clearInterval(this);
                    }

                }, interval);

                return callback(ReturnService.createResult(s, err));
            });
        });
    },

    stop: function (sensor, callback, options) {
        Sensors.update({name: sensor}, {running: false}, function (err, s) {
            console.log("stopped", s);
            return callback(ReturnService.createResult(s, err))
        })
    },

    toggleLog: function (sensor, callback, options) {
        Sensors.find({name: sensor}, function (err, s) {
            if (err) {
                console.log(err);
            }
            if (s.running) {
                TemperatureService.stop(sensor, callback, options);
            } else {
                TemperatureService.start(sensor, callback, options);
            }
        });
    },

    createTemp: function (temp, sensor) {
        Temps.create({temp: temp, brewTime: new Date(), sensor: sensor.id}).populateAll().exec(function (err, temp) {
            if (err) {
                console.log(err);
            }
            Temps.publishCreate(temp);
            console.log(temp.brewTime + " " + temp.sensor);
        });
    }
};

module.exports = TemperatureService;
