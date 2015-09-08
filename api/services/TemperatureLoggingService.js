/**
 * Created by sschrottner on 30.11.2014.
 */
var TemperatureService =  {

  getAllSensors: function (callback, options) {
    var result = {success: true, error: {}, data: []};
    var sense = require('ds18b20');
    sense.sensors(function (err, ids) {
      console.log("sensor ids");
      console.log(ids);
      callback(ReturnService.createResult(ids, err));
    });
  },

  start: function (sensor, callback, opt) {
    var sense = require('ds18b20');
    var options = opt || {};

    var interval = 5000;
    if (interval === 'undefinded') {
      interval = 5000;
    }

    Sensors.update({name: sensor}, {running: true}, function (err, s2) {
      var oldV = 0;
      if (err != null) {
        return
      }
      var inter = setInterval(function () {
        Sensors.findOrCreate({name: sensor}, function (err, s) {
          if (err) {
            console.log(err);
            return
          }

          if (s.running) {
            console.log("logging");
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
            console.log("clearing log");
            clearInterval(inter);
            clearInterval(this);
          }
        });
      }, interval);

      return callback(ReturnService.createResult(s2, err));
    });

  },

  stop: function (sensor, callback, options) {
    Sensors.update({name: sensor}, {running: false}, function (err, s) {
      console.log("stopped", s);
    })
  },

  toggleLog: function (sensor, callback, options) {
    Sensors.findOrCreate({name: sensor}, {name: sensor, running: false}, function (err, s) {
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
    Temps.create({temp: temp, brewTime: new Date(), sensor: sensor.id}, function (err, temp) {
      if(err) {
        console.log(err);
      }
    });
  }
};


module.exports = TemperatureService;
