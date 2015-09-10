/**
 * SensorsController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  startLogging: function (req, res) {
    TemperatureLoggingService.start(req.param("sensor"), function (r) {
      return res.json(r)
    });
  },
  stopLogging: function (req, res) {
    TemperatureLoggingService.stop(req.param("sensor") , function (r) {
      return res.json(r)
    });
  },
  toggleLogging: function (req, res) {
    TemperatureLoggingService.toggleLog(req.param("sensor"), function (r) {
      return res.json(r)
    });
  },  allstartLogging: function (req, res) {
    TemperatureLoggingService.start(function (r) {
      return res.json(r)
    });
  },
  allstopLogging: function (req, res) {
    TemperatureLoggingService.stop( function (r) {
      return res.json(r)
    });
  },
  alltoggleLogging: function (req, res) {
    TemperatureLoggingService.toggleLog(function (r) {
      return res.json(r)
    });
  },
  all: function (req, res) {
    TemperatureLoggingService.getAllSensors( function (r) {
      return res.json(r)
    });
  },
  getTemps: function (req, res) {
    TemperatureChartService.getTemps(req.param("sensor"), req.allParams(), function (r) {
      return res.json(r)
    });
  },
  plot: function(req, res) {
    return res.view("plotTemps.ejs", {sensor: 'test'})
  }
};

