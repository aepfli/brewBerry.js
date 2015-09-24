/**
 * Created by sschrottner on 30.11.2014.
 */

var sense = require('ds18b20');
var oldV = {};

var TemperatureService = {

    getAllSensors: function (callback, options) {
        if (sails.config.environment === 'development') {
            return Sensors.find();
        } else {
            return sense.sensors()
                    .then(function (err, ids) {
                        console.log("sensor ids");
                        console.log(ids);
                        return Sensors.findBySysname(ids)
                    });
        }
    },

    intervall: function () {
        setInterval(function () {
            Sensors.find({running: true})
                    .then(function (sensors) {
                        for (var s in sensors) {
                            if (sails.config.environment === 'development') {
                                if (oldV[sensors[s].id] === undefined) {
                                    oldV[sensors[s].id] = 50;
                                }
                                var f = 1;
                                var value = Math.random() * 5;
                                if (Math.random() > 0.5) {
                                    f = -1;
                                }
                                value = oldV[sensors[s].id] + (value * f);
                                oldV[sensors[s].id] = value;
                                TemperatureService.createTemp(value, sensors[s])
                            } else {
                                sense.temperature(sensors[s].name, function (err, value) {
                                    TemperatureService.createTemp(value, sensors[s])
                                })
                            }
                        }
                    });
        }, sails.config.brewberry.interval);
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
