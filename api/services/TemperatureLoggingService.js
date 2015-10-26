/**
 * Created by sschrottner on 30.11.2014.
 */

var sense = require('ds18b20');

var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);
var oldV = {};

var TemperatureService = {

    getAllSensors: function (callback, options) {
        if (sails.config.environment === 'development' && false) {
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
            Sensors.update({}, {connected: false})
                    .then(function (sensors) {
                        console.info("Set all to connected false", sensors);
                        var sensors = Promise.promisify(sense.sensors);
                        return sensors();
                    })
                    .then(function (ids) {
                        console.info("creating new Sensors if not existing", ids);
                        var val = [];
                        var search = [];
                        for (var i in ids) {
                            var ele = {};
                            ele.name = ids[i];
                            ele.sysName = ids[i];
                            var se = {};
                            se.sysName = ids[i];
                            val.push(ele);
                            search.push(se)
                        }
                        return Sensors.findOrCreate(search, val);
                    }).then(function (sensors) {
                console.info("updating sensors to set connected", sensors);
                // this is something odd, there must be an easier way, somehot Sensors update, did not work like expected ;(
                var search = [];
                for (var i in sensors) {
                    search.push(sensors[i].id)
                }
                return Sensors.update(search, {connected: true})
            }).then(function (sensors) {
                console.info("get all running", sensors);
                return Sensors.find({running: true, connected: true})
                        .each(function (sensor) {
                            return readFile('/sys/bus/w1/devices/' + sensor.sysName + '/w1_slave', 'utf8')
                                    .then(function (data) {
                                        var arr = data.split(' ');
                                        var output;
                                        if (arr[1].charAt(0) === 'f') {
                                            var x = parseInt("0xffff" + arr[1].toString() + arr[0].toString(), 16);
                                            output = -((~x + 1) * 0.0625);

                                        } else if (arr[1].charAt(0) === '0') {
                                            output = parseInt("0x0000" + arr[1].toString() + arr[0].toString(), 16) * 0.0625;
                                        } else {
                                            throw new Error('Can not read temperature for sensor ' + sensor);
                                        }
                                        return TemperatureService.createTemp(output, sensor);
                                    });
                        })

            }).catch(function (e) {
                console.warn(e);
            })
        }, sails.config.brewberry.interval);
    },

    stop: function () {
        return Sensors.find()
                .then(function (sensors) {
                    var ids = [];
                    for (var sensor in sensors) {
                        ids.push(sensors[sensor].id)
                    }
                    console.log(sensors, ids)
                    return Sensors.update(ids, {running: false})
                })
    },

    start: function () {
        return Sensors.find()
                .then(function (sensors) {
                    var ids = [];
                    for (var sensor in sensors) {
                        ids.push(sensors[sensor].id)
                    }
                    console.log(sensors, ids)
                    return Sensors.update(ids, {running: true})
                })
    },

    createTemp: function (temp, sensor) {
        console.info("logging temp for sensor", temp, sensor);
        return Temps.create({temp: temp, brewTime: new Date(), sensor: sensor.id})
                .then(function (temp) {
                    return Temps.findOneById(temp.id).populateAll()
                })
                .then(function (temp) {
                    console.info(temp);
                    Temps.publishCreate(temp);
                });
    }
};

module.exports = TemperatureService;
