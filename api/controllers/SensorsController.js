/**
 * SensorsController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    startLogging: function (req, res) {
        if (req.param('id') !== undefined) {
            Sensors.update({id: req.param('id')}, {running: true})
                    .then(function (sensor) {
                        res.json(sensor)
                    })
        } else {
            TemperatureLoggingService.start()
                    .then(function(sensors){
                        return res.json(sensors)
                    })
        }
    },
    stopLogging: function (req, res) {
        if (req.param('id') !== undefined) {
            Sensors.update({id: req.param('id')}, {running: false})
                    .then(function (sensor) {
                        res.json(sensor)
                    })
        }
        else {
            TemperatureLoggingService.stop()
                    .then(function(sensors){
                        return res.json(sensors)
                    });
        }
    },
    all: function (req, res) {
        TemperatureLoggingService.getAllSensors(function (r) {
            return res.json(r)
        });
    }
};

